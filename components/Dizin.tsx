import { PROJELER } from '@/content/projeler';
import { KURE } from '@/content/site';
import { M, yol } from '@/lib/metin';
import { oneCikanOlcum } from '@/lib/olcum';
import type { Dil } from '@/lib/tipler';
import { Gorsel } from './Gorsel';
import { Sahne } from './Sahne';

/**
 * Tüm projeler: veri ve kareler sunucuda çözülür, kaydırma ve seçim Sahne'de. Her projenin sahne karesi
 * hero küresindeki kartla aynı (content/site.ts → KURE.kare), tek bir yerden seçilir.
 */
export function Dizin({ dil }: { dil: Dil }) {
  const kare = (slug: string) => {
    const k = KURE.find((x) => x.slug === slug);
    if (!k) throw new Error(`KURE'de karesi olmayan proje: ${slug}`);
    return k.kare;
  };
  const projeler = PROJELER.map((p) => {
    const o = oneCikanOlcum(p, dil);
    return {
      slug: p.slug,
      ad: p.ad,
      baslik: p.baslik[dil],
      alan: p.alan[dil],
      repo: p.repo.acik ? M.acikKaynak[dil] : M.ozelRepo[dil],
      href: yol.proje(dil, p.slug),
      olcum: { ne: o.ne[dil], once: o.once?.[dil], sonra: o.sonra[dil] },
    };
  });
  // Kareler süs: bilgi satırda yazılı, bağlantının adı projenin adı kalsın diye alt boş.
  const cizim = (sizes: string) =>
    PROJELER.map((p) => <Gorsel key={p.slug} proje={p.slug} ad={kare(p.slug)} alt="" sizes={sizes} className="size-full object-cover object-top" />);

  return (
    <Sahne
      projeler={projeler}
      sahneKareleri={cizim('(min-width: 1360px) 740px, 56vw')}
      satirKareleri={cizim('100vw')}
      baslik={M.tumProjeler[dil]}
      etiket={{ once: M.once[dil], sonra: M.sonra[dil] }}
    />
  );
}
