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
    tr: 'Uydu görüntüsünde gizlenmiş yapıları bulan, binanın deprem riskini resmî yöntemle ön değerlendiren, ihale şartnamesini okuyan yazılımlar geliştiriyorum.',
    en: 'I build software that finds structures hidden in satellite imagery, pre-assesses a building’s earthquake risk with the official method and reads tender specifications.',
  } satisfies Ik,
};

/** Arama/paylaşım açıklaması: hero cümlesinden geniş, bütün kapsamı anlatır. */
export const OZET = {
  tr: 'Çok kiracılı SaaS, belge yapay zekâsı, OSINT, harita ve endüstriyel yazılım geliştiriyorum. On bir projenin vaka çalışması, ölçümleri ve CV.',
  en: 'I build multi-tenant SaaS, document AI, OSINT, mapping and industrial software. Case studies, measurements and CV for eleven projects.',
} satisfies Ik;

/**
 * Hero küresi: her proje bir kez. Konumlar coğrafi değil (Scryne 2026-10-21: projelere ülke atanmaz); noktalar
 * küreye dağılsın diye kıtalara serpildi. Sıra turun sırasıdır. `kare` projenin galerisindeki görsel; alt metni
 * oradan gelir. Konum [enlem, boylam].
 */
export const KURE: { slug: string; kare: string; konum: [number, number]; ne: Ik }[] = [
  {
    slug: 'citefield',
    kare: 'inceleme',
    konum: [-40, -66],
    ne: {
      tr: 'Faturadan okunan her değeri sayfadaki kelimelerine bağlar; kontrolden geçemeyeni gerekçesiyle insana gönderir.',
      en: 'Ties every value read from an invoice to its words on the page; whatever fails a check goes to a person with the reason.',
    },
  },
  {
    slug: 'yapirisk',
    kare: 'sonuc',
    konum: [34, -98],
    ne: {
      tr: '2,2 milyon binada deprem riskini resmî yöntemle ön değerlendirir; sonuç gerekçeli bir inceleme önceliği.',
      en: 'Pre-assesses earthquake risk for 2.2 million buildings with the official method; the result is a reasoned inspection priority.',
    },
  },
  {
    slug: 'kokpit',
    kare: 'pano',
    konum: [-14, -52],
    ne: {
      tr: 'Bütün projeleri tek panoda gösterir; Claude Code oturumlarını açar ve ne yaptıklarını canlı izler.',
      en: 'Shows every project on one board; opens Claude Code sessions and watches what they do, live.',
    },
  },
  {
    slug: 'fabrikaos',
    kare: 'harita',
    konum: [61, 98],
    ne: {
      tr: '22 iş modülüyle çok kiracılı MES + ERP; sahadan MQTT ile canlı OEE toplar.',
      en: 'Multi-tenant MES + ERP with 22 business modules; collects live OEE from the shop floor over MQTT.',
    },
  },
  {
    slug: 'tenderiq',
    kare: 'inceleme-koyu',
    konum: [-24, 134],
    ne: {
      tr: 'Türkçe ihale şartnamesinden gereksinim, belge ve riskleri kaynağıyla çıkarır.',
      en: 'Extracts requirements, documents and risks from Turkish tender specifications, with sources.',
    },
  },
  {
    slug: 'aegis',
    kare: 'eslesme',
    konum: [6, 22],
    ne: {
      tr: 'Şirketi ve yöneticilerini yaptırım/PEP ve MASAK listelerinde tarar; analist kararı gerekçesiyle kayda geçer.',
      en: 'Screens a company and its directors against sanctions/PEP and MASAK lists; the analyst’s decision is recorded with its rationale.',
    },
  },
  {
    slug: 'politikdesk',
    kare: 'olay',
    konum: [33, 108],
    ne: {
      tr: '101 kaynaktan gündemi toplar; bir iddianın doğruluğunu yapay zekâ değil deterministik kurallar belirler.',
      en: 'Gathers the agenda from 101 sources; deterministic rules, not AI, decide whether a claim holds.',
    },
  },
  {
    slug: 'wartrack',
    kare: 'pano',
    konum: [58, -112],
    ne: {
      tr: '15 kaynaktan gelen haberi haritaya yerleştirir, tehdit seviyesini gerekçesiyle hesaplar.',
      en: 'Places news from 15 sources on a map and computes a threat level with its reasons.',
    },
  },
  {
    slug: 'mythatlas',
    kare: 'abu-simbel',
    konum: [-29, 24],
    ne: {
      tr: '157 mit, 212 tanrı ve 104 kutsal alanı dünya haritasında bağlar; her kaynak doğrulanabilir kalır.',
      en: 'Links 157 myths, 212 deities and 104 sacred sites on a world map; every source stays verifiable.',
    },
  },
  {
    slug: 'ghostbuilding',
    kare: 'bulgu',
    konum: [50, 12],
    ne: {
      tr: 'Üç uydu kaynağını karşılaştırır, bulanıklaştırılmış ya da mozaiklenmiş yerleri işaretler.',
      en: 'Compares three satellite sources and flags places that were blurred or mosaicked.',
    },
  },
  {
    slug: 'osintlab',
    kare: 'graf',
    konum: [21, 78],
    ne: {
      tr: 'Her bilgiyi kaynağına ve kanıtına bağlar, güvenilirliğini deterministik bir formülle puanlar.',
      en: 'Ties every fact to its source and evidence, and scores its reliability with a deterministic formula.',
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
    slug: 'politikdesk',
    ne: { tr: 'CI’ın kırmızı kaldığı hafta', en: 'Weeks CI stayed red' },
    once: { tr: '5+', en: '5+' },
    sonra: { tr: '0', en: '0' },
  },
];

export const DEFTER_METNI = {
  baslik: { tr: 'Eylül 2026 denetimi', en: 'September 2026 audit' },
  aciklama: {
    tr: 'Üstü çizili: bulduğum durum. Yanındaki: düzeltmeden sonra ölçülen.',
    en: 'Struck through: what I found. Beside it: measured after the fix.',
  },
};

export const YONTEM: { baslik: Ik; ornek: Ik; slug?: string }[] = [
  {
    baslik: { tr: 'Problemi ve kapsam dışını yazarım', en: 'Write down the problem and what is out of scope' },
    ornek: {
      tr: 'OsintLab: GEOINT ve SOCMINT kapıyı geçemediği için açılmadı.',
      en: 'OsintLab: GEOINT and SOCMINT were not opened because they failed the gate.',
    },
    slug: 'osintlab',
  },
  {
    baslik: { tr: 'Riskli kararı önce ölçerim', en: 'Measure the risky decision first' },
    ornek: {
      tr: 'OsintLab: aynı şemada KùzuDB 353 ms, Neo4j 3.033 ms. Kokpit: ConPTY için beş spawn varyantı.',
      en: 'OsintLab: same schema, KùzuDB 353 ms vs Neo4j 3,033 ms. Kokpit: five spawn variants for ConPTY.',
    },
    slug: 'osintlab',
  },
  {
    baslik: { tr: 'Kararları kayda geçiririm', en: 'Put decisions on record' },
    ornek: {
      tr: 'FabrikaOS: 24 ADR, her sprint için tasarım belgesi ve uygulama planı.',
      en: 'FabrikaOS: 24 ADRs, a design document and implementation plan per sprint.',
    },
    slug: 'fabrikaos',
  },
  {
    baslik: { tr: 'Güvenlik kuralını teste bağlarım', en: 'Turn safety rules into tests' },
    ornek: {
      tr: 'AEGIS: kiracı sızıntısı testi ve %100 recall kapısı kırmızıysa birleştirme yapılamaz.',
      en: 'AEGIS: if the tenant-leak test or the 100% recall gate is red, nothing merges.',
    },
    slug: 'aegis',
  },
  {
    baslik: { tr: 'Gerçek veriyle uçtan uca koşarım', en: 'Run it end to end on real data' },
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
