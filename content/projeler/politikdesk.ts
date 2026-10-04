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
      sonra: { tr: '2.695 test, 0 hata, 49 sn', en: '2,695 tests, 0 failures, 49 s' },
      not: { tr: '“2711 test geçiyor” sayısı veriyle dolu yerel bir veritabanına karşı ölçülmüştü.', en: 'The “2,711 tests pass” figure had been measured against a local database full of data.' },
      kaynak: 'PolitikDesk.md · Denetim',
    },
    {
      ne: { tr: 'Halef modelde alıntı sadakati', en: 'Quote fidelity of the successor model' },
      sonra: { tr: '10/10', en: '10/10' },
      not: { tr: 'Model emekliye ayrılınca halef aynı Türkçe altın setle seçildi.', en: 'When the model was retired, its successor was chosen on the same Turkish golden set.' },
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
            tr: 'Politik ve ekonomik gündemi takip eden biri için sorun bilgiye ulaşmak değil, hangi bilginin **doğrulandığını** bilmek. Aynı haber beş gazetede çıkınca beş kaynak gibi görünür, oysa hepsi aynı medya grubundadır. Viral bir iddia resmî bir belgeye hiç dayanmayabilir. Yapay zekâ bu tabloyu özetlemekte çok iyidir, ama bir iddianın doğru olup olmadığına karar vermesine izin verilirse sistemin bütün güvenilirliği modelin o günkü tahminine bağlanır.',
            en: 'For someone following the political and economic agenda, the problem is not access to information but knowing which information is **verified**. The same story in five newspapers looks like five sources, yet all belong to one media group. A viral claim may rest on no official document at all. AI is excellent at summarising this picture, but if it is allowed to decide whether a claim is true, the system’s whole credibility hangs on that day’s model guess.',
          },
        },
        {
          tur: 'p',
          metin: {
            tr: 'Ürünün sözleşmesi bu yüzden tek cümle: **“AI senin yerine konuşmaz; senin daha iyi konuşabilmen için gündemi senin adına takip eder.”**',
            en: 'So the product’s contract is one sentence: **“AI does not speak for you; it follows the agenda for you so that you can speak better.”**',
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
            tr: 'Her beş dakikada bir beş adımlık bir döngü çalışır:',
            en: 'Every five minutes a five-step loop runs:',
          },
        },
        {
          tur: 'sirali',
          ogeler: {
            tr: [
              '**Topla:** TCMB, TÜİK, Resmî Gazete, TBMM, Sayıştay, haber siteleri ve X listelerinden kibar bot ilkeleriyle (hız sınırı, robots.txt, geri çekilme) veri çeker; SimHash ile tekilleştirir.',
              '**Kümele:** haberleri yerel embedding’lerle olaylara bağlar; sayısal çelişkiler insan denetimine düşer.',
              '**Kanıtla:** iddialar R0–R8 kurallarıyla bağımsız teyit havuzlarında sınanır. Aynı medya grubunun gazeteleri tek kaynak sayılır. Resmî veri ya da kurumsal belge yoksa bir iddia ne kadar yayılırsa yayılsın “doğrulandı” olamaz.',
              '**Bağlamlandır:** yeni olayı geçmiş vaatler, TBMM oylamaları, Sayıştay bulguları ve aktörlerin eski beyanlarıyla ilişkilendirir.',
              '**Taslak:** yalnız kanıtlı olaylar için dört editoryal açıda kaynaklı taslak üretir. Kanıtta olmayan hiçbir sayı ya da alıntı taslağa giremez. Otomatik yayın kod yolu yoktur.',
            ],
            en: [
              '**Collect:** pulls from the central bank, statistics office, official gazette, parliament, the court of accounts, news sites and X lists with polite-bot rules (rate limits, robots.txt, backoff); deduplicates with SimHash.',
              '**Cluster:** links stories into events with local embeddings; numerical conflicts go to human review.',
              '**Evidence:** claims are tested against independent corroboration pools with rules R0–R8. Newspapers of one media group count as one source. Without official data or an institutional document, a claim cannot become “verified”, however far it spreads.',
              '**Context:** relates a new event to past promises, parliamentary votes, audit findings and the actors’ earlier statements.',
              '**Draft:** writes sourced drafts from four editorial angles, only for evidenced events. No number or quote absent from the evidence may enter a draft. There is no automatic publishing code path.',
            ],
          },
        },
      ],
    },
    {
      id: 'yapay-zeka',
      bloklar: [
        {
          tur: 'sirali',
          ogeler: {
            tr: [
              '**Sınır kodda kilitli, sözde değil.** Kanıt motorunun LLM modülünü import edememesi bir CI adımı (`check_architecture.py`); denetleyicinin kendisi de ayrıca sınanıyor. Model bir gün o sınırı aşan bir kod yazsa build kırılır.',
              '**Model seçimi projenin kendi kıyaslamasıyla.** LLM, Türkçe altın set üzerinde alıntı sadakati, şema uyumu ve taslakta kanıt dışı sayı oranıyla seçilir.',
              '**Kalıcı bağlam.** `CLAUDE.md` pazarlıksız kısıtları, `DESIGN.md` tasarım sözleşmesini, `design/decisions.md` her arayüz turunun gerekçesini taşır.',
              '**Görsel doğrulama döngüsü.** Arayüz işleri dört ekran genişliğinde çekilip yatay taşma ve konsol hatası ölçülerek kapatılır.',
            ],
            en: [
              '**The boundary is locked in code, not in words.** The evidence engine being unable to import the LLM module is a CI step (`check_architecture.py`), and the checker itself is tested. If the model ever wrote code crossing that line, the build would break.',
              '**Model choice by the project’s own benchmark.** The LLM is chosen on a Turkish golden set by quote fidelity, schema compliance and the rate of out-of-evidence numbers in drafts.',
              '**Durable context.** `CLAUDE.md` holds non-negotiable constraints, `DESIGN.md` the design contract, `design/decisions.md` the reasoning behind every UI round.',
              '**Visual verification loop.** UI work is captured at four screen widths and closed only after horizontal overflow and console errors are measured.',
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
            tr: '“2711 test geçiyor” diye kaydedilmiş bir proje CI’da en az beş haftadır kırmızıydı: sayı yerel, veriyle dolu bir veritabanına karşı ölçülmüştü. Testler gerçek kaynaklara çıkıyor, gerçek API anahtarı istiyor, boş veritabanında çöküyordu. Hepsi hermetik hale getirildi: boş veritabanı ve sırsız ortamda 2.695 test, 0 hata, 49 saniye. Ölmüş LLM modeli değiştirildi; `pd update` komutunun resmî gösterge adımını hiç çağırmadığı bulundu ve düzeltildi.',
            en: 'A project recorded as “2,711 tests pass” had been red in CI for at least five weeks: the number was measured against a local database full of data. Tests hit real sources, demanded a real API key and crashed on an empty database. All made hermetic: 2,695 tests, 0 failures, 49 seconds on an empty database with no secrets. The dead LLM was replaced, and `pd update` was found never to call the official-indicator step, and fixed.',
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
            tr: 'Bir test sayısı, hangi ortamda ölçüldüğü söylenmeden bir şey kanıtlamaz. Hermetik test, CI’ın yeşil olmasından önce gelir.',
            en: 'A test count proves nothing until you say where it was measured. Hermetic tests come before a green CI.',
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
