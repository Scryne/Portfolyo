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
            tr: 'Teklif ekibi 300 sayfalık bir şartnamede tek şeyi arar: beni eleyecek ya da riske atacak madde hangisi, tam olarak nerede yazıyor? Sohbet modeli akıcı cevap verir ama dayandığı maddeyi gösteremez; hukuki sonucu olan bir kararda bu yetmez.',
            en: 'A bid team searches a 300-page tender for one thing: which clause disqualifies us or puts us at risk, and exactly where is it written? A chat model answers fluently but cannot show the clause it relied on, which is not enough for a decision with legal consequences.',
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
              '**Kaynağa bağlı bulgu:** beş uzman ajan (gereksinim, belge, risk, takvim, uygunluk) tek bir LangGraph akışında çalışır. Kaynak pasaja bağlanamayan bulgu rapora girmez; kural prompt’ta değil kodda.',
              '**Her biçim:** dijital ve taranmış PDF (OCR), DOCX, XLSX. Getirim BGE-M3 + BM25, RRF füzyonu ve yeniden sıralama.',
              '**İnsan döngüde:** her bulgu onaylanır, düzeltilir ya da reddedilir; karar geri alınabilir, denetim izine yazılır, kaynaklarıyla Word ve Excel’e aktarılır.',
              '**Uygunluk:** firmanın yetkinlik profili şartnameyle karşılaştırılır; demo şartnamede eksik ISO 27001’i buluyor.',
              '**SaaS:** PostgreSQL RLS ile kiracı izolasyonu, rol, abonelik ve kota; kiracı başına LLM bütçe tavanı.',
            ],
            en: [
              '**Grounded findings:** five specialist agents (requirements, documents, risk, timeline, eligibility) run in one LangGraph flow. A finding that cannot be tied to a source passage never reaches the report; the rule lives in code, not in the prompt.',
              '**Any format:** digital and scanned PDF (OCR), DOCX, XLSX. Retrieval is BGE-M3 + BM25 with RRF fusion and reranking.',
              '**Human in the loop:** every finding is approved, corrected or rejected; decisions are reversible, audited, and export to Word and Excel with their sources.',
              '**Eligibility:** the company’s capability profile is matched against the tender; on the demo tender it flags the missing ISO 27001.',
              '**SaaS:** tenant isolation with PostgreSQL RLS, roles, plans and quotas; a per-tenant LLM budget cap.',
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
              '**Yapay zekâ kalitesi bir CI kapısı:** prompt ya da model değişince altın set değerlendirmesi CI’ı durdurur.',
              '**Model seçimi ölçümle:** geliştirme modeli sağlayıcıda emekliye ayrılınca (410 Gone) beş aday denendi; halef, test şartnamesinde 4/4 bulguyu birebir alıntıyla veren model oldu.',
              '**Karar kaydı:** her mimari seçim bir ADR; her oturum `DURUM.md` ile başlar.',
            ],
            en: [
              '**AI quality is a CI gate:** a golden-set evaluation blocks CI whenever a prompt or model changes.',
              '**Model choice by measurement:** when the development model was retired by its provider (410 Gone), five candidates were tried; the successor returned 4/4 findings with verbatim quotes on the test tender.',
              '**Decisions on record:** every architectural choice is an ADR; every session starts from `DURUM.md`.',
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
            tr: 'Yeniden ölçüldüğünde testler yeşildi ama ürün çalışmıyordu: model emekliye ayrılmıştı, CI bir aydır kırmızıydı (2 kritik + 6 yüksek açık), boş bir ayar altı test dosyasını devre dışı bırakıyordu, on yerde ham “Failed to fetch” görünüyordu. Sonra: CI 9/9 yeşil, trivy’de 0 yüksek/kritik, 18 rotanın 18’i erişilebilirlikte 100, kurgusal bir şartnamede 34 kaynaklı bulgu.',
            en: 'When re-measured, the tests were green but the product did not work: the model had been retired, CI had been red for a month (2 critical + 6 high advisories), one empty setting disabled six test files, and a raw “Failed to fetch” showed in ten places. After: CI 9/9 green, 0 high/critical in trivy, 18 of 18 routes at 100 for accessibility, 34 cited findings on a fictional tender.',
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
            tr: 'Dışarıdaki bir modele dayanan sistem, o model emekliye ayrılınca sessizce ölür. Bunu birim testi değil, gerçek bir dokümanla uçtan uca koşu yakalar.',
            en: 'A system that depends on an external model dies quietly when that model is retired. A unit test does not catch it; an end-to-end run on a real document does.',
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
