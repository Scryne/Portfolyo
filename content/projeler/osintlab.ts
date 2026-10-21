import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/OsintLab.md
export const osintlab: Proje = {
  slug: 'osintlab',
  ad: 'OsintLab',
  alan: { tr: 'OSINT · Bilgi grafı', en: 'OSINT · Knowledge graph' },
  baslik: {
    tr: 'Hatırlayan bir OSINT çalışma istasyonu',
    en: 'An OSINT workstation that remembers',
  },
  tekCumle: {
    tr: 'Açık kaynaklardan sürekli haber toplar, her bilgiyi kaynağına ve kanıtına bağlar, güvenilirliğini deterministik bir formülle puanlar ve zamanla kendi bilgi grafını biriktirir. Tek kullanıcılı ve yerel.',
    en: 'Continuously collects news from open sources, ties every claim to its source and evidence, scores reliability with a deterministic formula and builds its own knowledge graph over time. Single-user and local-first.',
  },
  donem: { tr: 'Eyl 2026 (8 günlük inşa)', en: 'Sep 2026 (built in 8 days)' },
  yil: 202609,
  durum: { tr: 'Tamamlandı; 28 faz, v1–v5, Ekim 2026’da denetim ve sertleştirme', en: 'Complete; 28 phases, v1–v5, audited and hardened in October 2026' },
  repo: { acik: false },
  demo: {
    tr: 'Yok. Yerelde, Windows servisi olarak otomatik tarar.',
    en: 'None. Runs locally and scans automatically as a Windows service.',
  },
  stack: [
    { grup: { tr: 'Backend', en: 'Backend' }, ogeler: 'Python 3.12, FastAPI, KùzuDB (gömülü graf veritabanı), feedparser, BeautifulSoup, pypdf, Tesseract OCR' },
    { grup: { tr: 'Frontend', en: 'Frontend' }, ogeler: 'Next.js 16 (App Router), React 19, Tailwind v4, shadcn/base-ui' },
    { grup: { tr: 'Yapay zekâ', en: 'AI' }, ogeler: 'Claude Code (proje skill’i + hook’lar), Obsidian vault çıktısı' },
  ],
  olcek: [
    { ad: { tr: 'Kod', en: 'Code' }, deger: { tr: '~13.900 satır Python + ~16.000 satır TypeScript', en: '~13,900 lines Python + ~16,000 lines TypeScript' } },
    { ad: { tr: 'Commit', en: 'Commits' }, deger: { tr: '80', en: '80' } },
    { ad: { tr: 'Roadmap', en: 'Roadmap' }, deger: { tr: '28 faz + denetim turu, ~3.450 satırlık karar kaydı', en: '28 phases + an audit round, a ~3,450-line decision log' } },
  ],
  olcumler: [
    {
      ne: { tr: 'Graf veritabanı sorgusu (aynı OSINT şeması)', en: 'Graph database query (same OSINT schema)' },
      once: { tr: 'Neo4j 3.033 ms', en: 'Neo4j 3,033 ms' },
      sonra: { tr: 'KùzuDB 353 ms', en: 'KùzuDB 353 ms' },
      not: { tr: 'Kod yazılmadan önce yarıştırıldı; üstelik sıfır operasyonel yük.', en: 'Benchmarked before any code was written, with zero operational overhead.' },
      cetvel: { min: 0, max: 3100, once: 3033, sonra: 353, yon: 'asagi', birim: 'ms' },
      kaynak: 'OsintLab.md · Yapay zekâ 1',
    },
    {
      ne: { tr: 'Deterministik entity çıkarımında kaçırma', en: 'Miss rate of deterministic entity extraction' },
      once: { tr: '%7,4', en: '7.4%' },
      sonra: { tr: '%4,4', en: '4.4%' },
      not: { tr: 'Yazılı eşik %15 olduğu için LLM’e geçilmedi.', en: 'The written threshold was 15%, so no LLM was introduced.' },
      cetvel: { min: 0, max: 16, once: 7.4, sonra: 4.4, yon: 'asagi', birim: '%', esik: { deger: 15, ad: { tr: 'LLM eşiği', en: 'LLM threshold' } } },
      kaynak: 'OsintLab.md · Yapay zekâ 3',
    },
    {
      ne: { tr: 'Kaynak bağımsızlığı skoru', en: 'Source independence score' },
      once: { tr: '0,54–0,62 kopya zincir', en: '0.54–0.62 copied chain' },
      sonra: { tr: '0,19 bağımsız çift', en: '0.19 independent pair' },
      not: { tr: '“Ajans → site A → site B” zinciri yakalandı, aynı konudaki bağımsız çift ayrı kaldı.', en: 'The “agency → site A → site B” chain was caught; an independent pair on the same story stayed separate.' },
      kaynak: 'OsintLab.md · Ne yapıyor',
    },
    {
      ne: { tr: 'Arşivde canlı sayfaya karşı doğrulanan claim', en: 'Claims verified against the live page' },
      sonra: { tr: '81/83', en: '81/83' },
      cetvel: { min: 0, max: 83, sonra: 81, yon: 'yukari' },
      kaynak: 'OsintLab.md · Ne yapıyor',
    },
    {
      ne: { tr: 'Gözlem kuyruğu, gerçek veride (3.918 gözlem)', en: 'Observation queue on real data (3,918 observations)' },
      once: { tr: '292 sn', en: '292 s' },
      sonra: { tr: '3,7 sn', en: '3.7 s' },
      not: { tr: 'Altı haftalık kullanımdan sonraki denetimde: her aramada 582 aday ad için düzenli ifade yeniden derleniyordu. Küçük veride görünmüyordu; sonuçlar eskisiyle birebir aynı (261/261 claim).', en: 'Found in the audit after six weeks of use: a regular expression for 582 candidate names was recompiled on every search. Invisible on small data; results are identical to before (261/261 claims).' },
      cetvel: { min: 0, max: 300, once: 292, sonra: 3.7, yon: 'asagi' },
      kaynak: 'OsintLab Roadmap · Denetim ve sertleştirme turu (2026-10-18)',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Haber panelleri ve arama motorları her soruda dünyayı sıfırdan arar. Bir konuyu haftalarca izleyen araştırmacının sorunu kaynak bulmak değil; hangi iddianın kaç **bağımsız** kaynaktan geldiğini, hangisinin çürütüldüğünü kaybetmek. OsintLab aramadan önce hafızaya bakar.',
            en: 'News dashboards and search engines search the world from scratch on every question. For a researcher following a topic for weeks, the problem is not finding sources but losing track of how many **independent** sources back each claim and which were debunked. OsintLab checks memory before it searches.',
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
              '**Toplama ve ayıklama:** RSS ve web kaynakları zamanlanmış taranır (allowlist + her yönlendirmede SSRF denetimi); gözlemler kuyruğa düşer, eşiği geçenler “claim”e yükselir.',
              '**Deterministik güvenilirlik:** her claim kaynak kalitesi, bağımsızlık, kanıt ve teyitten puan alır; REPORTED → SUPPORTED → CORROBORATED, çelişki ayrıca işaretlenir.',
              '**Kaynak bağımsızlığı:** aynı ajans haberini kopyalayan iki site tek köke bağlanır (n-gram örtüşmesi + ajans atfı).',
              '**Bilgi grafı ve kanıt kasası:** entity, olay, claim ve kanıt gömülü graf veritabanında; belgeler SHA-256 ile mühürlenir, arşivlenen sayfalar sonra canlıya karşı doğrulanır.',
            ],
            en: [
              '**Collection and triage:** RSS and web sources are scanned on a schedule (allowlist + SSRF check on every redirect); observations queue up and those above the threshold become “claims”.',
              '**Deterministic reliability:** each claim is scored from source quality, independence, evidence and corroboration; REPORTED → SUPPORTED → CORROBORATED, contradictions flagged separately.',
              '**Source independence:** two sites copying one wire story are linked to one root (n-gram overlap + agency attribution).',
              '**Knowledge graph and evidence vault:** entities, events, claims and evidence in an embedded graph database; documents sealed with SHA-256, archived pages later re-verified against the live page.',
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
              '**Riskli karar kod yazılmadan önce ölçüldü:** aynı şema KùzuDB ve Neo4j’de yarıştırıldı.',
              '**Kapsamı ölçüm belirledi:** her sürüm sonunda bir betik teyitsiz claim oranını ve tek kaynak baskınlığını saydı; kapıyı geçemeyen domain’ler (GEOINT, SOCMINT) açılmadı.',
              '**Gerçek kullanım test edildi:** dogfooding turunda 46 sürtünme kaydı, 22’si kritik; ör. RSS yayın tarihi sessizce atılıyordu ve 1.164 kaydın hepsi “bugün gözlendi” görünüyordu.',
              '**Dış denetime kör güven yok:** bir denetimin SSRF önerisi 25 durumluk IP matrisiyle sınandı; NAT64 üzerinden yeni açık açıyordu, doğru düzeltme yazıldı.',
            ],
            en: [
              '**The risky decision was measured before any code:** the same schema was benchmarked in KùzuDB and Neo4j.',
              '**Measurement set the scope:** after every version a script counted unconfirmed-claim ratio and single-source dominance; domains that failed the gate (GEOINT, SOCMINT) were not opened.',
              '**Real use was tested:** a dogfooding round logged 46 friction records, 22 critical; e.g. RSS publish dates were silently dropped and all 1,164 records looked “observed today”.',
              '**No blind trust in external audit:** an audit’s SSRF fix was tested against a 25-case IP matrix; it opened a new hole via NAT64, and the correct fix was written.',
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
            tr: 'Koyu, sakin bir analist masası. Renk **bilginin ne kadar sağlam olduğunu** taşır: güvenilirlik basamakları soğuk maviden altına ısınır, çelişki gül kırmızısıyla ayrılır.',
            en: 'A dark, calm analyst desk. Colour carries **how solid a piece of information is**: reliability steps warm from cold blue to gold, and contradictions stand apart in rose.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Tek kullanıcılı ve yerel; barındırılan demo yok, repo gizli.',
      'CI yok. Fazlar elle yürütülen kabul senaryoları ve ölçüm betiğiyle doğrulandı; otomatik testler (67) ancak Ekim 2026 denetiminde eklendi.',
      'Deneysel domain’ler (GEOINT, SOCMINT, MEDIAINT) bilinçli olarak kapsam dışında.',
    ],
    en: [
      'Single-user and local; no hosted demo, private repository.',
      'No CI. Phases were verified with hand-run acceptance scenarios and the measurement script; automated tests (67) were only added in the October 2026 audit.',
      'Experimental domains (GEOINT, SOCMINT, MEDIAINT) are deliberately out of scope.',
    ],
  },
  galeri: [
    { ad: 'calisma-alani', aciklama: { tr: 'Ana çalışma alanı: sayaçlar, öncelikli istihbarat, son değişiklikler.', en: 'Main workspace: counters, priority intelligence, recent changes.' } },
    { ad: 'graf', aciklama: { tr: 'Bilgi grafı: entity daire, olay kare.', en: 'Knowledge graph: entities as circles, events as squares.' } },
    { ad: 'olay', aciklama: { tr: 'Olay sayfası: bağımsız kaynaklar, çelişkili ve desteklenen claim’ler.', en: 'Event page: independent sources, contradicted and supported claims.' } },
    { ad: 'dogrulama', aciklama: { tr: 'İki bağımsız kaynağın aynı olayı doğrulaması, gerekçeleriyle.', en: 'Two independent sources confirming the same event, with reasons.' } },
    { ad: 'sorusturma', aciklama: { tr: 'Soruşturma akışı: soru → kapsam → kaynak → sonuç.', en: 'Investigation flow: question → scope → sources → conclusion.' } },
    { ad: 'entity', aciklama: { tr: 'Entity sayfası: güven spektrumu ve olay zaman çizelgesi.', en: 'Entity page: confidence spectrum and event timeline.' } },
    { ad: 'arsiv', aciklama: { tr: 'SHA-256 mühürlü kaynak arşivi, canlı sayfaya karşı doğrulama.', en: 'SHA-256 sealed source archive, verified against the live page.' } },
    { ad: 'mobil', mobil: true, aciklama: { tr: 'Mobilde olay sayfası.', en: 'Event page on mobile.' } },
  ],
};
