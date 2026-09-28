import { PROJELER } from '@/content/projeler';
import type { Dil } from './tipler';

/** Hero grafiğinde bir çizgi: bir ölçümün önce → sonra hali, iki eksende yüzde konumuyla. */
export type EgimCizgisi = {
  slug: string;
  proje: string;
  ne: string;
  once: string;
  sonra: string;
  /** Dikey konum, yüzde. 0 = üst (iyi), 100 = alt (kötü). */
  yOnce: number;
  ySonra: number;
};

const UST = 6;
const ALT = 94;
/** Aynı değere düşen uçlar üst üste binmesin: iki uç arası en az bu kadar yüzde. */
const ARALIK = 2.4;

/** Değeri kendi ölçeğinde 0–1'e çevirir; 1 her zaman "daha iyi". */
function skor(deger: number, min: number, max: number, yon: 'yukari' | 'asagi') {
  const t = (deger - min) / (max - min);
  return yon === 'yukari' ? t : 1 - t;
}

const konum = (s: number) => UST + (1 - s) * (ALT - UST);

/** Uçları sırayı bozmadan en az ARALIK kadar ayırır, sonra eksen içinde tutar. */
function ayir(ys: number[]): number[] {
  const sira = ys.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
  for (let k = 1; k < sira.length; k++) sira[k].y = Math.max(sira[k].y, sira[k - 1].y + ARALIK);
  const tasma = sira[sira.length - 1].y - ALT;
  if (tasma > 0) {
    sira[sira.length - 1].y = ALT;
    for (let k = sira.length - 2; k >= 0; k--) sira[k].y = Math.min(sira[k].y, sira[k + 1].y - ARALIK);
  }
  const sonuc = new Array<number>(ys.length);
  for (const { y, i } of sira) sonuc[i] = y;
  return sonuc;
}

/** Önce ve sonra değeri sayısal olarak bilinen bütün ölçümler. */
export function egimCizgileri(dil: Dil): EgimCizgisi[] {
  const ham = PROJELER.flatMap((p) =>
    p.olcumler.flatMap((o) => {
      const c = o.cetvel;
      if (!c || c.once === undefined || !o.once) return [];
      return [
        {
          slug: p.slug,
          proje: p.ad,
          ne: o.ne[dil],
          once: o.once[dil],
          sonra: o.sonra[dil],
          yOnce: konum(skor(c.once, c.min, c.max, c.yon)),
          ySonra: konum(skor(c.sonra, c.min, c.max, c.yon)),
        },
      ];
    }),
  );
  const onceler = ayir(ham.map((c) => c.yOnce));
  const sonralar = ayir(ham.map((c) => c.ySonra));
  return ham.map((c, i) => ({ ...c, yOnce: onceler[i], ySonra: sonralar[i] }));
}
