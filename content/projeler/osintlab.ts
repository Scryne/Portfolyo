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
  durum: { tr: 'Tamamlandı; 28 faz, v1–v5', en: 'Complete; 28 phases, v1–v5' },
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
    { ad: { tr: 'Kod', en: 'Code' }, deger: { tr: '~12.700 satır Python + ~16.100 satır TypeScript', en: '~12,700 lines Python + ~16,100 lines TypeScript' } },
    { ad: { tr: 'Commit', en: 'Commits' }, deger: { tr: '79', en: '79' } },
    { ad: { tr: 'Roadmap', en: 'Roadmap' }, deger: { tr: '28 faz, 3.370 satırlık karar kaydı', en: '28 phases, a 3,370-line decision log' } },
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
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Haber takip panelleri ve arama motorları her soruda dünyayı sıfırdan arar, hiçbir şeyi hatırlamaz. Bir konuyu haftalarca izleyen bir araştırmacı için asıl sorun kaynak bulmak değil; hangi iddianın kaç **bağımsız** kaynaktan geldiğini, hangisinin çürütüldüğünü ve geçen ay neyin araştırıldığını kaybetmek. OsintLab bu yüzden aramadan önce hafızaya bakar.',
            en: 'News dashboards and search engines search the world from scratch on every question and remember nothing. For a researcher following a topic for weeks, the problem is not finding sources; it is losing track of how many **independent** sources back each claim, which ones were debunked and what was researched last month. So OsintLab checks memory before it searches.',
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
              '**Toplama:** RSS ve web kaynakları zamanlanmış olarak taranır. Her istek bir allowlist’ten ve her yönlendirmede yeniden yapılan bir SSRF denetiminden (özel, CGNAT ve NAT64 aralıkları) geçer. Toplanan içerik hiçbir kod yolunda çalıştırılmaz.',
              '**Ayıklama kuyruğu:** ham gözlemler önce kuyruğa düşer; bilinen entity’lere değen ve güvenilir kaynaktan gelenler üste çıkar, eşiği geçenler “claim”e yükseltilir.',
              '**Güvenilirlik formülü:** her claim kaynak kalitesi, bağımsızlık, kanıt ve teyit bileşenlerinden **deterministik** bir puan alır. Puan REPORTED → SUPPORTED → CORROBORATED basamaklarında görünür, çelişki ayrıca işaretlenir.',
              '**Kaynak bağımsızlığı:** bir ajans haberini kopyalayan iki site iki kaynak sayılmaz. Metin n-gram örtüşmesi (Szymkiewicz–Simpson) ve ajans atfı ile türetilmiş kaynaklar tek köke bağlanır.',
              '**Bilgi grafı, soruşturma, kanıt kasası:** entity, olay, kaynak, claim ve kanıt gömülü bir graf veritabanında yaşar. Soruşturma kapanınca yalnız doğrulanmış bulgular kalıcı bilgiye yükselir. Yüklenen belgeler SHA-256 ile mühürlenir; kaynak sayfalar arşivlenip sonra canlı sayfaya karşı doğrulanır.',
              '**Gelen kutusu ve Obsidian çıktısı:** izlenen bir entity değişince öncelik seviyesiyle bildirim düşer; graf her değişiklikte okunabilir bir Obsidian vault’una da yazılır.',
            ],
            en: [
              '**Collection:** RSS and web sources are scanned on a schedule. Every request passes an allowlist and an SSRF check repeated on every redirect (private, CGNAT and NAT64 ranges). Collected content is never executed on any code path.',
              '**Triage queue:** raw observations land in a queue first; those touching known entities and coming from reliable sources rise to the top, and those above the threshold are promoted to “claims”.',
              '**Reliability formula:** each claim gets a **deterministic** score from source quality, independence, evidence and corroboration, shown as REPORTED → SUPPORTED → CORROBORATED, with contradictions flagged separately.',
              '**Source independence:** two sites copying one wire story are not two sources. Text n-gram overlap (Szymkiewicz–Simpson) plus agency attribution links derived sources to one root.',
              '**Knowledge graph, investigations, evidence vault:** entities, events, sources, claims and evidence live in an embedded graph database. When an investigation closes, only verified findings become permanent knowledge. Uploaded documents are sealed with SHA-256; source pages are archived and later re-verified against the live page.',
              '**Inbox and Obsidian export:** a change on a watched entity raises a prioritised notification, and the graph is also written to a readable Obsidian vault on every change.',
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
            tr: 'Buradaki beceri kodu yapay zekâya yazdırmak değil, onu **ölçümle yönetmek**:',
            en: 'The skill here is not getting AI to write code; it is **steering it with measurement**:',
          },
        },
        {
          tur: 'sirali',
          ogeler: {
            tr: [
              '**Riskli kararlar kod yazılmadan önce ölçüldü.** Aynı OSINT şeması KùzuDB ve Neo4j’de kurulup yarıştırıldı. Collector izolasyonu ve kaynak bağımsızlığı yöntemi de finalizasyondan önce gerçek veriyle denendi.',
              '**Kapsamı plan değil ölçüm belirledi.** Her sürüm sonunda bir ölçüm betiği bağlantısız düğümü, teyitsiz claim oranını, tek kaynak baskınlığını ve kuyruk birikimini saydı. v3, v4 ve v5’in kapsamı bu sayılardan türedi; kapıyı geçemeyen domain’ler açılmadı.',
              '**LLM gerekmeyen yerde kullanılmadı ve bu da ölçüldü.** Entity çıkarımı deterministik kuruldu; güvenilirlik puanı da bilerek modelden bağımsız tutuldu.',
              '**Gerçek kullanım test edildi.** Bir “dogfooding” turunda araç gerçek bir araştırmada kullanıldı: 46 sürtünme kaydı, 22’si kritik. RSS yayın tarihinin sessizce atılması (1.164 kaydın tamamı “bugün gözlendi” görünüyordu) ve HTTP hata sayfasının içerik sanılması gibi. 35’i o fazda kapatıldı.',
              '**Dış denetime körü körüne güvenilmedi.** Bağımsız bir denetimin SSRF önerisi 25 durumluk bir IP matrisiyle sınandı; öneri bir açığı kapatıp NAT64 üzerinden yenisini açıyordu. Doğru düzeltme yazıldı, iki açık da kapandı.',
              '**Ajan katmanında güven sınırı var.** Claude Code grafı proje skill’i üzerinden sorguluyor; toplanan metin güvenilmeyen veri sayılıyor ve içindeki talimat uygulanmıyor. Kural gerçek bir prompt-injection denemesiyle sınandı.',
            ],
            en: [
              '**Risky decisions were measured before any code.** The same OSINT schema was built in KùzuDB and Neo4j and benchmarked. Collector isolation and the independence method were also tried on real data before finalising.',
              '**Measurement, not the plan, set the scope.** At the end of every version a measurement script counted orphan nodes, unconfirmed-claim ratio, single-source dominance and queue backlog. The scope of v3, v4 and v5 came from those numbers; domains that failed the gate were not opened.',
              '**No LLM where none was needed, and that was measured too.** Entity extraction is deterministic, and the reliability score is deliberately model-free.',
              '**Real use was tested.** In a dogfooding round the tool was used for an actual investigation: 46 friction records, 22 critical. For example, RSS publish dates were silently dropped (all 1,164 records looked “observed today”) and HTTP error pages were taken as content. 35 were closed in that phase.',
              '**External audit was not trusted blindly.** An independent audit’s SSRF fix was tested against a 25-case IP matrix; it closed one hole and opened another via NAT64. The correct fix was written and both were closed.',
              '**The agent layer has a trust boundary.** Claude Code queries the graph through a project skill; collected text is treated as untrusted data and instructions inside it are not followed. The rule was tested with a real prompt-injection attempt.',
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
            tr: 'Koyu, sakin bir analist masası. Renk dekorasyon için değil, **bilginin ne kadar sağlam olduğunu** taşımak için var: güvenilirlik basamakları soğuk maviden (gözlendi) altına (yüksek güven) doğru ısınır, çelişki gül kırmızısıyla ayrılır. Mor yalnız “bu etkileşimli” işaretidir.',
            en: 'A dark, calm analyst desk. Colour is not decoration; it carries **how solid a piece of information is**: reliability steps warm from cold blue (observed) to gold (high confidence), and contradictions stand apart in rose. Purple only means “this is interactive”.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Tek kullanıcılı ve yerel; barındırılan demo yok, repo gizli.',
      'Otomatik test ve CI yok. Doğrulama fazların elle yürütülen kabul senaryoları ve ölçüm betiğiyle yapıldı.',
      'Deneysel domain’ler (GEOINT, SOCMINT, MEDIAINT) bilinçli olarak kapsam dışında.',
    ],
    en: [
      'Single-user and local; no hosted demo, private repository.',
      'No automated tests or CI. Verification used hand-run acceptance scenarios per phase and the measurement script.',
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
