import manifest from '@/lib/gorsel-manifest.json';

type Kayit = { w: number; h: number; genislikler: number[]; zemin: string };
const KAYITLAR = manifest as Record<string, Kayit>;

export function gorselKaydi(proje: string, ad: string): Kayit {
  const k = KAYITLAR[`${proje}/${ad}`];
  if (!k) throw new Error(`Görsel manifestte yok: ${proje}/${ad} (npm run gorseller)`);
  return k;
}

export const gorselYolu = (proje: string, ad: string, g: number) => `/g/${proje}/${ad}-${g}.webp`;

type Props = {
  proje: string;
  ad: string;
  alt: string;
  /** Tarayıcının hangi genişliği seçeceği: "(min-width: 1024px) 66vw, 100vw" */
  sizes: string;
  oncelik?: boolean;
  className?: string;
};

/** Duyarlı ekran görüntüsü. Boyut manifestten gelir; yer önceden ayrılır, kayma olmaz. */
export function Gorsel({ proje, ad, alt, sizes, oncelik = false, className }: Props) {
  const k = gorselKaydi(proje, ad);
  const srcSet = k.genislikler.map((g) => `${gorselYolu(proje, ad, g)} ${g}w`).join(', ');
  const orta = k.genislikler[Math.min(1, k.genislikler.length - 1)];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- statik export; varyantları kendimiz üretiyoruz
    <img
      src={gorselYolu(proje, ad, orta)}
      srcSet={srcSet}
      sizes={sizes}
      width={k.w}
      height={k.h}
      alt={alt}
      loading={oncelik ? 'eager' : 'lazy'}
      fetchPriority={oncelik ? 'high' : undefined}
      decoding="async"
      className={className}
      style={{ backgroundColor: k.zemin }}
    />
  );
}
