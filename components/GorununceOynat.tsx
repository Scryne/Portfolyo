'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * İçindeki kalem animasyonları (Defter) ekrana girene kadar bekler. Defter hero'nun altında;
 * açılışta oynasa kimse görmezdi. JS yoksa noscript kuralı animasyonu hemen oynatır.
 */
export function GorununceOynat({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [gordu, setGordu] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setGordu(true);
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-bekle={gordu ? undefined : ''} className={className}>
      {children}
      <noscript>
        <style>{'[data-bekle] .kalem-cizgi path,[data-bekle] .kalem-sonra{animation-play-state:running!important}'}</style>
      </noscript>
    </div>
  );
}
