import { projeBul } from '@/content/projeler';
import { KURE } from '@/content/site';
import harita from './harita.json';
import { M, yol } from './metin';
import type { Dil } from './tipler';

/** Haritanın en-boy oranı ve projelerin yüzde konumu (scripts/harita.mjs üretir). */
export const HARITA_ORANI = harita.oran;

/** "39,93° K · 32,85° D" / "39.93° N · 32.85° E". Batı ve güney işaretle değil harfle. */
export function koordinatMetni([enlem, boylam]: [number, number], dil: Dil) {
  const sayi = (n: number) => Math.abs(n).toFixed(2).replace('.', dil === 'tr' ? ',' : '.');
  const k = dil === 'tr' ? (enlem >= 0 ? 'K' : 'G') : enlem >= 0 ? 'N' : 'S';
  const d = dil === 'tr' ? (boylam >= 0 ? 'D' : 'B') : boylam >= 0 ? 'E' : 'W';
  return `${sayi(enlem)}° ${k} · ${sayi(boylam)}° ${d}`;
}

export type AtlasYeri = {
  slug: string;
  ad: string;
  baslik: string;
  alan: string;
  yer: string;
  koordinat: string;
  repo: string;
  href: string;
  /** Haritada yüzde konum [x, y]. */
  pin: [number, number];
};

const pinler = harita.pinler as unknown as Record<string, [number, number]>;

/** Atlas ve vaka sayfaları için projenin yeri. Kaynak küreyle aynı: content/site.ts → KURE. */
export function projeYeri(slug: string, dil: Dil): AtlasYeri {
  const k = KURE.find((x) => x.slug === slug);
  const p = projeBul(slug);
  const pin = pinler[slug];
  if (!k || !p || !pin) throw new Error(`Haritada bilinmeyen proje: ${slug} (npm run harita)`);
  return {
    slug,
    ad: p.ad,
    baslik: p.baslik[dil],
    alan: p.alan[dil],
    yer: k.yer[dil],
    koordinat: koordinatMetni(k.konum, dil),
    repo: p.repo.acik ? M.acikKaynak[dil] : M.ozelRepo[dil],
    href: yol.proje(dil, slug),
    pin,
  };
}

const YONLER: Record<Dil, string[]> = {
  tr: ['kuzey', 'kuzeydoğu', 'doğu', 'güneydoğu', 'güney', 'güneybatı', 'batı', 'kuzeybatı'],
  en: ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'],
};

/**
 * İki projenin yeri arasındaki büyük daire mesafesi ve ilk yön: "1.030 km güneydoğu". Vaka
 * sayfasının "Sonraki proje" bağlantısında; atlasın dili sayfa sonunda da sürer. 50 km altı
 * aynı yer sayılır.
 */
export function rota(neredenSlug: string, nereyeSlug: string, dil: Dil) {
  const a = KURE.find((x) => x.slug === neredenSlug)?.konum;
  const b = KURE.find((x) => x.slug === nereyeSlug)?.konum;
  if (!a || !b) return null;
  const r = (d: number) => (d * Math.PI) / 180;
  const [f1, f2, dl] = [r(a[0]), r(b[0]), r(b[1] - a[1])];
  const h = Math.sin((f2 - f1) / 2) ** 2 + Math.cos(f1) * Math.cos(f2) * Math.sin(dl / 2) ** 2;
  const km = 2 * 6371 * Math.asin(Math.sqrt(h));
  if (km < 50) return dil === 'tr' ? 'aynı şehir' : 'same city';
  const yon = (Math.atan2(Math.sin(dl) * Math.cos(f2), Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl)) * 180) / Math.PI;
  const i = Math.round(((yon + 360) % 360) / 45) % 8;
  const mesafe = (Math.round(km / 10) * 10).toLocaleString(dil === 'tr' ? 'tr-TR' : 'en-US');
  return `${mesafe} km ${YONLER[dil][i]}`;
}
