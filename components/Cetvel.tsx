import { M } from '@/lib/metin';
import type { Dil, Olcum } from '@/lib/tipler';
import { Satir } from './Satir';

const yuzde = (v: number, min: number, max: number) => ((v - min) / (max - min)) * 100;

/** Ölçüm cetveli: yatay ölçek, gerçek eşik tik olarak, "önce" içi boş halka, "sonra" dolu nokta. */
export function Cetvel({ o, dil }: { o: Olcum; dil: Dil }) {
  const sayi = new Intl.NumberFormat(dil === 'tr' ? 'tr-TR' : 'en-US', { maximumFractionDigits: 2 });
  const c = o.cetvel;
  const uc = (v: number) => {
    const s = sayi.format(v);
    if (!c?.birim) return s;
    if (c.birim === '%') return dil === 'tr' ? `%${s}` : `${s}%`;
    return `${s} ${c.birim}`;
  };
  // Metinli değerler ("Neo4j 3.033 ms") yan yana sığmaz; alt satıra iner ve küçülür.
  const uzun = `${o.once?.[dil] ?? ''}${o.sonra[dil]}`.length > 14;
  const esikYeri = c?.esik ? yuzde(c.esik.deger, c.min, c.max) : 0;
  const esikHiza = esikYeri > 85 ? '-translate-x-full' : esikYeri < 15 ? 'translate-x-0' : '-translate-x-1/2';
  return (
    <figure className="border-t border-cizgi py-7">
      <figcaption
        className={`flex flex-col gap-3 ${uzun ? '' : 'sm:flex-row sm:items-baseline sm:justify-between sm:gap-8'}`}
      >
        <span className="font-medium text-yazi">
          <Satir metin={o.ne[dil]} />
        </span>
        <span
          className={`okuma flex flex-wrap items-baseline gap-x-3 gap-y-1 ${uzun ? 'text-xl md:text-2xl' : 'shrink-0 text-2xl md:text-3xl'}`}
        >
          {o.once && (
            <>
              <span className="sr-only">{M.once[dil]}: </span>
              <del className="text-yazi-3 decoration-kalem decoration-2">{o.once[dil]}</del>
            </>
          )}
          <span className="sr-only">{M.sonra[dil]}: </span>
          <span className="text-murekkep">{o.sonra[dil]}</span>
        </span>
      </figcaption>

      {c && (
        <div className="mt-6" aria-hidden>
          <div className="relative mx-1.5 h-8">
            <div className="absolute inset-x-0 top-1/2 h-px bg-cizgi-guclu" />
            {Array.from({ length: 11 }, (_, i) => (
              <span
                key={i}
                className={`absolute top-1/2 w-px -translate-x-1/2 bg-cizgi-guclu ${i % 5 === 0 ? 'h-3 -translate-y-1/2' : 'h-1.5 -translate-y-1/2'}`}
                style={{ left: `${i * 10}%` }}
              />
            ))}
            {c.esik && (
              <span className="absolute top-0 bottom-0 -translate-x-1/2" style={{ left: `${yuzde(c.esik.deger, c.min, c.max)}%` }}>
                <span className="absolute top-0 bottom-0 left-0 w-px bg-yazi-2" />
                <span className={`etiket absolute -top-5 left-0 whitespace-nowrap text-yazi-2 ${esikHiza}`}>
                  {c.esik.ad[dil]}
                </span>
              </span>
            )}
            {c.once !== undefined && (
              <span
                className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-[color-mix(in_oklab,var(--murekkep)_45%,transparent)]"
                style={{
                  left: `${Math.min(yuzde(c.once, c.min, c.max), yuzde(c.sonra, c.min, c.max))}%`,
                  width: `${Math.abs(yuzde(c.sonra, c.min, c.max) - yuzde(c.once, c.min, c.max))}%`,
                }}
              />
            )}
            {c.once !== undefined && (
              <span
                className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-kalem bg-zemin"
                style={{ left: `${yuzde(c.once, c.min, c.max)}%` }}
              />
            )}
            <span
              className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-murekkep ring-4 ring-zemin"
              style={{ left: `${yuzde(c.sonra, c.min, c.max)}%` }}
            />
          </div>
          <div className="etiket mt-2 flex justify-between text-yazi-3">
            <span>{uc(c.min)}</span>
            <span>
              {M.iyiYon[dil]}: {c.yon === 'yukari' ? M.artis[dil] : M.azalis[dil]}
            </span>
            <span>{uc(c.max)}</span>
          </div>
        </div>
      )}

      {o.not && (
        <p className="metin mt-4 text-[0.9375rem] leading-relaxed text-yazi-2">
          <Satir metin={o.not[dil]} />
        </p>
      )}
    </figure>
  );
}
