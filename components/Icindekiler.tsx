'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Vaka sayfasının içindekiler listesi. Okunan bölüm işaretlenir: sol çizgide mürekkep imleç o satıra kayar,
 * bağlantı `aria-current` taşır. Okunan bölüm, üst kenarı ekranın üst üçte birini geçen son bölümdür.
 */
export function Icindekiler({ baslik, bolumler }: { baslik: string; bolumler: { id: string; ad: string }[] }) {
  const [aktif, setAktif] = useState(0);
  const satirlar = useRef<(HTMLAnchorElement | null)[]>([]);
  const [imlec, setImlec] = useState({ y: 0, h: 0 });

  useEffect(() => {
    let kare = 0;
    const olc = () => {
      kare = 0;
      let i = 0;
      bolumler.forEach((b, k) => {
        const el = document.getElementById(b.id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.33) i = k;
      });
      // Sayfa sonuna gelindiyse son bölüm: kısa son bölümler üçte bire hiç ulaşamaz.
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) i = bolumler.length - 1;
      setAktif(i);
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
  }, [bolumler]);

  // İmleç satırın gerçek yerini ve boyunu ölçer: iki satıra kırılan başlıkta da tam oturur.
  useEffect(() => {
    const el = satirlar.current[aktif];
    if (el) setImlec({ y: el.offsetTop, h: el.offsetHeight });
  }, [aktif]);

  return (
    <nav aria-label={baslik} className="hidden lg:sticky lg:top-28 lg:col-span-3 lg:block lg:self-start">
      <p className="etiket text-yazi-3">{baslik}</p>
      <ul className="relative mt-4 flex flex-col border-l border-cizgi">
        <span
          aria-hidden
          className="icindekiler-imlec absolute -left-px top-0 w-0.5 bg-murekkep"
          style={{ translate: `0 ${imlec.y}px`, height: imlec.h, opacity: imlec.h ? 1 : 0 }}
        />
        {bolumler.map((b, i) => (
          <li key={b.id}>
            <a
              ref={(el) => {
                satirlar.current[i] = el;
              }}
              href={`#${b.id}`}
              aria-current={i === aktif ? 'location' : undefined}
              className={`block py-1.5 pl-4 text-[0.9375rem] transition-colors duration-150 hover:text-yazi ${i === aktif ? 'text-yazi' : 'text-yazi-2'}`}
            >
              {b.ad}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
