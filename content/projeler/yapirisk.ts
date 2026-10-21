import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/YapiRisk.md
export const yapirisk: Proje = {
  slug: 'yapirisk',
  ad: 'YapıRisk',
  alan: { tr: 'Deprem riski · Harita', en: 'Earthquake risk · Maps' },
  baslik: {
    tr: 'Binanın deprem riskini resmî yöntemle ön değerlendiren harita uygulaması',
    en: 'A map app that pre-assesses a building’s earthquake risk with the official method',
  },
  tekCumle: {
    tr: 'Haritada binanızı seçip dışarıdan bakarak cevaplanabilen çizimli sorulara yanıt veriyorsunuz; uygulama Bakanlığın resmî hızlı değerlendirme yöntemini (RYTEİE 2019 Ek-A) konumun deprem tehlikesiyle birleştirip kalem kalem gerekçeli bir “profesyonel inceleme önceliği” ve A4 rapor veriyor. Sunucu yok: girdiler tarayıcıdan çıkmıyor.',
    en: 'You pick your building on the map and answer illustrated questions you can answer from the street; the app combines the ministry’s official rapid assessment method (RYTEİE 2019 Annex A) with the site’s seismic hazard and returns a “professional inspection priority” with item-by-item reasons and an A4 report. There is no server: inputs never leave the browser.',
  },
  donem: { tr: 'Eyl 2026 – Eki 2026', en: 'Sep 2026 – Oct 2026' },
  yil: 202610,
  durum: { tr: 'v1 çalışır; yayın öncesinde beklemede (Ekim 2026)', en: 'v1 works; on hold before release (Oct 2026)' },
  repo: { acik: false },
  demo: {
    tr: 'Henüz yok. Statik site; GitHub Pages iş akışı hazır.',
    en: 'Not yet. A static site; the GitHub Pages workflow is ready.',
  },
  stack: [
    { grup: { tr: 'Arayüz', en: 'Interface' }, ogeler: 'React 19, TypeScript 7, Vite 8, Tailwind 4, shadcn/Radix, MapLibre GL 6 + OpenFreeMap' },
    { grup: { tr: 'Veri', en: 'Data' }, ogeler: 'Python 3.12 + uv boru hattı (shapely): ESHM20 tehlike ızgarası, Microsoft bina ayak izleri, OSM mahalle dizini' },
    { grup: { tr: 'Çalışma', en: 'Runtime' }, ogeler: 'Statik site, elle yazılmış servis çalışanı (çevrimdışı), localStorage' },
    { grup: { tr: 'Kalite', en: 'Quality' }, ogeler: 'Vitest, Playwright (masaüstü + telefon), pytest, oxlint, GitHub Actions' },
  ],
  olcek: [
    { ad: { tr: 'Kapsam', en: 'Coverage' }, deger: { tr: '4 il · 2,2 milyon bina · 4.279 mahalle/köy', en: '4 provinces · 2.2 million buildings · 4,279 neighbourhoods/villages' } },
    { ad: { tr: 'Yöntem', en: 'Method' }, deger: { tr: 'Betonarme 1–7 kat, yığma 1–5 kat', en: 'Reinforced concrete 1–7 storeys, masonry 1–5 storeys' } },
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: 'Vitest 240 + pytest 14 + Playwright 40 (masaüstü + telefon)', en: 'Vitest 240 + pytest 14 + Playwright 40 (desktop + phone)' } },
  ],
  olcumler: [
    {
      ne: { tr: 'Ağır hasarı ayırma gücü (AUC), 2023 depremi, 154 bina', en: 'Separating heavy damage (AUC), 2023 earthquake, 154 buildings' },
      sonra: { tr: '0,697', en: '0.697' },
      not: { tr: 'Yalnız kat sayısı da 0,700 verdi. Yöntem bu veride kat sayısından fazlasını söylemedi; ürünün Yöntem sayfasında böyle yazıyor.', en: 'Storey count alone also gave 0.700. On this data the method said nothing beyond storey count; the product’s Method page says so.' },
      cetvel: { min: 0.5, max: 1, sonra: 0.697, yon: 'yukari', esik: { deger: 0.7, ad: { tr: 'yalnız kat sayısı', en: 'storey count alone' } } },
      kaynak: 'YapiRisk.md · Ölçümler · İsabet',
    },
    {
      ne: { tr: 'AFAD’ın resmî tehlike bölgesini kaçırmayan nokta', en: 'Points where AFAD’s official hazard zone is not missed' },
      once: { tr: '31/40', en: '31/40' },
      sonra: { tr: '40/40', en: '40/40' },
      not: { tr: 'Tek ESHM20 değeri 9 noktada binayı daha az tehlikeli bölgede gösteriyordu. İl başına ölçülen aralıkla 40 noktanın hepsinde resmî bölge aralığın içinde.', en: 'A single ESHM20 value put the building in a less hazardous zone at 9 points. With a range measured per province, the official zone falls inside it at all 40.' },
      cetvel: { min: 0, max: 40, once: 31, sonra: 40, yon: 'yukari' },
      kaynak: 'YapiRisk.md · Ölçümler · Tehlike farkı',
    },
    {
      ne: { tr: 'Mobil Cumulative Layout Shift', en: 'Mobile Cumulative Layout Shift' },
      once: { tr: '0,11', en: '0.11' },
      sonra: { tr: '0,003', en: '0.003' },
      not: { tr: 'Aynı turda erişilebilirlik 94 → 100.', en: 'Accessibility went 94 → 100 in the same pass.' },
      cetvel: { min: 0, max: 0.15, once: 0.11, sonra: 0.003, yon: 'asagi', esik: { deger: 0.1, ad: { tr: 'iyi eşiği', en: '“good” threshold' } } },
      kaynak: 'YapiRisk.md · Ölçümler · Mobil',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Bir binanın deprem riskini kesin öğrenmenin yolu 6306 sayılı Kanun’la riskli yapı tespiti: malik başvurur ve öder. Çoğu kişi önce “benim binam öncelikli mi?” diye sorar ama elinde yöntemini açıklamayan araçlar vardır. Bakanlığın yönetmeliğinde dışarıdan yapılan resmî bir hızlı tarama yöntemi var; sıradan biri için uygulanabilir halde değil.',
            en: 'The way to learn a building’s earthquake risk for certain in Türkiye is an assessment under Law 6306: the owner applies and pays. Most people first ask “is my building a priority?”, with only tools that do not explain their method. The ministry’s regulation contains an official rapid screening method done from the street; as written, an ordinary person cannot use it.',
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
              '**Bina bulma:** yerel mahalle araması, haritada bina çizimine dokunarak seçim; dört ilde 2,2 milyon bina.',
              '**Çizimli form:** betonarmede 13, yığmada 20 adım; sorular yönetmelikteki şekillerden çizilmiş. Her soruda “Bilmiyorum”: sonuç tek değer değil aralık olur.',
              '**Deprem tehlikesi:** sürümlü ESHM20 ızgarası; AFAD değerinden farkı ölçülüp aralığa katıldı. Belirsizlik önceliği değiştiriyorsa sonuç resmî değeri ister.',
              '**Hüküm değil öncelik:** üç bant, kalem kalem gerekçe, A4 rapor ve 6306 sürecini anlatan bir “Profesyonel inceleme” sayfası.',
              '**Sunucusuz:** cevaplar tarayıcıdan çıkmaz; bir kez açıldıktan sonra çevrimdışı çalışır.',
            ],
            en: [
              '**Finding the building:** local neighbourhood search, tap a building footprint on the map; 2.2 million buildings in four provinces.',
              '**Illustrated form:** 13 steps for reinforced concrete, 20 for masonry, drawn from the regulation’s figures. Every question has “I don’t know”, which turns the result into a range.',
              '**Seismic hazard:** a versioned ESHM20 grid; its difference from AFAD’s value was measured and folded into the range. If the uncertainty changes the priority, the result asks for the official value.',
              '**Priority, not a verdict:** three bands, item-by-item reasons, an A4 report and a “Professional inspection” page on the Law 6306 process.',
              '**Serverless:** answers never leave the browser; after the first visit it works offline.',
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
              '**Önce birincil kaynak:** ilk araştırma “resmî puanlı yöntem yok” demişti; Resmî Gazete sayfa görüntüleri tersini gösterdi ve ürün o yöntemin üstüne kuruldu.',
              '**Tablolar testle bağlı:** puan tablosuna kasıtlı sokulan hatalar testleri düşürüyor; Python referansıyla 462 karşılaştırma birebir.',
              '**Tekrarlanabilir veri:** tek komut il paketini üretir, iki koşuda bütün dosyaların sha256’sı aynı.',
            ],
            en: [
              '**Primary source first:** the first research pass said “there is no official scored method”; the Official Gazette page images showed otherwise, and the product was built on that method.',
              '**Tables bound to tests:** errors injected into the score table fail the tests; 462 comparisons against the Python reference match exactly.',
              '**Reproducible data:** one command builds a province package, and two runs give identical sha256 for every file.',
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
            tr: 'Doğrulama verisi iddiayı küçülttü: resmî yöntem 2023 verisinde ağır hasarı kat sayısı kadar ayırıyor. Bunu saklamadım; iddiayı “daha isabetli tahmin”den “resmî yöntemin açık, sınırları yazılı uygulaması”na çektim ve sonuç kartına “düşük öncelik güvenli demek değil” yazdım.',
            en: 'The validation data shrank the claim: on 2023 data the official method separates heavy damage only as well as storey count. I did not hide it; I moved the claim from “a more accurate prediction” to “an open implementation of the official method with its limits written down”, and the result card says “low priority does not mean safe”.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Sonuç bir öncelik bandı, bina hakkında hüküm değil; yönetmelik yöntemin tek binada risk değerlendirmesi için kullanılamayacağını söylüyor.',
      'Görünen kalite, ağır çıkma, düzensizlikler, nizam ve eğim doğrulama verisinde yoktu; bu kalemlerin isabeti ölçülemedi.',
      'Dört il (Manisa, İzmir, Aydın, Denizli); çelik, prefabrik ve 8+ katlı betonarme kapsam dışı.',
      'Henüz gerçek kullanıcı testi yapılmadı.',
    ],
    en: [
      'The result is a priority band, not a verdict on the building; the regulation says the method cannot be used to assess a single building’s risk.',
      'Visible quality, heavy overhang, irregularities, adjacency and slope were absent from the validation data; their accuracy could not be measured.',
      'Four provinces (Manisa, İzmir, Aydın, Denizli); steel, prefabricated and 8+ storey concrete buildings are out of scope.',
      'No real-user testing yet.',
    ],
  },
  galeri: [
    { ad: 'sonuc', aciklama: { tr: 'Sonuç: öncelik bandı, puan aralığı ve kalem kalem katkı tablosu; haritada seçilen bina.', en: 'Result: priority band, score range and item-by-item contributions; the selected building on the map.' } },
    { ad: 'form', aciklama: { tr: 'Form: yönetmelikteki şekillerden yeniden çizilmiş seçenekler, her soruda “Bilmiyorum”.', en: 'Form: options redrawn from the regulation’s figures, “I don’t know” on every question.' } },
    { ad: 'harita', aciklama: { tr: 'Bina seçimi: ayak izine dokunulur, konumun tehlike değeri ve kaynağı gösterilir.', en: 'Building selection: tap a footprint; the site’s hazard value and its source are shown.' } },
    { ad: 'rapor', aciklama: { tr: 'A4 rapor: sonuç, katkılar, tehlike, cevaplar, nasıl okunmalı ve kaynaklar.', en: 'A4 report: result, contributions, hazard, answers, how to read it and sources.' } },
    { ad: 'yontem', aciklama: { tr: 'Yöntem ve isabet: 2023 depremi verisinde ölçülen ayırma gücü, kat sayısıyla birlikte.', en: 'Method and accuracy: separating power measured on 2023 earthquake data, next to storey count.' } },
    { ad: 'mobil', mobil: true, aciklama: { tr: 'Telefonda form.', en: 'Form on a phone.' } },
  ],
};
