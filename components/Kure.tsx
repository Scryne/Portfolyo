'use client';

import { ArrowUpRight, Pause, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { Dil } from '@/lib/tipler';

export type KureYeri = {
  slug: string;
  ad: string;
  yer: string;
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
};

const SURE = 5000;
/** Seçili konuma dönerken enlemin ne kadarı kadar eğilsin; tam eğim küreyi fazla devirir. */
const EGIM = 0.6;
const { PI, sin, cos } = Math;

/** Konumu kürenin ortasına getiren açılar (cobe'un phi/theta'sı). */
const acilar = ([enlem, boylam]: [number, number]) =>
  [PI - ((boylam * PI) / 180 - PI / 2), ((enlem * PI) / 180) * EGIM] as const;

/**
 * Konumun kürenin tuvalindeki yeri, 0–1. cobe'un gölgelendiricisindeki dönüşümün tersi:
 * dünya noktası P, görüş yönü f = L(theta, phi) · P; küre yarıçapı tuvalin 0,8'i.
 */
function izdusum([enlem, boylam]: [number, number], phi: number, theta: number) {
  const a = (enlem * PI) / 180;
  const o = (boylam * PI) / 180 - PI;
  const px = -cos(a) * cos(o);
  const py = sin(a);
  const pz = cos(a) * sin(o);
  const [cp, sp, ct, st] = [cos(phi), sin(phi), cos(theta), sin(theta)];
  const fx = cp * px + sp * pz;
  const fy = sp * st * px + ct * py - cp * st * pz;
  const fz = -sp * ct * px + st * py + cp * ct * pz;
  return { x: (fx * 0.8 + 1) / 2, y: (1 - fy * 0.8) / 2, onde: fz > 0.08 };
}

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

export function Kure({ yerler, dil, className = '' }: { yerler: KureYeri[]; dil: Dil; className?: string }) {
  const router = useRouter();
  const kutu = useRef<HTMLDivElement>(null);
  const tuval = useRef<HTMLCanvasElement>(null);
  const kart = useRef<HTMLDivElement>(null);
  const halka = useRef<HTMLSpanElement>(null);
  const cizgi = useRef<SVGLineElement>(null);

  const [aktif, setAktif] = useState(0);
  // Hareket azaltma tercihi: tur kendiliğinden başlamaz, dönüş anlık olur.
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
    /** Küre durmuşsa çizimi yeniden başlatır (efekt kurulunca atanır). */
    uyandir: () => {},
  });

  /** Seçimi değiştir. `dondur`: küreyi o konuma çevir (imleçle seçerken çevirmeyiz, işaret kaçar). */
  const sec = (i: number, dondur: boolean) => {
    d.current.aktif = i;
    setAktif(i);
    d.current.uyandir();
    if (!dondur) return;
    const [p, t] = acilar(yerler[i].konum);
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
    const genis = matchMedia('(min-width: 64rem)');
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

    const ro = new ResizeObserver(() => {
      olc();
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
      const dpr = Math.min(devicePixelRatio || 1, 2);
      globe = createGlobe(c, {
        devicePixelRatio: dpr,
        width: w * dpr,
        height: w * dpr,
        phi: d.current.phi,
        theta: d.current.theta,
        mapSamples: 20000,
        mapBaseBrightness: 0,
        markers: yerler.map((y) => ({ location: y.konum, size: 0.06 })),
        ...renk,
        onRender(s) {
          const x = d.current;
          if (!x.suruk) {
            const k = az.matches ? 1 : 0.07;
            x.phi += (x.hPhi - x.phi) * k;
            x.theta += (x.hTheta - x.theta) * k;
          }
          Object.assign(s, renk, { phi: x.phi, theta: x.theta, width: w * dpr, height: w * dpr });
          // Seçili işaretin halkası ve kartla arasındaki çizgi.
          const p = izdusum(yerler[x.aktif].konum, x.phi, x.theta);
          const hx = p.x * w;
          const hy = p.y * w;
          if (halka.current) {
            halka.current.style.transform = `translate(${hx}px, ${hy}px)`;
            halka.current.style.opacity = p.onde ? '1' : '0';
          }
          if (cizgi.current) {
            // Kartın işarete en yakın kenar noktası.
            const kx = Math.min(Math.max(hx, kartKutu.l), kartKutu.r);
            const ky = Math.min(Math.max(hy, kartKutu.t), kartKutu.b);
            cizgi.current.setAttribute('x1', String(hx));
            cizgi.current.setAttribute('y1', String(hy));
            cizgi.current.setAttribute('x2', String(kx));
            cizgi.current.setAttribute('y2', String(ky));
            cizgi.current.style.opacity = p.onde && genis.matches ? '1' : '0';
          }
          // Hedefte birkaç kare kaldıysa çizmeyi bırak: durağan küre GPU'yu ve üstündeki camı boşuna
          // yormasın. Birkaç kare: boyut ve renk değişikliği bir sonraki karede uygulanıyor.
          const hedefte = !x.suruk && Math.abs(x.hPhi - x.phi) < 1e-4 && Math.abs(x.hTheta - x.theta) < 1e-4;
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
      let en = -1;
      let enMesafe = 20 ** 2;
      yerler.forEach((y, i) => {
        const p = izdusum(y.konum, d.current.phi, d.current.theta);
        if (!p.onde) return;
        const m = (p.x * r.width - (e.clientX - r.left)) ** 2 + (p.y * r.height - (e.clientY - r.top)) ** 2;
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
        if (i >= 0 && i === d.current.aktif) router.push(yerler[i].href);
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
        className="cam-kart relative mt-6 overflow-hidden rounded-lg p-2.5 lg:absolute lg:bottom-[9%] lg:left-[-7%] lg:mt-0 lg:w-[19rem]"
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
            <p className="etiket text-yazi-2">{y.yer}</p>
            <Link
              href={y.href}
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
        <p aria-hidden className="etiket hidden text-yazi-3 lg:block">
          {METIN.ipucu[dil]}
        </p>
        <div className="flex items-center gap-1" role="group" aria-label={METIN.secim[dil]}>
          {yerler.map((k, i) => (
            <button
              key={`${k.slug}-${i}`}
              type="button"
              aria-pressed={i === aktif}
              aria-label={`${k.ad} · ${k.yer}`}
              onClick={() => {
                setOynuyor(false);
                sec(i, true);
              }}
              className="group grid h-11 w-9 place-items-center rounded-sm lg:h-8 lg:w-7"
            >
              <span
                className={`h-[3px] w-5 rounded-full transition-colors duration-200 ${i === aktif ? 'bg-murekkep' : 'bg-cizgi-guclu group-hover:bg-yazi-3'}`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOynuyor(!oynuyor)}
            aria-label={oynuyor ? METIN.durdur[dil] : METIN.oynat[dil]}
            className="ml-1 grid size-11 place-items-center lg:size-8 rounded-sm text-yazi-2 transition-colors hover:text-yazi"
          >
            {oynuyor ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
