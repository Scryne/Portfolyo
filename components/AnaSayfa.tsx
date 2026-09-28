import { ArrowDown } from 'lucide-react';
import { DEFTER, HERO, KISI } from '@/content/site';
import { egimCizgileri } from '@/lib/egim';
import { kisiJsonLd } from '@/lib/meta';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { CvBant } from './CvBant';
import { Defter } from './Defter';
import { Dizin } from './Dizin';
import { Dugme } from './Dugme';
import { Egim } from './Egim';
import { Sergi } from './Sergi';
import { Yontem } from './Yontem';

export function AnaSayfa({ dil }: { dil: Dil }) {
  const [ad, ...soyadlar] = KISI.ad.split(' ');
  const soyad = soyadlar.join(' ');
  const cizgiler = egimCizgileri(dil);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kisiJsonLd(dil)).replace(/</g, '\\u003c') }}
      />
      <section className="izgara border-b border-cizgi">
        <div className="kap relative flex flex-col pt-28 pb-16 lg:min-h-[max(44rem,100svh)] lg:pt-36 lg:pb-20">
          {/* Başlık: ad, iki satır. Arkasındaki grafik sol alttan sağ üste çıkar; ad sol üstte, giriş sağ altta boşlukta durur. */}
          <h1 className="relative z-10">
            <span className="gosterge block text-[clamp(3.25rem,9vw,8rem)]">
              {ad}
              <br />
              {soyad}
            </span>
            <span className="baslik hale mt-4 block text-[clamp(1.5rem,2.6vw,2.25rem)] text-murekkep md:mt-6">{HERO.ust[dil]}</span>
          </h1>
          <Egim
            cizgiler={cizgiler}
            varsayilan={Math.max(0, cizgiler.findIndex((c) => c.slug === DEFTER[0].slug))}
            dil={dil}
            className="relative mt-16 mb-12 h-72 lg:absolute lg:inset-x-10 lg:top-40 lg:bottom-24 lg:m-0 lg:h-auto"
          />
          <div className="relative z-10 grid gap-8 lg:mt-auto lg:ml-auto lg:max-w-[34rem]">
            <p className="metin leading-relaxed text-yazi-2 lg:text-[1.0625rem]">{HERO.giris[dil]}</p>
            <div className="flex flex-wrap gap-3">
              <Dugme href={`${yol.ana(dil)}#work`}>
                {M.isleriGor[dil]}
                <ArrowDown aria-hidden className="size-4" />
              </Dugme>
              <Dugme href={yol.cv(dil)} tur="ikincil" indir>
                {M.cvIndir[dil]}
              </Dugme>
            </div>
          </div>
        </div>
        <div className="kap pb-20 lg:pb-28">
          <Defter dil={dil} />
        </div>
      </section>
      <Sergi dil={dil} />
      <Dizin dil={dil} />
      <Yontem dil={dil} />
      <CvBant dil={dil} />
    </>
  );
}
