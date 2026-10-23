'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Baglanti = { href: string; ad: string; bolumler: string[] };

/**
 * Nav'daki bölüm bağlantıları. Ana sayfada okunan bölümün bağlantısının altında mürekkep çizgisi durur ve bölüm
 * değiştikçe ona kayar; vaka sayfasında "İşler" işaretli kalır (sayfa bir işin içi).
 */
export function NavBaglantilari({ baglantilar, ana }: { baglantilar: Baglanti[]; ana: string }) {
  const yolAdi = usePathname();
  const anaSayfada = yolAdi === ana;
  const [aktif, setAktif] = useState<number | null>(null);
  const ogeler = useRef<(HTMLAnchorElement | null)[]>([]);
  const [cizgi, setCizgi] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => {
    if (!anaSayfada) return;
    const kimlikler = baglantilar.flatMap((b, i) => b.bolumler.map((id) => [id, i] as const));
    let kare = 0;
    // Ekranın üst üçte birini geçen son bölüm okunan bölümdür; hiçbiri geçmediyse (hero) çizgi yok.
    const olc = () => {
      kare = 0;
      let bulunan: number | null = null;
      for (const [id, i] of kimlikler) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.35) bulunan = i;
      }
      setAktif(bulunan);
    };
    const iste = () => {
      if (!kare) kare = requestAnimationFrame(olc);
    };
    olc();
    addEventListener('scroll', iste, { passive: true });
    addEventListener('resize', iste);
    return () => {
      cancelAnimationFrame(kare);
      removeEventListener('scroll', iste);
      removeEventListener('resize', iste);
    };
  }, [anaSayfada, baglantilar]);

  const secili = anaSayfada ? aktif : yolAdi.includes('/proje') ? 0 : null;

  useEffect(() => {
    const el = secili === null ? null : ogeler.current[secili];
    const olc = () => setCizgi(el ? { x: el.offsetLeft + 12, w: el.offsetWidth - 24 } : null);
    olc();
    // Font yüklenince genişlik değişir.
    document.fonts?.ready.then(olc);
  }, [secili]);

  return (
    <ul className="relative mr-1 hidden items-center gap-1 md:flex">
      {baglantilar.map((b, i) => (
        <li key={b.href}>
          <Link
            ref={(el) => {
              ogeler.current[i] = el;
            }}
            href={b.href}
            transitionTypes={anaSayfada ? undefined : ['geri']}
            aria-current={anaSayfada && secili === i ? 'location' : undefined}
            className={`block rounded-sm px-3 py-2 text-[0.9375rem] transition-colors duration-150 hover:text-yazi ${secili === i ? 'text-yazi' : 'text-yazi-2'}`}
          >
            {b.ad}
          </Link>
        </li>
      ))}
      <span
        aria-hidden
        className="nav-cizgi pointer-events-none absolute -bottom-px left-0 h-0.5 w-px origin-left rounded-full bg-murekkep"
        style={cizgi ? { translate: `${cizgi.x}px 0`, scale: `${cizgi.w} 1`, opacity: 1 } : { opacity: 0 }}
      />
    </ul>
  );
}
