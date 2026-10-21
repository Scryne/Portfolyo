'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type { AtlasYeri } from '@/lib/konum';

/**
 * Tüm projeler, bir atlas olarak: solda kayıtlar, sağda aynı yerlerin düz izdüşümü (Equal Earth).
 * Hero küresi projeleri 3B'de gezer; atlas aynı konumları tek bakışta gösterir. Satırın üstüne
 * gelmek ya da klavyeyle odaklanmak haritada o projenin iğnesini yakar, artı imleci oraya kayar.
 * Harita süs değil okuma yardımı: bilgi satırda da yazılı, harita ekran okuyucudan gizli.
 */
export function Atlas({ yerler, baslik, oran }: { yerler: AtlasYeri[]; baslik: string; oran: number }) {
  const [aktifSlug, setAktif] = useState(yerler[0].slug);
  const aktif = yerler.find((y) => y.slug === aktifSlug) ?? yerler[0];
  const [ax, ay] = aktif.pin;
  // Etiket iğnenin sağında; sağ kenara yakınsa solunda.
  const etiketSolda = ax > 70;

  return (
    <section id="atlas" aria-labelledby="atlas-baslik" className="bolum border-t border-cizgi">
      <div className="kap grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <h2 id="atlas-baslik" className="gosterge text-[clamp(2.25rem,4.6vw,3.75rem)] lg:col-span-12">
          {baslik}
        </h2>

        <figure aria-hidden className="atlas lg:sticky lg:top-28 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:self-start">
          <div className="relative w-full" style={{ aspectRatio: oran }}>
            <div className="harita-zemin absolute inset-0" />
            <span className="atlas-cizgi atlas-cizgi-y" style={{ left: `${ax}%` }} />
            <span className="atlas-cizgi atlas-cizgi-x" style={{ top: `${ay}%` }} />
            {yerler.map((y) => (
              <span
                key={y.slug}
                className="atlas-pin"
                data-aktif={y.slug === aktif.slug || undefined}
                style={{ left: `${y.pin[0]}%`, top: `${y.pin[1]}%` }}
              />
            ))}
            <span
              className="atlas-etiket"
              data-yan={etiketSolda ? 'sol' : 'sag'}
              style={{ left: `${ax}%`, top: `${ay}%` }}
            >
              <span className="baslik text-[0.9375rem] text-yazi">{aktif.ad}</span>
              <span className="etiket text-yazi-2">{aktif.yer}</span>
            </span>
          </div>
          <figcaption className="etiket mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-cizgi pt-3 text-yazi-3">
            <span>Equal Earth</span>
            <span className="text-yazi-2">{aktif.koordinat}</span>
          </figcaption>
        </figure>

        <ol className="border-t border-cizgi-guclu lg:col-span-5 lg:row-start-2">
          {yerler.map((y, i) => (
            <li key={y.slug} className="border-b border-cizgi">
              <Link
                href={y.href}
                onMouseEnter={() => setAktif(y.slug)}
                onFocus={() => setAktif(y.slug)}
                data-aktif={y.slug === aktif.slug || undefined}
                className="atlas-satir group grid grid-cols-[2.25rem_1fr_auto] gap-x-3 py-5 focus-visible:outline-offset-0"
              >
                <span className="okuma pt-1.5 text-[0.9375rem] text-yazi-3 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <span className="atlas-ad baslik block text-[1.625rem] text-yazi">{y.ad}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-snug text-yazi-2">{y.baslik}</span>
                  <span className="etiket mt-2 block text-yazi-3">{y.yer}</span>
                  <span className="etiket block text-yazi-3 tabular-nums">{y.koordinat}</span>
                </span>
                <span className="flex flex-col items-end justify-between gap-2 pt-1.5">
                  <span className="etiket whitespace-nowrap text-yazi-3">{y.repo}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-yazi-3 opacity-0 transition-[opacity,color,translate] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-murekkep group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
