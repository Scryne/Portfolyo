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

function Kunye({ p, dil, adBoyu = 'text-[clamp(2.125rem,5.5vw,4.5rem)]' }: { p: Proje; dil: Dil; adBoyu?: string }) {
  return (
    <>
      <p className="etiket text-yazi-2">{p.alan[dil]}</p>
      <h3 className={`gosterge mt-3 ${adBoyu}`}>
        <Link href={yol.proje(dil, p.slug)} className="transition-colors duration-150 hover:text-murekkep">
          {p.ad}
        </Link>
      </h3>
    </>
  );
}

export function Sergi({ dil }: { dil: Dil }) {
  const [a, b, c] = SERGI.map((s) => {
    const p = projeBul(s.slug);
    if (!p) throw new Error(`Sergide bilinmeyen proje: ${s.slug}`);
    const aciklama = (ad: string) => p.galeri.find((k) => k.ad === ad)?.aciklama[dil] ?? p.ad;
    return { ...s, p, aciklama };
  });

  return (
    <section id="work" aria-labelledby="sergi-baslik" className="bolum">
      <div className="kap">
        <h2 id="sergi-baslik" className="gosterge text-[clamp(2.25rem,4.6vw,3.75rem)]">
          {M.seciliIsler[dil]}
        </h2>

        {/* A: tam genişlik şekil, altında 5/7 künye. */}
        <article className="mt-16 grid gap-x-10 gap-y-8 lg:mt-24 lg:grid-cols-12">
          <figure className="sekil lg:col-span-12">
            <Gorsel proje={a.p.slug} ad={a.kare} alt={a.aciklama(a.kare)} sizes="(min-width: 1360px) 1280px, 100vw" className="h-auto w-full" />
          </figure>
          <div className="lg:col-span-5">
            <Kunye p={a.p} dil={dil} />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-7">
            <p className="baslik text-xl text-yazi md:text-2xl">{a.p.baslik[dil]}</p>
            <p className="metin text-yazi-2">{a.p.tekCumle[dil]}</p>
            <OnceSonra p={a.p} dil={dil} />
            <VakaBaglantisi p={a.p} dil={dil} />
          </div>
        </article>

        {/* B: metin solda, iki şekil sağda; ikincisi birincinin köşesine biner. */}
        <article className="mt-28 grid gap-x-12 gap-y-10 lg:mt-40 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5 lg:pt-6">
            <Kunye p={b.p} dil={dil} adBoyu="text-[clamp(2.125rem,3.9vw,3.5rem)]" />
            <p className="baslik text-xl text-yazi">{b.p.baslik[dil]}</p>
            <p className="text-yazi-2">{b.p.tekCumle[dil]}</p>
            <OnceSonra p={b.p} dil={dil} />
            <VakaBaglantisi p={b.p} dil={dil} />
          </div>
          <div className="relative lg:col-span-7 lg:pb-44">
            <figure className="sekil">
              <Gorsel proje={b.p.slug} ad={b.kare} alt={b.aciklama(b.kare)} sizes="(min-width: 1024px) 60vw, 100vw" className="h-auto w-full" />
            </figure>
            {b.ikinci && (
              <figure className="sekil mt-6 shadow-[var(--golge)] lg:absolute lg:-right-4 lg:bottom-0 lg:mt-0 lg:w-[56%] xl:-right-8">
                <Gorsel proje={b.p.slug} ad={b.ikinci} alt={b.aciklama(b.ikinci)} sizes="(min-width: 1024px) 36vw, 100vw" className="h-auto w-full" />
                <figcaption className="etiket border-t border-cizgi px-4 py-3 text-yazi-2">{b.aciklama(b.ikinci)}</figcaption>
              </figure>
            )}
          </div>
        </article>

        {/* C: masaüstü + telefon yan yana, künye üstte geniş satır. */}
        <article className="mt-28 lg:mt-40">
          <div className="grid gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <Kunye p={c.p} dil={dil} />
            </div>
            <p className="baslik text-xl text-yazi md:text-2xl lg:col-span-7">{c.p.baslik[dil]}</p>
          </div>
          <div className="mt-10 grid grid-cols-[1fr_28%] items-start gap-4 sm:gap-6 lg:grid-cols-12">
            <figure className="sekil lg:col-span-9">
              <Gorsel proje={c.p.slug} ad={c.kare} alt={c.aciklama(c.kare)} sizes="(min-width: 1024px) 70vw, 72vw" className="h-auto w-full" />
            </figure>
            {c.ikinci && (
              <figure className="sekil lg:col-span-3">
                <Gorsel proje={c.p.slug} ad={c.ikinci} alt={c.aciklama(c.ikinci)} sizes="(min-width: 1024px) 22vw, 28vw" className="h-auto w-full" />
              </figure>
            )}
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-6 lg:grid-cols-12">
            <p className="metin text-yazi-2 lg:col-span-6">{c.p.tekCumle[dil]}</p>
            <div className="flex flex-col gap-5 lg:col-span-5 lg:col-start-8">
              <OnceSonra p={c.p} dil={dil} />
              <VakaBaglantisi p={c.p} dil={dil} />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
