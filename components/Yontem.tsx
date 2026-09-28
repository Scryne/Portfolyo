import Link from 'next/link';
import { projeBul } from '@/content/projeler';
import { YONTEM } from '@/content/site';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';

export function Yontem({ dil }: { dil: Dil }) {
  return (
    <section id="method" aria-labelledby="yontem-baslik" className="bolum border-t border-cizgi">
      <div className="kap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 id="yontem-baslik" className="gosterge text-[clamp(2.25rem,4.6vw,3.75rem)]">
            {M.yontemBaslik[dil]}
          </h2>
          <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-yazi-2">{M.yontemGiris[dil]}</p>
        </div>
        {/* Sıra gerçek: her adım bir öncekinin çıktısını kullanır. */}
        <ol className="lg:col-span-7 lg:col-start-6">
          {YONTEM.map((a, i) => {
            const p = a.slug ? projeBul(a.slug) : undefined;
            return (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-cizgi py-9 first:border-t-0 first:pt-0 md:grid-cols-[3.5rem_1fr]">
                <span className="okuma pt-1 text-2xl text-murekkep" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="baslik text-2xl text-yazi">{a.baslik[dil]}</h3>
                  <p className="metin mt-3 text-yazi-2">{a.metin[dil]}</p>
                  <p className="mt-4 flex flex-col gap-1 text-[0.9375rem] sm:flex-row sm:gap-3">
                    <span className="etiket shrink-0 pt-0.5 text-yazi-3">{M.ornek[dil]}</span>
                    <span className="text-yazi">
                      {p && a.ornek[dil].startsWith(`${p.ad}:`) ? (
                        <>
                          <Link href={yol.proje(dil, p.slug)} className="baglanti">
                            {p.ad}
                          </Link>
                          {a.ornek[dil].slice(p.ad.length)}
                        </>
                      ) : (
                        a.ornek[dil]
                      )}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
