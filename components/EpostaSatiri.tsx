'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * E-posta satırı. Adres HTML'de tek parça durmaz ("@" ayrı öğe), mailto bağlantısı tarayıcıda
 * kurulur: kaba adres toplayıcıların regex'i sayfada tam adres bulamaz.
 */
export function EpostaSatiri({ ad, kullanici, alan }: { ad: string; kullanici: string; alan: string }) {
  const [href, setHref] = useState<string>();
  useEffect(() => setHref(`mailto:${kullanici}@${alan}`), [kullanici, alan]);
  return (
    <li className="border-b border-cizgi">
      <a href={href} className="group flex items-center justify-between gap-6 py-5 focus-visible:outline-offset-0">
        <span className="baslik text-xl text-yazi transition-colors duration-150 group-hover:text-murekkep md:text-2xl">{ad}</span>
        <span className="flex min-w-0 items-center gap-4">
          <span className="etiket truncate text-yazi-3">
            {kullanici}
            <span>@</span>
            {alan}
          </span>
          <ArrowUpRight
            aria-hidden
            className="size-5 shrink-0 text-yazi-3 transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-murekkep"
          />
        </span>
      </a>
    </li>
  );
}
