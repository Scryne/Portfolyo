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
            tr: 'Kriz masasındaki analist her sabah sorar: son bir saatte kritik bir gelişme var mı, haritada nerede yoğunlaşıyor? Haber siteleri bunu kronolojik ve tekrarla dolu bir akış olarak verir. Bir tehdit göstergesi de ancak neden o seviyede olduğunu söyleyebiliyorsa işe yarar.',
            en: 'A crisis-desk analyst asks every morning: has anything critical happened in the last hour, and where on the map is it concentrated? News sites answer with a chronological feed full of duplicates. A threat gauge helps only if it can say why it is at that level.',
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
              '**Toplama:** 15 RSS kaynağı; her istekte SSRF denetimi, devre kesici ve süre sınırı.',
              '**Haritaya bağlama:** yer adları sözlüğü haberi bir noktaya yerleştirir, aynı noktadakiler tek işarette toplanır.',
              '**Açıklanabilir tehdit seviyesi:** 1–5 seviye son 1/24 saatin kritik olaylarından, eğilimden, yayılımdan ve çok kaynaklı teyitten hesaplanır; panel seviyeyi hangi ölçümün belirlediğini yazar.',
              '**Hesap kodda, metin modelde:** sayımlar koddan gelir; yerel model her habere tarafsız bir Türkçe özet yazar, dil denetiminden geçmeyen çıktı atılır.',
            ],
            en: [
              '**Collection:** 15 RSS feeds, with an SSRF check, circuit breaker and timeout on every request.',
              '**Mapping:** a gazetteer places each story at a point; stories at the same point collapse into one marker.',
              '**Explainable threat level:** the 1–5 level comes from critical events in the last 1/24 hours, trend, spread and multi-source confirmation; the panel states which measurement set it.',
              '**Counting in code, wording in the model:** counts come from code; a local model writes a neutral Turkish summary per story, and output that fails the language check is discarded.',
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
              '**Model seçimi ölçümle:** `llama3.2:3b` Türkçe özete İngilizce ve Çince sözcük karıştırdı; `gemma3:4b` temiz Türkçe, yaklaşık 2 saniye.',
              '**Ajan çıktısına kör güven yok:** yapay zekânın kendi yazdığı “bağımsız sertifika” başlıklı rapora, bunun bir öz değerlendirme olduğunu söyleyen not kondu.',
            ],
            en: [
              '**Model choice by measurement:** `llama3.2:3b` mixed English and Chinese words into Turkish summaries; `gemma3:4b` gave clean Turkish in about 2 seconds.',
              '**No blind trust in agent output:** an AI-written report titled “independent certificate” now opens with a note saying it is a self-assessment.',
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
            tr: 'Yerelde 231 + 55 test yeşildi; CI beş haftadır kırmızıydı. Ölçünce:',
            en: 'Locally, 231 + 55 tests were green; CI had been red for five weeks. Measuring it showed:',
          },
        },
        {
          tur: 'liste',
          ogeler: {
            tr: [
              '**Testler gerçek yedeği silmek üzereydi:** gerçek yedek dizinine yazıyorlardı; geçici veritabanına alındı, koruma testi eklendi.',
              '**RSS hiç çekmiyordu (0/15):** aynı alan adı iki kez çözülüyor, yavaş DNS havuzu tıkıyordu. Sonra 15/15 kaynak, ~430 haber 25 saniyede.',
              '**Sahte alarm ve sahte özet:** bir ay kapalı kalan pano “5 · KRİTİK” açılıyordu, bir deve yarışı haberi füze olayı sayılıyordu; model yokken kalıp cümleler “AI özeti” diye kaydediliyordu.',
            ],
            en: [
              '**Tests were about to delete the real backup:** they wrote into the real backup directory; moved to a temporary database, with a guard test.',
              '**RSS never fetched (0/15):** the same host was resolved twice and slow DNS stalled the pool. After: 15/15 feeds, ~430 stories in 25 seconds.',
              '**False alarm, fake summary:** after a month offline the board opened at “5 · CRITICAL”, a camel-race story counted as a missile event, and with no model running canned sentences were saved as the “AI summary”.',
            ],
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
            tr: 'Bir izleme aracının en tehlikeli hatası çökmek değil, yanlış ama inandırıcı bir şey göstermek. Doğruluğu sayıma, dili modele bırakmak bu yüzden bir tasarım kararı.',
            en: 'A monitoring tool’s most dangerous failure is not crashing but showing something wrong yet convincing. Leaving accuracy to counting and wording to the model is a design decision.',
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
