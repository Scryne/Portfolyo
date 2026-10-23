'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

type Baglanti = { href: string; ad: string };

/**
 * Dar ekranda nav bağlantıları sığmaz: menü düğmesi onları nav'ın altındaki panelde açar. Yerel popover: dışarı
 * tıklama ve Escape kapatır, düğmenin açık/kapalı durumu ekran okuyucuya kendiliğinden bildirilir.
 */
export function MobilMenu({ baglantilar, ana, etiket }: { baglantilar: Baglanti[]; ana: string; etiket: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const anaSayfada = usePathname() === ana;
  return (
    <>
      <button
        type="button"
        popoverTarget="mobil-menu"
        aria-label={etiket}
        className="grid size-10 place-items-center rounded-full border border-cizgi text-yazi-2 transition-colors duration-150 hover:border-cizgi-guclu hover:text-yazi md:hidden"
      >
        <Menu aria-hidden className="size-4" />
      </button>
      <div ref={panel} id="mobil-menu" popover="auto" className="mobil-menu">
        <ul className="kap py-2">
          {baglantilar.map((b) => (
            <li key={b.href}>
              <Link
                href={b.href}
                transitionTypes={anaSayfada ? undefined : ['geri']}
                onClick={() => panel.current?.hidePopover()}
                className="baslik block py-3 text-[1.25rem] text-yazi transition-colors duration-150 hover:text-murekkep"
              >
                {b.ad}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
