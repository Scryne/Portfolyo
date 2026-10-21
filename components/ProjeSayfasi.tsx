import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { sonraki } from '@/content/projeler';
import { BOLUM_BASLIK, M, yol } from '@/lib/metin';
import type { Blok, Dil, Proje } from '@/lib/tipler';
import { Cetvel } from './Cetvel';
import { Galeri, type GaleriKaresi } from './Galeri';
import { Gorsel, gorselKaydi, gorselYolu } from './Gorsel';
import { Satir } from './Satir';

function Bloklar({ bloklar, dil }: { bloklar: Blok[]; dil: Dil }) {
  return (
    <div className="flex flex-col gap-5">
      {bloklar.map((b, i) => {
        if (b.tur === 'p') {
          return (
            <p key={i} className="metin">
              <Satir metin={b.metin[dil]} />
            </p>
          );
        }
        const Etiket = b.tur === 'sirali' ? 'ol' : 'ul';
        return (
          <Etiket key={i} className="metin flex flex-col gap-4">
            {b.ogeler[dil].map((o, j) => (
              <li key={j} className="grid grid-cols-[1.75rem_1fr] text-yazi-2">
                {b.tur === 'sirali' ? (
                  <span className="okuma pt-[0.3em] text-[0.9375rem] text-murekkep" aria-hidden>
                    {j + 1}
                  </span>
                ) : (
                  // Tik işareti: cetveldeki gibi.
                  <span className="mt-[0.8em] h-px w-3 bg-yazi-3" aria-hidden />
                )}
                <span>
                  <Satir metin={o} />
                </span>
              </li>
            ))}
          </Etiket>
        );
      })}
    </div>
  );
}

