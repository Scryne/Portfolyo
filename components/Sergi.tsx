import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { projeBul } from '@/content/projeler';
import { SERGI } from '@/content/site';
import { M, yol } from '@/lib/metin';
import { oneCikanOlcum } from '@/lib/olcum';
import type { Dil, Proje } from '@/lib/tipler';
import { Gorsel } from './Gorsel';

function OnceSonra({ p, dil }: { p: Proje; dil: Dil }) {
  const o = oneCikanOlcum(p, dil);
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-cizgi pt-4">
      <span className="text-[0.9375rem] text-yazi-2">{o.ne[dil]}</span>
      <span className="okuma ml-auto text-xl">
        {o.once && (
          <>
            <span className="sr-only">{M.once[dil]}: </span>
            <del className="text-yazi-3 decoration-kalem decoration-2">{o.once[dil]}</del>{' '}
          </>
        )}
        <span className="sr-only">{M.sonra[dil]}: </span>
        <span className="text-murekkep">{o.sonra[dil]}</span>
      </span>
    </p>
  );
}

function VakaBaglantisi({ p, dil }: { p: Proje; dil: Dil }) {
  return (
    <Link
      href={yol.proje(dil, p.slug)}
      className="group inline-flex items-center gap-2 font-semibold text-murekkep"
      aria-label={`${M.vakaOku[dil]}: ${p.ad}`}
    >
      {M.vakaOku[dil]}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

/**
 * Seçilmiş işler: üç proje, üst üste binen kartlar. Geniş ekranda her kart ekran boyunda ve yapışık; sonraki
 * kart kaydırmayla öncekinin üstüne biner, alttaki geri çekilir (globals.css, "Kart yığını"). Kart bir dosya
 * sayfası gibi: solda künye ve ölçüm, sağda gerçek ekran; ikinci kare (yakın plan ya da telefon) köşeye biner.
 * Dar ekranda yığın yok: kartlar alt alta, görsel üstte.
 */
export function Sergi({ dil }: { dil: Dil }) {
  const isler = SERGI.map((s) => {
    const p = projeBul(s.slug);
    if (!p) throw new Error(`Sergide bilinmeyen proje: ${s.slug}`);
    const aciklama = (ad: string) => p.galeri.find((k) => k.ad === ad)?.aciklama[dil] ?? p.ad;
    const mobil = s.ikinci ? Boolean(p.galeri.find((k) => k.ad === s.ikinci)?.mobil) : false;
    return { ...s, p, aciklama, mobil };
  });

  return (
    <section id="work" aria-labelledby="sergi-baslik" className="bolum">
      <div className="kap">
        <h2 id="sergi-baslik" className="gosterge text-[clamp(2.25rem,4.6vw,3.75rem)]">
          {M.seciliIsler[dil]}
        </h2>

        <ol className="kart-yigin mt-14 flex flex-col gap-8 lg:mt-20">
          {isler.map(({ p, kare, ikinci, aciklama, mobil }, i) => (
            <li key={p.slug} className="kart" style={{ '--i': i } as React.CSSProperties}>
              <article className="kart-ic grid overflow-clip rounded-lg border border-cizgi bg-zemin-3 shadow-[var(--golge)] lg:h-full lg:grid-cols-12">
                {/* Görsel önce gelir (dar ekranda üstte); geniş ekranda sağ sütun. */}
                <div className="kart-gorsel relative aspect-[1.6] overflow-clip border-b border-cizgi bg-zemin-2 lg:order-2 lg:col-span-7 lg:aspect-auto lg:border-b-0 lg:border-l">
                  <Gorsel
                    proje={p.slug}
                    ad={kare}
                    alt={aciklama(kare)}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="kart-ana absolute inset-0 size-full object-cover object-left-top"
                  />
                  {ikinci &&
                    (mobil ? (
                      <Gorsel
                        proje={p.slug}
                        ad={ikinci}
                        alt={aciklama(ikinci)}
                        sizes="(min-width: 1024px) 14vw, 26vw"
                        className="kart-ikinci absolute right-[6%] bottom-[7%] h-[80%] w-auto rounded-[1.5rem] border-[5px] border-zemin-3 shadow-[var(--golge)] ring-1 ring-cizgi-guclu"
                      />
                    ) : (
                      <Gorsel
                        proje={p.slug}
                        ad={ikinci}
                        alt={aciklama(ikinci)}
                        sizes="(min-width: 1024px) 26vw, 46vw"
                        className="kart-ikinci absolute right-[4%] bottom-[6%] h-auto w-[46%] rounded-md border border-cizgi-guclu shadow-[var(--golge)]"
                      />
                    ))}
                </div>

                <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:order-1 lg:col-span-5 xl:p-10">
                  <div>
                    <p className="etiket flex justify-between gap-4 text-yazi-2">
                      <span>{p.alan[dil]}</span>
                      <span className="text-yazi-3 tabular-nums" aria-hidden>
                        {String(i + 1).padStart(2, '0')} / {String(isler.length).padStart(2, '0')}
                      </span>
                    </p>
                    <h3 className="gosterge mt-6 text-[clamp(2.25rem,9vw,3.5rem)] lg:text-[clamp(2rem,2.9vw,3.25rem)]">
                      <Link href={yol.proje(dil, p.slug)} className="transition-colors duration-150 hover:text-murekkep">
                        {p.ad}
                      </Link>
                    </h3>
                    <p className="baslik mt-4 text-xl text-balance text-yazi">{p.baslik[dil]}</p>
                    <p className="mt-4 text-yazi-2">{p.tekCumle[dil]}</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <OnceSonra p={p} dil={dil} />
                    <VakaBaglantisi p={p} dil={dil} />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
