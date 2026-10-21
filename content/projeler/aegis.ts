import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/AEGIS.md
export const aegis: Proje = {
  slug: 'aegis',
  ad: 'AEGIS',
  alan: { tr: 'Uyum · KYB · SaaS', en: 'Compliance · KYB · SaaS' },
  baslik: {
    tr: 'MASAK yükümlüleri için kurumsal müşteri doğrulama ve due diligence',
    en: 'Know-your-business and due diligence for AML-regulated firms in Turkey',
  },
  tekCumle: {
    tr: 'Bir müşteri şirketin kimliğini doğrular, şirketi ve yöneticilerini yaptırım, PEP ve MASAK dondurma listelerine karşı kendi ortamında tarar, analist kararını gerekçesiyle kayda alır ve denetime dayanıklı, kaynak bağlantılı bir dosya üretir.',
    en: 'Verifies a client company’s identity, screens the company and its directors against sanctions, PEP and asset-freeze lists on a self-hosted engine, records the analyst’s decision with its rationale, and produces an audit-ready, source-linked case file.',
  },
  donem: { tr: 'Tem 2026 – Eyl 2026', en: 'Jul 2026 – Sep 2026' },
  yil: 202609,
  durum: {
    tr: 'Phase 1 çekirdeği tamam; canlı kurulum ve pilot açık',
    en: 'Phase 1 core complete; production deployment and pilot open',
  },
  repo: { acik: false },
  demo: {
    tr: 'Yok. Yerelde üç kurgusal vakayla çalışır.',
    en: 'None. Runs locally with three fictional cases.',
  },
  stack: [
    { grup: { tr: 'Backend', en: 'Backend' }, ogeler: 'Python 3.12, FastAPI, SQLAlchemy 2 + Alembic, PostgreSQL 16 (RLS), Celery + Redis, MinIO' },
    { grup: { tr: 'Tarama', en: 'Screening' }, ogeler: 'OpenSanctions yente 5.5 + Elasticsearch 9 (kendi ortamında), Türkçe ad normalizasyonu' },
    { grup: { tr: 'Belge', en: 'Documents' }, ogeler: 'Docling (PDF → metin), kural tabanlı çıkarım, xhtml2pdf + python-docx dosya raporu' },
    { grup: { tr: 'Frontend', en: 'Frontend' }, ogeler: 'Next.js 16 (App Router), React 19, TypeScript, Tailwind v4' },
  ],
  olcek: [
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: '259 birim + 79 izolasyon/entegrasyon + 36 uçtan uca recall', en: '259 unit + 79 isolation/integration + 36 end-to-end recall' } },
    { ad: { tr: 'Mimari karar', en: 'Decision records' }, deger: { tr: '8 ADR + R1–R7 revizyon', en: '8 ADRs + revisions R1–R7' } },
  ],
  olcumler: [
    {
      ne: { tr: 'Türkçe yazım varyantlarında recall', en: 'Recall on Turkish spelling variants' },
      sonra: { tr: '%100', en: '100%' },
      not: { tr: '34 vaka, 100’den fazla varyant, gerçek tarama motoru üzerinden', en: '34 cases, 100+ variants, through the real screening engine' },
      cetvel: { min: 0, max: 100, sonra: 100, yon: 'yukari', birim: '%' },
      kaynak: 'AEGIS.md · Yapay zekâ 2',
    },
    {
      ne: { tr: 'Kiracılar arası sızıntı (her uç, doğrudan SQL)', en: 'Cross-tenant leakage (every endpoint, direct SQL)' },
      sonra: { tr: '0', en: '0' },
      not: { tr: 'Kapı kırmızıysa birleştirme yapılamaz.', en: 'A red gate blocks the merge.' },
      kaynak: 'AEGIS.md · Yapay zekâ 1',
    },
    {
      ne: { tr: 'İlk uçtan uca koşuda bulunan hata', en: 'Defects found in the first end-to-end run' },
      sonra: { tr: '5 düzeltildi', en: '5 fixed' },
      not: { tr: 'Her biri regresyon testiyle kilitlendi.', en: 'Each locked with a regression test.' },
      kaynak: 'AEGIS.md · Yapay zekâ 4',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'MASAK yükümlüleri (ilk hedef SMMM/YMM ve denetim ofisleri) yeni bir kurumsal müşteriyi ve yöneticilerini yaptırım, PEP ve malvarlığı dondurma listelerinde taramak ve kararını denetimde savunmak zorunda. Bugün bu elle yapılıyor; Türkçe yazım farkları (“A.Ş.” / “Anonim Şirketi”, İ/ı) gerçek eşleşmeleri kaçırtıyor, “neden elediniz?” sorusunun cevabı kayıtlı değil.',
            en: 'Firms regulated by Turkey’s financial crimes authority (first target: accounting and audit practices) must screen every new corporate client and its directors against sanctions, PEP and asset-freeze lists, and defend the decision in an audit. Today this is manual; Turkish spelling differences (“A.Ş.” vs “Anonim Şirketi”, İ/ı) let real matches slip, and “why did you dismiss this?” is rarely on record.',
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
              '**Varlık kütüğü:** şirket, yöneticiler, gerçek faydalanıcılar; her değer kaynağı ve zamanıyla. TCKN şifreli kolonda, tekrar kontrolü kör indeksle.',
              '**Belgeden öneri:** imza sirküleri Docling ile metne çevrilir, yetkililer **öneri** olarak gelir; onaysız hiçbir şey kütüğe girmez.',
              '**Yerel tarama:** OpenSanctions motoru kendi ortamında; kişisel veri dışarı çıkmaz. Sonuç üç banda ayrılır: gerekçeli otomatik eleme, inceleme, acil.',
              '**Gerekçeli karar ve mühürlü dosya:** analist her adayı eşleşme nedenleriyle görür, gerekçe yazarak eler; dosya SHA-256 ile mühürlenir, denetim izi hash zincirli.',
            ],
            en: [
              '**Entity register:** company, directors, beneficial owners, each value with its source and time. ID numbers in an encrypted column, duplicates found via a blind index.',
              '**Suggestions from documents:** a signature circular is turned into text with Docling and directors arrive as **suggestions**; nothing enters the register unapproved.',
              '**Local screening:** a self-hosted OpenSanctions engine; personal data never leaves. Results fall into three bands: reasoned auto-dismissal, review, urgent.',
              '**Reasoned decisions, sealed file:** the analyst sees each candidate with match reasons and dismisses with a written rationale; the case file is sealed with SHA-256 and the audit trail is hash-chained.',
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
              '**Kiracı izolasyonu bir test kapısı:** iki kiracı, her uç, doğrudan SQL; sıfır sızıntı yoksa birleştirme yapılamaz.',
              '**Yanlış negatif en tehlikeli hata:** Türkçe değerlendirme seti gerçek motor üzerinden %100 recall tutturmak zorunda; motor yoksa sonuç “temiz” değil “sonuç YOK”.',
              '**İlk uçtan uca koşu testlerin göremediğini buldu:** çıkarım ikinci yöneticiye birincinin TCKN’sini bağlıyordu, öneri gövdesi TCKN’yi şifresiz tutuyordu, CI güvenlik adımı hiç kırılamıyordu. Hepsi regresyon testiyle kilitlendi.',
            ],
            en: [
              '**Tenant isolation is a test gate:** two tenants, every endpoint, direct SQL; without zero leakage nothing merges.',
              '**A false negative is the worst bug:** a Turkish evaluation set must hit 100% recall through the real engine; if the engine is down the result is “NO result”, never “clear”.',
              '**The first end-to-end run found what tests could not:** extraction attached the first director’s ID to the second, the suggestion payload stored IDs unencrypted, the CI security step could never fail. All locked with regression tests.',
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
            tr: 'Açık, sakin bir çalışma alanı; renk yalnız risk durumunu taşır. Ekran önce sonucu, sonra gerekçeyi, en son eylemi gösterir; denetçinin karşılaştıracağı değerler eş aralıklı.',
            en: 'A light, calm workspace; colour carries risk state only. Each screen shows the result, then the rationale, then the action; values an auditor compares are monospaced.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Pilot öncesi aşamada; canlı kurulumu yok, repo gizli.',
      'Demo, 34 kurgusal referans varlıklı değerlendirme indeksine karşı çalışıyor. Üretim kataloğu canlı kurulumda bağlanacak.',
      'Docling PDF yolu üretilmiş belgelerle doğrulandı; gerçek pilot belgeleri hâlâ gerekli.',
    ],
    en: [
      'Pre-pilot; no production deployment, private repository.',
      'The demo runs against an evaluation index of 34 fictional reference entities. The production catalogue will be connected at deployment.',
      'The Docling PDF path was validated with generated documents; real pilot documents are still needed.',
    ],
  },
  galeri: [
    { ad: 'eslesme', aciklama: { tr: 'Doğrulanan eşleşme: skor, eşleşme nedenleri, kaynak ve analist gerekçesi.', en: 'Confirmed match: score, match reasons, source and the analyst’s rationale.' } },
    { ad: 'pano', aciklama: { tr: 'İş kuyruğu: bekleyen inceleme, onaylı eşleşme, son taramalar, denetim etkinliği.', en: 'Work queue: pending reviews, confirmed matches, recent screenings, audit activity.' } },
    { ad: 'elenen', aciklama: { tr: 'Eşadlı yanlış pozitif, gerekçesiyle elendi.', en: 'A namesake false positive, dismissed with its rationale.' } },
    { ad: 'varlik', aciklama: { tr: 'Varlık dosyası: risk kararı, PDF/Word dosya, belgeden çıkan öneriler.', en: 'Entity file: risk decision, PDF/Word case file, suggestions extracted from documents.' } },
    { ad: 'denetim-izi', aciklama: { tr: 'Hash zincirli denetim izi, her görüntülemede doğrulanır.', en: 'Hash-chained audit trail, verified on every view.' } },
    { ad: 'mobil', mobil: true, aciklama: { tr: 'Mobil pano.', en: 'Mobile dashboard.' } },
  ],
};
