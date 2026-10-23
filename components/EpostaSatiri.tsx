'use client';

import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';

const abone = () => () => {};

/**
 * E-posta satırı. Adres HTML'de tek parça durmaz ("@" ayrı öğe), mailto bağlantısı tarayıcıda
 * kurulur: kaba adres toplayıcıların regex'i sayfada tam adres bulamaz. Yanındaki düğme adresi kopyalar
 * (e-posta istemcisi kurulu olmayan ziyaretçi için).
 */
export function EpostaSatiri({
  ad,
  kullanici,
  alan,
  etiket,
}: {
  ad: string;
  kullanici: string;
  alan: string;
  etiket: { kopyala: string; kopyalandi: string };
}) {
  // Sunucuda false, tarayıcıda true: statik HTML'e mailto yazılmaz.
  const tarayicida = useSyncExternalStore(abone, () => true, () => false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const href = tarayicida ? `mailto:${kullanici}@${alan}` : undefined;

  const kopyala = () =>
    navigator.clipboard?.writeText(`${kullanici}@${alan}`).then(
      () => {
        setKopyalandi(true);
        setTimeout(() => setKopyalandi(false), 1800);
      },
      () => {},
    );

  return (
    <li className="flex items-center gap-2 border-b border-cizgi">
      <a href={href} className="group flex min-w-0 flex-1 items-center justify-between gap-6 py-5 focus-visible:outline-offset-0">
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
      <button
        type="button"
        onClick={kopyala}
        aria-label={etiket.kopyala}
        title={etiket.kopyala}
        className="-mr-2.5 grid size-11 shrink-0 place-items-center rounded-sm text-yazi-3 transition-colors duration-150 hover:text-murekkep"
      >
        {kopyalandi ? <Check aria-hidden className="size-4 text-murekkep" /> : <Copy aria-hidden className="size-4" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {kopyalandi ? etiket.kopyalandi : ''}
      </span>
    </li>
  );
}
