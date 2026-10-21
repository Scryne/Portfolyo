'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export type SahneProje = {
  slug: string;
  ad: string;
  baslik: string;
  alan: string;
  repo: string;
  href: string;
  olcum: { ne: string; once?: string; sonra: string };
};

type Props = {
  projeler: SahneProje[];
  /** Sahnedeki büyük kareler (masaüstü) ve satır içi kareler (dar ekran); sunucuda çizilir. */
  sahneKareleri: React.ReactNode[];
  satirKareleri: React.ReactNode[];
  baslik: string;
  etiket: { once: string; sonra: string };
};

/** Sabitleme koşulu; globals.css'teki .sahne-iz kuralıyla aynı olmalı. */
const SABIT = '(width >= 64rem) and (height >= 36rem)';

const iki = (i: number) => String(i).padStart(2, '0');

/**
 * Tüm projeler, bir sahne olarak. Geniş ekranda bölüm kaydırma boyunca ekrana sabitlenir: solda liste ve
 * imleç, sağda sahne. Kaydırma ilerledikçe sıradaki projenin gerçek ekranı perdeyle açılır, altında ana
 * ölçümü. Üstüne gelmek ya da klavyeyle odaklanmak da sahneyi değiştirir. Sahne ekran okuyucudan gizli:
 * aynı bilgi satırda yazılı. Dar ekranda sabitleme yok; her proje kendi karesiyle kart olarak gelir.
 */
