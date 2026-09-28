import type { Ik } from '@/lib/tipler';

export const KISI = {
  ad: 'Berkay Karaca',
  github: 'https://github.com/Scryne',
  linkedin: 'https://www.linkedin.com/in/berkay-karaca-3619a8419',
};

export const HERO = {
  ust: { tr: 'Yazılım geliştirici', en: 'Software developer' } satisfies Ik,
  baslik: {
    tr: ['Yapay zekâyla kuruyorum.', 'Sonra ölçüyorum.'],
    en: ['I build with AI agents.', 'Then I measure.'],
  } satisfies Ik<string[]>,
  giris: {
    tr: 'Çok kiracılı SaaS, belge yapay zekâsı, OSINT ve endüstriyel yazılım geliştiriyorum. Kodu yapay zekâ ajanlarıyla yazıyorum; çalıştığına testle, değerlendirme setiyle ve gerçek veriyle uçtan uca koşuyla karar veriyorum.',
    en: 'I build multi-tenant SaaS, document AI, OSINT and industrial software. I write code with AI agents, and decide whether it works with tests, evaluation sets and end-to-end runs on real data.',
  } satisfies Ik,
};

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
