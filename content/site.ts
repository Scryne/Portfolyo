import type { Ik } from '@/lib/tipler';

export const KISI = {
  ad: 'Berkay Karaca',
  github: 'https://github.com/Scryne',
  linkedin: 'https://www.linkedin.com/in/berkay-karaca-3619a8419',
  // Scryne onayıyla (2026-09-28). Parçalı tutulur, bkz. components/EpostaSatiri.tsx.
  eposta: { kullanici: 'berkaykaraca10', alan: 'gmail.com' },
};

export const HERO = {
  ust: { tr: 'Yazılım geliştirici', en: 'Software developer' } satisfies Ik,
  giris: {
    tr: 'Haritada olayları izleyen, uydu görüntüsünde gizlenmiş yapıları bulan, ihale şartnamesini okuyan yazılımlar geliştiriyorum.',
    en: 'I build software that tracks events on a map, finds structures hidden in satellite imagery and reads tender specifications.',
  } satisfies Ik,
};

/**
 * Hero küresi: projelerin gerçekten geçtiği yerler. `kare` projenin galerisindeki görsel;
 * alt metni oradan gelir. Konum [enlem, boylam].
 */
export const KURE: { slug: string; kare: string; konum: [number, number]; yer: Ik; ne: Ik }[] = [
  {
    slug: 'wartrack',
    kare: 'pano',
    konum: [32.5, 35.5],
    yer: { tr: 'Levant · İran–İsrail hattı', en: 'Levant · Iran–Israel theatre' },
    ne: {
      tr: '15 kaynaktan gelen haberi haritaya yerleştirir, tehdit seviyesini gerekçesiyle hesaplar.',
      en: 'Places news from 15 sources on a map and computes a threat level with its reasons.',
    },
  },
  {
    slug: 'ghostbuilding',
    kare: 'bulgu',
    konum: [48.3, -4.5],
    yer: { tr: 'Île Longue · Fransa', en: 'Île Longue · France' },
    ne: {
      tr: 'Üç uydu kaynağını karşılaştırır, bulanıklaştırılmış ya da mozaiklenmiş yerleri işaretler.',
      en: 'Compares three satellite sources and flags places that were blurred or mosaicked.',
    },
  },
  {
    slug: 'mythatlas',
    kare: 'ilyada',
    konum: [39.96, 26.24],
    yer: { tr: 'Truva · Çanakkale', en: 'Troy · Çanakkale' },
    ne: {
      tr: '157 mit, 212 tanrı ve 104 kutsal alanı dünya haritasında birbirine bağlar.',
      en: 'Links 157 myths, 212 deities and 104 sacred sites on a world map.',
    },
  },
  {
    slug: 'mythatlas',
    kare: 'abu-simbel',
    konum: [22.34, 31.63],
    yer: { tr: 'Abu Simbel · Mısır', en: 'Abu Simbel · Egypt' },
    ne: {
      tr: 'Her görselin, kaynağın ve UNESCO iddiasının doğrulanabilir kaldığı bir mitoloji atlası.',
      en: 'A mythology atlas where every image, source and UNESCO claim stays verifiable.',
    },
  },
  {
    slug: 'tenderiq',
    kare: 'inceleme-koyu',
    konum: [39.93, 32.85],
    yer: { tr: 'Türkiye · kamu ihaleleri', en: 'Türkiye · public tenders' },
    ne: {
      tr: 'Türkçe ihale şartnamesinden gereksinim, belge ve riskleri kaynağıyla çıkarır.',
      en: 'Extracts requirements, documents and risks from Turkish tender specifications, with sources.',
    },
  },
];

/**
 * Hero'daki denetim defteri. Her satırın sayısı ilgili projenin `olcumler` alanında da durur;
 * burada yalnız daha kısa yazılıyor. Kaynak: _portfolyo/projeler/<Proje>.md
 */
export const DEFTER: { slug: string; ne: Ik; once: Ik; sonra: Ik }[] = [
  {
    slug: 'wartrack',
    ne: { tr: 'Haber çekilen RSS kaynağı', en: 'RSS feeds actually fetched' },
    once: { tr: '0/15', en: '0/15' },
    sonra: { tr: '15/15', en: '15/15' },
  },
  {
    slug: 'ghostbuilding',
    ne: { tr: 'Sıradan konumda yanlış alarm', en: 'False alarms on ordinary locations' },
    once: { tr: '39/40', en: '39/40' },
    sonra: { tr: '0/7', en: '0/7' },
  },
  {
    slug: 'mythatlas',
    ne: { tr: 'Kaynak kaydı; uydurma ve kalıp atıflar çıktı', en: 'Source records; fabricated and boilerplate citations removed' },
    once: { tr: '1.826', en: '1,826' },
    sonra: { tr: '274', en: '274' },
  },
  {
    slug: 'tenderiq',
    ne: { tr: 'Yüksek ve kritik güvenlik açığı', en: 'High and critical vulnerabilities' },
    once: { tr: '8', en: '8' },
    sonra: { tr: '0', en: '0' },
  },
  {
    slug: 'osintlab',
    ne: { tr: 'Entity çıkarımında kaçırma; LLM’siz', en: 'Entity extraction miss rate, without an LLM' },
    once: { tr: '%7,4', en: '7.4%' },
    sonra: { tr: '%4,4', en: '4.4%' },
  },
];

