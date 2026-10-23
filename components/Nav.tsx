import Link from 'next/link';
import { KISI } from '@/content/site';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { DilAnahtari } from './DilAnahtari';
import { MobilMenu } from './MobilMenu';
import { NavBaglantilari } from './NavBaglantilari';
import { TemaDugmesi } from './TemaDugmesi';

export function Nav({ dil }: { dil: Dil }) {
  const ana = yol.ana(dil);
  const baglantilar = [
    { href: `${ana}#work`, ad: M.navIsler[dil], bolumler: ['work', 'projeler'] },
    { href: `${ana}#method`, ad: M.navYontem[dil], bolumler: ['method'] },
    { href: `${ana}#cv`, ad: M.navCv[dil], bolumler: ['cv'] },
  ];
  return (
    // Sayfa geçişinde nav yerinde kalır (globals.css, "Sayfa geçişi").
    <header className="site-nav cam fixed inset-x-0 top-0 z-40 border-b border-[var(--cam-kenar)]">
      <nav className="kap flex h-16 items-center justify-between gap-4" aria-label={dil === 'tr' ? 'Ana menü' : 'Main'}>
        <Link href={ana} transitionTypes={['geri']} className="baslik text-[1.0625rem] font-bold tracking-tight text-yazi">
          {KISI.ad}
        </Link>
        <div className="flex items-center gap-2">
          <NavBaglantilari baglantilar={baglantilar} ana={ana} />
          <MobilMenu baglantilar={baglantilar} ana={ana} etiket={dil === 'tr' ? 'Menüyü aç' : 'Open menu'} />
          <DilAnahtari dil={dil} />
          <TemaDugmesi dil={dil} />
        </div>
      </nav>
    </header>
  );
}
