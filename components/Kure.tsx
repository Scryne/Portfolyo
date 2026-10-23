'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { Dil } from '@/lib/tipler';

export type KureYeri = {
  slug: string;
  ad: string;
  alan: string;
  ne: string;
  href: string;
  /** [enlem, boylam] */
  konum: [number, number];
  gorsel: { src: string; srcSet: string; w: number; h: number; zemin: string; alt: string };
};

const METIN = {
  durdur: { tr: 'Otomatik geçişi durdur', en: 'Pause the tour' },
  oynat: { tr: 'Otomatik geçişi başlat', en: 'Play the tour' },
  secim: { tr: 'Küredeki projeler', en: 'Projects on the globe' },
  ipucu: { tr: 'sürükleyin · işarete gelin', en: 'drag · hover a marker' },
  onceki: { tr: 'Önceki proje', en: 'Previous project' },
  sonraki: { tr: 'Sonraki proje', en: 'Next project' },
};

const SURE = 5000;
/** Seçili konuma dönerken enlemin ne kadarı kadar eğilsin; tam eğim küreyi fazla devirir. */
const EGIM = 0.6;
/** Bu kadar dereceden yakın projeler tek kümede halkaya açılır. */
const KUME_DERECE = 9;
/** Rota yayı: çizim, bekleme, sönme (ms). */
const ROTA = { ciz: 1100, kal: 1700, son: 700 };
const { PI, sin, cos, acos, atan2, hypot, min, max } = Math;
const RAD = PI / 180;

/** Konumu kürenin ortasına getiren açılar (cobe'un phi/theta'sı). */
const acilar = ([enlem, boylam]: [number, number]) =>
  [PI - (boylam * RAD - PI / 2), enlem * RAD * EGIM] as const;

const GENIS = '(min-width: 64rem)';
/**
 * Masaüstünde kart kürenin sol altında durur; seçili konum tam ortaya gelirse dar masaüstünde kartın
 * altında kalır. Küre o yüzden konumun güneybatısına bakar: konum ortanın sağ üstüne düşer.
 */
const KAYMA: [number, number] = [-14, -22];
/** 64–80rem arasında küre küçük, kart görece büyük: konum daha da sağa düşsün. */
const KAYMA_DAR: [number, number] = [-14, -30];
const hedefAcilar = ([enlem, boylam]: [number, number]) => {
  if (typeof window === 'undefined' || !matchMedia(GENIS).matches) return acilar([enlem, boylam]);
  const [de, db] = matchMedia('(min-width: 80rem)').matches ? KAYMA : KAYMA_DAR;
  return acilar([enlem + de, boylam + db]);
};

type V3 = [number, number, number];

/** Dünya noktası, cobe'un gölgelendiricisindeki eksenlerle. */
const vektor = ([enlem, boylam]: [number, number]): V3 => {
  const a = enlem * RAD;
  const o = boylam * RAD - PI;
  return [-cos(a) * cos(o), sin(a), cos(a) * sin(o)];
};

/**
 * Dünya noktasının görüş uzayındaki yeri; küre yarıçapı 1. cobe'un dönüşümünün tersi:
 * f = L(theta, phi) · P. `k` > 1 noktayı yüzeyden kaldırır (rota yayı).
 */
function gorus([px, py, pz]: V3, phi: number, theta: number, k = 1) {
  const [cp, sp, ct, st] = [cos(phi), sin(phi), cos(theta), sin(theta)];
  return {
    fx: (cp * px + sp * pz) * k,
    fy: (sp * st * px + ct * py - cp * st * pz) * k,
    fz: (-sp * ct * px + st * py + cp * ct * pz) * k,
  };
}

/** Görüş uzayı → tuval, 0–1 (küre yarıçapı tuvalin 0,8'i). */
const tuvale = (fx: number, fy: number) => ({ x: (fx * 0.8 + 1) / 2, y: (1 - fy * 0.8) / 2 });

/** İki konum arasındaki büyük daire açısı (radyan). */
const aciUzaklik = (a: [number, number], b: [number, number]) => {
  const [u, v] = [vektor(a), vektor(b)];
  return acos(min(1, max(-1, u[0] * v[0] + u[1] * v[1] + u[2] * v[2])));
};

type Kume = { uyeler: number[]; merkez: V3; yuva: Map<number, number> };

/**
 * Yakın projeleri kümeler ve her üyeye halkada sabit bir yuva (açı) verir. Sıra coğrafidir: üye,
 * kümenin ortasına göre hangi yöndeyse halkada da o tarafa düşer. Statik; küre dönerken yer değiştirmez.
 */
