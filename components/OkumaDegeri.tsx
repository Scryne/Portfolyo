'use client';

import { useEffect, useRef, useState } from 'react';

const RAKAM = /\d/;

/**
 * Ölçülen değer bir ölçü aletinin göstergesi gibi oturur: rakamlar kısa bir süre taranır, soldan sağa sırayla
 * gerçek değerde durur. Yalnız rakamlar değişir ve yazı mono + tabular-nums olduğundan genişlik hiç oynamaz.
 * Sunucu HTML'i ve ekran okuyucu her zaman gerçek değeri görür; hareket azaltmada tarama yok.
 */
export function OkumaDegeri({ deger, gecikme = 0, sure = 620 }: { deger: string; gecikme?: number; sure?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [gosterilen, setGosterilen] = useState(deger);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const yerler = [...deger].flatMap((c, i) => (RAKAM.test(c) ? [i] : []));
    if (!yerler.length) return;
    let kare = 0;
    let zaman = 0;
    const oynat = () => {
      const t0 = performance.now();
      let son = 0;
      const adim = (t: number) => {
        const oran = (t - t0) / sure;
        if (oran >= 1) return setGosterilen(deger);
        // Saniyede ~30 değişim: rakamlar okunur hızda akar, titremez.
        if (t - son > 33) {
          son = t;
          const oturan = Math.floor(oran * (yerler.length + 1));
          const s = [...deger];
          yerler.forEach((y, k) => {
            if (k >= oturan) s[y] = String(Math.floor(Math.random() * 10));
          });
          setGosterilen(s.join(''));
        }
        kare = requestAnimationFrame(adim);
      };
      kare = requestAnimationFrame(adim);
    };
    // Defter'de değer kalem çizgisinden sonra soluklaşarak gelir: tarama o animasyonla birlikte başlasın.
    const sonra = el.closest<HTMLElement>('.kalem-sonra');
    const basla = () => {
      zaman = window.setTimeout(oynat, gecikme);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        basla();
      },
      { threshold: 0.6 },
    );
    if (sonra) sonra.addEventListener('animationstart', basla, { once: true });
    else io.observe(el);
    return () => {
      sonra?.removeEventListener('animationstart', basla);
      io.disconnect();
      clearTimeout(zaman);
      cancelAnimationFrame(kare);
    };
  }, [deger, gecikme, sure]);

  return (
    <span ref={ref} className="relative">
      <span aria-hidden>{gosterilen}</span>
      <span className="sr-only">{deger}</span>
    </span>
  );
}
