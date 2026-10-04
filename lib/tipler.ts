export type Dil = 'tr' | 'en';
export const DILLER: Dil[] = ['tr', 'en'];

/** İki dilli metin. Satır içi `**kalın**` ve `` `kod` `` desteklenir (bkz. components/Satir.tsx). */
export type Ik<T = string> = Record<Dil, T>;

/** Önce/sonra ölçümü. Her ölçüm `kaynak` alanıyla _portfolyo/projeler künyesine izlenir. */
export type Olcum = {
  /** Ne ölçüldü: "Çekilen RSS kaynağı" */
  ne: Ik;
  /** Eski değer (üstü çizilecek). Yoksa yalnız sonuç gösterilir. */
  once?: Ik;
  sonra: Ik;
  /** Kısa bağlam cümlesi. */
  not?: Ik;
  /** Cetvel: sayısal ölçek. `yon` iyi yönü söyler. */
  cetvel?: {
    min: number;
    max: number;
    once?: number;
    sonra: number;
    yon: 'yukari' | 'asagi';
    /** Uç etiketlerinin birimi: '%' TR'de öne, EN'de arkaya yazılır; diğerleri arkaya. */
    birim?: string;
    esik?: { deger: number; ad: Ik };
  };
  /** Kaynak dosya + alan: "Wartrack.md · Denetim" */
  kaynak: string;
};

export type Blok =
  | { tur: 'p'; metin: Ik }
  | { tur: 'liste'; ogeler: Ik<string[]> }
  | { tur: 'sirali'; ogeler: Ik<string[]> };

export type BolumId = 'problem' | 'ne-yapiyor' | 'yapay-zeka' | 'denetim' | 'tasarim' | 'ders';
/** Başlık verilmezse lib/metin.ts'deki standart başlık kullanılır. */
export type Bolum = { id: BolumId; baslik?: Ik; bloklar: Blok[] };

export type Kare = { ad: string; aciklama: Ik; mobil?: boolean };

export type Proje = {
  slug: string;
  ad: string;
  /** Alan etiketi: "İhale analizi · SaaS" */
  alan: Ik;
  /** Ad yanında duran tek satır. */
  baslik: Ik;
  tekCumle: Ik;
  /** Görünen dönem: "Tem 2026 – Eyl 2026" */
  donem: Ik;
  /** Sıralama için bitiş yılı-ayı. */
  yil: number;
  durum: Ik;
  repo: { acik: true; url: string } | { acik: false };
  demo: Ik;
  stack: { grup: Ik; ogeler: string }[];
  olcek: { ad: Ik; deger: Ik }[];
  olcumler: Olcum[];
  bolumler: Bolum[];
  sinirlar: Ik<string[]>;
  galeri: Kare[];
};
