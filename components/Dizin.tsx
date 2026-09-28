import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { PROJELER } from '@/content/projeler';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { Gorsel } from './Gorsel';

export function Dizin({ dil }: { dil: Dil }) {
  return (
    <section aria-labelledby="dizin-baslik" className="bolum border-t border-cizgi">
      <div className="kap">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <h2 id="dizin-baslik" className="gosterge text-[clamp(2.25rem,4.6vw,3.75rem)]">
            {M.tumProjeler[dil]}
          </h2>
          <p className="etiket text-yazi-2">{M.tumProjelerGiris[dil]}</p>
        </div>
        <ol className="mt-12 border-t border-cizgi-guclu">
          {PROJELER.map((p) => (
            <li key={p.slug} className="border-b border-cizgi">
              <Link
                href={yol.proje(dil, p.slug)}
                className="group grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-6 transition-colors duration-150 hover:bg-[color-mix(in_oklab,var(--zemin-2)_70%,transparent)] focus-visible:outline-offset-0 md:grid-cols-[12rem_1fr_auto] md:items-center lg:grid-cols-[13rem_1fr_13rem_8rem_7.5rem]"
              >
                <span className="baslik text-2xl text-yazi transition-colors duration-150 group-hover:text-murekkep">{p.ad}</span>
                <span className="col-span-2 row-start-2 text-[0.9375rem] leading-snug text-yazi-2 md:col-span-1 md:row-start-auto md:pr-6">
                  {p.baslik[dil]}
                </span>
                <span className="etiket hidden text-yazi-2 lg:block">{p.alan[dil]}</span>
                <span className="etiket col-start-2 row-start-1 self-center text-yazi-3 md:col-start-auto md:row-start-auto">
                  {p.repo.acik ? (
                    <span className="inline-flex items-center gap-1 text-yazi-2">
                      {M.acikKaynak[dil]}
                    </span>
                  ) : (
                    M.ozelRepo[dil]
                  )}
                </span>
                <span className="relative hidden lg:block">
                  <span className="sekil block aspect-[16/10] w-full">
                    <Gorsel
                      proje={p.slug}
                      ad={p.galeri[0].ad}
                      alt=""
                      sizes="120px"
                      className="size-full object-cover object-top opacity-90 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="absolute -top-2 -right-2 size-5 rounded-full bg-zemin p-0.5 text-yazi-3 opacity-0 transition-opacity duration-150 group-hover:text-murekkep group-hover:opacity-100"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
