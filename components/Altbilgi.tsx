import { KISI } from '@/content/site';
import { M } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';

export function Altbilgi({ dil }: { dil: Dil }) {
  return (
    <footer className="border-t border-cizgi">
      <div className="kap flex flex-col gap-2 py-10 etiket text-yazi-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {KISI.ad}</p>
        <p>{M.altbilgi[dil]}</p>
      </div>
    </footer>
  );
}
