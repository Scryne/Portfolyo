import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/MythAtlas.md
export const mythatlas: Proje = {
  slug: 'mythatlas',
  ad: 'MythAtlas',
  alan: { tr: 'Açık veri · Harita', en: 'Open data · Maps' },
  baslik: {
    tr: 'Mitolojileri, tanrıları ve kutsal alanları haritada bağlayan açık atlas',
    en: 'An open atlas linking myths, deities and sacred sites on a map',
  },
  tekCumle: {
    tr: '157 mit, 212 tanrı ve 104 kutsal alanı dünya haritası, detay sayfaları ve karşılaştırmalı paraleller üzerinden bağlar. Her görseli, kaynağı ve UNESCO iddiasını doğrulanabilir tutan bir içerik doğruluğu kapısıyla korunur.',
    en: 'Connects 157 myths, 212 deities and 104 sacred sites through a world map, detail pages and comparative parallels, guarded by a content-accuracy gate that keeps every image, source and UNESCO claim verifiable.',
  },
  donem: { tr: 'Mar 2026 – Eyl 2026', en: 'Mar 2026 – Sep 2026' },
  yil: 202609,
  durum: { tr: 'Yayında; statik site (GitHub Pages)', en: 'Live; static site (GitHub Pages)' },
  repo: { acik: true, url: 'https://github.com/Scryne/MythAtlas' },
  demo: { tr: 'Canlı, GitHub Pages’te statik yayın.', en: 'Live, static build on GitHub Pages.' },
  demoUrl: 'https://scryne.github.io/MythAtlas/',
  stack: [
    { grup: { tr: 'Frontend', en: 'Frontend' }, ogeler: 'Next.js 16 (App Router), React 19, TypeScript, Tailwind, Framer Motion' },
    { grup: { tr: 'Harita ve grafik', en: 'Maps and charts' }, ogeler: 'MapLibre GL 6, Recharts, d3-force' },
    { grup: { tr: 'Veri', en: 'Data' }, ogeler: 'Statik JSON + GeoJSON, Wikipedia/Wikidata eşleme (SPARQL), Node betikleri' },
  ],
  olcek: [
    { ad: { tr: 'Veri', en: 'Data' }, deger: { tr: '157 mit, 212 tanrı, 104 alan, 36 mitoloji', en: '157 myths, 212 deities, 104 sites, 36 mythologies' } },
    { ad: { tr: 'Sayfa', en: 'Pages' }, deger: { tr: '566 statik sayfa', en: '566 static pages' } },
    { ad: { tr: 'CI', en: 'CI' }, deger: { tr: 'lint + tip + veri bütünlüğü + içerik doğruluğu + derleme', en: 'lint + types + data integrity + content accuracy + build' } },
  ],
  olcumler: [
    {
      ne: { tr: 'Kaynak kaydı', en: 'Source records' },
      once: { tr: '1.826', en: '1,826' },
      sonra: { tr: '274', en: '274' },
      not: { tr: 'Uydurma ve kalıp atıflar ile ölü bağlantılar çıktı.', en: 'Fabricated and boilerplate citations and dead links removed.' },
      cetvel: { min: 0, max: 1900, once: 1826, sonra: 274, yon: 'asagi' },
      kaynak: 'MythAtlas.md · olcek.dogrulama',
    },
    {
      ne: { tr: 'İçerik doğruluğu kapısı', en: 'Content-accuracy gate' },
      once: { tr: '5.483 ihlal', en: '5,483 violations' },
      sonra: { tr: '0', en: '0' },
      not: { tr: 'Kapı eski veride 5.483 ihlal buluyor, temiz veriyi geçiriyor; CI’da zorunlu.', en: 'The gate finds 5,483 violations in the old data and passes the clean data; mandatory in CI.' },
      kaynak: 'MythAtlas.md · Ne yaptım',
    },
    {
      ne: { tr: 'Doğrulanmış görseli olan tanrı', en: 'Deities with a verified image' },
      sonra: { tr: '176/212', en: '176/212' },
      not: { tr: 'Görsel yalnız eşleşen makaleden gelirse kalıyor.', en: 'An image stays only if it comes from the matched article.' },
      cetvel: { min: 0, max: 212, sonra: 176, yon: 'yukari' },
      kaynak: 'MythAtlas.md · olcek.dogrulama',
    },
    {
      ne: { tr: 'UNESCO iddiası (Wikidata SPARQL)', en: 'UNESCO claims (Wikidata SPARQL)' },
      sonra: { tr: '70 doğrulandı, 4 düştü', en: '70 verified, 4 dropped' },
      kaynak: 'MythAtlas.md · olcek.dogrulama',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Karşılaştırmalı mitoloji verisi dağınık, ve “güzel görünen” bir atlas üretmek kolay: her kayda bir görsel, birkaç akademik kaynak, bir “tartışmalılık” etiketi eklemek birkaç satır kod. Zor olan bunların **doğru** olması. MythAtlas’ın ilk sürümü tam bu tuzağa düştü.',
            en: 'Comparative mythology data is scattered, and building an atlas that “looks good” is easy: an image, a few academic sources and a “contested” badge per record are a few lines of code. The hard part is making them **true**. MythAtlas’s first version fell right into that trap.',
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
            tr: 'İlk sürüm CI’dan geçiyordu ama içerik ölçüldüğünde çöktü: 10 arkeolojik kaynak uydurmaydı, aynı 11 kuram kitabı 157 mitin neredeyse hepsine kalıp olarak atfedilmişti, 25 bağlantı 404’tü, Tac Mahal 20 Hindu tanrısının görseliydi, Abu Simbel’de Keops piramidi duruyordu, 28 alanda sahte “aktif kazı” rozeti vardı ve paralel mit “benzerlik puanları” tema örtüşmesiyle ilişkisizdi.',
            en: 'The first version passed CI, but its content collapsed under measurement: 10 archaeological sources were fabricated, the same 11 theory books were attributed as boilerplate to nearly all 157 myths, 25 links were 404, the Taj Mahal was the image for 20 Hindu deities, the Pyramid of Khufu stood in for Abu Simbel, 28 sites had a fake “active excavation” badge, and parallel-myth “similarity scores” were unrelated to thematic overlap.',
          },
        },
        {
          tur: 'liste',
          ogeler: {
            tr: [
              '**Doğrulama hattı:** Wikipedia/Wikidata eşlemesi sıkı kurallarla (ad + tür + bağlam), UNESCO durumu Wikidata SPARQL ile.',
              '**İdempotent temizlik:** kalıp atıflar ve ölü bağlantılar çıktı; kaynaksız alanlar arayüzden kalktı.',
              '**Dürüst metrik:** paralel benzerlik artık iki mitin motif kümelerinin Jaccard oranı, ve arayüz bunu söylüyor.',
              '**Kapı:** `qa:content` temiz veriyi geçiriyor, eski veride 5.483 ihlal buluyor; CI’da zorunlu.',
              '**Yükseltme:** Next 14 → 16, React 19, MapLibre 6; üretim bağımlılıklarında 0 açık.',
            ],
            en: [
              '**Verification pipeline:** strict Wikipedia/Wikidata matching (name + type + context), UNESCO status via Wikidata SPARQL.',
              '**Idempotent cleanup:** boilerplate citations and dead links removed; unsourced fields removed from the UI.',
              '**Honest metric:** parallel similarity is now the Jaccard ratio of two myths’ motif sets, and the UI says so.',
              '**Gate:** `qa:content` passes the clean data and finds 5,483 violations in the old; mandatory in CI.',
              '**Upgrade:** Next 14 → 16, React 19, MapLibre 6; 0 advisories in production dependencies.',
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
            tr: '“Testler yeşil” içerik doğruluğunu ölçmüyordu. Doğruluk ayrı bir kapı ister: iddia başına kaynak, kaynak başına doğrulama, ve eski veriyi yakalayabildiği kanıtlanmış bir kontrol.',
            en: '“Tests pass” did not measure content accuracy. Accuracy needs its own gate: a source per claim, verification per source, and a check proven to catch the old data.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Barındırılan bir kurulum yok; site yerelde derlenip çalışıyor.',
      'Görseli doğrulanamayan kayıtlarda (tanrılarda 36, alanlarda 14) görsel bilerek boş.',
    ],
    en: [
      'No hosted deployment; the site builds and runs locally.',
      'Records whose image could not be verified (36 deities, 14 sites) deliberately have none.',
    ],
  },
  galeri: [
    { ad: 'harita', aciklama: { tr: 'Dünya haritası: mitoloji kümeleri.', en: 'World map: mythology clusters.' } },
    { ad: 'zeus', aciklama: { tr: 'Tanrı sayfası: Zeus.', en: 'Deity page: Zeus.' } },
    { ad: 'abu-simbel', aciklama: { tr: 'Alan sayfası: Abu Simbel, artık doğru görselle.', en: 'Site page: Abu Simbel, now with the right image.' } },
    { ad: 'gilgamis', aciklama: { tr: 'Mit sayfası: Gılgamış Destanı.', en: 'Myth page: the Epic of Gilgamesh.' } },
    { ad: 'soy-agaci', aciklama: { tr: 'Mitolojiler arası etki ağı.', en: 'Influence network across mythologies.' } },
    { ad: 'arkeoloji', aciklama: { tr: 'Arkeoloji merkezi: Wikidata’yla doğrulanmış UNESCO alanları.', en: 'Archaeology hub: UNESCO sites verified against Wikidata.' } },
  ],
};
