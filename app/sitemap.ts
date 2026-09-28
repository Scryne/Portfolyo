import type { MetadataRoute } from 'next';
import { PROJELER } from '@/content/projeler';
import { yol } from '@/lib/metin';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const tam = (y: string) => `${SITE_URL}${y}`;
  const ana = {
    url: tam(yol.ana('tr')),
    alternates: { languages: { tr: tam(yol.ana('tr')), en: tam(yol.ana('en')) } },
  };
  const projeler = PROJELER.map((p) => ({
    url: tam(yol.proje('tr', p.slug)),
    alternates: { languages: { tr: tam(yol.proje('tr', p.slug)), en: tam(yol.proje('en', p.slug)) } },
  }));
  return [ana, ...projeler];
}
