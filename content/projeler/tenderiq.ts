import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/TenderIQ.md
export const tenderiq: Proje = {
  slug: 'tenderiq',
  ad: 'TenderIQ',
  alan: { tr: 'İhale analizi · SaaS', en: 'Tender analysis · SaaS' },
  baslik: {
    tr: 'Kamu ihalesi şartnamelerini kaynağına kadar izlenebilir biçimde analiz eden yapay zekâ platformu',
    en: 'AI analysis of public tender documents, traceable down to the clause',
  },
  tekCumle: {
    tr: 'Türkçe ihale şartnamelerinden gereksinimleri, istenen belgeleri, riskli maddeleri, takvimi ve firmanın uygunluk boşluklarını çıkarır. Her bulguyu doküman, sayfa ve madde referansıyla orijinal PDF üzerinde vurgular. Kaynağa bağlanamayan bulguyu hiç göstermez.',
    en: 'Reads Turkish tender specifications and extracts requirements, required documents, risky clauses, deadlines and the bidder’s eligibility gaps. Every finding is highlighted on the original PDF with document, page and clause. A finding that cannot be tied to a source is never shown.',
  },
  donem: { tr: 'Tem 2026 – Eyl 2026', en: 'Jul 2026 – Sep 2026' },
  yil: 202609,
  durum: {
    tr: 'Kapalı betaya hazır; gerçek müşteri, canlı ödeme ve hukuki metinler bekliyor',
    en: 'Ready for closed beta; awaiting first customers, live billing and legal terms',
  },
  repo: { acik: true, url: 'https://github.com/Scryne/TenderIQ' },
  demo: {
    tr: 'Yok. Yerelde kurgusal “Yeşilvadi” şartnamesiyle çalışır.',
    en: 'None. Runs locally against a fictional “Yeşilvadi” tender.',
  },
  stack: [
    { grup: { tr: 'Backend', en: 'Backend' }, ogeler: 'Python 3.12, FastAPI (async), Celery + Redis, PostgreSQL 16 + pgvector (RLS), Cloudflare R2' },
    { grup: { tr: 'Yapay zekâ', en: 'AI' }, ogeler: 'Docling, pypdf, EasyOCR, BGE-M3 + BM25 (RRF), LangGraph (5 uzman ajan), Claude / NVIDIA NIM / Ollama, Langfuse' },
    { grup: { tr: 'Frontend', en: 'Frontend' }, ogeler: 'Next.js 15, React 19, TypeScript strict, Tailwind v4, shadcn/ui, TanStack Query, react-pdf' },
    { grup: { tr: 'Kalite', en: 'Quality' }, ogeler: 'Ruff, mypy strict, pytest + testcontainers, Playwright, Lighthouse, gitleaks, pip-audit, trivy' },
  ],
  olcek: [
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: '415 birim + 183 entegrasyon', en: '415 unit + 183 integration' } },
    { ad: { tr: 'CI', en: 'CI' }, deger: { tr: '9 iş', en: '9 jobs' } },
    { ad: { tr: 'Mimari karar', en: 'Decision records' }, deger: { tr: '13 ADR', en: '13 ADRs' } },
    { ad: { tr: 'Commit', en: 'Commits' }, deger: { tr: '82', en: '82' } },
  ],
  olcumler: [
    {
      ne: { tr: 'CI işleri', en: 'CI jobs' },
      once: { tr: 'bir aydır kırmızı', en: 'red for a month' },
      sonra: { tr: '9/9 yeşil', en: '9/9 green' },
      cetvel: { min: 0, max: 9, once: 0, sonra: 9, yon: 'yukari' },
      kaynak: 'TenderIQ.md · Denetim',
    },
    {
      ne: { tr: 'Yüksek ve kritik güvenlik açığı (trivy)', en: 'High and critical vulnerabilities (trivy)' },
      once: { tr: '8', en: '8' },
      sonra: { tr: '0', en: '0' },
      not: { tr: '2 kritik + 6 yüksek', en: '2 critical + 6 high' },
      cetvel: { min: 0, max: 8, once: 8, sonra: 0, yon: 'asagi' },
      kaynak: 'TenderIQ.md · Denetim',
    },
    {
      ne: { tr: 'Lighthouse erişilebilirlik 100 alan rota', en: 'Routes scoring 100 on Lighthouse accessibility' },
      sonra: { tr: '18/18', en: '18/18' },
      cetvel: { min: 0, max: 18, sonra: 18, yon: 'yukari' },
      kaynak: 'TenderIQ.md · olcek.lighthouse',
    },
    {
      ne: { tr: 'Uçtan uca koşu, 4 sayfalık kurgusal şartname', en: 'End-to-end run, 4-page fictional tender' },
      sonra: { tr: '34 kaynaklı bulgu', en: '34 cited findings' },
      not: { tr: 'yaklaşık 5 dakikada', en: 'in about 5 minutes' },
      kaynak: 'TenderIQ.md · olcek.uctan_uca',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Bir teklif ekibi 300 sayfalık bir şartnameyi okurken tek bir soruya cevap arar: “Bu dokümanda beni eleyecek ya da riske atacak madde hangisi, ve tam olarak nerede yazıyor?” Genel amaçlı bir sohbet modeli bu soruya akıcı bir cevap verir ama hangi maddeye dayandığını gösteremez. Hukuki sonucu olan bir karar için “model öyle dedi” yetmez; ekip maddeyi kendi gözüyle görmek ister.',
            en: 'A bid team reading a 300-page tender is looking for one answer: “Which clause here disqualifies us or puts us at risk, and exactly where is it written?” A general-purpose chat model answers fluently but cannot show the clause it relied on. For a decision with legal consequences, “the model said so” is not enough. The team wants to see the clause with their own eyes.',
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
              '**Hibrit ayrıştırma:** dijital PDF, taranmış PDF, DOCX ve XLSX. Her sayfa için “dijital mi, taranmış mı” kararı verilir; taranmış sayfalar OCR’a gider.',
              '**Kaynağa bağlı çıkarım:** beş uzman ajan (gereksinim, belge, risk, takvim, uygunluk) tek bir LangGraph akışında çalışır. Her bulgu bir kaynak pasaja bağlanmak zorundadır. Bağlanamayan bulgu rapora girmez; bu kural prompt’ta değil kodda.',
              '**Hibrit getirim:** yoğun vektör (BGE-M3) + BM25, RRF füzyonu ve yeniden sıralama.',
              '**İnsan döngüde:** her bulgu onaylanır, düzeltilir ya da reddedilir. Toplu işlem, yorum, değişiklik geçmişi. Her karar geri alınabilir ve denetim izine yazılır. Onaylı bulgular kaynak referanslarıyla Word ve Excel’e aktarılır.',
              '**Uygunluk:** firmanın yetkinlik profili (sertifikalar, referanslar) şartnameyle karşılaştırılır. Demo şartnamede “ISO 27001 karşılanmıyor” boşluğunu doğru buluyor.',
              '**SaaS katmanı:** kiracı izolasyonu veritabanı satır düzeyinde (PostgreSQL RLS), organizasyon, davet, rol, abonelik ve kota. Kiracı başına LLM bütçe tavanı Redis rezervasyonuyla eşzamanlı isteklere dayanıklı. KVKK’ya göre tasarlandı: yüklenen doküman model eğitiminde kullanılmaz.',
            ],
            en: [
              '**Hybrid parsing:** digital PDF, scanned PDF, DOCX and XLSX. Each page is classified as digital or scanned; scanned pages go to OCR.',
              '**Grounded extraction:** five specialist agents (requirements, documents, risk, timeline, eligibility) run in one LangGraph flow. Every finding must be grounded in a source passage. Ungrounded findings never reach the report, and that rule lives in code, not in the prompt.',
              '**Hybrid retrieval:** dense vectors (BGE-M3) + BM25, RRF fusion and reranking.',
              '**Human in the loop:** every finding is approved, corrected or rejected, with bulk actions, comments and change history. Every decision is reversible and written to an audit trail. Approved findings export to Word and Excel with their source references.',
              '**Eligibility:** the company’s capability profile (certificates, references) is matched against the tender. On the demo tender it correctly flags the missing ISO 27001.',
              '**SaaS layer:** row-level tenant isolation (PostgreSQL RLS), organisations, invites, roles, plans and quotas. A per-tenant LLM budget cap uses Redis reservations and holds under concurrent requests. Designed for Turkish data-protection law: uploaded documents are never used for training.',
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
            tr: 'TenderIQ tek geliştirici olarak Claude Code ile eşli çalışarak geliştirildi. Buradaki beceri, modelin hızını kalıcı sözleşmelerle ve ölçümle dengelemek:',
            en: 'TenderIQ was built by one developer pairing with Claude Code. The skill here is balancing the model’s speed with durable contracts and measurement:',
          },
        },
        {
          tur: 'sirali',
          ogeler: {
            tr: [
              '**Kurallar kodda, hafıza dosyada.** `CLAUDE.md` bağlayıcı kuralları, `DURUM.md` her oturumun giriş noktasını (kalıcı gerçekler, tuzaklar, doğrulanmamış varsayımlar) taşır. Her mimari seçim bir ADR. Model bağlamı her oturumda sıfırdan kurmuyor, kayıttan okuyor.',
              '**Yapay zekâ kalitesi bir CI kapısı.** Prompt ya da model değiştiğinde altın set değerlendirmesi CI’ı durdurur. “Daha iyi görünüyor” değil, aynı sette ölçülmüş sonuç.',
              '**Tasarım sözleşmesi ve görsel döngü.** `DESIGN.md` brif, token sistemi ve “şablon gibi durma” yasaklarını tanımlar. Her arayüz görevi Playwright ile dört ekran genişliğinde çekilip doğrulanır.',
              '**Model seçimi ölçümle.** Eylül 2026’da geliştirme modeli sağlayıcıda emekliye ayrıldı (410 Gone). Beş aday denendi; halef, test şartnamesinde 4/4 bulguyu birebir alıntıyla veren model oldu.',
            ],
            en: [
              '**Rules in code, memory in files.** `CLAUDE.md` holds binding rules and `DURUM.md` is every session’s entry point (durable facts, traps, unverified assumptions). Every architectural choice is an ADR. The model does not rebuild context each session; it reads it from the record.',
              '**AI quality is a CI gate.** A golden-set evaluation blocks CI whenever a prompt or model changes. Not “looks better”, but a result measured on the same set.',
              '**Design contract and visual loop.** `DESIGN.md` defines the brief, the token system and the anti-template rules. Every UI task is captured with Playwright at four screen widths and checked.',
              '**Model choice by measurement.** In September 2026 the development model was retired by its provider (410 Gone). Five candidates were tried; the successor was the one that returned 4/4 findings with verbatim quotes on the test tender.',
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
            tr: 'CV öncesi yeniden ölçüldüğünde testler yerelde yeşildi, ama ürün çalışmıyordu. Yapay zekâ hattı ölüydü (model emekliye ayrılmıştı), CI bir aydır kırmızıydı (2 kritik + 6 yüksek güvenlik açığı), boş bırakılan bir ayar altı test dosyasının hiç toplanmamasına yol açıyordu ve kullanıcıya on yerde ham “Failed to fetch” sızıyordu. Hepsi kapatıldı: CI 9/9 yeşil, trivy’de 0 yüksek/kritik, erişilebilirlikte 18 rotanın 18’i 100, kurgusal bir şartnameyle uçtan uca koşu 34 kaynaklı bulgu.',
            en: 'When I re-measured it before writing the CV, the tests were green locally but the product did not work. The AI pipeline was dead (its model had been retired), CI had been red for a month (2 critical + 6 high vulnerabilities), one empty setting meant six test files were never collected, and a raw “Failed to fetch” leaked to users in ten places. All closed: CI 9/9 green, 0 high/critical in trivy, 18 of 18 routes at 100 for accessibility, and an end-to-end run on a fictional tender producing 34 cited findings.',
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
            tr: '“Testler yeşil” ile “ürün çalışıyor” ayrı ölçümler. Dışarıdaki bir modele dayanan her sistem, o model emekliye ayrıldığında sessizce ölür. Bunu yakalayan şey birim testi değil, gerçek bir dokümanla uçtan uca koşu.',
            en: '“Tests pass” and “the product works” are separate measurements. Any system that depends on an external model dies quietly when that model is retired. What catches it is not a unit test but an end-to-end run on a real document.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Barındırılan bir demo yok; ürün kapalı betaya hazır ama gerçek müşterisi yok.',
      'Canlı ödeme ve hukuki metinler henüz bağlanmadı.',
    ],
    en: [
      'No hosted demo; the product is ready for closed beta but has no customers yet.',
      'Live billing and legal terms are not wired up yet.',
    ],
  },
  galeri: [
    { ad: 'inceleme', aciklama: { tr: 'İnceleme ekranı: solda “Gecikme cezası %0,3” bulgusu (s.4 · Madde 46), sağda PDF’te aynı madde vurgulu.', en: 'Review screen: the “0.3% late penalty” finding on the left (p.4 · Clause 46), the same clause highlighted in the PDF on the right.' } },
    { ad: 'ihale', aciklama: { tr: 'İhale detayı ve işleme hattının aşamaları.', en: 'Tender detail and the stages of the processing pipeline.' } },
    { ad: 'panel', aciklama: { tr: 'Panel.', en: 'Dashboard.' } },
    { ad: 'kullanim', aciklama: { tr: 'Kullanım ve abonelik: analiz bütçesi tavanı, doküman ve sayfa kotası, depolama.', en: 'Usage and plan: analysis budget cap, document and page quota, storage.' } },
    { ad: 'inceleme-koyu', aciklama: { tr: 'İnceleme ekranı, koyu tema.', en: 'Review screen, dark theme.' } },
    { ad: 'tanitim', aciklama: { tr: 'Tanıtım sayfası.', en: 'Landing page.' } },
  ],
};
