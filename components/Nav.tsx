import Link from 'next/link';
import { KISI } from '@/content/site';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { DilAnahtari } from './DilAnahtari';
import { TemaDugmesi } from './TemaDugmesi';

export function Nav({ dil }: { dil: Dil }) {
  const ana = yol.ana(dil);
  const baglantilar = [
    { href: `${ana}#work`, ad: M.navIsler[dil] },
    { href: `${ana}#method`, ad: M.navYontem[dil] },
    { href: `${ana}#cv`, ad: M.navCv[dil] },
  ];
  return (
    <header className="cam fixed inset-x-0 top-0 z-40 border-b border-[var(--cam-kenar)]">
      <nav className="kap flex h-16 items-center justify-between gap-4" aria-label={dil === 'tr' ? 'Ana menü' : 'Main'}>
        <Link href={ana} className="baslik text-[1.0625rem] font-bold tracking-tight text-yazi">
          {KISI.ad}
        </Link>
        <div className="flex items-center gap-2">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {baglantilar.map((b) => (
              <li key={b.href}>
                <Link
                  href={b.href}
                  className="rounded-sm px-3 py-2 text-[0.9375rem] text-yazi-2 transition-colors duration-150 hover:text-yazi"
                >
                  {b.ad}
                </Link>
              </li>
            ))}
          </ul>
          <DilAnahtari dil={dil} />
          <TemaDugmesi dil={dil} />
        </div>
      </nav>
    </header>
  );
}