function kumele(konumlar: [number, number][]): Kume[] {
  const ata = konumlar.map((_, i) => i);
  const kok = (i: number): number => (ata[i] === i ? i : (ata[i] = kok(ata[i])));
  konumlar.forEach((a, i) =>
    konumlar.forEach((b, j) => {
      if (j > i && aciUzaklik(a, b) < KUME_DERECE * RAD) ata[kok(j)] = kok(i);
    }),
  );
  const gruplar = new Map<number, number[]>();
  konumlar.forEach((_, i) => gruplar.set(kok(i), [...(gruplar.get(kok(i)) ?? []), i]));

  return [...gruplar.values()]
    .filter((u) => u.length > 1)
    .map((uyeler) => {
      const n = uyeler.length;
      const ort = (k: 0 | 1) => uyeler.reduce((t, i) => t + konumlar[i][k], 0) / n;
      const [enlem, boylam] = [ort(0), ort(1)];
      // Ekran yönü: doğu sağ, kuzey yukarı (y aşağı büyür).
      const yon = (i: number) =>
        atan2(-(konumlar[i][0] - enlem), (konumlar[i][1] - boylam) * cos(enlem * RAD));
      const sirali = [...uyeler].sort((a, b) => yon(a) - yon(b) || a - b);
      // Yuvalar tepeden başlar: alt ortada yuva kalmaz, altındaki etiketle çakışmaz.
      const yuvalar = Array.from({ length: n }, (_, k) => -PI / 2 + (2 * PI * k) / n);
      const fark = (a: number, b: number) => Math.abs(atan2(sin(a - b), cos(a - b)));
      // Sıralı üyeleri sıralı yuvalara, toplam sapması en az olan kaydırmayla yerleştir.
      let enIyi = 0;
      let enAz = Infinity;
      for (let s = 0; s < n; s++) {
        const t = sirali.reduce((top, u, k) => top + fark(yon(u), yuvalar[(k + s) % n]), 0);
        if (t < enAz) [enAz, enIyi] = [t, s];
      }
      const yuva = new Map(sirali.map((u, k) => [u, yuvalar[(k + enIyi) % n]]));
      return { uyeler, merkez: vektor([enlem, boylam]), yuva };
    });
}

/** Ekranda bir projenin gösterildiği yer: gerçek konum ya da kümenin halkasındaki yuvası. */
type Yer = { x: number; y: number; gx: number; gy: number; gorunur: number; yan: 'sag' | 'sol' | 'ust' | 'alt' };

const AZ_HAREKET = '(prefers-reduced-motion: reduce)';
const azHareketAbone = (f: () => void) => {
  const m = matchMedia(AZ_HAREKET);
  m.addEventListener('change', f);
  return () => m.removeEventListener('change', f);
};

/** CSS renk değeri → cobe'un 0–1 RGB dizisi. Derleyici #ffffff'i #fff'e kısaltabilir. */
const hex = (h: string): [number, number, number] => {
  let s = h.trim().replace('#', '');
  if (s.length === 3) s = [...s].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255) as [number, number, number];
};

function temaRenkleri() {
  const koyu = document.documentElement.dataset.theme === 'dark';
  const st = getComputedStyle(document.documentElement);
  const v = (ad: string) => hex(st.getPropertyValue(`--kure-${ad}`));
  return {
    dark: koyu ? 1 : 0,
    baseColor: v('taban'),
    glowColor: v('parilti'),
    markerColor: v('isaret'),
    mapBrightness: koyu ? 5.5 : 1.4,
    diffuse: koyu ? 1.4 : 1.1,
  };
}

/** Kürenin kenarına yaklaşan işaret yumuşakça kaybolsun. */
const gorunurluk = (fz: number) => min(1, max(0, (fz - 0.08) / 0.22));
const iki = (n: number) => String(n).padStart(2, '0');

