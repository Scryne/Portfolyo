import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/PolitikDesk.md
export const politikdesk: Proje = {
  slug: 'politikdesk',
  ad: 'PolitikDesk',
  alan: { tr: 'Doğrulama · Editoryal', en: 'Verification · Editorial' },
  baslik: {
    tr: 'İddiaları deterministik kurallarla kanıta bağlayan politik istihbarat masası',
    en: 'A political intelligence desk that ties claims to evidence with deterministic rules',
  },
  tekCumle: {
    tr: 'Makro ekonomi, yasama ve siyaset gündemini 101 kaynaktan toplar, haberleri olaylara kümeler, her iddianın doğruluk durumunu yapay zekâya değil deterministik kurallara bıraktırır ve yalnız kanıtlı olaylar için kaynaklı editoryal taslak üretir.',
    en: 'Collects the macro, legislative and political agenda from 101 sources, clusters stories into events, leaves every claim’s verification status to deterministic rules rather than AI, and drafts sourced editorial copy only for evidenced events.',
  },
  donem: { tr: 'Ağu 2026 – Eyl 2026', en: 'Aug 2026 – Sep 2026' },
  yil: 202609,
  durum: {
    tr: 'Çalışır, tek kullanıcı; 7 günlük operasyonel inceleme penceresi zaman istiyor',
    en: 'Working, single user; its 7-day operational review window needs time',
  },
  repo: { acik: false },
  demo: { tr: 'Yok. Yerelde Docker ile çalışır.', en: 'None. Runs locally with Docker.' },
  stack: [
    { grup: { tr: 'Backend', en: 'Backend' }, ogeler: 'Python 3.12, FastAPI, Pydantic v2, Celery 5.4 + Redis, PostgreSQL 16 + pgvector' },
    { grup: { tr: 'Yapay zekâ', en: 'AI' }, ogeler: 'multilingual-e5-large (yerel embedding), NVIDIA NIM, kendi LLM kıyaslama betikleri' },
    { grup: { tr: 'Arayüz', en: 'Interface' }, ogeler: 'Sunucu tarafı HTML5, özel CSS tasarım sistemi, Lucide SVG' },
    { grup: { tr: 'Kalite', en: 'Quality' }, ogeler: 'Ruff, mypy (215 dosya), pip-audit, mimari izolasyon denetimi, Playwright UI denetimi, Sentry' },
  ],
  olcek: [
    { ad: { tr: 'Kaynak', en: 'Sources' }, deger: { tr: '101 (55 resmî + haber, 46 X hesabı/listesi)', en: '101 (55 official + news, 46 X accounts/lists)' } },
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: '2.701 hermetik + 16 canlı veri kabul testi', en: '2,701 hermetic + 16 live-data acceptance tests' } },
    { ad: { tr: 'Koşu', en: 'Run' }, deger: { tr: '52 kaynak → 492 makale → 336 olay, 21 dk', en: '52 sources → 492 articles → 336 events, 21 min' } },
    { ad: { tr: 'Commit', en: 'Commits' }, deger: { tr: '148', en: '148' } },
  ],
  olcumler: [
    {
      ne: { tr: 'CI', en: 'CI' },
      once: { tr: 'en az 5 hafta kırmızı', en: 'red for 5+ weeks' },
      sonra: { tr: '2.701 test, 0 hata, ~50 sn', en: '2,701 tests, 0 failures, ~50 s' },
      not: { tr: '“2711 test geçiyor” sayısı veriyle dolu yerel bir veritabanına karşı ölçülmüştü.', en: 'The “2,711 tests pass” figure had been measured against a local database full of data.' },
      kaynak: 'PolitikDesk.md · Denetim',
    },
    {
      ne: { tr: 'Halef modelde iddia çıkarımı (altın set)', en: 'Claim extraction by the successor model (golden set)' },
      sonra: { tr: '10/10', en: '10/10' },
      not: { tr: 'Model emekliye ayrılınca halef aynı Türkçe altın setle seçildi; alıntı sadakati %100, taslak dayanağı 7/8.', en: 'When the model was retired, its successor was chosen on the same Turkish golden set; quote fidelity 100%, draft grounding 7/8.' },
      cetvel: { min: 0, max: 10, sonra: 10, yon: 'yukari' },
      kaynak: 'PolitikDesk.md · Yapay zekâ 2',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Gündemi takip eden biri için sorun bilgiye ulaşmak değil, hangisinin **doğrulandığını** bilmek. Aynı haber beş gazetede çıkınca beş kaynak gibi görünür, oysa hepsi aynı medya grubundandır. Yapay zekâ özetlemekte iyidir, ama doğruluk kararını ona bırakmak sistemin güvenilirliğini modelin o günkü tahminine bağlar.',
            en: 'For someone following the agenda, the problem is not access to information but knowing which of it is **verified**. One story in five newspapers looks like five sources, yet all belong to one media group. AI summarises well, but letting it decide what is true ties the whole system’s credibility to that day’s model guess.',
          },
        },
      ],
    },
    {
      id: 'ne-yapiyor',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Her beş dakikada bir döngü çalışır:',
            en: 'Every five minutes a loop runs:',
          },
        },
        {
          tur: 'sirali',
          ogeler: {
            tr: [
              '**Topla:** TCMB, TÜİK, Resmî Gazete, TBMM, Sayıştay, haber siteleri ve X listeleri; SimHash ile tekilleştirme.',
              '**Kümele:** haberler yerel embedding’lerle olaylara bağlanır.',
              '**Kanıtla:** iddialar R0–R8 kurallarıyla bağımsız teyit havuzlarında sınanır; resmî veri ya da belge yoksa ne kadar yayılırsa yayılsın “doğrulandı” olamaz.',
              '**Taslak:** yalnız kanıtlı olaylar için kaynaklı taslak; kanıtta olmayan sayı ya da alıntı giremez, otomatik yayın yolu yok.',
            ],
            en: [
              '**Collect:** central bank, statistics office, Official Gazette, parliament, court of accounts, news sites and X lists; SimHash deduplication.',
              '**Cluster:** stories are linked into events with local embeddings.',
              '**Evidence:** claims are tested against independent corroboration pools with rules R0–R8; without official data or a document a claim cannot become “verified”, however far it spreads.',
              '**Draft:** sourced drafts only for evidenced events; no number or quote absent from the evidence may enter, and there is no automatic publishing path.',
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
              '**Sınır kodda kilitli:** kanıt motorunun LLM modülünü import edememesi bir CI adımı; model o sınırı aşan kod yazarsa build kırılır.',
              '**Model seçimi kendi kıyaslamasıyla:** Türkçe altın sette alıntı sadakati, şema uyumu ve taslakta kanıt dışı sayı oranı.',
            ],
            en: [
              '**The boundary is locked in code:** the evidence engine being unable to import the LLM module is a CI step; if the model wrote code crossing it, the build would break.',
              '**Model choice by its own benchmark:** quote fidelity, schema compliance and out-of-evidence numbers in drafts, on a Turkish golden set.',
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
            tr: '“2711 test geçiyor” diye kayıtlı proje CI’da en az beş haftadır kırmızıydı: sayı veriyle dolu yerel bir veritabanına karşı ölçülmüştü, testler gerçek kaynaklara çıkıyor ve gerçek API anahtarı istiyordu. Hepsi hermetik hale getirildi: boş veritabanı ve sırsız ortamda 2.701 test, 0 hata, ~50 saniye.',
            en: 'A project recorded as “2,711 tests pass” had been red in CI for at least five weeks: the number was measured against a local database full of data, and the tests hit real sources and demanded a real API key. All made hermetic: 2,701 tests, 0 failures, ~50 seconds on an empty database with no secrets.',
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
            tr: 'Bir test sayısı, hangi ortamda ölçüldüğü söylenmeden bir şey kanıtlamaz.',
            en: 'A test count proves nothing until you say where it was measured.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Tek kullanıcılı kişisel bir terminal; barındırılan demo yok, repo gizli.',
      'Operasyonel kapılar (7 günlük inceleme penceresi) henüz tam dolmadı.',
      'Gerçek siyasetçi adları içeren ekranlar portfolyoya bilerek konmadı.',
    ],
    en: [
      'A single-user personal terminal; no hosted demo, private repository.',
      'Operational gates (the 7-day review window) have not fully elapsed.',
      'Screens showing real politicians’ names were deliberately left out of this portfolio.',
    ],
  },
  galeri: [
    { ad: 'olay', aciklama: { tr: 'Olay sayfası (TCMB politika faizi): doğrulanmış özet, “ne biliyoruz / ne bilmiyoruz”, iddia başına kanıt durumu, editoryal açılar.', en: 'Event page (central bank policy rate): verified summary, “what we know / what we don’t”, evidence status per claim, editorial angles.' } },
    { ad: 'kumanda', aciklama: { tr: 'Kumanda odası: TCMB göstergeleri, beklenen resmî yayınlar, “susan kaynaklar” paneli.', en: 'Control room: central bank indicators, expected official releases, a “silent sources” panel.' } },
    { ad: 'gundem', aciklama: { tr: 'Gündem: önem ve kanıt durumuna göre olay akışı.', en: 'Agenda: event feed by importance and evidence status.' } },
    { ad: 'olay-koyu', aciklama: { tr: 'Olay sayfası, koyu tema.', en: 'Event page, dark theme.' } },
  ],
};
