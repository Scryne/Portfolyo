import { ArrowDown } from 'lucide-react';
import { HERO, KISI } from '@/content/site';
import { kisiJsonLd } from '@/lib/meta';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { CvBant } from './CvBant';
import { Defter } from './Defter';
import { Dizin } from './Dizin';
import { Dugme } from './Dugme';
import { Sergi } from './Sergi';
import { Yontem } from './Yontem';

export function AnaSayfa({ dil }: { dil: Dil }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kisiJsonLd(dil)).replace(/</g, '\\u003c') }}
      />
      <section className="izgara border-b border-cizgi">
        <div className="kap pt-32 pb-16 md:pt-40 lg:pb-20">
          {/* Ad ve rol görünür başlık değil (Scryne 2026-09-28: büyük ad kaldırılsın); ad nav'da duruyor. */}
          <h1 className="sr-only">
            {KISI.ad} · {HERO.ust[dil]}
          </h1>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
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
