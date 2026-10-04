import type { Proje } from '@/lib/tipler';
import { aegis } from './aegis';
import { fabrikaos } from './fabrikaos';
import { ghostbuilding } from './ghostbuilding';
import { kokpit } from './kokpit';
import { mythatlas } from './mythatlas';
import { osintlab } from './osintlab';
import { politikdesk } from './politikdesk';
import { tenderiq } from './tenderiq';
import { wartrack } from './wartrack';
import { yapirisk } from './yapirisk';

/** Dizin ve "sonraki proje" sırası. CV'deki sırayla aynı başlar. */
export const PROJELER: Proje[] = [
  tenderiq,
  fabrikaos,
  aegis,
  ghostbuilding,
  yapirisk,
  wartrack,
  osintlab,
  politikdesk,
  mythatlas,
  kokpit,
];

export function projeBul(slug: string): Proje | undefined {
  return PROJELER.find((p) => p.slug === slug);
}

export function sonraki(slug: string): Proje {
  const i = PROJELER.findIndex((p) => p.slug === slug);
  return PROJELER[(i + 1) % PROJELER.length];
}