export function Sahne({ projeler, sahneKareleri, satirKareleri, baslik, etiket }: Props) {
  const n = projeler.length;
  const [aktif, setAktif] = useState(0);
  const [onceki, setOnceki] = useState<number | null>(null);
  const [yon, setYon] = useState<'asagi' | 'yukari'>('asagi');
  const aktifRef = useRef(0);
  const iz = useRef<HTMLDivElement>(null);

  const sec = (i: number) => {
    const eski = aktifRef.current;
    if (i === eski) return;
    aktifRef.current = i;
    setYon(i > eski ? 'asagi' : 'yukari');
    setOnceki(eski);
    setAktif(i);
  };

  /**
   * Klavye odağı: geniş ekranda sayfa o projenin kaydırma dilimine gider. Yoksa odaklanınca tarayıcının
   * yaptığı kaydırma, dilimden hesaplanan projeyi geri getirir ve odak ile sahne ayrışır (ölçüldü).
   */
  const odakla = (i: number) => {
    const el = iz.current;
    if (!el || !matchMedia(SABIT).matches) return sec(i);
    const yapisik = el.firstElementChild as HTMLElement;
    const r = el.getBoundingClientRect();
    const yol = r.height - yapisik.offsetHeight;
    const ust = parseFloat(getComputedStyle(yapisik).top);
    scrollTo({ top: r.top + scrollY - ust + ((i + 0.5) / n) * yol, behavior: 'instant' });
    sec(i);
  };

  useEffect(() => {
    const el = iz.current!;
    const yapisik = el.firstElementChild as HTMLElement;
    const genis = matchMedia(SABIT);
    let kare = 0;
    // Bölümün sabit kaldığı kaydırma yolu n eşit dilime bölünür; hangi dilimdeysek o proje sahnede.
    const olc = () => {
      kare = 0;
      if (!genis.matches) return;
      const r = el.getBoundingClientRect();
      const yol = r.height - yapisik.offsetHeight;
      if (yol <= 0) return;
      const ilerleme = Math.min(1, Math.max(0, (parseFloat(getComputedStyle(yapisik).top) - r.top) / yol));
      sec(Math.min(n - 1, Math.floor(ilerleme * n)));
    };
    const iste = () => {
      if (!kare) kare = requestAnimationFrame(olc);
    };
    olc();
    addEventListener('scroll', iste, { passive: true });
    addEventListener('resize', iste);
    return () => {
      cancelAnimationFrame(kare);
      removeEventListener('scroll', iste);
      removeEventListener('resize', iste);
    };
  }, [n]);

  const p = projeler[aktif];

  return (
    <section id="projeler" aria-labelledby="projeler-baslik" className="bolum border-t border-cizgi">
      <div className="kap">
        <h2 id="projeler-baslik" className="gosterge text-[clamp(2.25rem,4.6vw,3.75rem)]">
          {baslik}
        </h2>
      </div>

      <div ref={iz} className="sahne-iz mt-14 lg:mt-6" style={{ '--n': n } as React.CSSProperties}>
        <div className="sahne-yapisik kap grid gap-x-12 lg:grid-cols-12 lg:items-center">
          <ol className="sahne-liste relative lg:col-span-5">
            <span aria-hidden className="sahne-imlec" style={{ translate: `0 ${aktif * 100}%` }} />
            {projeler.map((x, i) => (
              <li key={x.slug} className="sahne-kayit" style={{ '--i': i } as React.CSSProperties}>
                <Link
                  href={x.href}
                  onMouseEnter={() => sec(i)}
                  onFocus={() => odakla(i)}
                  data-aktif={i === aktif || undefined}
                  className="sahne-satir group block focus-visible:outline-offset-0"
                >
                  <span aria-hidden className="sahne-satir-kare sekil mb-5 block lg:hidden">
                    {satirKareleri[i]}
                  </span>
                  <span className="grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3">
                    <span className="okuma text-[0.9375rem] text-yazi-3 tabular-nums">{iki(i + 1)}</span>
                    <span className="min-w-0">
                      <span className="sahne-ad baslik block text-[1.625rem] lg:text-[1.375rem]">{x.ad}</span>
                      <span className="mt-1 block text-[0.9375rem] leading-snug text-yazi-2 lg:sr-only">{x.baslik}</span>
                      <span className="okuma mt-3 block text-[0.9375rem] lg:sr-only">
                        <span className="text-yazi-2">{x.olcum.ne}: </span>
                        {x.olcum.once && (
                          <>
                            <span className="sr-only">{etiket.once}: </span>
                            <del className="text-yazi-3 decoration-kalem decoration-2">{x.olcum.once}</del>{' '}
                          </>
                        )}
                        <span className="sr-only">{etiket.sonra}: </span>
                        <span className="text-murekkep">{x.olcum.sonra}</span>
                      </span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="etiket hidden whitespace-nowrap text-yazi-3 sm:inline">{x.repo}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 text-yazi-3 transition-[opacity,color,translate] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-murekkep lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Sahne: yalnız geniş ekranda. Tıklanınca sahnedeki projeye gider; klavye satırları kullanır. */}
          <div aria-hidden className="sahne hidden lg:col-span-7 lg:block">
            <p className="etiket flex justify-between gap-6 text-yazi-3">
              <span key={p.slug} className="sahne-metin text-yazi-2">
                {p.alan}
              </span>
              <span className="tabular-nums">
                <span className="text-murekkep">{iki(aktif + 1)}</span> / {iki(n)}
              </span>
            </p>
            <Link href={p.href} tabIndex={-1} className="sahne-cerceve sekil group relative mt-4 block">
              {sahneKareleri.map((k, i) => (
                <span
                  key={projeler[i].slug}
                  className="sahne-kare"
                  data-durum={i === aktif ? 'aktif' : i === onceki ? 'onceki' : undefined}
                  data-yon={yon}
                >
                  {k}
                </span>
              ))}
            </Link>
            {/* Ölçüm uzun metin olabilir (PolitikDesk: "2.701 test, 0 hata, ~50 sn"): kırılır, sütunu ezmez. */}
            <div key={p.slug} className="sahne-metin mt-5 min-h-[7.5rem]">
              <p className="baslik text-xl leading-snug text-balance text-yazi">{p.baslik}</p>
              <p className="mt-4 flex items-baseline justify-between gap-x-6 gap-y-1 border-t border-cizgi pt-3">
                <span className="etiket text-yazi-3">{p.olcum.ne}</span>
                <span className="okuma text-right text-xl leading-tight text-balance">
                  {p.olcum.once && <del className="text-yazi-3 decoration-kalem decoration-2">{p.olcum.once}</del>}{' '}
                  <span className="text-murekkep">{p.olcum.sonra}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