function Bolum({ id, baslik, children }: { id: string; baslik: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-b`} className="scroll-mt-28 border-t border-cizgi pt-10">
      <h2 id={`${id}-b`} className="baslik mb-6 text-[1.75rem] text-yazi md:text-[2rem]">
        {baslik}
      </h2>
      {children}
    </section>
  );
}

export function ProjeSayfasi({ p, dil }: { p: Proje; dil: Dil }) {
  const kapak = p.galeri[0];
  const s = sonraki(p.slug);

  // Ölçümler "Ne yapıyor"dan sonra gelir; o bölüm yoksa ilk bölümden sonra.
  const olcumSonrasi = p.bolumler.some((b) => b.id === 'ne-yapiyor') ? 'ne-yapiyor' : p.bolumler[0].id;
  const icindekiler = [
    ...p.bolumler.flatMap((b) => {
      const satir = { id: b.id, ad: (b.baslik ?? BOLUM_BASLIK[b.id])[dil] };
      return b.id === olcumSonrasi ? [satir, { id: 'olcumler', ad: M.olcumler[dil] }] : [satir];
    }),
    { id: 'sinirlar', ad: M.sinirlar[dil] },
    { id: 'teknoloji', ad: M.stack[dil] },
    { id: 'ekranlar', ad: M.ekranlar[dil] },
  ];

  const kareler: GaleriKaresi[] = p.galeri.map((k) => {
    const m = gorselKaydi(p.slug, k.ad);
    return {
      ad: k.ad,
      aciklama: k.aciklama[dil],
      mobil: Boolean(k.mobil),
      w: m.w,
      h: m.h,
      zemin: m.zemin,
      srcSet: m.genislikler.map((g) => `${gorselYolu(p.slug, k.ad, g)} ${g}w`).join(', '),
      src: gorselYolu(p.slug, k.ad, m.genislikler[0]),
      buyuk: gorselYolu(p.slug, k.ad, m.genislikler.at(-1)!),
    };
  });

  return (
    <article>
      <header className="izgara border-b border-cizgi">
        <div className="kap pt-28 pb-14 md:pt-32 lg:pb-20">
          <Link href={`${yol.ana(dil)}#work`} className="group etiket inline-flex items-center gap-2 text-yazi-2 hover:text-yazi">
            <ArrowLeft aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {M.geri[dil]}
          </Link>
          <p className="etiket mt-10 text-yazi-2">{p.alan[dil]}</p>
          <h1 className="gosterge mt-4 text-[clamp(2.25rem,9vw,7.5rem)]">{p.ad}</h1>
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <p className="baslik max-w-[30ch] text-[clamp(1.375rem,2.4vw,1.875rem)] text-yazi-2 lg:col-span-6">{p.baslik[dil]}</p>
            <dl className="grid content-start gap-x-6 gap-y-4 border-t border-cizgi-guclu pt-5 sm:grid-cols-[7rem_1fr] lg:col-span-5 lg:col-start-8">
              <dt className="etiket pt-0.5 text-yazi-3">{M.donem[dil]}</dt>
              <dd className="text-[0.9375rem] text-yazi">{p.donem[dil]}</dd>
              <dt className="etiket pt-0.5 text-yazi-3">{M.durum[dil]}</dt>
              <dd className="text-[0.9375rem] text-yazi">{p.durum[dil]}</dd>
              <dt className="etiket pt-0.5 text-yazi-3">{M.repo[dil]}</dt>
              <dd className="text-[0.9375rem] text-yazi">
                {p.repo.acik ? (
                  <a href={p.repo.url} className="baglanti inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                    {p.repo.url.replace('https://', '')}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                ) : (
                  M.ozelRepo[dil]
                )}
              </dd>
              <dt className="etiket pt-0.5 text-yazi-3">{M.demo[dil]}</dt>
              <dd className="text-[0.9375rem] text-yazi">{p.demo[dil]}</dd>
            </dl>
          </div>
        </div>
      </header>

      <div className="kap pt-10 md:pt-14">
        <figure className="sekil">
          <Gorsel proje={p.slug} ad={kapak.ad} alt={kapak.aciklama[dil]} sizes="(min-width: 1360px) 1280px, 100vw" oncelik className="h-auto w-full" />
        </figure>
      </div>

      <div className="kap bolum grid gap-12 lg:grid-cols-12 lg:gap-10">
        <nav aria-label={M.icindekiler[dil]} className="hidden lg:sticky lg:top-28 lg:col-span-3 lg:block lg:self-start">
          <p className="etiket text-yazi-3">{M.icindekiler[dil]}</p>
          <ul className="mt-4 flex flex-col border-l border-cizgi">
            {icindekiler.map((b) => (
              <li key={b.id}>
                <a href={`#${b.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[0.9375rem] text-yazi-2 transition-colors duration-150 hover:border-murekkep hover:text-yazi">
                  {b.ad}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-14 lg:col-span-8 lg:col-start-5">
          <p className="baslik text-[clamp(1.375rem,2.2vw,1.75rem)] leading-snug text-yazi [font-variation-settings:'wdth'_100] font-normal">
            <Satir metin={p.tekCumle[dil]} />
          </p>

          {p.bolumler.map((b) => (
            <div key={b.id} className="contents">
              <Bolum id={b.id} baslik={(b.baslik ?? BOLUM_BASLIK[b.id])[dil]}>
                <div className="text-yazi-2 [&_p]:text-yazi-2">
                  <Bloklar bloklar={b.bloklar} dil={dil} />
                </div>
              </Bolum>
              {b.id === olcumSonrasi && (
                <Bolum id="olcumler" baslik={M.olcumler[dil]}>
                  <p className="metin mb-4 text-[0.9375rem] text-yazi-2">{M.olcumlerGiris[dil]}</p>
                  <div className="border-b border-cizgi">
                    {p.olcumler.map((o, i) => (
                      <Cetvel key={i} o={o} dil={dil} />
                    ))}
                  </div>
                </Bolum>
              )}
            </div>
          ))}

          <Bolum id="sinirlar" baslik={M.sinirlar[dil]}>
            <Bloklar bloklar={[{ tur: 'liste', ogeler: p.sinirlar }]} dil={dil} />
          </Bolum>

          <Bolum id="teknoloji" baslik={M.stack[dil]}>
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-[9rem_1fr]">
              {p.stack.map((s) => (
                <div key={s.grup.en} className="contents">
                  <dt className="etiket pt-1 text-yazi-3">{s.grup[dil]}</dt>
                  <dd className="text-yazi">{s.ogeler}</dd>
                </div>
              ))}
              {p.olcek.map((o) => (
                <div key={o.ad.en} className="contents">
                  <dt className="etiket pt-1 text-yazi-3">{o.ad[dil]}</dt>
                  <dd className="okuma text-[0.9375rem] leading-relaxed text-yazi">{o.deger[dil]}</dd>
                </div>
              ))}
            </dl>
          </Bolum>
        </div>
      </div>

      <section id="ekranlar" aria-labelledby="ekranlar-b" className="kap scroll-mt-28 pb-24 lg:pb-32">
        <h2 id="ekranlar-b" className="gosterge mb-10 text-[clamp(2rem,4vw,3rem)]">
          {M.ekranlar[dil]}
        </h2>
        <Galeri kareler={kareler} dil={dil} projeAdi={p.ad} />
      </section>

      <nav aria-label={M.sonrakiProje[dil]} className="border-t border-cizgi bg-zemin-2">
        <Link href={yol.proje(dil, s.slug)} className="group kap flex items-end justify-between gap-6 py-16 lg:py-24">
          <span>
            <span className="etiket text-yazi-3">{M.sonrakiProje[dil]}</span>
            <span className="gosterge mt-3 block text-[clamp(2.125rem,7vw,5.5rem)] transition-colors duration-150 group-hover:text-murekkep">
              {s.ad}
            </span>
            <span className="mt-3 block max-w-[48ch] text-yazi-2">{s.baslik[dil]}</span>
          </span>
          <ArrowRight aria-hidden className="mb-4 size-8 shrink-0 text-yazi-3 transition-[color,translate] duration-200 group-hover:translate-x-1 group-hover:text-murekkep" />
        </Link>
      </nav>
    </article>
  );
}
