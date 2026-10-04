import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/Wartrack.md
export const wartrack: Proje = {
  slug: 'wartrack',
  ad: 'Wartrack',
  alan: { tr: 'İzleme · Harita', en: 'Monitoring · Maps' },
  baslik: {
    tr: 'Açık kaynak haberleri haritaya bağlayan, tehdit seviyesini gerekçesiyle hesaplayan izleme panosu',
    en: 'A monitoring board that maps open-source news and explains its threat level',
  },
  tekCumle: {
    tr: 'İran–İsrail/Levant hattını 15 kaynaktan izler, haberleri bir yer adları sözlüğüyle haritaya yerleştirir, gerekçesini de söyleyen bir tehdit seviyesi (1–5) hesaplar ve haberleri yerel bir dil modeliyle Türkçe özetler. Veri makineden çıkmaz.',
    en: 'Tracks the Iran–Israel/Levant theatre from 15 sources, places stories on a map with a gazetteer, computes a 1–5 threat level that explains itself, and summarises stories in Turkish with a local language model. Data never leaves the machine.',
  },
  donem: { tr: 'Şub 2026 – Eyl 2026', en: 'Feb 2026 – Sep 2026' },
  yil: 202609,
  durum: { tr: 'Tamamlandı; yerelde uçtan uca çalışır', en: 'Complete; runs end to end locally' },
  repo: { acik: true, url: 'https://github.com/Scryne/Wartrack' },
  demo: { tr: 'Yok. Yerelde çalışır; Ollama isteğe bağlı.', en: 'None. Runs locally; Ollama optional.' },
  stack: [
    { grup: { tr: 'Frontend', en: 'Frontend' }, ogeler: 'React 18, Vite 5, TypeScript, Zustand, Leaflet, lucide-react, Tailwind' },
    { grup: { tr: 'Backend', en: 'Backend' }, ogeler: 'Node.js, Express, Socket.IO, TypeScript, better-sqlite3 (WAL), undici, node-cron' },
    { grup: { tr: 'Yapay zekâ', en: 'AI' }, ogeler: 'Ollama gemma3:4b (yerel, varsayılan), Gemini (isteğe bağlı yedek)' },
    { grup: { tr: 'Kalite', en: 'Quality' }, ogeler: 'Vitest, ESLint, tsc, GitHub Actions, Lighthouse' },
  ],
  olcek: [
    { ad: { tr: 'Kaynak', en: 'Sources' }, deger: { tr: '15 RSS; ~430 haber / 25 sn', en: '15 RSS; ~430 stories / 25 s' } },
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: 'backend 242 + frontend 54', en: 'backend 242 + frontend 54' } },
    { ad: { tr: 'Lighthouse', en: 'Lighthouse' }, deger: { tr: 'a11y 97, BP 96, perf 86–92', en: 'a11y 97, BP 96, perf 86–92' } },
  ],
  olcumler: [
    {
      ne: { tr: 'Haber çekilen RSS kaynağı', en: 'RSS feeds actually fetched' },
      once: { tr: '0/15', en: '0/15' },
      sonra: { tr: '15/15', en: '15/15' },
      not: { tr: 'Yavaş DNS’te iş parçacığı havuzu tıkanıyordu; aradaki DNS rebinding açığı da kapandı.', en: 'The thread pool stalled on slow DNS; the DNS-rebinding gap in between was closed too.' },
      cetvel: { min: 0, max: 15, once: 0, sonra: 15, yon: 'yukari' },
      kaynak: 'Wartrack.md · Denetim',
    },
    {
      ne: { tr: 'Bağımlılık açığı', en: 'Dependency vulnerabilities' },
      once: { tr: '16', en: '16' },
      sonra: { tr: '0', en: '0' },
      not: { tr: '9’u yüksek.', en: '9 of them high.' },
      cetvel: { min: 0, max: 16, once: 16, sonra: 0, yon: 'asagi' },
      kaynak: 'Wartrack.md · olcek.bagimlilik',
    },
    {
      ne: { tr: 'Cumulative Layout Shift', en: 'Cumulative Layout Shift' },
      once: { tr: '0,54', en: '0.54' },
      sonra: { tr: '0,02', en: '0.02' },
      cetvel: { min: 0, max: 0.6, once: 0.54, sonra: 0.02, yon: 'asagi', esik: { deger: 0.1, ad: { tr: 'iyi eşiği', en: '“good” threshold' } } },
      kaynak: 'Wartrack.md · olcek.lighthouse',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Bir kriz masasındaki analist her sabah aynı soruyu sorar: “Son bir saatte yeni bir kritik gelişme var mı, ve haritada nerede yoğunlaşıyor?” Haber siteleri bunu ayrı ayrı, kronolojik ve tekrarlarla dolu bir akış olarak verir. Bir “tehdit seviyesi” göstergesi ise ancak neden o seviyede olduğunu söyleyebiliyorsa işe yarar; yoksa ya alarm yorgunluğu yaratır ya da güveni yok eder.',
            en: 'An analyst at a crisis desk asks the same question every morning: “Has anything critical happened in the last hour, and where on the map is it concentrated?” News sites answer separately, chronologically and full of duplicates. A “threat level” gauge helps only if it can say why it is at that level; otherwise it breeds alarm fatigue or destroys trust.',
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
              '**Toplama:** 15 RSS kaynağı (Al Jazeera, BBC, Guardian, Haaretz, ISW ve diğerleri); her istekte SSRF denetimi, devre kesici, yeniden deneme ve süre sınırı.',
              '**Haritaya bağlama:** yer adları sözlüğü haberi bölgedeki bir noktaya yerleştirir; aynı noktaya düşen haberler tek işarette sayıyla toplanır.',
              '**Açıklanabilir tehdit seviyesi:** seviye (1–5) son 1/24 saatin kritik olay sayısından, 6 saatlik eğilimden, coğrafi dağılımdan ve çok kaynaklı teyitten hesaplanır. Panel yalnız “3 · GERİLİM” demez, bunu hangi ölçümün belirlediğini de yazar.',
              '**Türkçe özet, veri makinede:** her habere yerel modelle bir iki cümlelik tarafsız Türkçe özet. Dil denetiminden geçmeyen çıktı yazılmaz; model kapalıysa özet boş kalır.',
              '**Hesap kodun, metin modelin işi:** durum özetinde “kritik gelişme” ve “trend” sayımdan gelir, model yalnız haber maddelerini yazar.',
              '**Operatör araçları:** elle işaret ve çizim, nükleer tesis ve hava savunma katmanları, izlenen kelimeler, canlı yayın, komut paleti, Markdown durum raporu, çalışırken veritabanı yedeği.',
            ],
            en: [
              '**Collection:** 15 RSS feeds (Al Jazeera, BBC, Guardian, Haaretz, ISW and more), with an SSRF check, circuit breaker, retries and timeouts on every request.',
              '**Mapping:** a gazetteer places each story at a point in the region; stories at the same point collapse into one marker with a count.',
              '**Explainable threat level:** the 1–5 level is computed from critical events in the last 1/24 hours, the 6-hour trend, geographic spread and multi-source confirmation. The panel does not just say “3 · TENSION”; it states which measurement set it.',
              '**Turkish summaries, data stays local:** a local model writes a neutral one-or-two-sentence Turkish summary per story. Output that fails the language check is discarded; if the model is off, the summary stays empty.',
              '**Counting is code’s job, wording is the model’s:** “critical developments” and “trend” in the situation summary come from counts; the model only writes the story bullets.',
              '**Operator tools:** manual markers and drawing, nuclear-site and air-defence layers, watch words, live streams, a command palette, a Markdown situation report and hot database backup.',
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
              '**Tasarım sözleşmesi.** `DESIGN.md` brifi (cerrahi, sakin, taktiksel; emoji yasak), token sistemini ve “şablon gibi durma” yasaklarını tanımlar. Her arayüz turu dört ekran genişliğinde doğrulanır.',
              '**Model seçimi ölçümle.** Yerel özet modeli gerçek haberlerle kıyaslandı: `llama3.2:3b` Türkçe özete İngilizce ve Çince sözcük karıştırdı; `gemma3:4b` temiz Türkçe ve yaklaşık 2 saniye.',
              '**Ajan çıktısına kör güven yok.** Önceki bir turda yapay zekânın kendi kendini değerlendirdiği bir rapor “bağımsız sertifika” başlığıyla repoya girmişti. Denetimde başına bunun bir öz değerlendirme olduğunu söyleyen bir not kondu.',
            ],
            en: [
              '**Design contract.** `DESIGN.md` defines the brief (surgical, calm, tactical; no emoji), the token system and anti-template rules. Every UI round is verified at four screen widths.',
              '**Model choice by measurement.** Local summary models were compared on real stories: `llama3.2:3b` mixed English and Chinese words into Turkish; `gemma3:4b` produced clean Turkish in about 2 seconds.',
              '**No blind trust in agent output.** In an earlier round, an AI self-assessment had entered the repo titled “independent certificate”. The audit added a note at the top saying it is a self-assessment.',
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
            tr: 'Yerelde 231 + 55 test yeşildi; CI ise beş haftadır kırmızıydı. Ölçünce ortaya çıkanlar:',
            en: 'Locally, 231 + 55 tests were green; CI had been red for five weeks. Measuring it revealed:',
          },
        },
        {
          tur: 'liste',
          ogeler: {
            tr: [
              '**Testler gerçek yedeği silmek üzereydi.** API testleri gerçek yedek dizinine yazıyor, rotasyonla operatörün tek gerçek yedeğini silmeye bir koşu uzaktaydı. Testler geçici veritabanına alındı, bir koruma testi eklendi.',
              '**RSS hiç çekmiyordu (0/15).** SSRF denetimi ve istek aynı alan adını iki kez çözüyor, yavaş DNS’te iş parçacığı havuzu tıkanıyordu. Denetim bağlantı anına taşındı: 15/15 kaynak, ~430 haber 25 saniyede.',
              '**Sahte alarm.** Olaylar okunma anıyla tarihleniyordu; bir ay kapalı kalan pano açılınca “5 · KRİTİK” gösterdi. Bir deve yarışı haberi (“intercepted”) füze olayı sayılıyordu. Üç ayrı tehdit hesabı teke indirildi.',
              '**Sahte yapay zekâ özeti.** Model yokken beş kalıp cümle “AI özeti” diye kaydediliyordu; kaldırıldı.',
              '**Arayüz:** harita katmanı anahtar istediği için boştu, canlı yayınların yarısı ölüydü, 71 emoji ve 94 ham renk kodu tasarım sistemini deliyordu.',
            ],
            en: [
              '**Tests were about to delete the real backup.** API tests wrote into the real backup directory; one more run and rotation would have deleted the operator’s only real backup. Tests moved to a temporary database, with a guard test.',
              '**RSS never fetched (0/15).** The SSRF check and the request resolved the same host twice, and slow DNS stalled the thread pool. The check moved to connect time: 15/15 feeds, ~430 stories in 25 seconds.',
              '**False alarm.** Events were dated by read time, so after a month offline the board opened at “5 · CRITICAL”. A camel-race story (“intercepted”) counted as a missile event. Three separate threat calculations were merged into one.',
              '**Fake AI summary.** With no model running, five canned sentences were saved as the “AI summary”; removed.',
              '**Interface:** the map layer was empty because it needed an API key, half the live streams were dead, and 71 emoji and 94 raw colour codes were punching holes in the design system.',
            ],
          },
        },
        {
          tur: 'p',
          metin: {
            tr: 'Her düzeltme regresyon testiyle geldi. Push öncesi her seferinde temiz bir `node:22` konteynerinde tam CI simülasyonu koşuldu.',
            en: 'Every fix came with a regression test. Before each push, the full CI was simulated in a clean `node:22` container.',
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
            tr: 'Bir izleme aracının en tehlikeli hatası çökmek değil, yanlış ama inandırıcı bir şey göstermek: boş bir akış, bayat bir alarm, uydurma bir “AI özeti”. Doğruluğu sayıma, dili modele bırakmak bu yüzden bir tasarım kararı.',
            en: 'A monitoring tool’s most dangerous failure is not crashing but showing something wrong yet convincing: an empty feed, a stale alarm, a made-up “AI summary”. Leaving accuracy to counting and wording to the model is therefore a design decision.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Tek operatörlük bir araç; barındırılan demo yok.',
      'Tehdit seviyesi haber akışından türer; sahadaki durumu değil, yayınlananı ölçer.',
    ],
    en: [
      'A single-operator tool; no hosted demo.',
      'The threat level derives from the news flow; it measures what is published, not the situation on the ground.',
    ],
  },
  galeri: [
    { ad: 'pano', aciklama: { tr: 'Pano: harita, tehdit seviyesi ve gerekçesi, canlı yayın, haber akışı.', en: 'Board: map, threat level with its reasons, live stream, news feed.' } },
    { ad: 'durum-ozeti', aciklama: { tr: 'Durum özeti: modelin maddeleri + ölçümden gelen “kritik gelişme” ve “trend”.', en: 'Situation summary: the model’s bullets plus measured “critical developments” and “trend”.' } },
    { ad: 'katmanlar', aciklama: { tr: 'Nükleer tesis ve hava savunma menzili katmanları, lejant.', en: 'Nuclear-site and air-defence range layers, with legend.' } },
    { ad: 'kritik', aciklama: { tr: 'Kritik olaylar: şiddet, kaynak, saat.', en: 'Critical events: severity, source, time.' } },
    { ad: 'nokta', aciklama: { tr: 'Aynı noktaya düşen haberler tek işarette, sayıyla.', en: 'Stories at the same point in one marker, with a count.' } },
    { ad: 'mobil', mobil: true, aciklama: { tr: 'Mobil görünüm.', en: 'Mobile view.' } },
  ],
};
