import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/Citefield.md
export const citefield: Proje = {
  slug: 'citefield',
  ad: 'Citefield',
  alan: { tr: 'Belge çıkarımı · self-host', en: 'Document extraction · self-hosted' },
  baslik: {
    tr: 'Faturadan okunan her değerin sayfadaki hangi kelimelerden geldiğini gösteren belge çıkarım motoru',
    en: 'A document extraction engine where every value points to the words on the page it was read from',
  },
  tekCumle: {
    tr: 'Fatura ve fişlerden alanları bir görsel modelle okur, her değeri sayfadaki gerçek kelimelerin koordinatlarına bağlar, ikinci bir okuma, aritmetik ve kontrol haneleriyle sınar. Bütün kontrolleri geçen değer kendiliğinden onaylanır; geçemeyen, gerekçesi yazılı olarak inceleme kuyruğuna düşer.',
    en: 'Reads fields from invoices and receipts with a vision model, ties every value to the coordinates of the real words on the page, and checks it with a second read, the arithmetic and check digits. A value that passes every check is approved on its own; one that does not goes to a review queue with the reason written out.',
  },
  donem: { tr: 'Eki 2026', en: 'Oct 2026' },
  yil: 202610,
  durum: {
    tr: 'v1 çalışıyor (motor, inceleme arayüzü, API, Docker); açık kaynak yayını ve ilk dış kullanıcılar sırada',
    en: 'v1 works (engine, review UI, API, Docker); the open-source release and first outside users are next',
  },
  repo: { acik: false },
  demo: {
    tr: 'Yok. Kendi makinende tek komutla çalışır (Docker ya da uvx).',
    en: 'None. Runs on your own machine with one command (Docker or uvx).',
  },
  stack: [
    { grup: { tr: 'Çekirdek', en: 'Core' }, ogeler: 'Python 3.13, uv, pypdfium2 + pdfplumber (metin katmanı), RapidOCR (CPU)' },
    { grup: { tr: 'Model', en: 'Model' }, ogeler: 'Anthropic (yapılandırılmış çıktı), OpenAI uyumlu API, Ollama yerel mod (qwen3-vl)' },
    { grup: { tr: 'Sunucu', en: 'Server' }, ogeler: 'FastAPI, SQLite (WAL) + SQLAlchemy 2.1 + Alembic, süreç içi işçi, JSON / CSV / XLSX' },
    { grup: { tr: 'Arayüz', en: 'Frontend' }, ogeler: 'React 19, Vite 8, Tailwind 4, Base UI, TanStack Query' },
    { grup: { tr: 'Kalite', en: 'Quality' }, ogeler: 'ruff, mypy strict, pytest, Playwright, mutasyon testi, GitHub Actions' },
  ],
  olcek: [
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: '88 Python + 6 uçtan uca', en: '88 Python + 6 end-to-end' } },
    { ad: { tr: 'Spike', en: 'Spikes' }, deger: { tr: '3, ölçülmüş eşikle', en: '3, against measured thresholds' } },
    { ad: { tr: 'Faz', en: 'Phases' }, deger: { tr: '8 + arayüz v2', en: '8 + UI v2' } },
    { ad: { tr: 'Commit', en: 'Commits' }, deger: { tr: '23', en: '23' } },
  ],
  olcumler: [
    {
      ne: { tr: 'Otomatik onaylanan değerlerde hata (fiş fotoğrafı)', en: 'Errors among auto-approved values (receipt photos)' },
      sonra: { tr: '%0,8', en: '0.8%' },
      not: {
        tr: 'ayar sırasında hiç bakılmamış 25 belge; değerlerin %77,3’ü kendiliğinden onaylandı',
        en: '25 documents never looked at while tuning; 77.3% of values were approved on their own',
      },
      cetvel: { min: 0, max: 5, sonra: 0.8, yon: 'asagi', birim: '%' },
      kaynak: 'Citefield.md · olcum.cord_onay',
    },
    {
      ne: { tr: 'İncelemeye düşen yanlış değer', en: 'Wrong values sent to review' },
      sonra: { tr: '10/12', en: '10/12' },
      not: {
        tr: 'kaçan ikisi iki satıra yayılmış ürün adı, ilk satırda kesilmiş',
        en: 'the two that slipped through were item names printed over two lines and cut to the first',
      },
      cetvel: { min: 0, max: 12, sonra: 10, yon: 'yukari' },
      kaynak: 'Citefield.md · olcum.cord_onay',
    },
    {
      ne: { tr: 'İkinci okumanın yakaladığı gerçek hata', en: 'Real errors caught by the second read' },
      once: { tr: '2/5', en: '2/5' },
      sonra: { tr: '4/5', en: '4/5' },
      not: {
        tr: 'önce: farklı bir model, %16 yanlış alarm. Sonra: aynı model, OCR kelimeleri olmadan, %1,5 yanlış alarm',
        en: 'before: a different model, 16% false alarms. After: the same model without the OCR words, 1.5% false alarms',
      },
      cetvel: { min: 0, max: 5, once: 2, sonra: 4, yon: 'yukari' },
      kaynak: 'Citefield.md · olcum.ikinci_okuma',
    },
    {
      ne: { tr: 'Doğru değer, kutusu doğru kelimelerde', en: 'Values right, box on the right words' },
      sonra: { tr: '%88,7 · %96,3', en: '88.7% · 96.3%' },
      not: {
        tr: 'CORD v2 fiş fotoğrafları; sentetik faturalarda (FATURA) %100 · %100',
        en: 'CORD v2 receipt photos; on synthetic invoices (FATURA) 100% · 100%',
      },
      kaynak: 'Citefield.md · olcum.cord_deger',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Belge çıkarım araçları değer döndürür. Doğrulamak için her değeri sayfada yeniden bulmak gerekir ve makul görünen yanlış bir değer doğrudan muhasebeye gider. Bir “güven skoru” bunu çözmüyor: denemede tek bir skor doğruyu yanlıştan güvenilir biçimde ayıramadı.',
            en: 'Extraction tools return values. Checking them means finding each one on the page again, and a wrong value that looks plausible goes straight into the books. A “confidence score” does not solve it: in testing, a single score could not separate right from wrong values reliably.',
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
              '**Her değerin kutusu var:** model, OCR’ın ya da PDF metin katmanının kelime kimliklerini alıntılar. Kutu bu kelimelerin gerçek koordinatlarından kurulur, modelin çizdiği bir şey değildir. Değeri içermeyen alıntı işaretlenir.',
              '**Her kararın gerekçesi var:** ikinci okuma uyuşmazsa, toplam tutmazsa, kontrol hanesi düşerse, alıntı değerin bir kısmını kapsıyorsa ya da aynı basılı sayı iki rolde kullanıldıysa değer incelemeye düşer. İnceleyen hangi kontrolün tetiklendiğini cümleyle görür.',
              '**İnceleme ekranı:** sayfada kutu ve alana uzanan çizgi, belgenin engel özeti, satır kalemi ızgarası, bulunamayan alanlar. Onaylama ve düzeltme klavyeyle; kutuyu yeniden seçmek için sayfadaki kelimelere tıklanır.',
              '**Şemalar:** fatura ve fiş hazır gelir; kendi şeman uygulama içinde alanlar, satır kalemi grupları, aritmetik kuralları ve kontrol haneleriyle (IBAN, TCKN, VKN, Luhn) kurulur.',
              '**Self-host:** tek Docker imajı. Model sağlayıcısı değiştirilebilir; Ollama ile hiçbir şey makineden çıkmaz.',
            ],
            en: [
              '**Every value has a box:** the model cites the ids of the OCR or PDF text-layer words it read; the box is built from those words’ real coordinates, never drawn by the model. A citation that does not contain the value is flagged.',
              '**Every decision has a reason:** a value goes to review if the second read disagrees, a total does not add up, a check digit fails, the citation covers only part of the value, or the same printed number is used for two roles. The reviewer sees which check fired, as a sentence.',
              '**Review screen:** the box on the page with a line to its field, the document’s blocker summary, a line-item grid, fields not found. Approve and correct from the keyboard; re-citing is a click on the words on the page.',
              '**Schemas:** invoice and receipt come bundled; your own is built in the app with fields, line-item groups, arithmetic rules and check digits (IBAN, TCKN, VKN, Luhn).',
              '**Self-hosted:** one Docker image. The model provider is swappable; with Ollama nothing leaves the machine.',
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
              '**Riskli kararlar önce ölçüldü:** üç spike, her biri önceden yazılmış eşikle. Kaynak kutusu tuttu; kalibre güven ölçülemedi ve tasarım gerekçeli incelemeye çevrildi; yerel model değerde eşit, fiş konumunda eşiğin altında kaldı.',
              '**İkinci görüş farklı okumalı:** farklı bir model aynı görüntüde aynı yanlışları yaptı. Aynı modele OCR kelimelerini vermeden okutmak ise gerçek hataların 4/5’ini yakaladı.',
              '**Çürütülen fikir kaldırıldı:** satır temelli konum düzeltmesi ölçülünce doğru kutu oranını %96,8’den %92,0’a düşürdü.',
              '**Sayılar elle yazılmaz:** `citefield eval` açık veri setlerinde koşar, README tablosu bu raporlardan üretilir. Ayar dilimi ile yayımlanan dilim ayrı.',
            ],
            en: [
              '**Risky decisions measured first:** three spikes, each against a threshold written in advance. The source box held; calibrated confidence could not be measured, so the design moved to reasoned review; a local model matched on values but fell below the threshold on receipt boxes.',
              '**A second opinion has to read differently:** a different model made the same mistakes on the same image. The same model, read without the OCR words, caught 4/5 of the real errors.',
              '**A refuted idea was removed:** row-based box correction, once measured, cut the right-box rate from 96.8% to 92.0%.',
              '**No number is typed by hand:** `citefield eval` runs on open datasets and the README table is generated from its reports. The tuning slice and the published slice are separate.',
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
            tr: 'İkinci bir kontrol ancak farklı bakıyorsa işe yarar. Aynı girdiyi gören ikinci model ilkinin yanlışını onayladı; aynı modele farklı girdi vermek ise yanlışı yakaladı.',
            en: 'A second check only helps if it looks differently. A second model given the same input confirmed the first one’s mistake; giving the same model a different input caught it.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Türkçe ve Latin dışı belgeler, el yazısı ve çok sayfalı uzun faturalar henüz ölçülmedi.',
      'v1 tek kullanıcılı ve giriş yok; yalnız yerel adrese bağlanır.',
      'Yayımlanan sayılar Claude Code üzerinden aynı modellerle ölçüldü; Anthropic API sağlayıcısı canlıda koşulmadı.',
      'Repo henüz özel, dış kullanıcısı yok.',
    ],
    en: [
      'Turkish and non-Latin documents, handwriting and long multi-page invoices are not measured yet.',
      'v1 is single-user with no login; it binds to localhost only.',
      'Published numbers were measured through Claude Code with the same models; the Anthropic API provider has not run live.',
      'The repository is still private and has no outside users.',
    ],
  },
  galeri: [
    {
      ad: 'inceleme',
      aciklama: {
        tr: 'İnceleme ekranı: dört değer incelemede, üstte hangi kontrolün tetiklendiği; seçili toplamın kutusu fişte, çizgiyle alanına bağlı.',
        en: 'Review screen: four values wait, the top bar says which checks fired; the selected total’s box on the receipt, joined to its field by a line.',
      },
    },
    {
      ad: 'fatura',
      aciklama: {
        tr: 'Bütün değerleri kontrolden geçmiş bir fatura; fatura numarası seçili. Ad, adres ve e-posta FATURA veri setinin sentetik değerleri.',
        en: 'An invoice whose values all passed; the invoice number is selected. Name, address and email are synthetic values from the FATURA dataset.',
      },
    },
    {
      ad: 'genel-bakis',
      aciklama: {
        tr: 'Genel bakış: bekleyen değerler, kontrolleri kendiliğinden geçenlerin payı, değerlerin hangi kontrolle incelemeye düştüğü.',
        en: 'Overview: values waiting, the share that passed every check on its own, and which checks sent values to review.',
      },
    },
    {
      ad: 'belgeler',
      aciklama: {
        tr: 'Belgeler: durum filtreleri, belge başına incelenecek değer ve okunamayan belge.',
        en: 'Documents: status filters, values to review per document, and a document that failed to read.',
      },
    },
    {
      ad: 'sema',
      aciklama: {
        tr: 'Fatura şeması: alanlar, satır kalemi grubu, aritmetik kuralları ve IBAN kontrol hanesi.',
        en: 'The invoice schema: fields, the line-item group, arithmetic rules and the IBAN check digit.',
      },
    },
    { ad: 'inceleme-koyu', aciklama: { tr: 'İnceleme ekranı, koyu tema.', en: 'Review screen, dark theme.' } },
    { ad: 'mobil', aciklama: { tr: 'Telefonda inceleme.', en: 'Review on a phone.' }, mobil: true },
  ],
};
