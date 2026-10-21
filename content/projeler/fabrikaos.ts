import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/FabrikaOS.md (+ CV veri.mjs: "10 yüksek/kritik açık")
export const fabrikaos: Proje = {
  slug: 'fabrikaos',
  ad: 'FabrikaOS',
  alan: { tr: 'Endüstriyel yazılım · SaaS', en: 'Industrial software · SaaS' },
  baslik: {
    tr: 'Fabrikalar için çok kiracılı MES + ERP',
    en: 'Multi-tenant MES + ERP for manufacturing',
  },
  tekCumle: {
    tr: 'Sahadan canlı üretim verisini (OEE, duruş, arıza) toplayıp iş emri, bakım, stok, kalite, İSG, İK ve ticari modülleri tek kontrol odasında birleştirir. Her fabrika kendi veritabanı şemasında izole yaşar; modüller tek tek lisanslanır.',
    en: 'Collects live production data (OEE, downtime, faults) from the shop floor and brings work orders, maintenance, stock, quality, safety, HR and commercial modules into one control room. Every factory lives isolated in its own database schema; modules are licensed one by one.',
  },
  donem: { tr: 'Haz 2026 – Eyl 2026', en: 'Jun 2026 – Sep 2026' },
  yil: 202609,
  durum: {
    tr: 'Ürün geliştirme çalışması; canlı müşterisi yok, GA operasyon sprintleri bilerek açık',
    en: 'Product development study; no live customer, GA operations sprints deliberately open',
  },
  repo: { acik: false },
  demo: {
    tr: 'Yok. Docker Compose ve örnek veriyle yerelde çalışır.',
    en: 'None. Runs locally with Docker Compose and seed data.',
  },
  stack: [
    { grup: { tr: 'Backend', en: 'Backend' }, ogeler: 'Python 3.12, FastAPI (async), SQLAlchemy 2, Alembic, PostgreSQL 16 + TimescaleDB, Redis, MinIO, MQTT' },
    { grup: { tr: 'Frontend', en: 'Frontend' }, ogeler: 'React 18, TypeScript strict, Vite 8, Ant Design 5 (özel koyu tema), ECharts 6, TanStack Query, Leaflet' },
    { grup: { tr: 'Yapay zekâ / ML', en: 'AI / ML' }, ogeler: 'scikit-learn: kestirimci bakım, anomali, OEE ve stok tahmini; sürümlü model artefaktları' },
    { grup: { tr: 'Altyapı', en: 'Infrastructure' }, ogeler: 'Docker Compose, Traefik, GitHub Actions (ruff, mypy, tsc, pip-audit, npm audit)' },
  ],
  olcek: [
    { ad: { tr: 'Kod', en: 'Code' }, deger: { tr: '~25.300 satır Python + ~44.600 satır TypeScript', en: '~25,300 lines Python + ~44,600 lines TypeScript' } },
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: '667 backend + 214 frontend', en: '667 backend + 214 frontend' } },
    { ad: { tr: 'Modül', en: 'Modules' }, deger: { tr: '22 iş modülü + platform düzlemi', en: '22 business modules + platform plane' } },
    { ad: { tr: 'Mimari karar', en: 'Decision records' }, deger: { tr: '24 ADR', en: '24 ADRs' } },
  ],
  olcumler: [
    {
      ne: { tr: 'CI', en: 'CI' },
      once: { tr: '2 aydır kırmızı', en: 'red for 2 months' },
      sonra: { tr: 'yeşil', en: 'green' },
      not: { tr: 'Testler gerçek nesne deposuna çıkıyordu; hermetik hale getirildi.', en: 'Tests were reaching a real object store; made hermetic.' },
      kaynak: 'FabrikaOS.md · Yapay zekâ 4',
    },
    {
      ne: { tr: 'Yüksek ve kritik geliştirme bağımlılığı açığı', en: 'High and critical dev-dependency advisories' },
      once: { tr: '10', en: '10' },
      sonra: { tr: '0', en: '0' },
      cetvel: { min: 0, max: 10, once: 10, sonra: 0, yon: 'asagi' },
      kaynak: 'FabrikaOS DURUM.md · madde 7',
    },
    {
      ne: { tr: 'Mobilde yatay taşan sayfa', en: 'Pages overflowing horizontally on mobile' },
      once: { tr: 'hepsi', en: 'all' },
      sonra: { tr: '0', en: '0' },
      kaynak: 'FabrikaOS.md · Yapay zekâ 4',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Orta ölçekli bir fabrikada üretim verisi makinenin başındaki kâğıtta, bakım Excel’de, stok ERP’de, kalite ayrı bir dosyada yaşar. Yönetici “bu hafta OEE neden düştü” sorusu için dört tabloyu birleştirir. FabrikaOS bunu tek ürüne indirir: veri sahadan kendiliğinden akar, her modül aynı veriyi görür.',
            en: 'In a mid-sized factory, production data lives on paper by the machine, maintenance in a spreadsheet, stock in the ERP and quality in another file. A manager joins four tables to answer “why did OEE drop this week?”. FabrikaOS collapses this into one product: data flows in from the floor, and every module sees the same data.',
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
              '**Sahadan canlı OEE:** edge ajanı ölçümleri MQTT ile gönderir, bağlantı koparsa biriktirir; pano WebSocket ile elle giriş olmadan güncellenir.',
              '**Yapısal izolasyon:** her fabrika kendi PostgreSQL şemasında; bu kural ayrı bir test ailesiyle korunur.',
              '**Üretimden sevkiyata:** iş emri durum makinesi, reçete (BOM) stoktan otomatik düşer, lot geriye ve ileriye izlenir.',
              '**Modüller:** bakım, duruş + Pareto, stok ve satınalma onayı, kalite + CAPA, enerji, İSG, İK, CRM, sözleşme, belge yönetimi.',
              '**Zekâ ve SaaS:** kestirimci bakım, anomali ve OEE tahmini; plan × modül hakları, 2FA, OIDC SSO, değiştirilemez denetim kaydı, KVKK ihraç ve anonimleştirme.',
            ],
            en: [
              '**Live OEE from the floor:** an edge agent sends measurements over MQTT and stores-and-forwards when the link drops; the dashboard updates over WebSocket with no manual entry.',
              '**Structural isolation:** every factory lives in its own PostgreSQL schema; a dedicated test family guards the rule.',
              '**Production to shipment:** a work-order state machine, a bill of materials consumed from stock automatically, lots traced backwards and forwards.',
              '**Modules:** maintenance, downtime + Pareto, stock and purchase approval, quality + CAPA, energy, safety, HR, CRM, contracts, document management.',
              '**Intelligence and SaaS:** predictive maintenance, anomaly and OEE forecasts; plan × module entitlements, 2FA, OIDC SSO, an immutable audit log, data export and anonymisation.',
            ],
          },
        },
      ],
    },
    {
      id: 'yapay-zeka',
      bloklar: [
        {
          tur: 'liste',
          ogeler: {
            tr: [
              '**Önce şartname, sonra kod:** 180 commit’in 179’u Claude ortak yazarlı; her sprint için tasarım belgesi ve uygulama planı, 24 ADR, test önce yazıldı.',
              '**Veri sızdıracak kurallar testle kilitli:** tenant izolasyonu, görev ayrımı, OEE hesabı, KVKK imha sırası dahil yedi korunan test ailesi.',
              '**Model çıktısı denetlendi:** sprint sonu incelemeler webhook URL’sinde SSRF önek hilesi ve yetki restorasyonu hatası buldu; her biri kendi commit’iyle kapandı.',
            ],
            en: [
              '**Spec first, code second:** 179 of 180 commits are co-authored with Claude; a design document and plan per sprint, 24 ADRs, tests written first.',
              '**Leak-prone rules locked by tests:** seven protected test families, including tenant isolation, segregation of duties, OEE maths and deletion order.',
              '**Model output was reviewed:** end-of-sprint reviews found an SSRF prefix trick in webhook URLs and a permission-restoration flaw; each closed in its own commit.',
            ],
          },
        },
      ],
    },
    {
      id: 'denetim',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Ekran ekran yeniden ölçüldü: CI iki aydır kırmızıydı (testler gerçek nesne deposuna çıkıyordu), anomali ekranının her açılışı tüm yetkililere bildirim gönderiyordu, WebSocket token’ı loga düşüyordu, mobilde her sayfa yatay taşıyordu. Hepsi düzeltildi; mümkün olanı regresyon testiyle kilitlendi.',
            en: 'Re-measured screen by screen: CI had been red for two months (tests hit a real object store), every visit to the anomaly screen notified every manager, the WebSocket token leaked into logs, every page overflowed on mobile. All fixed; where possible, locked with a regression test.',
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
            tr: '“Kontrol odası”: antrasit zemin, mavi yalnız aksiyon, renk yalnız durum için. Her menü bölümü endüstriyel boru renk kodlarından bir **hat rengi** taşır; sayılar hizalı okunsun diye tabular mono.',
            en: 'A “control room”: anthracite, blue only for actions, colour only for status. Each menu section carries a **line colour** from industrial pipe colour codes; numbers are set in tabular mono so columns align.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Canlı müşterisi olmayan bir ürün geliştirme çalışması; barındırılan demo yok, repo gizli.',
      'GA operasyon sprintleri (gözlemlenebilirlik, felaket kurtarma, UAT) ve tedarik zinciri modülü kodlanmadı.',
      'Edge tarafında gerçek PLC entegrasyonu iskelet düzeyinde; testler simülatörle.',
      'Playwright uçtan uca testleri CI’da değil (çalışan yığın ister).',
    ],
    en: [
      'A product development study with no live customer; no hosted demo, private repository.',
      'GA operations sprints (observability, disaster recovery, UAT) and the supply-chain module were not built.',
      'Real PLC integration on the edge is a skeleton; tests use a simulator.',
      'Playwright end-to-end tests are not in CI (they need a running stack).',
    ],
  },
  galeri: [
    { ad: 'pano', aciklama: { tr: 'Yönetim panosu: canlı OEE, stok, satınalma, kalite ve İSG tek ekranda.', en: 'Management dashboard: live OEE, stock, purchasing, quality and safety on one screen.' } },
    { ad: 'lot', aciklama: { tr: 'Lot izlenebilirliği: lot → iş emri → reçete tüketimi → üretim kaydı.', en: 'Lot traceability: lot → work order → BOM consumption → production record.' } },
    { ad: 'pareto', aciklama: { tr: 'Duruş nedenleri Pareto’su: kayıp dakikanın %80’i.', en: 'Downtime Pareto: the causes behind 80% of lost minutes.' } },
    { ad: 'ikiz', aciklama: { tr: 'Dijital ikiz: tesis şeması üzerinde canlı makine durumu.', en: 'Digital twin: live machine status on the plant layout.' } },
    { ad: 'kiosk', aciklama: { tr: 'Saha büyük ekranı: kabuksuz, canlı.', en: 'Shop-floor wall screen: chromeless and live.' } },
    { ad: 'harita', aciklama: { tr: 'İki tesis (Bursa, Gebze) harita üzerinde.', en: 'Two plants (Bursa, Gebze) on the map.' } },
    { ad: 'kanban', aciklama: { tr: 'İş emri durum makinesi, kanban olarak.', en: 'The work-order state machine as a kanban board.' } },
    { ad: 'tahmin', aciklama: { tr: 'Kestirimci bakım riski, anomali, OEE ve stok tahmini.', en: 'Predictive maintenance risk, anomalies, OEE and stock forecasts.' } },
    { ad: 'platform', aciklama: { tr: 'Platform paneli: tenant, plan, modül hakları, KVKK ihracı.', en: 'Platform console: tenants, plans, module entitlements, data export.' } },
    { ad: 'kvkk', aciklama: { tr: 'KVKK self-servis ihraç ve anonimleştirme.', en: 'Self-service data export and anonymisation.' } },
    { ad: 'mobil', mobil: true, aciklama: { tr: 'Mobil pano.', en: 'Mobile dashboard.' } },
  ],
};
