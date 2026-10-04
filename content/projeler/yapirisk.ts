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
  durum: { tr: 'v1 çalışır; yayın hazırlığı tamam', en: 'v1 works; ready for release' },
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
            tr: 'Bir binanın deprem riskini kesin öğrenmenin yolu 6306 sayılı Kanun’la riskli yapı tespiti: malik başvurur ve öder. Çoğu kişi bu adımı atmadan önce “benim binam öncelikli mi?” diye sorar, ama elinde ya kulaktan dolma bilgi ya da yöntemini açıklamayan puanlama araçları vardır. Bakanlığın kendi yönetmeliğinde dışarıdan bakılarak yapılan resmî bir hızlı tarama yöntemi var; sıradan biri için uygulanabilir halde değil.',
            en: 'The way to learn a building’s earthquake risk for certain in Türkiye is a risky-building assessment under Law 6306: the owner applies and pays. Before taking that step most people ask “is my building a priority?”, and all they have is hearsay or scoring tools that do not explain their method. The ministry’s own regulation contains an official rapid screening method done from the street; it is not usable by an ordinary person as written.',
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
              '**Bina bulma:** tamamen yerel mahalle araması (Türkçe harf katlama, bulanık eşleşme); haritada bina çizimine dokunarak seçim, çizim yoksa nokta. Dört ilde 2,2 milyon bina.',
              '**Çizimli form:** betonarmede 13, yığmada 20 adım. Yumuşak kat, kısa kolon, ağır çıkma gibi sorular yönetmelikteki şekillerden yeniden çizilmiş SVG’lerle. Her soruda “Bilmiyorum”: puan iki uca açılır, sonuç aralık olur.',
              '**Deprem tehlikesi:** önceden hesaplanmış, sürümlü ESHM20 ızgarasından. AFAD’ın resmî değerinden farkı il başına 10 noktada ölçülüp aralığa katıldı; kullanıcı e-Devlet’ten aldığı resmî değeri girerse tek değere iner. Belirsizlik önceliği değiştiriyorsa sonuç kartı resmî değeri ister.',
              '**Hüküm değil öncelik:** üç bant, kalem kalem katkı tablosu, kaynak tablolar ve yöntemin isabet notu. A4 PDF rapor; ilin müdürlüğünü ve 6306 sürecini anlatan, yalnız birincil kaynakta doğrulanan bilgiyi içeren bir “Profesyonel inceleme” sayfası.',
              '**Gizlilik ve saha:** sunucu yok, cevaplar tarayıcıda; paylaşım bağlantısı adresin `#` parçasında taşınır. Bir kez açıldıktan sonra çevrimdışı çalışır: form binanın önünde, zayıf çekimde doldurulabiliyor.',
            ],
            en: [
              '**Finding the building:** fully local neighbourhood search (Turkish case folding, fuzzy matching); tap a building footprint on the map, or drop a point if there is none. 2.2 million buildings in four provinces.',
              '**Illustrated form:** 13 steps for reinforced concrete, 20 for masonry. Questions such as soft storey, short column and heavy overhang come with SVGs redrawn from the regulation’s figures. Every question has “I don’t know”: the score opens to both ends and the result becomes a range.',
              '**Seismic hazard:** from a precomputed, versioned ESHM20 grid. Its difference from AFAD’s official value was measured at 10 points per province and folded into the range; entering the official value from e-Devlet collapses it to one number. If the uncertainty changes the priority, the result card asks for the official value.',
              '**Priority, not a verdict:** three bands, an item-by-item contribution table, source tables and a note on the method’s accuracy. An A4 PDF report, and a “Professional inspection” page on the province’s directorate and the Law 6306 process, containing only information verified at the primary source.',
              '**Privacy and field use:** no server, answers stay in the browser; a share link carries the result in the URL’s `#` fragment. After the first visit it works offline, so the form can be filled in front of the building on a weak signal.',
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
              '**Önce dört spike.** Resmî metin (tablolar Resmî Gazete sayfa görüntüsünden okundu), tehlike verisi (ESHM20 ile 10 AFAD raporu), isabet (2023 depremi ACI 133 verisi) ve adres/ayak izi. İlk araştırma “resmî puanlı yöntem yok” demişti; birincil kaynak tersini gösterdi ve ürün o yöntemin üstüne kuruldu.',
              '**Tablolar testle bağlı.** Puan tabloları JSON’da; testlerdeki beklenen değerler ondan bağımsız yazıldı ve tabloya kasıtlı sokulan hatalar testleri düşürüyor. Python referansıyla 154 bina × 3 tehlike varsayımı = 462 karşılaştırma birebir.',
              '**Tekrarlanabilir veri.** Boru hattı tek komutla il paketini üretiyor; iki koşuda bütün dosyaların sha256’sı aynı. Kodda il adı yok: yeni il yeni bir veri paketi.',
              '**Kararlar kayıtta.** K-1…K-18 karar kaydı; “bilmiyorum” cevabının nasıl puanlandığı, bant sınırları, il başına tehlike aralığı gerekçeleriyle yazılı.',
            ],
            en: [
              '**Four spikes first.** The official text (tables read from the Official Gazette page images), hazard data (ESHM20 against 10 AFAD reports), accuracy (2023 earthquake, ACI 133 data) and address/footprints. The first research pass had said “there is no official scored method”; the primary source showed otherwise, and the product was built on that method.',
              '**Tables bound to tests.** Score tables live in JSON; expected values in the tests were written independently, and errors deliberately injected into the tables make the tests fail. Against the Python reference, 154 buildings × 3 hazard assumptions = 462 comparisons match exactly.',
              '**Reproducible data.** One command builds a province package; two runs give identical sha256 for every file. No province name is hard-coded: a new province is a new data package.',
              '**Decisions on record.** Decision log K-1…K-18: how “I don’t know” is scored, band limits and the per-province hazard range are written down with their reasons.',
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
            tr: 'Doğrulama verisi ürünün iddiasını küçülttü: resmî yöntem 2023 verisinde ağır hasarı kat sayısı kadar ayırıyor. Bunu saklamak yerine Yöntem sayfasına yazdım ve iddiayı “daha isabetli tahmin”den “resmî yöntemin açık, tekrarlanabilir, sınırları yazılı uygulaması”na çektim. Aynı veri “düşük öncelik güvenli demek değil” cümlesini de sonuç kartına koydurdu.',
            en: 'The validation data shrank the product’s claim: on 2023 data the official method separates heavy damage only as well as storey count does. Instead of hiding that, I wrote it on the Method page and moved the claim from “a more accurate prediction” to “an open, reproducible implementation of the official method with its limits written down”. The same data put “low priority does not mean safe” on the result card.',
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
