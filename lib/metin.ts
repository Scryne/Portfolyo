import type { BolumId, Dil, Ik } from './tipler';

/** Arayüz metinleri. İçerik değil; düğme, etiket, gezinme. */
export const M = {
  navIsler: { tr: 'İşler', en: 'Work' },
  navYontem: { tr: 'Yöntem', en: 'Method' },
  navCv: { tr: 'CV', en: 'CV' },
  anaIcerigeGec: { tr: 'Ana içeriğe geç', en: 'Skip to main content' },
  temaAcik: { tr: 'Açık temaya geç', en: 'Switch to light theme' },
  temaKoyu: { tr: 'Koyu temaya geç', en: 'Switch to dark theme' },
  dilDegistir: { tr: 'Read in English', en: 'Türkçe oku' },
  isleriGor: { tr: 'İşleri gör', en: 'See the work' },
  cvIndir: { tr: 'CV’yi indir', en: 'Download CV' },
  once: { tr: 'bulunan', en: 'found' },
  sonra: { tr: 'ölçülen', en: 'measured' },
  seciliIsler: { tr: 'Seçilmiş işler', en: 'Selected work' },
  seciliIslerGiris: {
    tr: 'Üç proje, üç farklı alan. Her birinin vaka sayfasında ne yaptığı, nasıl kurulduğu, ne ölçüldüğü ve neyin hâlâ eksik olduğu yazıyor.',
    en: 'Three projects in three different fields. Each case study covers what it does, how it was built, what was measured and what is still missing.',
  },
  vakaOku: { tr: 'Vaka çalışmasını oku', en: 'Read the case study' },
  tumProjeler: { tr: 'Tüm projeler', en: 'All projects' },
  tumProjelerGiris: {
    tr: 'Dokuzu da Eylül 2026’da yeniden ölçüldü.',
    en: 'All nine were re-measured in September 2026.',
  },
  acikKaynak: { tr: 'Açık kaynak', en: 'Open source' },
  ozelRepo: { tr: 'Özel repo', en: 'Private repo' },
  yontemBaslik: { tr: 'Nasıl çalışıyorum', en: 'How I work' },
  yontemGiris: {
    tr: 'Yapay zekâ ajanı hızı verir. Güveni süreç verir: yazılı kararlar, teste bağlanmış kurallar ve gerçek veriyle ölçüm.',
    en: 'The AI agent brings speed. Trust comes from process: decisions on record, rules bound to tests, and measurement on real data.',
  },
  ornek: { tr: 'Örnek', en: 'Example' },
  cvBaslik: { tr: 'CV ve iletişim', en: 'CV and contact' },
  cvGiris: {
    tr: 'Tek sayfalık CV Türkçe ve İngilizce. Bana e-postayla ya da LinkedIn’den ulaşabilirsiniz; açık projelerin kodu GitHub’da.',
    en: 'A one-page CV in Turkish and English. Reach me by email or on LinkedIn; the open projects’ code is on GitHub.',
  },
  cvTr: { tr: 'CV · Türkçe', en: 'CV · Turkish' },
  cvEn: { tr: 'CV · İngilizce', en: 'CV · English' },
  pdf: { tr: 'PDF', en: 'PDF' },
  eposta: { tr: 'E-posta', en: 'Email' },
  geri: { tr: 'Tüm işler', en: 'All work' },
  kunye: { tr: 'Künye', en: 'Fact sheet' },
  donem: { tr: 'Dönem', en: 'Period' },
  durum: { tr: 'Durum', en: 'Status' },
  repo: { tr: 'Repo', en: 'Repository' },
  demo: { tr: 'Demo', en: 'Demo' },
  olcek: { tr: 'Ölçek', en: 'Scale' },
  olcumler: { tr: 'Ölçümler', en: 'Measurements' },
  olcumlerGiris: {
    tr: 'Üstü çizili değer bulunan durum, yanındaki düzeltmeden sonra ölçülen. Her sayının kaynağı projenin kendi kaydı.',
    en: 'The struck-through value is what was found, the one beside it what was measured after the fix. Every number comes from the project’s own record.',
  },
  sinirlar: { tr: 'Dürüst sınırlar', en: 'Honest limits' },
  sinirlarGiris: {
    tr: 'Bu projenin yapmadığı ya da henüz kanıtlanmamış olanlar.',
    en: 'What this project does not do, or has not proven yet.',
  },
  stack: { tr: 'Teknoloji', en: 'Stack' },
  ekranlar: { tr: 'Ekranlar', en: 'Screens' },
  buyut: { tr: 'Büyüt', en: 'Enlarge' },
  kapat: { tr: 'Kapat', en: 'Close' },
  oncekiKare: { tr: 'Önceki ekran', en: 'Previous screen' },
  sonrakiKare: { tr: 'Sonraki ekran', en: 'Next screen' },
  sonrakiProje: { tr: 'Sonraki proje', en: 'Next project' },
  icindekiler: { tr: 'Bu sayfada', en: 'On this page' },
  esik: { tr: 'eşik', en: 'threshold' },
  iyiYon: { tr: 'iyi yön', en: 'better' },
  artis: { tr: 'yukarı', en: 'higher' },
  azalis: { tr: 'aşağı', en: 'lower' },
  altbilgi: {
    tr: 'Bu site statik; çerez, analitik ya da izleme yok.',
    en: 'This site is static; no cookies, analytics or tracking.',
  },
} satisfies Record<string, Ik>;

export const BOLUM_BASLIK: Record<BolumId, Ik> = {
  problem: { tr: 'Problem', en: 'The problem' },
  'ne-yapiyor': { tr: 'Ne yapıyor', en: 'What it does' },
  'yapay-zeka': { tr: 'Yapay zekâyla nasıl kuruldu', en: 'How it was built with AI' },
  denetim: { tr: 'Eylül 2026 denetimi', en: 'September 2026 audit' },
  tasarim: { tr: 'Tasarım', en: 'Design' },
  ders: { tr: 'Ders', en: 'Takeaway' },
};

export const t = (ik: Ik, dil: Dil) => ik[dil];

/** Rotalar: TR kökte, EN /en altında. trailingSlash açık. */
export const yol = {
  ana: (dil: Dil) => (dil === 'tr' ? '/' : '/en/'),
  proje: (dil: Dil, slug: string) => (dil === 'tr' ? `/projeler/${slug}/` : `/en/projects/${slug}/`),
  cv: (dil: Dil) => `/cv/Berkay-Karaca-CV-${dil.toUpperCase()}.pdf`,
};

/** Bir yolun öbür dildeki karşılığı (dil anahtarı için). */
export function karsilik(yolAdi: string): string {
  const p = yolAdi.endsWith('/') ? yolAdi : yolAdi + '/';
  const tr = p.match(/^\/projeler\/([^/]+)\/$/);
  if (tr) return `/en/projects/${tr[1]}/`;
  const en = p.match(/^\/en\/projects\/([^/]+)\/$/);
  if (en) return `/projeler/${en[1]}/`;
  if (p.startsWith('/en/')) return '/';
  return '/en/';
}

export const dilOf = (yolAdi: string): Dil => (yolAdi.startsWith('/en') ? 'en' : 'tr');
