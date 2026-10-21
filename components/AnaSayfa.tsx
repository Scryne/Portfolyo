import { ArrowDown } from 'lucide-react';
import { HERO, KISI } from '@/content/site';
import { kureYerleri } from '@/lib/kure';
import { kisiJsonLd } from '@/lib/meta';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { CvBant } from './CvBant';
import { Defter } from './Defter';
import { Dizin } from './Dizin';
import { Dugme } from './Dugme';
import { GorununceOynat } from './GorununceOynat';
import { Kure } from './Kure';
import { Sergi } from './Sergi';
import { Yontem } from './Yontem';

export function AnaSayfa({ dil }: { dil: Dil }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kisiJsonLd(dil)).replace(/</g, '\\u003c') }}
      />
      {/* Hero: renk ağı zemininde küre; projelerin geçtiği yerler. Ad görünür başlık değil, nav'da duruyor. */}
      <section className="kure-zemin relative overflow-hidden border-b border-cizgi">
        <div className="kap grid items-center gap-10 pt-28 pb-14 lg:min-h-[max(40rem,100svh)] lg:grid-cols-12 lg:gap-6 lg:pt-24 lg:pb-10">
          <div className="relative z-10 lg:col-span-5">
            <h1 className="sr-only">
              {KISI.ad} · {HERO.ust[dil]}
            </h1>
            <p aria-hidden className="etiket text-yazi-2">
              {HERO.ust[dil]}
            </p>
            <p className="mt-4 max-w-[30ch] text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.35] font-[480] text-yazi [font-variation-settings:'wdth'_106]">
              {HERO.giris[dil]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Dugme href={`${yol.ana(dil)}#work`}>
                {M.isleriGor[dil]}
                <ArrowDown aria-hidden className="size-4" />
              </Dugme>
              <Dugme href={yol.cv(dil)} tur="ikincil" indir>
                {M.cvIndir[dil]}
              </Dugme>
            </div>
          </div>
          <Kure yerler={kureYerleri(dil)} dil={dil} className="mx-auto w-full max-w-[36rem] lg:col-span-7 lg:mr-0 lg:max-w-[45rem]" />
        </div>
      </section>
      <Sergi dil={dil} />
      {/* Defter işlerden sonra: ziyaretçi önce projeleri görür, sonra ölçülmüş düzeltmeleri. */}
      <section className="izgara border-y border-cizgi">
        <GorununceOynat className="kap py-20 lg:py-28">
          <Defter dil={dil} />
        </GorununceOynat>
      </section>
      <Dizin dil={dil} />
      <Yontem dil={dil} />
      <CvBant dil={dil} />
    </>
  );
}
