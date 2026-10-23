'use client';

import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { M } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';

export type GaleriKaresi = {
  ad: string;
  aciklama: string;
  mobil: boolean;
  w: number;
  h: number;
  zemin: string;
  srcSet: string;
  src: string;
  buyuk: string;
};

export function Galeri({ kareler, dil, projeAdi }: { kareler: GaleriKaresi[]; dil: Dil; projeAdi: string }) {
  const pencere = useRef<HTMLDialogElement>(null);
  const [acik, setAcik] = useState<number | null>(null);
  const [yon, setYon] = useState<1 | -1>(1);
  const dokunma = useRef<{ x: number; y: number } | null>(null);

  const ac = (i: number) => {
    setAcik(i);
    pencere.current?.showModal();
  };
  const kapat = () => pencere.current?.close();
  const git = useCallback(
    (y: 1 | -1) => {
      setYon(y);
      setAcik((i) => (i === null ? i : (i + y + kareler.length) % kareler.length));
    },
    [kareler.length],
  );

  useEffect(() => {
    const d = pencere.current;
    if (!d) return;
    const tus = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') git(1);
      if (e.key === 'ArrowLeft') git(-1);
    };
    const kapandi = () => setAcik(null);
    d.addEventListener('keydown', tus);
    d.addEventListener('close', kapandi);
    return () => {
      d.removeEventListener('keydown', tus);
      d.removeEventListener('close', kapandi);
    };
  }, [git]);

  const k = acik === null ? null : kareler[acik];

  // Komşu kareleri önceden indir: okla geçerken büyük görüntü boş gelmesin.
  useEffect(() => {
    if (acik === null) return;
    for (const d of [1, -1]) {
      const im = new Image();
      im.src = kareler[(acik + d + kareler.length) % kareler.length].buyuk;
    }
  }, [acik, kareler]);

  return (
    <>
      <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2">
        {kareler.map((kare, i) => (
          <li key={kare.ad}>
            <figure>
              <button
                type="button"
                onClick={() => ac(i)}
                className="group sekil relative block w-full cursor-zoom-in text-left"
                aria-label={`${M.buyut[dil]}: ${kare.aciklama}`}
              >
                <span className={`block ${kare.mobil ? 'aspect-[16/10] bg-zemin-2 p-4' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- statik export */}
                  <img
                    src={kare.src}
                    srcSet={kare.srcSet}
                    sizes={kare.mobil ? '240px' : '(min-width: 768px) 50vw, 100vw'}
                    width={kare.w}
                    height={kare.h}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={kare.mobil ? 'mx-auto h-full w-auto rounded-sm' : 'h-auto w-full'}
                    style={{ backgroundColor: kare.zemin }}
                  />
                </span>
                <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-[color-mix(in_oklab,var(--zemin)_82%,transparent)] text-yazi opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 aria-hidden className="size-4" />
                </span>
              </button>
              <figcaption className="mt-3 text-[0.9375rem] leading-snug text-yazi-2">{kare.aciklama}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={pencere}
        aria-label={`${projeAdi}: ${M.ekranlar[dil]}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) kapat();
        }}
        className="pencere m-auto max-h-[94dvh] w-[min(94vw,1600px)] overflow-visible bg-transparent p-0 text-yazi backdrop:bg-black/70"
      >
        {k && (
          <div className="cam flex max-h-[94dvh] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--cam-kenar)]">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--cam-kenar)] px-4 py-2.5">
              <p className="etiket text-yazi-2">
                {projeAdi} · {(acik ?? 0) + 1} / {kareler.length}
              </p>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => git(-1)} aria-label={M.oncekiKare[dil]} className="grid size-10 place-items-center rounded-full text-yazi-2 hover:bg-zemin-2 hover:text-yazi">
                  <ChevronLeft aria-hidden className="size-5" />
                </button>
                <button type="button" onClick={() => git(1)} aria-label={M.sonrakiKare[dil]} className="grid size-10 place-items-center rounded-full text-yazi-2 hover:bg-zemin-2 hover:text-yazi">
                  <ChevronRight aria-hidden className="size-5" />
                </button>
                <button type="button" onClick={kapat} aria-label={M.kapat[dil]} className="grid size-10 place-items-center rounded-full text-yazi-2 hover:bg-zemin-2 hover:text-yazi" autoFocus>
                  <X aria-hidden className="size-5" />
                </button>
              </div>
            </div>
            {/* Dokunmatikte yatay kaydırma önceki / sonraki kareye geçer. */}
            <div
              className="grid min-h-0 flex-1 touch-pan-y place-items-center overflow-auto bg-zemin-3 p-2 md:p-4"
              onPointerDown={(e) => {
                if (e.pointerType !== 'mouse') dokunma.current = { x: e.clientX, y: e.clientY };
              }}
              onPointerUp={(e) => {
                const b = dokunma.current;
                dokunma.current = null;
                if (!b) return;
                const [dx, dy] = [e.clientX - b.x, e.clientY - b.y];
                if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) git(dx < 0 ? 1 : -1);
              }}
              onPointerCancel={() => (dokunma.current = null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- statik export */}
              <img
                key={k.ad}
                src={k.buyuk}
                data-yon={yon}
                width={k.w}
                height={k.h}
                alt={k.aciklama}
                className="galeri-buyuk h-auto max-h-[76dvh] w-auto max-w-full rounded-sm object-contain"
                style={{ backgroundColor: k.zemin }}
              />
            </div>
            <p className="border-t border-[var(--cam-kenar)] px-4 py-3 text-[0.9375rem] text-yazi-2" aria-live="polite">
              {k.aciklama}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
