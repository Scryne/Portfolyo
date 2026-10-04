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
            tr: 'Orta ölçekli bir metal fabrikasında üretim verisi makinenin başındaki kâğıtta, bakım bir Excel’de, stok ERP’de, kalite ayrı bir dosyada yaşar. Operatör bir arızayı ancak biri haber verince görür; yönetici “bu hafta neden OEE düştü” sorusunu cevaplamak için dört tabloyu birleştirir. FabrikaOS bu dağınıklığı tek ürüne indirir: sahadan veri kendiliğinden akar, her modül aynı veriyi görür, karar tek ekrandan verilir.',
            en: 'In a mid-sized metal factory, production data lives on paper next to the machine, maintenance in a spreadsheet, stock in the ERP and quality in another file. An operator sees a fault only when someone reports it; a manager joins four tables to answer “why did OEE drop this week?”. FabrikaOS collapses this into one product: data flows in from the floor by itself, every module sees the same data, and decisions are made from one screen.',
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
              '**Sahadan canlı OEE.** Edge ajanı (simülatör + OPC-UA/Modbus iskeleti) ölçümleri MQTT ile gönderir; bağlantı koparsa yerelde biriktirip sonra iletir. Bulutta bir worker ölçümü doğru fabrikanın şemasına idempotent yazar, pano WebSocket ile elle giriş olmadan güncellenir.',
              '**Veri sızıntısına yapısal engel.** Her fabrika kendi PostgreSQL şemasında yaşar; bağlantı havuza dönmeden şema bağlamı sıfırlanır. Bu kural ayrı bir test ailesiyle korunur.',
              '**Üretimden sevkiyata zincir.** İş emri durum makinesi, ürün reçetesi (BOM): üretim emri kapanınca reçete stoktan otomatik düşer. Lot numarasıyla geriye ve ileriye izlenir.',
              '**Modüller:** bakım planı, vardiya/duruş + Pareto, stok + çok kalemli satınalma onayı (talep eden onaylayamaz), kalite + 6 aşamalı CAPA, enerji (TimescaleDB), İSG risk matrisi, İK, CRM, sözleşme, sürümlü belge yönetimi.',
              '**Zekâ katmanı.** Kestirimci bakım riski, anomali taraması, OEE ufuk tahmini ve stok bitiş tahmini; modeller sürümlü artefakt olarak saklanır.',
              '**SaaS iskeleti ve kurumsal güvenlik.** Dört plan × modül hakları, koltuk limiti, ayrı kimlik düzleminde platform yöneticisi, imzalı webhook, TOTP 2FA, OIDC SSO, değiştirilemez denetim kaydı, KVKK self-servis ihraç ve anonimleştirme.',
            ],
            en: [
              '**Live OEE from the floor.** An edge agent (simulator + OPC-UA/Modbus skeleton) sends measurements over MQTT and stores-and-forwards when the link drops. A cloud worker writes each reading idempotently into the right factory’s schema; the dashboard updates over WebSocket with no manual entry.',
              '**Structural barrier against data leaks.** Every factory lives in its own PostgreSQL schema, and the schema context is reset before a connection returns to the pool. A dedicated test family guards the rule.',
              '**Production to shipment.** Work-order state machine and bill of materials: closing a production order consumes the BOM from stock automatically. Lots trace backwards and forwards.',
              '**Modules:** maintenance planning, shifts/downtime + Pareto, stock + multi-line purchase approval (requesters cannot approve), quality + 6-step CAPA, energy (TimescaleDB), safety risk matrix, HR, CRM, contracts, versioned documents.',
              '**Intelligence layer.** Predictive maintenance risk, anomaly scans, OEE horizon forecast and stock-out forecast; models stored as versioned artefacts.',
              '**SaaS skeleton and enterprise security.** Four plans × module entitlements, seat limits, a platform admin on a separate identity plane, signed webhooks, TOTP 2FA, OIDC SSO, an immutable audit log, self-service GDPR-style export and anonymisation.',
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
            tr: '173 commit’in 172’si Claude ortak yazarlı. Hızı model verdi; ürünü sağlam yapan süreçti:',
            en: '172 of 173 commits are co-authored with Claude. The model provided the speed; the process made the product solid:',
          },
        },
        {
          tur: 'sirali',
          ogeler: {
            tr: [
              '**Önce şartname, sonra kod.** 8 faz / 33 sprintlik yol haritası, her sprint için tasarım belgesi ve adım adım uygulama planı, 24 ADR. Model yazmadan önce ne yazacağı ve neden yazacağı kayıttaydı; TDD ile uygulandı.',
              '**“Yanlış olursa veri sızar” kuralları testle kilitlendi.** Tenant izolasyonu, provizyon, görev ayrımı, OEE hesabı, yapay zekâ çıktısı, migrasyon ve KVKK imha sırası için yedi korunan test ailesi var. Bir sözleşme testi, KVKK artefaktına paylaşılabilir URL eklenirse kırılır: güvenlik kararı hafızayla değil kodla korunuyor.',
              '**Model çıktısı denetlendi.** Sprint sonu inceleme turları gerçek hatalar buldu: webhook URL’sinde SSRF önek hilesi, yetki restorasyonu, imha sırası. Her biri kendi commit’iyle kapatıldı.',
            ],
            en: [
              '**Spec first, code second.** An 8-phase / 33-sprint roadmap, a design document and step-by-step plan per sprint, 24 ADRs. Before the model wrote anything, what and why were on record; implemented test-first.',
              '**“If this is wrong, data leaks” rules are locked by tests.** Seven protected test families cover tenant isolation, provisioning, segregation of duties, OEE maths, AI output, migrations and deletion order. A contract test breaks if a shareable URL is ever added to a data-export artefact: the security decision is guarded by code, not memory.',
              '**Model output was reviewed.** End-of-sprint reviews found real bugs: an SSRF prefix trick in webhook URLs, a permission-restoration flaw, a deletion-order issue. Each closed in its own commit.',
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
            tr: 'Ürün ekran ekran çalıştırılıp tarandı. CI iki aydır kırmızıydı (testler gerçek nesne deposuna çıkıyordu); anomali ekranının her açılışı tüm yetkililere yeni bildirim gönderiyordu; beklenmeyen hatalar tarayıcıda “CORS hatası” diye görünüyordu; WebSocket token’ı loga düşüyordu; mobilde her sayfa yatay taşıyordu; bildirim ve webhook süreçleri dağıtımda yoktu; demo verisi birkaç günde “yaşlanıyordu”. Her bulgu ölçüldü, düzeltildi ve mümkün olanı regresyon testiyle kilitlendi.',
            en: 'The product was run and inspected screen by screen. CI had been red for two months (tests were hitting a real object store); every visit to the anomaly screen sent a fresh notification to every manager; unexpected errors surfaced in the browser as “CORS error”; the WebSocket token leaked into logs; every page overflowed horizontally on mobile; notification and webhook workers were missing from deployment; demo data “aged” within days. Each finding was measured, fixed and, where possible, locked with a regression test.',
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
            tr: '“Kontrol odası”: nötr antrasit zemin, mavi yalnız aksiyon için, renk yalnız durum için. Her menü bölümü endüstriyel boru renk kodlarından gelen bir **hat rengi** taşır; sayfa başlığında, menü grubunda ve KPI ikonunda küçük bir sinyal olarak görünür. Sayılar tabular mono yazılır ki sütunlarda hizalı okunsun. Durum hiçbir zaman yalnız renkle anlatılmaz.',
            en: 'A “control room”: neutral anthracite, blue only for actions, colour only for status. Each menu section carries a **line colour** borrowed from industrial pipe colour codes, shown as a small signal in the page title, the menu group and the KPI icon. Numbers are set in tabular mono so columns align. Status is never conveyed by colour alone.',
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