export function Kure({ yerler, dil, className = '' }: { yerler: KureYeri[]; dil: Dil; className?: string }) {
  const router = useRouter();
  const kutu = useRef<HTMLDivElement>(null);
  const tuval = useRef<HTMLCanvasElement>(null);
  const kart = useRef<HTMLDivElement>(null);
  const halka = useRef<HTMLSpanElement>(null);
  const cizgi = useRef<SVGLineElement>(null);
  const rota = useRef<SVGPathElement>(null);
  const rotaHale = useRef<SVGPathElement>(null);
  const rotaUc = useRef<SVGCircleElement>(null);
  const rotaGrup = useRef<SVGGElement>(null);
  const isaretler = useRef<(HTMLSpanElement | null)[]>([]);
  const baglar = useRef<(SVGLineElement | null)[]>([]);

  const [aktif, setAktif] = useState(0);
  // Hareket azaltma tercihi: tur kendiliğinden başlamaz, dönüş anlık olur, rota çizilmez.
  const azHareket = useSyncExternalStore(azHareketAbone, () => matchMedia(AZ_HAREKET).matches, () => false);
  const [oynuyorSecim, setOynuyor] = useState<boolean | null>(null);
  const oynuyor = oynuyorSecim ?? !azHareket;
  const [bekle, setBekle] = useState(false); // imleç ya da odak bileşenin içindeyken geçiş bekler
  const [hazir, setHazir] = useState(false);

  // Çizim döngüsünün okuduğu, render tetiklemeyen durum.
  const d = useRef({
    phi: acilar(yerler[0].konum)[0],
    theta: acilar(yerler[0].konum)[1],
    hPhi: acilar(yerler[0].konum)[0],
    hTheta: acilar(yerler[0].konum)[1],
    aktif: 0,
    suruk: null as null | { x: number; phi: number; tasindi: boolean },
    /** Ekrandaki son yerleşim, kutu pikselinde; imleç bunu okur. */
    ekran: [] as Yer[],
    /** Tur bir yerden ötekine geçerken çizilen yay. */
    rota: null as null | { a: V3; b: V3; aci: number; t0: number },
    /** Küre durmuşsa çizimi yeniden başlatır (efekt kurulunca atanır). */
    uyandir: () => {},
  });

  /** Seçimi değiştir. `dondur`: küreyi o konuma çevir (imleçle seçerken çevirmeyiz, işaret kaçar). */
  const sec = (i: number, dondur: boolean) => {
    const onceki = d.current.aktif;
    d.current.aktif = i;
    setAktif(i);
    if (dondur && i !== onceki && !matchMedia(AZ_HAREKET).matches) {
      const aci = aciUzaklik(yerler[onceki].konum, yerler[i].konum);
      // Aynı kümedeki komşuya yay çizilmez; mesafe yok.
      d.current.rota = aci > 3 * RAD ? { a: vektor(yerler[onceki].konum), b: vektor(yerler[i].konum), aci, t0: performance.now() } : null;
    }
    d.current.uyandir();
    if (!dondur) return;
    const [p, t] = hedefAcilar(yerler[i].konum);
    let hedef = p;
    while (hedef - d.current.phi > PI) hedef -= 2 * PI;
    while (d.current.phi - hedef > PI) hedef += 2 * PI;
    d.current.hPhi = hedef;
    d.current.hTheta = t;
  };

  // Otomatik tur.
  useEffect(() => {
    if (!oynuyor || bekle) return;
    const z = setInterval(() => sec((d.current.aktif + 1) % yerler.length, true), SURE);
    return () => clearInterval(z);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sec yalnız ref ve setState kullanır
  }, [oynuyor, bekle, yerler.length]);

  // Küre: cobe tembel yüklenir, ilk boyamayı bekletmez.
  useEffect(() => {
    let globe: { destroy(): void; toggle(b: boolean): void } | undefined;
    let iptal = false;
    const c = tuval.current!;
    const k = kutu.current!;
    let w = k.offsetWidth;
    let renk = temaRenkleri();
    const genis = matchMedia(GENIS);
    const az = matchMedia(AZ_HAREKET);
    let gorunur = true;
    let durgun = 0; // üst üste kaç kare hedefte kaldı
    // Kartın kutuya göre yeri: her karede ölçmek yerine boyut değişince bir kez.
    let kartKutu = { l: 0, t: 0, r: 0, b: 0 };
    const olc = () => {
      w = k.offsetWidth;
      const bb = k.getBoundingClientRect();
      const kb = kart.current!.getBoundingClientRect();
      kartKutu = { l: kb.left - bb.left, t: kb.top - bb.top, r: kb.right - bb.left, b: kb.bottom - bb.top };
    };
    olc();
    const uyandir = () => {
      durgun = 0;
      if (gorunur) globe?.toggle(true);
    };
    d.current.uyandir = uyandir;

    /** Seçili konuma göre hedefi yeniden kur: açılışta anlık, genişlik eşiği değişince yumuşak. */
    const hizala = (anlik: boolean) => {
      const [p, t] = hedefAcilar(yerler[d.current.aktif].konum);
      let hedef = p;
      while (hedef - d.current.phi > PI) hedef -= 2 * PI;
      while (d.current.phi - hedef > PI) hedef += 2 * PI;
      d.current.hPhi = hedef;
      d.current.hTheta = t;
      if (anlik) [d.current.phi, d.current.theta] = [hedef, t];
      uyandir();
    };
    hizala(true);
    const genislikDegisti = () => hizala(false);
    genis.addEventListener('change', genislikDegisti);

    const vektorler = yerler.map((y) => vektor(y.konum));
    const kumeler = kumele(yerler.map((y) => y.konum));
    const kumesi = new Map(kumeler.flatMap((km) => km.uyeler.map((u) => [u, km] as const)));
    // Yalnız değişince DOM'a yaz: konum her karede, yan ve görünürlük nadiren değişir.
    const onceki = yerler.map(() => ({ yan: '', op: -1, gizli: false }));

    /** Bütün projelerin bu karedeki ekran yeri. */
    const yerlestir = (phi: number, theta: number): Yer[] => {
      const yaricap = min(60, max(30, w * 0.085)); // halka, kutu pikseli
      return yerler.map((_, i) => {
        const g = gorus(vektorler[i], phi, theta);
        const gt = tuvale(g.fx, g.fy);
        const [gx, gy] = [gt.x * w, gt.y * w];
        const km = kumesi.get(i);
        if (!km) {
          // Ad küreden dışarı baksın: sol yarıda sola, sağ yarıda sağa.
          const yan = gt.x < 0.5 ? 'sol' : 'sag';
          return { x: gx, y: gy, gx, gy, gorunur: gorunurluk(g.fz), yan };
        }
        const m = gorus(km.merkez, phi, theta);
        const mt = tuvale(m.fx, m.fy);
        const a = km.yuva.get(i)!;
        const [ca, sa] = [cos(a), sin(a)];
        const yan = Math.abs(ca) < 0.3 ? (sa < 0 ? 'ust' : 'alt') : ca > 0 ? 'sag' : 'sol';
        // Küme tek parça görünür ya da kaybolur: merkezin derinliği.
        return { x: mt.x * w + ca * yaricap, y: mt.y * w + sa * yaricap, gx, gy, gorunur: gorunurluk(m.fz), yan };
      });
    };

    // Adların ölçüsü (font yüklenince bir kez; boyut değişince yeniden). Dar ekranda gizli adlar 0.
    let adOlcu: { w: number; h: number }[] = [];
    const adlariOlc = () => {
      adOlcu = isaretler.current.map((el) => {
        const ad = el?.querySelector<HTMLElement>('.kure-ad');
        return { w: ad?.offsetWidth ?? 0, h: ad?.offsetHeight ?? 0 };
      });
    };
    document.fonts?.ready.then(() => {
      adlariOlc();
      uyandir();
    });

    /** Adın kutusu, işaretin çapasına göre (CSS'teki `.kure-ad` yerleşimiyle aynı). */
    const adKutusu = (e: Yer, yan: Yer['yan'], o: { w: number; h: number }) => {
      const b = 6;
      if (yan === 'sag') return [e.x + b, e.y - o.h / 2, e.x + b + o.w, e.y + o.h / 2];
      if (yan === 'sol') return [e.x - b - o.w, e.y - o.h / 2, e.x - b, e.y + o.h / 2];
      if (yan === 'ust') return [e.x - o.w / 2, e.y - b - o.h, e.x + o.w / 2, e.y - b];
      return [e.x - o.w / 2, e.y + b, e.x + o.w / 2, e.y + b + o.h];
    };
    const kesisir = (a: number[], b: number[]) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];

    /**
     * Adlar birbirinin ve başka bir noktanın üstüne binmesin. Sıra: seçili proje, küre halkası, diğerleri.
     * Ad yerine sığmazsa öbür yana geçer, orada da sığmazsa gizlenir (nokta kalır, imleçle ad görünür).
     */
    const adlariYerlestir = (ekran: Yer[], aktifI: number) => {
      const gorunen = ekran.map((e, i) => i).filter((i) => ekran[i].gorunur > 0.3);
      const noktalar = gorunen.map((i) => [ekran[i].x - 6, ekran[i].y - 6, ekran[i].x + 6, ekran[i].y + 6, i]);
      // Masaüstünde kart kürenin bir köşesini örter: oraya düşen ad da yer bulamamış sayılır.
      const yerlesen: number[][] = genis.matches ? [[kartKutu.l, kartKutu.t, kartKutu.r, kartKutu.b]] : [];
      const sira = [...gorunen].sort((a, b) => +(b === aktifI) - +(a === aktifI) || +kumesi.has(b) - +kumesi.has(a) || a - b);
      const sonuc = ekran.map(() => ({ yan: null as Yer['yan'] | null }));
      for (const i of sira) {
        const o = adOlcu[i];
        if (!o || o.w === 0) {
          sonuc[i].yan = ekran[i].yan;
          continue;
        }
        const ters = { sag: 'sol', sol: 'sag', ust: 'alt', alt: 'ust' } as const;
        // Seçili projenin adı her zaman görünür: önce kendi yanı, sığmazsa öbür yan.
        const adaylar = [ekran[i].yan, ters[ekran[i].yan]];
        for (const yan of adaylar) {
          const k = adKutusu(ekran[i], yan, o);
          const engel = yerlesen.some((r) => kesisir(k, r)) || noktalar.some((n) => n[4] !== i && kesisir(k, n));
          if (!engel || (i === aktifI && yan === adaylar[adaylar.length - 1])) {
            sonuc[i].yan = yan;
            yerlesen.push(k);
            break;
          }
        }
      }
      return sonuc;
    };

    /** Rota yayının bu kareye kadar çizilen kısmı; kürenin arkasında kalan parça atlanır. */
    const rotaYolu = (r: NonNullable<typeof d.current.rota>, oran: number, phi: number, theta: number) => {
      const N = 56;
      const yuk = min(0.24, 0.04 + r.aci * 0.11);
      const so = sin(r.aci);
      let yol = '';
      let kalem = false;
      let uc: { x: number; y: number } | null = null;
      for (let s = 0; s <= N * oran; s++) {
        const t = s / N;
        const [ka, kb] = [sin((1 - t) * r.aci) / so, sin(t * r.aci) / so];
        const p: V3 = [ka * r.a[0] + kb * r.b[0], ka * r.a[1] + kb * r.b[1], ka * r.a[2] + kb * r.b[2]];
        const g = gorus(p, phi, theta, 1 + yuk * sin(PI * t));
        const onde = g.fz > 0 || hypot(g.fx, g.fy) > 1;
        if (!onde) {
          kalem = false;
          uc = null;
          continue;
        }
        const e = tuvale(g.fx, g.fy);
        yol += `${kalem ? 'L' : 'M'}${(e.x * w).toFixed(1)} ${(e.y * w).toFixed(1)}`;
        kalem = true;
        uc = { x: e.x * w, y: e.y * w };
      }
      return { yol, uc };
    };

    const ro = new ResizeObserver(() => {
      olc();
      adlariOlc();
      uyandir();
    });
    ro.observe(k);
    ro.observe(kart.current!);
    const mo = new MutationObserver(() => {
      renk = temaRenkleri();
      uyandir();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    import('cobe').then(({ default: createGlobe }) => {
      if (iptal) return;
      const dpr = min(devicePixelRatio || 1, 2);
      globe = createGlobe(c, {
        devicePixelRatio: dpr,
        width: w * dpr,
        height: w * dpr,
        phi: d.current.phi,
        theta: d.current.theta,
        mapSamples: 20000,
        mapBaseBrightness: 0,
        // Gerçek konumlar küçük nokta; kümelerde halkadaki işaretten buraya ince bir çizgi iner.
        markers: yerler.map((y) => ({ location: y.konum, size: 0.03 })),
        ...renk,
        onRender(s) {
          const x = d.current;
          if (!x.suruk) {
            const k = az.matches ? 1 : 0.07;
            x.phi += (x.hPhi - x.phi) * k;
            x.theta += (x.hTheta - x.theta) * k;
          }
          Object.assign(s, renk, { phi: x.phi, theta: x.theta, width: w * dpr, height: w * dpr });

          const ekran = yerlestir(x.phi, x.theta);
          x.ekran = ekran;
          const adlar = adlariYerlestir(ekran, x.aktif);
          ekran.forEach((e, i) => {
            const el = isaretler.current[i];
            if (el) {
              el.style.transform = `translate(${e.x}px, ${e.y}px)`;
              const op = Math.round(e.gorunur * 20) / 20;
              if (op !== onceki[i].op) {
                el.style.opacity = String(op);
                el.style.visibility = op === 0 ? 'hidden' : 'visible';
                onceki[i].op = op;
              }
              const yan = adlar[i].yan ?? e.yan;
              const gizli = adlar[i].yan === null;
              if (yan !== onceki[i].yan) {
                el.dataset.yan = yan;
                onceki[i].yan = yan;
              }
              if (gizli !== onceki[i].gizli) {
                el.toggleAttribute('data-gizli', gizli);
                onceki[i].gizli = gizli;
              }
            }
            const bag = baglar.current[i];
            if (bag) {
              bag.setAttribute('x1', String(e.x));
              bag.setAttribute('y1', String(e.y));
              bag.setAttribute('x2', String(e.gx));
              bag.setAttribute('y2', String(e.gy));
              bag.style.opacity = String(kumesi.has(i) ? e.gorunur * 0.7 : 0);
            }
          });

          // Seçili işaretin halkası ve kartla arasındaki çizgi.
          const p = ekran[x.aktif];
          if (halka.current) {
            halka.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
            halka.current.style.opacity = String(p.gorunur);
          }
          if (cizgi.current) {
            // Kartın işarete en yakın kenar noktası.
            const kx = min(max(p.x, kartKutu.l), kartKutu.r);
            const ky = min(max(p.y, kartKutu.t), kartKutu.b);
            cizgi.current.setAttribute('x1', String(p.x));
            cizgi.current.setAttribute('y1', String(p.y));
            cizgi.current.setAttribute('x2', String(kx));
            cizgi.current.setAttribute('y2', String(ky));
            cizgi.current.style.opacity = String(genis.matches ? p.gorunur : 0);
          }

          // Rota: dönüşle birlikte çizilir, bir süre kalır, söner.
          if (rota.current) {
            const r = x.rota;
            const gecen = r ? performance.now() - r.t0 : Infinity;
            if (r && gecen < ROTA.ciz + ROTA.kal + ROTA.son) {
              const oran = 1 - (1 - min(1, gecen / ROTA.ciz)) ** 3;
              const { yol, uc } = rotaYolu(r, oran, x.phi, x.theta);
              rota.current.setAttribute('d', yol);
              rotaHale.current?.setAttribute('d', yol);
              const op = gecen < ROTA.ciz + ROTA.kal ? 1 : 1 - (gecen - ROTA.ciz - ROTA.kal) / ROTA.son;
              rotaGrup.current?.style.setProperty('opacity', String(op));
              // Mürekkep ucu yalnız çizilirken: kalem nerede, o görünsün.
              if (rotaUc.current) {
                const ciziliyor = uc && gecen < ROTA.ciz;
                if (ciziliyor) rotaUc.current.setAttribute('transform', `translate(${uc.x} ${uc.y})`);
                rotaUc.current.style.visibility = ciziliyor ? 'visible' : 'hidden';
              }
            } else if (r) {
              x.rota = null;
              rota.current.setAttribute('d', '');
              rotaHale.current?.setAttribute('d', '');
              if (rotaUc.current) rotaUc.current.style.visibility = 'hidden';
            }
          }

          // Hedefte birkaç kare kaldıysa çizmeyi bırak: durağan küre GPU'yu ve üstündeki camı boşuna
          // yormasın. Birkaç kare: boyut ve renk değişikliği bir sonraki karede uygulanıyor.
          const hedefte =
            !x.suruk && !x.rota && Math.abs(x.hPhi - x.phi) < 1e-4 && Math.abs(x.hTheta - x.theta) < 1e-4;
          durgun = hedefte ? durgun + 1 : 0;
          if (durgun > 3) globe?.toggle(false);
          return s;
        },
      });
      setHazir(true);
    });

    // Ekran dışındayken çizme.
    const io = new IntersectionObserver(([e]) => {
      gorunur = e.isIntersecting;
      globe?.toggle(gorunur);
    });
    io.observe(k);

    return () => {
      iptal = true;
      genis.removeEventListener('change', genislikDegisti);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      globe?.destroy();
    };
  }, [yerler]);

  // İmleç: sürükle döndür, işarete gelince kartı aç, tıklayınca vakaya git.
  useEffect(() => {
    const c = tuval.current!;
    const yakin = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      const olcek = r.width / (kutu.current?.offsetWidth || r.width);
      let en = -1;
      let enMesafe = 20 ** 2;
      d.current.ekran.forEach((p, i) => {
        if (p.gorunur < 0.5) return;
        const m = (p.x * olcek - (e.clientX - r.left)) ** 2 + (p.y * olcek - (e.clientY - r.top)) ** 2;
        if (m < enMesafe) {
          enMesafe = m;
          en = i;
        }
      });
      return en;
    };
    const bas = (e: PointerEvent) => {
      d.current.suruk = { x: e.clientX, phi: d.current.phi, tasindi: false };
      d.current.uyandir();
      c.setPointerCapture(e.pointerId);
    };
    const hareket = (e: PointerEvent) => {
      const s = d.current.suruk;
      if (s) {
        const dx = e.clientX - s.x;
        if (Math.abs(dx) > 4) s.tasindi = true;
        d.current.phi = d.current.hPhi = s.phi + dx / 180;
        return;
      }
      if (e.pointerType !== 'mouse') return;
      const i = yakin(e);
      c.style.cursor = i >= 0 ? 'pointer' : 'grab';
      if (i >= 0 && i !== d.current.aktif) sec(i, false);
    };
    const birak = (e: PointerEvent) => {
      const s = d.current.suruk;
      d.current.suruk = null;
      if (s && !s.tasindi) {
        const i = yakin(e);
        if (i >= 0 && i === d.current.aktif) router.push(yerler[i].href, { transitionTypes: ['ileri'] });
        else if (i >= 0) sec(i, false);
      }
    };
    c.addEventListener('pointerdown', bas);
    c.addEventListener('pointermove', hareket);
    c.addEventListener('pointerup', birak);
    const iptalEt = () => (d.current.suruk = null);
    c.addEventListener('pointercancel', iptalEt);
    return () => {
      c.removeEventListener('pointerdown', bas);
      c.removeEventListener('pointermove', hareket);
      c.removeEventListener('pointerup', birak);
      c.removeEventListener('pointercancel', iptalEt);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sec yalnız ref ve setState kullanır
  }, [yerler, router]);

  // Sıradaki kareyi boşta önceden indir; geçişte boş kart görünmesin.
  useEffect(() => {
    const s = yerler[(aktif + 1) % yerler.length].gorsel;
    const im = new Image();
    im.srcset = s.srcSet;
    im.sizes = '19rem';
    im.src = s.src;
  }, [aktif, yerler]);

  const y = yerler[aktif];
  const n = yerler.length;
  const elle = (i: number) => {
    setOynuyor(false);
    sec((i + n) % n, true);
  };

  return (
    <div
      className={`relative ${className}`}
      onPointerEnter={() => setBekle(true)}
      onPointerLeave={() => setBekle(false)}
      onFocus={() => setBekle(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setBekle(false)}
    >
      <div ref={kutu} className="relative aspect-square w-full">
        <canvas
          ref={tuval}
          aria-hidden
          className={`size-full cursor-grab touch-pan-y transition-opacity duration-1000 ${hazir ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Rota yayı ve kümelerde halkadan gerçek konuma inen çizgiler. */}
        <svg
          aria-hidden
          className={`pointer-events-none absolute inset-0 size-full overflow-visible transition-opacity duration-1000 ${hazir ? 'opacity-100' : 'opacity-0'}`}
        >
          <g ref={rotaGrup}>
            <path ref={rotaHale} className="kure-rota-hale" fill="none" />
            <path ref={rota} className="kure-rota" fill="none" />
            <circle ref={rotaUc} r={3} className="fill-murekkep" style={{ visibility: 'hidden' }} />
          </g>
          {yerler.map((k, i) => (
            <line
              key={k.slug}
              ref={(el) => {
                baglar.current[i] = el;
              }}
              className="stroke-yazi-3"
              strokeWidth={1}
              style={{ opacity: 0 }}
            />
          ))}
        </svg>
        {/* İşaretler: tıklanabilir; klavye erişimi alttaki düğmelerde. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${hazir ? 'opacity-100' : 'opacity-0'}`}
        >
          {yerler.map((k, i) => (
            <span
              key={k.slug}
              ref={(el) => {
                isaretler.current[i] = el;
              }}
              data-aktif={i === aktif || undefined}
              data-yan="sag"
              className="kure-isaret"
              style={{ opacity: 0, visibility: 'hidden' }}
              onPointerEnter={(e) => e.pointerType === 'mouse' && i !== d.current.aktif && sec(i, false)}
              onClick={() => (i === d.current.aktif ? router.push(k.href, { transitionTypes: ['ileri'] }) : sec(i, false))}
            >
              <span className="kure-nokta" />
              <span className="kure-ad">{k.ad}</span>
            </span>
          ))}
        </div>
        <span
          ref={halka}
          aria-hidden
          className="kure-halka pointer-events-none absolute top-0 left-0 -mt-3 -ml-3 size-6 rounded-full border-2 border-murekkep opacity-0"
        />
      </div>

      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
        <line ref={cizgi} className="stroke-murekkep opacity-0" strokeWidth={1} strokeDasharray="3 4" />
      </svg>

      <div
        ref={kart}
        aria-live={oynuyor && !bekle ? 'off' : 'polite'}
        className="cam-kart relative mt-6 overflow-hidden rounded-lg p-2.5 lg:absolute lg:bottom-[9%] lg:left-0 lg:mt-0 lg:w-[17rem] xl:left-[-7%] xl:w-[19rem]"
      >
        {/* key: kart her seçimde yeniden girsin (yumuşak geçiş CSS'te). */}
        <div key={aktif} className="kure-kart-ic">
          {/* eslint-disable-next-line @next/next/no-img-element -- statik export; varyantları kendimiz üretiyoruz */}
          <img
            src={y.gorsel.src}
            srcSet={y.gorsel.srcSet}
            sizes="(min-width: 64rem) 19rem, 100vw"
            width={y.gorsel.w}
            height={y.gorsel.h}
            alt={y.gorsel.alt}
            decoding="async"
            className="aspect-[16/10] w-full rounded-md object-cover object-top"
            style={{ backgroundColor: y.gorsel.zemin }}
          />
          <div className="px-1.5 pt-3 pb-1">
            <p className="etiket flex items-baseline justify-between gap-3 text-yazi-2">
              <span>{y.alan}</span>
              <span className="shrink-0 text-yazi-3 tabular-nums">
                {iki(aktif + 1)} / {iki(n)}
              </span>
            </p>
            <Link
              href={y.href}
              transitionTypes={['ileri']}
              className="baslik group mt-1 inline-flex items-center gap-1.5 text-lg text-yazi after:absolute after:inset-0"
            >
              {y.ad}
              <ArrowUpRight
                aria-hidden
                className="size-4 text-yazi-3 transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-murekkep"
              />
            </Link>
            <p className="mt-1.5 min-h-[4.2em] text-[0.875rem] leading-snug text-yazi-2 lg:min-h-0">{y.ne}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 lg:absolute lg:right-[4%] lg:bottom-[3%] lg:mt-0 lg:justify-end">
        <p aria-hidden className="etiket hidden text-yazi-3 xl:block">
          {METIN.ipucu[dil]}
        </p>
        <div className="flex items-center gap-1" role="group" aria-label={METIN.secim[dil]}>
          {/* Dar ekranda on çubuk sığmaz: önceki / sayaç / sonraki. */}
          <button
            type="button"
            onClick={() => elle(aktif - 1)}
            aria-label={METIN.onceki[dil]}
            className="grid size-11 place-items-center rounded-sm text-yazi-2 transition-colors hover:text-yazi lg:hidden"
          >
            <ChevronLeft aria-hidden className="size-4" />
          </button>
          <p aria-hidden className="etiket min-w-[4.5rem] text-center text-yazi-2 tabular-nums lg:hidden">
            {iki(aktif + 1)} / {iki(n)}
          </p>
          <button
            type="button"
            onClick={() => elle(aktif + 1)}
            aria-label={METIN.sonraki[dil]}
            className="grid size-11 place-items-center rounded-sm text-yazi-2 transition-colors hover:text-yazi lg:hidden"
          >
            <ChevronRight aria-hidden className="size-4" />
          </button>
          {yerler.map((k, i) => (
            <button
              key={k.slug}
              type="button"
              aria-pressed={i === aktif}
              aria-label={`${k.ad} · ${k.alan}`}
              onClick={() => elle(i)}
              className="group hidden h-8 w-6 place-items-center rounded-sm lg:grid"
            >
              <span
                className={`h-[3px] w-4 rounded-full transition-colors duration-200 ${i === aktif ? 'bg-murekkep' : 'bg-cizgi-guclu group-hover:bg-yazi-3'}`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOynuyor(!oynuyor)}
            aria-label={oynuyor ? METIN.durdur[dil] : METIN.oynat[dil]}
            className="ml-1 grid size-11 place-items-center rounded-sm text-yazi-2 transition-colors hover:text-yazi lg:size-8"
          >
            {oynuyor ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
