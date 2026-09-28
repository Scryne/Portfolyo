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
            tr: 'Türkiye’de MASAK kapsamındaki yükümlüler (ürünün ilk hedefi SMMM/YMM ve bağımsız denetim ofisleri) yeni bir kurumsal müşteriyi kabul etmeden önce onu ve yöneticilerini yaptırım, PEP ve malvarlığı dondurma listelerine karşı taramak, kararını da denetimde savunabilmek zorundadır. Bugün bu iş elle yapılıyor: liste sitelerinde ad aranıyor, ekran görüntüsü klasöre konuyor. Türkçe yazım farkları (“A.Ş.” / “Anonim Şirketi”, İ/ı) gerçek eşleşmeleri kaçırtıyor. “Neden elediniz?” sorusunun cevabı çoğu zaman kayıtlı değil.',
            en: 'Firms covered by Turkey’s financial crimes regulator (the first target is accounting and audit practices) must screen every new corporate client and its directors against sanctions, PEP and asset-freeze lists before onboarding, and be able to defend that decision in an audit. Today it is manual: names are searched on list websites and screenshots dropped into folders. Turkish spelling differences (“A.Ş.” vs “Anonim Şirketi”, İ/ı) make real matches slip through, and the answer to “why did you dismiss this?” is rarely on record.',
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
              '**Varlık kütüğü:** şirket, yöneticiler, gerçek faydalanıcılar ve ortaklık oranları. Her değerin kaynağı ve gözlem zamanı tutulur. TCKN şifreli kolonda durur; tekrar kontrolü anahtarlı kör indeksle yapılır.',
              '**Belgeden çıkarım:** imza sirküleri ya da faaliyet belgesi yüklenir, Docling metne çevirir, kural tabanlı çıkarım yetkilileri ve kimlik numaralarını **öneri** olarak sunar. Onaysız hiçbir şey kütüğe girmez.',
              '**Tarama:** şirket ve bağlı kişiler kendi ortamında çalışan OpenSanctions motoruna karşı taranır; kişisel veri dışarı çıkmaz. Skor bantları üçe ayrılır: gerekçesiyle saklanan otomatik eleme, insan incelemesi ve acil işaret.',
              '**Karar:** analist her adayı skor, eşleşme nedenleri ve kaynak bağlantısıyla görür, onaylar ya da gerekçe yazarak eler. Karar geri alınabilir, silinemez.',
              '**Dosya:** kimlik, taramalar, kararlar, tutarsızlıklar ve kaynaklar tek bir PDF/Word dosyada toplanır, SHA-256 ile mühürlenir ve saklama süresine bağlanır.',
              '**Denetim izi:** risk etkileyen her eylem yalnız eklenen, hash zincirli bir ize yazılır; zincir her görüntülemede yeniden doğrulanır.',
            ],
            en: [
              '**Entity register:** company, directors, beneficial owners and ownership shares, each value with its source and observation time. National ID numbers sit in an encrypted column; duplicate checks use a keyed blind index.',
              '**Extraction from documents:** upload a signature circular or registry document, Docling turns it into text, and rule-based extraction offers directors and ID numbers as **suggestions**. Nothing enters the register without approval.',
              '**Screening:** the company and related people are screened against a self-hosted OpenSanctions engine; personal data never leaves. Scores fall into three bands: auto-dismissal (stored with its reason), human review and urgent flag.',
              '**Decision:** the analyst sees each candidate with score, match reasons and source link, then confirms or dismisses with a written rationale. Decisions can be reversed, never deleted.',
              '**Case file:** identity, screenings, decisions, inconsistencies and sources in one PDF/Word file, sealed with SHA-256 and bound to a retention period.',
              '**Audit trail:** every risk-relevant action goes to an append-only, hash-chained log that is re-verified on every view.',
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
            tr: 'Kod Claude Code ile, epik epik (E1.1 → E1.5) yazıldı. Ürünü güvenilir yapan, her uyum vaadinin bir cümle değil bir **test kapısı** olması:',
            en: 'The code was written with Claude Code, epic by epic (E1.1 → E1.5). What makes it trustworthy is that every compliance promise is a **test gate**, not a sentence:',
          },
        },
        {
          tur: 'sirali',
          ogeler: {
            tr: [
              '**Kiracı izolasyonu kanıtlanır, varsayılmaz.** İki kiracı, her uçta ve uygulama rolü altında doğrudan SQL ile sıfır sızıntı testinden geçer.',
              '**Yanlış negatif en tehlikeli hatadır.** Türkçe değerlendirme seti gerçek tarama motoru üzerinden %100 recall tutturmak zorunda. Motor ulaşılamazsa sonuç “temiz” değil, “sonuç YOK” olarak gösterilir.',
              '**Kararlar yazılı ve revize edilebilir.** 8 ADR ve numaralı revizyonlar: MERSİS’e bağımlı olmayan doğrulama, Docling’in erkene çekilmesi, pgvector’ün çıkarılması. Model neyin neden yapıldığını her oturumda aynı belgeden okudu.',
              '**Ürün ilk kez uçtan uca çalıştırıldı.** Testlerin göremediği şeyler gerçek koşuda çıktı: Docling satırları paragrafta birleştirince çıkarım ikinci yetkiliye birincinin TCKN’sini bağlıyordu; öneri gövdesi TCKN’yi şifresiz tutuyordu; başarısız bir çıkarım yeniden denenemiyordu; gerekçeyle elenen aday taramayı sonsuza dek “acil”de tutuyordu; üretim bağımlılığında kimlik doğrulamasız bir RCE vardı ve CI’daki güvenlik adımı hiç kırılamayacak biçimde yazılmıştı.',
            ],
            en: [
              '**Tenant isolation is proven, not assumed.** Two tenants, every endpoint, under the application role, with direct SQL: zero leakage or the merge is blocked.',
              '**A false negative is the most dangerous bug.** A Turkish evaluation set must hit 100% recall through the real screening engine. If the engine is unreachable, the result shows “NO result”, never “clear”.',
              '**Decisions are written down and revisable.** 8 ADRs and numbered revisions: verification without depending on the trade registry, pulling Docling forward, removing pgvector. The model read what was done and why from the same record every session.',
              '**The product was run end to end for the first time.** A real run surfaced what tests could not: when Docling merged lines into a paragraph, extraction attached the first director’s ID to the second; the suggestion payload stored IDs unencrypted; a failed extraction could never be retried; a dismissed candidate kept a screening in “urgent” forever; a production dependency carried an unauthenticated RCE, and the CI security step could never fail.',
            ],
          },
        },
        {
          tur: 'p',
          metin: {
            tr: 'Her biri ölçüldü, düzeltildi ve regresyon testiyle kilitlendi.',
            en: 'Each was measured, fixed and locked with a regression test.',
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
            tr: 'Açık tema, sakin bir çalışma alanı. Renk yalnız risk durumunu taşır: kırmızı onaylanmış eşleşme ya da yapılamayan tarama, amber inceleme bekleyen ya da bayat veri, yeşil eşik üstü eşleşme yok. Ekran önce sonucu, sonra gerekçeyi, en son eylemi gösterir. Denetçinin karakter karakter karşılaştıracağı her değer (kimlik, skor, özet) eş aralıklı yazılır.',
            en: 'A light, calm workspace. Colour carries risk state only: red for a confirmed match or a screening that could not run, amber for pending review or stale data, green for no match above threshold. Each screen shows the result first, then the rationale, then the action. Every value an auditor compares character by character (ID, score, hash) is set in monospace.',
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
