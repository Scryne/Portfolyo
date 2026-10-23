'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { M } from '@/lib/metin';
import { temaDegistir } from '@/lib/tema';
import type { Dil } from '@/lib/tipler';

function abone(bildir: () => void) {
  const g = new MutationObserver(bildir);
  g.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => g.disconnect();
}
const koyuMu = () => document.documentElement.dataset.theme === 'dark';

export function TemaDugmesi({ dil }: { dil: Dil }) {
  // Sunucuda tema bilinmez; ilk boyamadan önce <head>'deki betik data-theme'i koyar.
  const koyu = useSyncExternalStore(abone, koyuMu, () => false);

  const etiket = koyu ? M.temaAcik[dil] : M.temaKoyu[dil];
  return (
    <button
      type="button"
      onClick={(e) => {
        // Klavyeyle basılınca koordinat 0: perde düğmenin ortasından açılsın.
        const r = e.currentTarget.getBoundingClientRect();
        temaDegistir({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={etiket}
      title={etiket}
      className="grid size-10 place-items-center rounded-full border border-cizgi text-yazi-2 transition-colors duration-150 hover:border-cizgi-guclu hover:text-yazi active:scale-[0.96]"
    >
      {koyu ? <Sun aria-hidden className="size-4" /> : <Moon aria-hidden className="size-4" />}
    </button>
  );
}
