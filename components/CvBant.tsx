import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { KISI } from '@/content/site';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';

function Satir({ href, ad, deger, indir, lang }: { href: string; ad: string; deger: string; indir?: boolean; lang?: string }) {
  const Ikon = indir ? ArrowDown : ArrowUpRight;
  return (
    <li className="border-b border-cizgi">
      <a
        href={href}
        {...(indir ? { download: '' } : { target: '_blank', rel: 'noopener noreferrer' })}
        hrefLang={lang}
        className="group flex items-center justify-between gap-6 py-5 focus-visible:outline-offset-0"
      >
        <span className="baslik text-xl text-yazi transition-colors duration-150 group-hover:text-murekkep md:text-2xl">{ad}</span>
        <span className="flex items-center gap-4">
          <span className="etiket hidden text-yazi-3 sm:inline">{deger}</span>
          <Ikon
            aria-hidden
            className={`size-5 text-yazi-3 transition-[color,translate] duration-200 group-hover:text-murekkep ${indir ? 'group-hover:translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`}
          />
        </span>
      </a>
    </li>
  );
}

export function CvBant({ dil }: { dil: Dil }) {
  return (
    <section id="cv" aria-labelledby="cv-baslik" className="border-t border-cizgi bg-zemin-2">
      <div className="kap bolum grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="cv-baslik" className="gosterge text-[clamp(2.25rem,4.6vw,3.75rem)]">
            {M.cvBaslik[dil]}
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-yazi-2">{M.cvGiris[dil]}</p>
        </div>
        <ul className="border-t border-cizgi-guclu lg:col-span-6 lg:col-start-7">
          <Satir href={yol.cv('tr')} ad={M.cvTr[dil]} deger={M.pdf[dil]} indir lang="tr" />
          <Satir href={yol.cv('en')} ad={M.cvEn[dil]} deger={M.pdf[dil]} indir lang="en" />
          <Satir href={KISI.github} ad="GitHub" deger="github.com/Scryne" />
          <Satir href={KISI.linkedin} ad="LinkedIn" deger="linkedin.com/in/berkay-karaca" />
        </ul>
      </div>
    </section>
  );
}
