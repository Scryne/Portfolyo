'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { EgimCizgisi } from '@/lib/egim';
import { M, yol } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { KalemliDeger } from './Defter';

const yolu = (c: EgimCizgisi) => `M0 ${c.yOnce} C 42 ${c.yOnce}, 58 ${c.ySonra}, 100 ${c.ySonra}`;

/**
 * Hero'nun zemini: denetimdeki her ölçüm, "bulunan" ekseninden "ölçülen" eksenine bir çizgi.
 * Her ölçüm kendi ölçeğinde normalize; yukarı her zaman daha iyi. Aynı bilgi hemen altındaki
 * defterde bağlantı olarak durur, bu yüzden grafik yalnız işaretçiyle gezilir.
 */
export function Egim({
  cizgiler,
  varsayilan,
  dil,
  className = '',
}: {
  cizgiler: EgimCizgisi[];
  varsayilan: number;
  dil: Dil;
  className?: string;
}) {
  const router = useRouter();
  const [aktif, setAktif] = useState(varsayilan);
  const [ilk, setIlk] = useState(true);
  const a = cizgiler[aktif];

  const sec = (i: number) => {
    setIlk(false);
    setAktif(i);
  };

  return (
    <div
      className={`egim ${className}`}
      role="img"
      aria-label={
        dil === 'tr'
          ? `Eylül 2026 denetiminde ${cizgiler.length} ölçüm: bulunan değerden düzeltme sonrası ölçülen değere. Ayrıntısı aşağıdaki defterde.`
          : `${cizgiler.length} measurements from the September 2026 audit: from the value found to the value measured after the fix. Details in the ledger below.`
      }
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-cizgi-guclu" />
      <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-cizgi-guclu" />
      <span aria-hidden className="etiket absolute bottom-full left-0 mb-2 text-kalem">
        {M.once[dil]}
      </span>
      <span aria-hidden className="etiket absolute bottom-full right-0 mb-2 text-murekkep">
        {M.sonra[dil]}
      </span>

      {cizgiler.map((c, i) => (
        <span
          key={`o${i}`}
          aria-hidden
          className="absolute left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kalem"
          style={{ top: `${c.yOnce}%` }}
        />
      ))}

      <div className="egim-cizim absolute inset-0" data-secili={aktif}>
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
        >
          <defs>
            <linearGradient id="egim-murekkep" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
              <stop offset="0" style={{ stopColor: 'var(--kalem)' }} />
              <stop offset="0.5" style={{ stopColor: 'var(--yazi-3)' }} />
              <stop offset="1" style={{ stopColor: 'var(--murekkep)' }} />
            </linearGradient>
          </defs>
          {cizgiler.map((c, i) => (
            <g key={i} className="egim-cizgi" data-aktif={i === aktif || undefined}>
              <path d={yolu(c)} fill="none" stroke="url(#egim-murekkep)" vectorEffect="non-scaling-stroke" />
              <path
                d={yolu(c)}
                fill="none"
                stroke="transparent"
                strokeWidth={18}
                vectorEffect="non-scaling-stroke"
                pointerEvents="stroke"
                className="cursor-pointer"
                onPointerEnter={(e) => e.pointerType === 'mouse' && sec(i)}
                onClick={() => (i === aktif ? router.push(yol.proje(dil, c.slug)) : sec(i))}
              />
            </g>
          ))}
        </svg>
        {cizgiler.map((c, i) => (
          <span
            key={`s${i}`}
            aria-hidden
            className="absolute right-0 size-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-murekkep"
            style={{ top: `${c.ySonra}%` }}
          />
        ))}
      </div>

      {/* Seçili ölçümün okuması. key değişince kalem yeniden çeker. */}
      <div key={aktif} aria-hidden className="egim-okuma pointer-events-none" style={{ '--gecikme': ilk ? '1500ms' : '0ms' } as React.CSSProperties}>
        <span className="okuma hale absolute left-0 -translate-y-1/2 pl-4 text-[clamp(1.25rem,2vw,1.75rem)]" style={{ top: `${a.yOnce}%` }}>
          <KalemliDeger deger={a.once} sira={0} dil={dil} />
        </span>
        {/* Değer çizginin üstünde, açıklama altında; çizgi ikisinin arasından dokunmadan geçer. */}
        <span
          className="okuma hale absolute right-0 -translate-y-full pr-5 pb-1.5 text-[clamp(1.25rem,2vw,1.75rem)] text-murekkep"
          style={{ top: `${a.ySonra}%` }}
        >
          <span className="kalem-sonra inline-block">{a.sonra}</span>
        </span>
        <span className="etiket hale kalem-sonra absolute right-0 max-w-[30ch] pt-2 pr-5 text-right text-yazi-2" style={{ top: `${a.ySonra}%` }}>
          <span className="text-yazi">{a.proje}</span> · {a.ne}
        </span>
      </div>
    </div>
  );
}
