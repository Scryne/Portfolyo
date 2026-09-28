'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { karsilik, M } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';

/** Aynı sayfanın öbür dildeki karşılığına gider. */
export function DilAnahtari({ dil }: { dil: Dil }) {
  const yolAdi = usePathname();
  const hedef = karsilik(yolAdi);
  const oteki: Dil = dil === 'tr' ? 'en' : 'tr';
  return (
    <Link
      href={hedef}
      hrefLang={oteki}
      lang={oteki}
      className="etiket inline-flex h-10 items-center rounded-full border border-cizgi px-4 text-yazi-2 transition-colors duration-150 hover:border-cizgi-guclu hover:text-yazi"
    >
      <span className="sm:hidden">{oteki.toUpperCase()}</span>
      <span className="hidden sm:inline">{M.dilDegistir[dil]}</span>
    </Link>
  );
}
