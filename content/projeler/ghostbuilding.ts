import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/GhostBuilding.md
export const ghostbuilding: Proje = {
  slug: 'ghostbuilding',
  ad: 'GhostBuilding',
  alan: { tr: 'OSINT · Görüntü analizi', en: 'OSINT · Image analysis' },
  baslik: {
    tr: 'Uydu kaynakları arasındaki farklardan sansür ve değişim tespiti',
    en: 'Detecting censorship and change from differences between satellite sources',
  },
  tekCumle: {
    tr: 'Aynı konumun Esri, MapTiler ve IGN uydu karolarını karşılaştırır, sıradan konumlardan ölçülmüş bir tabana göre sıra dışı olan farkları (bulanıklaştırma, mozaik, görüntü uyuşmazlığı) işaretler ve her bulguyu kanıt karolarıyla gösterir.',
    en: 'Compares Esri, MapTiler and IGN satellite tiles of the same place, flags differences that are unusual against a baseline measured on ordinary locations (blurring, mosaicking, mismatched imagery), and shows every finding with its evidence tiles.',
  },
  donem: { tr: 'Nis 2026 – Eyl 2026', en: 'Apr 2026 – Sep 2026' },
  yil: 202609,
  durum: {
    tr: 'Çalışır; bina dedektörü ve tarihsel değişim bilerek kapalı',
    en: 'Working; building detector and historical change deliberately disabled',
  },
  repo: { acik: true, url: 'https://github.com/Scryne/GhostBuilding' },
  demo: {
    tr: 'Yok. Yerelde, gerçek motorla üretilmiş referans taramasıyla çalışır.',
    en: 'None. Runs locally with a reference scan produced by the real engine.',
  },
  stack: [
    { grup: { tr: 'Backend', en: 'Backend' }, ogeler: 'Python 3.12, FastAPI, SQLAlchemy 2 (async) + GeoAlchemy2, PostgreSQL + PostGIS, Celery + Redis' },
    { grup: { tr: 'Görüntü', en: 'Imaging' }, ogeler: 'OpenCV, scikit-image (SSIM), Laplacian varyansı, FFT, bölgesel bulanıklık haritası' },
    { grup: { tr: 'Kaynaklar', en: 'Sources' }, ogeler: 'Esri World Imagery, MapTiler Satellite, IGN Géoplateforme ortofoto, Esri Wayback' },
    { grup: { tr: 'Frontend', en: 'Frontend' }, ogeler: 'Next.js 16, React 19, MapLibre GL 6, Tailwind' },
  ],
  olcek: [
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: '230 (backend)', en: '230 (backend)' } },
    { ad: { tr: 'Kalibrasyon', en: 'Calibration' }, deger: { tr: '40 + 20 sıradan konum', en: '40 + 20 ordinary locations' } },
    { ad: { tr: 'Referans tarama', en: 'Reference scan' }, deger: { tr: '27 konum', en: '27 locations' } },
    { ad: { tr: 'CI', en: 'CI' }, deger: { tr: 'backend + frontend + Docker + Lighthouse', en: 'backend + frontend + Docker + Lighthouse' } },
  ],
  olcumler: [
    {
      ne: { tr: 'Sıradan konumda yanlış alarm', en: 'False alarms on ordinary locations' },
      once: { tr: '39/40', en: '39/40' },
      sonra: { tr: '0/7', en: '0/7' },
      not: { tr: 'Önce: kalibrasyonsuz %15 eşiği. Sonra: referans taramasındaki kontrol konumları.', en: 'Before: the uncalibrated 15% threshold. After: control sites in the reference scan.' },
      cetvel: { min: 0, max: 100, once: 97.5, sonra: 0, yon: 'asagi', birim: '%' },
      kaynak: 'GhostBuilding.md · Yapay zekâ 1 + Ne yapıyor',
    },
    {
      ne: { tr: 'Kamuya açık kaynaklarda adı geçen tesis', en: 'Publicly documented sites flagged' },
      sonra: { tr: '3/20 işaretlendi', en: '3/20 flagged' },
      not: { tr: 'Avord, Volkel, Île Longue.', en: 'Avord, Volkel, Île Longue.' },
      cetvel: { min: 0, max: 20, sonra: 3, yon: 'yukari' },
      kaynak: 'GhostBuilding.md · Ne yapıyor',
    },
    {
      ne: { tr: 'Île Longue anomali puanı, tabana göre', en: 'Île Longue anomaly score, against the baseline' },
      sonra: { tr: '53,1', en: '53.1' },
      not: { tr: 'Ham ölçüm puan değildir. 50 çizgisi, sıradan konumların %99’unun altında kaldığı değer; bu konum onu geçiyor.', en: 'A raw measurement is not a score. The 50 line is the value 99% of ordinary locations stay below; this site crosses it.' },
      cetvel: { min: 0, max: 100, sonra: 53.1, yon: 'yukari', esik: { deger: 50, ad: { tr: 'p99', en: 'p99' } } },
      kaynak: 'GhostBuilding.md · Ne yapıyor + vitrin 04 (Île Longue 53,1)',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Hassas tesisler ticari uydu görüntülerinde gizlenir ama her sağlayıcı farklı yapar: biri bulanıklaştırır, biri mozaikler, biri eski bir çekimi gösterir. Asıl soru şu: iki kaynak arasındaki fark gerçekten sıra dışı mı, yoksa her konumda görülen sıradan bir fark mı (çekim tarihi, mevsim, renk)?',
            en: 'Sensitive sites are hidden in commercial satellite imagery, but each provider does it differently: one blurs, one mosaics, one shows an old capture. The real question: is the difference between two sources actually unusual, or the ordinary kind seen everywhere (capture date, season, colour)?',
          },
        },
      ],
    },
    {
      id: 'ne-yapiyor',
      bloklar: [
        {
          tur: 'liste',
          ogeler: {
            tr: [
              '**Tarama:** bir koordinat için Esri, MapTiler ve (Fransa’da) IGN’den aynı z16 karoyu indirir.',
              '**İki sinyal:** kaynaklar arası görüntü farkı (SSIM, piksel, histogram) ve bir kaynağın diğerlerinden belirgin biçimde bulanık olması (Laplacian, FFT, beş kural).',
              '**Tabana göre puan:** ham ölçüm, sıradan konumlardan ölçülen dağılıma göre 0–100’e çevrilir; 50, sıradan konumların %99’u demek ve bu çizgi her puanın yanında durur.',
              '**Kanıt:** karolar yan yana, gerekçe maddeleri puan katkılarıyla, ayırıcılı karşılaştırma. Çalışmayan sinyaller (bina dedektörü, tarihsel değişim) gizlenmez, neden kapalı oldukları yazılır.',
            ],
            en: [
              '**Scan:** downloads the same z16 tile from Esri, MapTiler and (in France) IGN for a coordinate.',
              '**Two signals:** image difference between sources (SSIM, pixel, histogram) and one source being markedly blurrier than the rest (Laplacian, FFT, five rules).',
              '**Score against a baseline:** raw measurements are mapped to 0–100 against the distribution measured on ordinary locations; 50 is the 99th percentile of ordinary, and that line sits beside every score.',
              '**Evidence:** tiles side by side, reasons with their score contributions, a slider comparison. Signals that do not work (building detector, historical change) are not hidden; the UI says why they are off.',
            ],
          },
        },
      ],
    },
    {
      id: 'yapay-zeka',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'İlk sürüm yapay zekâ ajanlarıyla iki günde kuruldu ve testler yeşildi. Eylül 2026 denetimi “bu sistem gerçekte neyi ölçüyor?” diye sordu:',
            en: 'The first version was built with AI agents in two days and the tests were green. The September 2026 audit asked “what does this system actually measure?”:',
          },
        },
        {
          tur: 'liste',
          ogeler: {
            tr: [
              '**Eşikler hiç ölçülmemişti:** sabit %15 eşiğini sıradan 40 konumun 39’u geçiyordu. Eşikler artık sıradan konumların p90/p99’undan türetiliyor.',
              '**Veri kaynağı savunulamazdı:** görüntüler resmî olmayan uçlardan çekiliyordu; resmî kaynaklara geçildi.',
              '**Demo verisi uydurmaydı:** Londra’ya elle %91,5 skor yazılmıştı; demo artık gerçek motorun referans taramasından.',
              '**Genel amaçlı model yukarıdan bina tanımıyordu:** COCO tabanlı analiz kapatıldı. Her değişiklik regresyon testiyle sabitlendi (230 test).',
            ],
            en: [
              '**The thresholds had never been measured:** 39 of 40 ordinary locations exceeded the hard-coded 15%. Thresholds now come from the p90/p99 of ordinary locations.',
              '**The data source was indefensible:** imagery came from unofficial endpoints; it now uses official sources.',
              '**The demo data was made up:** London had a hand-written 91.5% score; the demo now comes from the real engine’s reference scan.',
              '**A general-purpose model could not see buildings from above:** the COCO-based analysis was switched off. Every change was pinned with a regression test (230 tests).',
            ],
          },
        },
      ],
    },
    {
      id: 'tasarim',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Gece vardiyasındaki bir analiz masası: karanlık tam ekran harita, kenarlarda cam paneller, az renk. Puanın “iyi/kötü” rengi yok, çünkü bir olasılık değil.',
            en: 'A night-shift analysis desk: a dark full-screen map, glass panels at the edges, little colour. The score has no “good/bad” colour, because it is not a probability.',
          },
        },
      ],
    },
    {
      id: 'ders',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Yapay zekâ bir sistemi iki günde kurabilir; söylediğine güvenmek için ölçümü insanın istemesi gerekir. Denetimin en değerli çıktısı bir özellik değil, bir taban dağılımıydı.',
            en: 'AI can build a system in two days; trusting what it says takes a human who demands the measurement. The audit’s most valuable output was not a feature but a baseline distribution.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Canlı kurulum yok; staging iş akışı elle tetikleniyor.',
      'Bina dedektörü kapalı (hava görüntüsünde bina için eğitilmiş ağırlık gerekiyor). Tarihsel değişim analizcisi yazılı ama taramaya bağlı değil.',
      'Kalibrasyon küçük örneklemle (40 + 20 konum, z16) yapıldı; p99 pratikte en yüksek değere yakın.',
      'Bir fark tek başına bir tesisin varlığını kanıtlamaz; Avord ve Volkel’deki farklar çekim tarihinden de gelebilir. Bulgular insan doğrulaması içindir.',
      'Harita sayfasının mobil Lighthouse performansı 54: kabuk WebGL haritayla birlikte istemcide yükleniyor.',
    ],
    en: [
      'No live deployment; the staging workflow is triggered by hand.',
      'The building detector is off (it needs weights trained on aerial imagery). The historical-change analyser exists but is not wired into scans.',
      'Calibration used a small sample (40 + 20 locations, z16); p99 is in practice close to the maximum.',
      'A difference alone does not prove a facility exists; the differences at Avord and Volkel may come from capture dates. Findings are for human verification.',
      'The map page scores 54 for mobile Lighthouse performance: the shell loads client-side together with the WebGL map.',
    ],
  },
  galeri: [
    { ad: 'bulgu', aciklama: { tr: 'Bulgu sayfası: üç kaynak karosu, tabana göre puan, gerekçe maddeleri puan katkılarıyla.', en: 'Finding page: three source tiles, the baseline-relative score, reasons with their score contributions.' } },
    { ad: 'esri', aciklama: { tr: 'Île Longue denizaltı üssü Esri altlığında: tesis bulanık bir yamayla örtülü.', en: 'Île Longue submarine base on Esri imagery: the facility is covered by a blurred patch.' } },
    { ad: 'maptiler', aciklama: { tr: 'Aynı konum MapTiler’da: bu kez piksel mozaiği. İki kaynak, iki gizleme yöntemi.', en: 'The same place on MapTiler: a pixel mosaic this time. Two sources, two ways of hiding.' } },
    { ad: 'karsilastir', aciklama: { tr: 'Avord hava üssü: MapTiler ile IGN üst üste karşılaştırma.', en: 'Avord air base: MapTiler and IGN compared with an overlay slider.' } },
    { ad: 'avrupa', aciklama: { tr: 'Avrupa haritası, bulgu paneli açık.', en: 'Europe map with the finding panel open.' } },
    { ad: 'mobil', mobil: true, aciklama: { tr: 'Mobilde bulgu.', en: 'A finding on mobile.' } },
  ],
};
