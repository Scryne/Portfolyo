import { PROJELER } from '@/content/projeler';
import { HARITA_ORANI, projeYeri } from '@/lib/konum';
import { M } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { Atlas } from './Atlas';

/** Tüm projeler: veri sunucuda çözülür, etkileşim (hangi iğne yanıyor) Atlas'ta. */
export function Dizin({ dil }: { dil: Dil }) {
  return <Atlas yerler={PROJELER.map((p) => projeYeri(p.slug, dil))} baslik={M.tumProjeler[dil]} oran={HARITA_ORANI} />;
}
