import Link from 'next/link';
import { projeBul } from '@/content/projeler';
import { YONTEM } from '@/content/site';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';

/**
 * Yöntem: beş adım tek bir hat üstünde (geniş ekranda yatay, dar ekranda dikey). Sıra gerçek: her
 * adım bir öncekinin çıktısını kullanır. Her adımın altında soyut açıklama değil, ölçülmüş bir örnek.
 * Geniş ekranda bölüm kaydırma boyunca sabitlenir: hat birkaç kaydırma boyunca çizilir, her adım hat ona
 * ulaşınca açılır (globals.css, "Yöntem sahnesi"). Sahne ve CV bölümlerinden farklı bir düzen.
 */
export function Yontem({ dil }: { dil: Dil }) {
  return (
    <section id="method" aria-labelledby="yontem-baslik" className="bolum border-t border-cizgi">
      <div className="yontem-iz">
        <div className="yontem-yapisik kap">
          <h2 id="yontem-baslik" className="gosterge text-[clamp(2.25rem,4.6vw,3.75rem)]">
            {M.yontemBaslik[dil]}
          </h2>
          <ol className="yontem-hat mt-14 grid gap-y-10 lg:mt-20 lg:grid-cols-5 lg:gap-x-8">
            {YONTEM.map((a, i) => {
              const p = a.slug ? projeBul(a.slug) : undefined;
              return (
                <li key={i} className="yontem-adim relative pl-10 lg:pt-10 lg:pl-0" style={{ '--i': i } as React.CSSProperties}>
                  <span className="yontem-isaret" aria-hidden />
                  <span className="okuma text-[0.9375rem] text-murekkep" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="baslik mt-2 text-xl text-yazi lg:text-[1.375rem]">{a.baslik[dil]}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-snug text-yazi-2">
                    {p && a.ornek[dil].startsWith(`${p.ad}:`) ? (
                      <>
                        <Link href={yol.proje(dil, p.slug)} transitionTypes={['ileri']} className="baglanti text-yazi">
                          {p.ad}
                        </Link>
                        {a.ornek[dil].slice(p.ad.length)}
                      </>
                    ) : (
                      a.ornek[dil]
                    )}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
