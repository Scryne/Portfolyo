import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { projeBul } from '@/content/projeler';
import { DEFTER, DEFTER_METNI } from '@/content/site';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { OkumaDegeri } from './OkumaDegeri';

// Elle çekilmiş gibi duran üç kalem izi; satırlar sırayla birini kullanır.
const IZLER = ['M2 12.5 C 24 10.2, 58 11.8, 98 7.6', 'M2 9 C 30 11.5, 66 8.2, 98 10.8', 'M2 13.4 C 36 12, 62 9.6, 98 8.8'];

/** Üstü kırmızı kalemle çizilecek değer. Çizgi bir SVG; metin <del> olarak okunur. */
export function KalemliDeger({ deger, sira, dil, className = '' }: { deger: string; sira: number; dil: Dil; className?: string }) {
  return (
    <span className={`relative inline-block text-yazi-3 ${className}`}>
      <span className="sr-only">{M.once[dil]}: </span>
      <del className="no-underline">{deger}</del>
      <svg
        className="kalem-cizgi pointer-events-none absolute inset-x-[-6%] top-[8%] h-[84%] w-[112%] overflow-visible"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden
        style={{ '--sira': sira } as React.CSSProperties}
      >
        <path
          d={IZLER[sira % IZLER.length]}
          pathLength={1}
          fill="none"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Defter({ dil }: { dil: Dil }) {
  return (
    <section aria-labelledby="defter-baslik">
      <div className="grid gap-4 border-b border-cizgi-guclu pb-5 lg:grid-cols-12 lg:items-end">
        <h2 id="defter-baslik" className="baslik text-xl text-yazi lg:col-span-4">
          {DEFTER_METNI.baslik[dil]}
        </h2>
        <p className="text-[0.9375rem] leading-relaxed text-yazi-2 lg:col-span-8 lg:max-w-[62ch] lg:justify-self-end lg:text-right">
          {DEFTER_METNI.aciklama[dil]}
        </p>
      </div>
      <ol>
        {DEFTER.map((s, i) => {
          const p = projeBul(s.slug);
          if (!p) throw new Error(`Defterde bilinmeyen proje: ${s.slug}`);
          return (
            <li key={s.slug} className="border-b border-cizgi">
              <Link
                href={yol.proje(dil, s.slug)}
                transitionTypes={['ileri']}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-5 transition-colors duration-150 hover:bg-[color-mix(in_oklab,var(--zemin-2)_70%,transparent)] focus-visible:outline-offset-0 md:grid-cols-[11rem_1fr_auto_2rem] md:py-6 lg:grid-cols-[13rem_1fr_auto_2.5rem]"
              >
                <span className="baslik text-lg text-yazi md:text-xl">{p.ad}</span>
                <span className="col-span-2 row-start-2 leading-snug text-yazi-2 md:col-span-1 md:row-start-auto">
                  {s.ne[dil]}
                </span>
                <span className="okuma col-span-2 flex items-baseline gap-4 text-[clamp(1.75rem,4.2vw,3.25rem)] md:col-span-1 md:justify-end md:gap-5">
                  <KalemliDeger deger={s.once[dil]} sira={i} dil={dil} />
                  <span className="kalem-sonra text-murekkep" style={{ '--sira': i } as React.CSSProperties}>
                    <span className="sr-only">{M.sonra[dil]}: </span>
                    <OkumaDegeri deger={s.sonra[dil]} />
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="col-start-2 row-start-1 size-5 justify-self-end text-yazi-3 transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-murekkep md:col-start-auto md:row-start-auto"
                />
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
