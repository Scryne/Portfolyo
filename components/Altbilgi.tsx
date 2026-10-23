import { ArrowUp } from 'lucide-react';
import { KISI } from '@/content/site';
import { M } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';

export function Altbilgi({ dil }: { dil: Dil }) {
  return (
    <footer className="border-t border-cizgi">
      <div className="kap flex flex-col gap-3 py-10 etiket text-yazi-3 md:flex-row md:items-center md:justify-between md:gap-8">
        <p>© 2026 {KISI.ad}</p>
        <p className="md:ml-auto">{M.altbilgi[dil]}</p>
        <a href="#icerik" className="group inline-flex items-center gap-1.5 text-yazi-2 transition-colors duration-150 hover:text-murekkep">
          {M.basaDon[dil]}
          <ArrowUp aria-hidden className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
