import { ArrowDown } from 'lucide-react';
import { HERO, KISI } from '@/content/site';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { CvBant } from './CvBant';
import { Defter } from './Defter';
import { Dizin } from './Dizin';
import { Dugme } from './Dugme';
import { Sergi } from './Sergi';
import { Yontem } from './Yontem';

export function AnaSayfa({ dil }: { dil: Dil }) {
  const [ilk, ikinci] = HERO.baslik[dil];
  return (
    <>
      <section className="izgara border-b border-cizgi">
        <div className="kap pt-32 pb-16 md:pt-40 lg:pb-20">
          <p className="baslik text-lg text-yazi md:text-xl">
            {KISI.ad}
            <span className="text-yazi-3"> · </span>
            <span className="text-yazi-2">{HERO.ust[dil]}</span>
          </p>
          <h1 className="gosterge mt-6 max-w-[16ch] text-[clamp(2.75rem,7.6vw,7rem)] md:mt-8">
            <span className="block">{ilk}</span>
            <span className="block text-murekkep">{ikinci}</span>
          </h1>
          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end">
            <p className="metin text-lg leading-relaxed text-yazi-2 lg:col-span-7">{HERO.giris[dil]}</p>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
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
