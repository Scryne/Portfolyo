import { statSync } from 'node:fs';
import path from 'node:path';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { KISI } from '@/content/site';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { EpostaSatiri } from './EpostaSatiri';

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

/** Derlemede okunur: "PDF · 286 KB". Dosya yoksa derleme kırılır; önce `npm run cv`. */
function boyut(dil: Dil, cvDil: Dil) {
  const kb = Math.round(statSync(path.join(process.cwd(), 'public', yol.cv(cvDil))).size / 1024);
  return `${M.pdf[dil]} · ${kb} KB`;
}

/** CV kutusu: dilin adı büyük, dosya bilgisi mono. İndirme ikonu üstüne gelince aşağı iner. */
function CvKutusu({ href, dil, cvDil, lang }: { href: string; dil: Dil; cvDil: Dil; lang: string }) {
  return (
    <a
      href={href}
      download=""
      hrefLang={lang}
      className="group flex min-h-32 flex-col sm:min-h-44 justify-between rounded-md border border-cizgi bg-zemin-3 p-6 transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-murekkep focus-visible:outline-offset-2"
    >
      <span className="flex items-start justify-between gap-4">
        <span className="etiket text-yazi-3">CV</span>
        <ArrowDown aria-hidden className="size-5 text-yazi-3 transition-[color,translate] duration-200 group-hover:translate-y-0.5 group-hover:text-murekkep" />
      </span>
      <span>
        <span className="gosterge block text-[clamp(1.75rem,3vw,2.5rem)] text-yazi transition-colors duration-150 group-hover:text-murekkep">
          {cvDil === 'tr' ? M.cvTr[dil].replace('CV · ', '') : M.cvEn[dil].replace('CV · ', '')}
        </span>
        <span className="etiket mt-2 block text-yazi-3">{boyut(dil, cvDil)}</span>
      </span>
    </a>
  );
}

export function CvBant({ dil }: { dil: Dil }) {
  return (
    <section id="cv" aria-labelledby="cv-baslik" className="border-t border-cizgi bg-zemin-2">
      <div className="kap bolum">
        <h2 id="cv-baslik" className="gosterge text-[clamp(2.25rem,4.6vw,3.75rem)]">
          {M.cvBaslik[dil]}
        </h2>
        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            <CvKutusu href={yol.cv('tr')} dil={dil} cvDil="tr" lang="tr" />
            <CvKutusu href={yol.cv('en')} dil={dil} cvDil="en" lang="en" />
          </div>
          <ul className="self-end border-t border-cizgi-guclu lg:col-span-5 lg:col-start-8">
            <EpostaSatiri ad={M.eposta[dil]} kullanici={KISI.eposta.kullanici} alan={KISI.eposta.alan} />
            <Satir href={KISI.github} ad="GitHub" deger="github.com/Scryne" />
            <Satir href={KISI.linkedin} ad="LinkedIn" deger="linkedin.com/in/berkay-karaca" />
          </ul>
        </div>
      </div>
    </section>
  );
}
