import type { KureYeri } from '@/components/Kure';
import { gorselKaydi, gorselYolu } from '@/components/Gorsel';
import { projeBul } from '@/content/projeler';
import { KURE } from '@/content/site';
import { yol } from './metin';
import type { Dil } from './tipler';

/** Küre yerlerini sunucuda çözer: proje adı, bağlantı, görsel varyantları ve alt metni. */
export function kureYerleri(dil: Dil): KureYeri[] {
  return KURE.map((k) => {
    const p = projeBul(k.slug);
    if (!p) throw new Error(`Kürede bilinmeyen proje: ${k.slug}`);
    const kare = p.galeri.find((g) => g.ad === k.kare);
    if (!kare) throw new Error(`Kürede bilinmeyen kare: ${k.slug}/${k.kare}`);
    const r = gorselKaydi(k.slug, k.kare);
    return {
      slug: k.slug,
      ad: p.ad,
      yer: k.yer[dil],
      ne: k.ne[dil],
      href: yol.proje(dil, k.slug),
      konum: k.konum,
      gorsel: {
        src: gorselYolu(k.slug, k.kare, r.genislikler[0]),
        srcSet: r.genislikler.map((g) => `${gorselYolu(k.slug, k.kare, g)} ${g}w`).join(', '),
        w: r.w,
        h: r.h,
        zemin: r.zemin,
        alt: `${p.ad}: ${kare.aciklama[dil]}`,
      },
    };
  });
}