export const DEFTER_METNI = {
  baslik: { tr: 'Eylül 2026 denetimi', en: 'September 2026 audit' },
  aciklama: {
    tr: 'Dokuz projemi yeniden ölçtüm. Testler yeşildi; ürünler her zaman çalışmıyordu. Üstü çizili değer bulduğum durum, yanındaki düzeltmeden sonra ölçülen.',
    en: 'I re-measured all nine of my projects. The tests were green; the products did not always work. The struck-through value is what I found, the one beside it is what I measured after the fix.',
  },
};

export const YONTEM: { baslik: Ik; metin: Ik; ornek: Ik; slug?: string }[] = [
  {
    baslik: { tr: 'Problemi ve kapsam dışını yazarım', en: 'Write down the problem and what is out of scope' },
    metin: {
      tr: 'Her proje bir fikir dokümanıyla başlar: kimin sorunu, v1’de ne olmak zorunda, bilerek ne yapılmayacak.',
      en: 'Every project starts with an idea document: whose problem it is, what v1 must include, what is deliberately left out.',
    },
    ornek: {
      tr: 'OsintLab: GEOINT ve SOCMINT kapıyı geçemediği için açılmadı.',
      en: 'OsintLab: GEOINT and SOCMINT were not opened because they failed the gate.',
    },
    slug: 'osintlab',
  },
  {
    baslik: { tr: 'Riskli kararı önce ölçerim', en: 'Measure the risky decision first' },
    metin: {
      tr: 'Bilmediğim bir teknoloji ya da kütüphane varsa kod yazmadan küçük bir deneyle sınarım; karar sayıyla verilir.',
      en: 'If a technology or library is unknown to me, I test it with a small spike before writing code; the decision is made with a number.',
    },
    ornek: {
      tr: 'OsintLab: aynı şemada KùzuDB 353 ms, Neo4j 3.033 ms. Kokpit: ConPTY için beş spawn varyantı.',
      en: 'OsintLab: same schema, KùzuDB 353 ms vs Neo4j 3,033 ms. Kokpit: five spawn variants for ConPTY.',
    },
    slug: 'osintlab',
  },
  {
    baslik: { tr: 'Kararları kayda geçiririm', en: 'Put decisions on record' },
    metin: {
      tr: 'Final doküman ve mimari karar kayıtları (ADR). Yapay zekâ ajanı bağlamı her oturumda sıfırdan kurmaz, aynı kayıttan okur.',
      en: 'A final document and architecture decision records (ADRs). The AI agent does not rebuild context every session; it reads the same record.',
    },
    ornek: {
      tr: 'FabrikaOS: 24 ADR, her sprint için tasarım belgesi ve uygulama planı.',
      en: 'FabrikaOS: 24 ADRs, a design document and implementation plan per sprint.',
    },
    slug: 'fabrikaos',
  },
  {
    baslik: { tr: 'Güvenlik kuralını teste bağlarım', en: 'Turn safety rules into tests' },
    metin: {
      tr: 'Faz faz yol haritası, her fazın ölçülebilir bir “bitti” kriteri. “Yanlış olursa veri sızar” türü kurallar CI kapısıdır, cümle değil.',
      en: 'A phased roadmap, each phase with a measurable “done” criterion. Rules of the “if this is wrong, data leaks” kind are CI gates, not sentences.',
    },
    ornek: {
      tr: 'AEGIS: kiracı sızıntısı testi ve %100 recall kapısı kırmızıysa birleştirme yapılamaz.',
      en: 'AEGIS: if the tenant-leak test or the 100% recall gate is red, nothing merges.',
    },
    slug: 'aegis',
  },
  {
    baslik: { tr: 'Gerçek veriyle uçtan uca koşarım', en: 'Run it end to end on real data' },
    metin: {
      tr: '“Testler yeşil” ile “ürün çalışıyor” ayrı ölçümler. Bitti demeden önce ürünü gerçek bir girdiyle baştan sona çalıştırırım.',
      en: '“Tests pass” and “the product works” are separate measurements. Before calling it done, I run the product start to finish on a real input.',
    },
    ornek: {
      tr: 'TenderIQ: model emekliye ayrılmıştı; birim testleri değil, gerçek bir şartnameyle koşu yakaladı.',
      en: 'TenderIQ: its model had been retired; a run on a real tender caught it, not the unit tests.',
    },
    slug: 'tenderiq',
  },
];

/** Ana sayfada sergilenen üç proje ve kapak kareleri. */
export const SERGI: { slug: string; kare: string; ikinci?: string }[] = [
  { slug: 'tenderiq', kare: 'inceleme' },
  { slug: 'ghostbuilding', kare: 'bulgu', ikinci: 'maptiler' },
  { slug: 'fabrikaos', kare: 'pano', ikinci: 'mobil' },
];
