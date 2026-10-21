import { PROJELER } from '@/content/projeler';
import { HARITA_ORANI, projeYeri } from '@/lib/konum';
import type { Dil } from '@/lib/tipler';

/** Kesitin büyütmesi ve en-boy oranı. 4×: Türkiye'deki komşu projeler ayrı noktalar olarak görünür. */
const BUYUTME = 4;
const KESIT_ORANI = 3;

/**
 * Vaka sayfasının künyesindeki konum kesiti: atlas haritasının proje çevresine yakınlaşmış hali.
 * Seçili proje ortada, komşu projeler soluk. Statik (CSS); bilgi yanındaki satırda yazılı, kesit
 * ekran okuyucudan gizli.
 */
export function HaritaKesiti({ slug, dil }: { slug: string; dil: Dil }) {
  const [px, py] = projeYeri(slug, dil).pin;
  const sol = 50 - BUYUTME * px;
  const ust = 50 - (py * BUYUTME * KESIT_ORANI) / HARITA_ORANI;
  return (
    <div aria-hidden className="relative w-full overflow-hidden rounded-sm border border-cizgi bg-zemin-2" style={{ aspectRatio: KESIT_ORANI }}>
      <div className="absolute" style={{ width: `${BUYUTME * 100}%`, aspectRatio: HARITA_ORANI, left: `${sol}%`, top: `${ust}%` }}>
        <div className="harita-zemin-sik absolute inset-0" />
        {PROJELER.filter((p) => p.slug !== slug).map((p) => {
          const [x, y] = projeYeri(p.slug, dil).pin;
          return <span key={p.slug} className="atlas-pin opacity-70" style={{ left: `${x}%`, top: `${y}%` }} />;
        })}
        <span className="atlas-pin" data-aktif style={{ left: `${px}%`, top: `${py}%` }} />
      </div>
      <span className="atlas-cizgi atlas-cizgi-y" style={{ left: '50%' }} />
      <span className="atlas-cizgi atlas-cizgi-x" style={{ top: '50%' }} />
    </div>
  );
}
