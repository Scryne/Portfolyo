import type { Dil, Olcum, Proje } from './tipler';

/** Projenin vitrindeki ölçümü: önce/sonra'sı kısa ve sayısal olan ilk ölçüm; yoksa "önce"si olan ilki. */
export function oneCikanOlcum(p: Proje, dil: Dil): Olcum {
  const sayisal = (s: string) => /^[\d.,%/ ]+$/.test(s);
  return (
    p.olcumler.find((x) => x.once && sayisal(x.once[dil]) && sayisal(x.sonra[dil])) ??
    p.olcumler.find((x) => x.once) ??
    p.olcumler[0]
  );
}
