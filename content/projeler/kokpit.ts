import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/Kokpit.md (repo 2026-09-27'den beri herkese açık)
export const kokpit: Proje = {
  slug: 'kokpit',
  ad: 'Kokpit',
  alan: { tr: 'Geliştirici aracı · Masaüstü', en: 'Developer tool · Desktop' },
  baslik: {
    tr: 'Projeleri tek ekranda gösteren, Claude Code oturumlarını açıp canlı izleyen masaüstü uygulaması',
    en: 'A desktop app that shows every project on one screen and opens and watches Claude Code sessions',
  },
  tekCumle: {
    tr: 'Bütün projelerin aşamasını, roadmap ilerlemesini ve git durumunu tek panoda toplar; tek tıkla o klasörde gömülü terminalde `claude` açar, her oturumun ne yaptığını Claude Code’un kancalarından canlı izler; ekranın üstünde hep açık duran küçük bir pencere (Ada) soruları cevaplatır, limitleri gösterir ve arka planda yeni görev başlatır. Kendi veritabanı yok: projeler hakkında gösterdiği her şey git’in zaten takip ettiği dosyalardan türetilir.',
    en: 'Brings every project’s stage, roadmap progress and git status into one board; opens `claude` in an embedded terminal in that folder with one click, watches what each session is doing through Claude Code’s hooks; a small always-on window at the top of the screen (Ada) answers its questions, shows the usage limits and starts new tasks in the background. It has no database of its own: everything it shows about projects is derived from files git already tracks.',
  },
  donem: { tr: 'Eyl 2026 – Eki 2026', en: 'Sep 2026 – Oct 2026' },
  yil: 202610,
  durum: { tr: 'Çalışır; her gün kullanılıyor', en: 'Working; used every day' },
  repo: { acik: true, url: 'https://github.com/Scryne/Kokpit' },
  demo: { tr: 'Yok. Kişisel masaüstü aracı.', en: 'None. A personal desktop tool.' },
  stack: [
    { grup: { tr: 'Masaüstü', en: 'Desktop' }, ogeler: 'Electron 44 (sandbox + contextIsolation, app:// şeması + CSP)' },
    { grup: { tr: 'Terminal', en: 'Terminal' }, ogeler: 'node-pty (ConPTY), ayrı süreçte token korumalı WebSocket PTY sunucusu, xterm.js 6 (WebGL)' },
    { grup: { tr: 'Arayüz', en: 'Interface' }, ogeler: 'React 19, TypeScript, Vite 8, Tailwind 4' },
    { grup: { tr: 'Veri', en: 'Data' }, ogeler: 'git + state.json + roadmap okuyan durum betiği, JSONL oturum defteri, Claude Code HTTP hook’ları (127.0.0.1 + token)' },
  ],
  olcek: [
    { ad: { tr: 'Faz', en: 'Phases' }, deger: { tr: '29 (Faz 0 spike → Faz 28 Ada’dan görev)', en: '29 (phase 0 spike → phase 28 tasks from Ada)' } },
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: 'kanca 101 + pty 18 (Windows CI) · ui 110 (gerçek Electron, CDP) · ada 35 · gerçek claude ile 11', en: 'hooks 101 + pty 18 (Windows CI) · UI 110 (real Electron, CDP) · Ada 35 · 11 against real claude' } },
    { ad: { tr: 'Yüzey', en: 'Surfaces' }, deger: { tr: 'Pano, Terminaller, Sağlık, Envanter + Ada', en: 'Board, Terminals, Health, Inventory + Ada' } },
  ],
  olcumler: [
    {
      ne: { tr: 'Ada’nın gözü çalışırken işlemci (tek çekirdek)', en: 'CPU while Ada’s eye is animating (one core)' },
      once: { tr: '%36', en: '36%' },
      sonra: { tr: '%2,9', en: '2.9%' },
      not: { tr: 'Sonsuz CSS animasyonları saydam pencerede her karede yeniden birleşiyordu. Seyrek zamanlayıcıya geçildi, arka plandaki ana pencerede animasyon durdu; göz durgunken %2,1–2,5.', en: 'Infinite CSS animations were recompositing the transparent window every frame. Moved to a sparse timer and stopped animation in the background main window; 2.1–2.5% with the eye idle.' },
      cetvel: { min: 0, max: 40, once: 36, sonra: 2.9, yon: 'asagi', birim: '%' },
      kaynak: 'Kokpit.md · Ölçümler · Hareket bütçesi',
    },
    {
      ne: { tr: 'Terminale gitmek zorunda kalan çok sorulu soru', en: 'Multi-question prompts that had to be answered in the terminal' },
      once: { tr: '22/60', en: '22/60' },
      sonra: { tr: '0', en: '0' },
      not: { tr: 'Son 30 günde claude’un sorularının %37’si çok soruluydu; v2.4’ten beri Ada’dan cevaplanıyor (tuş dizisi gerçek claude ile ölçüldü). Çoklu seçim hâlâ terminalde.', en: '37% of claude’s questions in the last 30 days had several parts; since v2.4 they are answered from Ada (key sequence measured against real claude). Multi-select still goes to the terminal.' },
      kaynak: 'Kokpit.md · Ölçümler · Çok sorulu sorular',
    },
    {
      ne: { tr: 'Gerçek Electron üzerinde arayüz kontrolü', en: 'UI checks against real Electron' },
      once: { tr: '29', en: '29' },
      sonra: { tr: '110', en: '110' },
      not: { tr: 'Artık Ada penceresini de kuruyor; kurmadığı sürece v2.2’den beri süren bir kapanış hatası görünmez kalmıştı. v2.6’da tepsi, oturumsuz limit ve arka plan görevi de eklendi.', en: 'It now sets up the Ada window too; until it did, a shutdown bug present since v2.2 stayed invisible. v2.6 added the tray, session-less limits and background tasks.' },
      cetvel: { min: 0, max: 110, once: 29, sonra: 110, yon: 'yukari' },
      kaynak: 'Kokpit.md · olcek.test',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Yapay zekâ ile çok sayıda projeyi paralel yürütünce darboğaz kod yazmak değil, bağlam oluyor: hangi proje hangi aşamada, nerede kalmıştım, hangi repoda commit’lenmemiş iş var, dünkü oturum not sistemine kaydedildi mi? Her soru ayrı bir terminal, ayrı bir dosya. Üstelik bir Claude Code oturumunu pencereyi kapatarak öldürmek, oturum sonu kancasının çalışmamasına, yani o oturumun hafızaya hiç düşmemesine yol açıyordu.',
            en: 'Running many projects in parallel with AI, the bottleneck is not writing code but context: which project is at which stage, where did I stop, which repo has uncommitted work, did yesterday’s session reach the notes system? Every question is another terminal, another file. And killing a Claude Code session by closing its window skipped the session-end hook, so that session never reached memory at all.',
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
              '**Lens, depo değil:** pano kendi verisini tutmuyor; git durumunu, proje aşamasını ve roadmap ilerlemesini dosyalardan okuyor. Uygulama silinse hiçbir şey kaybolmuyor.',
              '**Karttan oturuma:** “Aç” o klasörde gömülü terminalde `claude` başlatır; sekmeler ve yan yana bölmeler. “Çalıştır” projenin uygulamasını yan bölmede açıp adresini yakalar, kapatınca süreç ağacının tamamı ölür. “Sürdür” `--resume` ile tam o konuşmayı açar.',
              '**Canlı etkinlik:** Kokpit’in açtığı claude’a `--settings` ile HTTP hook’ları verilir; projenin kendi hook’larıyla birleşir, global ayara dokunulmaz. Bölmenin üstünde “ne yapıyor” şeridi (son araç, dosya, `+N −M`, süre), “bitti” ile “seni bekliyor” ayrı zil, kenarda 5 saatlik ve haftalık limit.',
              '**Ada:** ekranın üst ortasında hep açık küçük bir pencere; Kokpit’in penceresi kapatılınca tepsiye iner, Windows açılışında arka planda başlar. Bekleyen oturumları (Kokpit dışında açılan terminal oturumları dahil), claude’un son mesajını ve sorusunu gösterir; seçenekler (çok sorulu formlar dahil) ve serbest cevap Kokpit öne gelmeden gönderilir, klavyeden de. 5 saatlik ve haftalık limit hiç oturum açmadan görünür. Bir proje seçip yazılan görev, arka planda yeni bir claude oturumu başlatır. Gümüş bir göz kanca durumuna göre davranır: araca göre bakar, soruda amber halkayla bekler, bitince sevinir, 30 dakika sessizlikte uyur; yanındaki noktalar çalışan alt ajanlar.',
              '**Hafıza koruması:** canlı süreç varken kapatmada “Güvenli kapat” claude’a çıkış tuşlarını gönderip oturum sonu kancasını bekler; her oturum satırında “beyne düştü / düşmedi” ve tek oturumluk geri doldurma.',
              '**Sağlık ve Envanter:** not sisteminin boru hattı, sağlık nöbeti (CI, Dependabot, AI modelleri), 7 günlük token bütçesi, skill/MCP envanteri.',
            ],
            en: [
              '**A lens, not a store:** the board keeps no data of its own; it reads git status, project stage and roadmap progress from files. Delete the app and nothing is lost.',
              '**From card to session:** “Open” starts `claude` in an embedded terminal in that folder, with tabs and split panes. “Run” starts the project’s app in a side pane and captures its address; closing it kills the whole process tree. “Resume” reopens exactly that conversation with `--resume`.',
              '**Live activity:** claude started by Kokpit gets HTTP hooks via `--settings`; they merge with the project’s own hooks and never touch global settings. Each pane has a “what it is doing” strip (last tool, file, `+N −M`, duration), separate bells for “done” and “waiting for you”, and the 5-hour and weekly limits at the edge.',
              '**Ada:** a small always-on window at the top centre of the screen; closing Kokpit’s window sends it to the tray, and it starts in the background when Windows starts. It shows waiting sessions (including terminal sessions opened outside Kokpit), claude’s last message and its question; options (including multi-question forms) and free-text answers are sent without bringing Kokpit forward, keyboard included. The 5-hour and weekly limits are visible without opening any session. Picking a project and typing a task starts a new claude session in the background. A silver eye behaves from hook state: it looks according to the tool, waits with an amber ring on a question, cheers when done, sleeps after 30 quiet minutes; the dots beside it are running subagents.',
              '**Memory protection:** closing over a live process offers “Safe close”, which sends claude its exit keys and waits for the session-end hook; every session row shows whether it reached memory, with a one-session backfill.',
              '**Health and Inventory:** the notes pipeline, a health watch (CI, Dependabot, AI models), a 7-day token budget and the skill/MCP inventory.',
            ],
          },
        },
      ],
    },
    {
      id: 'yapay-zeka',
      baslik: { tr: 'Nasıl kuruldu', en: 'How it was built' },
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Plan → spike → final doküman → faz faz roadmap; her fazın “bitti” kriteri ölçülerek kapandı. Riskli her karar önce gerçek claude ile ölçüldü: ConPTY + Electron ayrı süreç (beş spawn varyantı), `--settings` hook’larının proje hook’larıyla birleşmesi, soru formunun tuş dizisi, `--resume`’un aynı dosyaya devam etmesi. PTY sunucusu ayrı süreçte ve token’lı. test:ui gerçek Electron’u ve Ada penceresini CDP ile sürüyor; test ve ekran koşucuları geçici bir dizinde çalışıyor, kullanıcının gerçek dosyalarına dokunmuyor. Testlerin hatayı yakalayıp yakalamadığı mutasyonla da sınandı (v2.3 15/15, v2.4 7/7, v2.5 4/4, v2.6 14/14).',
            en: 'Plan → spike → final document → phased roadmap, each phase closed only when its “done” criterion was measured. Every risky decision was first measured against real claude: ConPTY + Electron in a separate process (five spawn variants), `--settings` hooks merging with project hooks, the question form’s key sequence, and `--resume` continuing the same file. The PTY server runs in a separate, token-protected process. test:ui drives real Electron and the Ada window over CDP; test and screenshot runners work in a temporary directory and never touch the user’s real files. Whether the tests catch bugs was checked with mutations too (v2.3 15/15, v2.4 7/7, v2.5 4/4, v2.6 14/14).',
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
            tr: '“Hiçbir yere yazmaz” kuralı ancak test ve ekran betikleri de ona uyunca tamamlanıyor: önce ekran betiği bekleyen bir geri yükleme teklifini tüketti, sonra test koşucusu açık Kokpit’in defterine sahte bir “kapandı” satırı yazdı. Çözüm dosyaları geri koymak değil, ayrı dizin oldu. Aynı ders v2.4’te tekrarlandı: testin kurmadığı pencere, testin göremediği hatadır.',
            en: 'A “writes nothing anywhere” rule is complete only when the test and screenshot scripts obey it too: first the screenshot script consumed a pending restore offer, then the test runner wrote a fake “closed” line into a running Kokpit’s log. The fix was not restoring files but a separate directory. The lesson came back in v2.4: a window the test does not set up is a bug the test cannot see.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Kişisel bir araç: not sistemi ve durum betiği olmadan tek başına işe yaramaz.',
      'Yalnız Windows’ta (ConPTY) test edildi.',
      'Ada’dan görev başlatma gerçek claude ile henüz uçtan uca denenmedi; görev metninin geçişi gerçek PowerShell’de ölçüldü.',
    ],
    en: [
      'A personal tool: it is not useful without the notes system and status script it reads.',
      'Tested only on Windows (ConPTY).',
      'Starting a task from Ada has not yet been tried end to end with real claude; passing the task text was measured in real PowerShell.',
    ],
  },
  galeri: [
    { ad: 'pano', aciklama: { tr: 'Pano: projeler, aşama, roadmap, git durumu, açık oturumlar, sağlık nöbeti uyarısı.', en: 'Board: projects, stage, roadmap, git status, open sessions and a health-watch warning.' } },
    { ad: 'ada-cevap', aciklama: { tr: 'Ada: iki sorulu bir form, Kokpit’i öne getirmeden klavyeyle cevaplanıyor.', en: 'Ada: a two-question form answered from the keyboard without bringing Kokpit forward.' } },
    { ad: 'ada-goz', aciklama: { tr: 'Ada’nın gözü soruda amber halkayla bekliyor; altta 5 saatlik ve haftalık limit.', en: 'Ada’s eye waiting with an amber ring on a question; 5-hour and weekly limits below.' } },
    { ad: 'saglik', aciklama: { tr: 'Sağlık: not sisteminin boru hattı, beyne düşmemiş oturumlar, sağlık nöbeti.', en: 'Health: the notes pipeline, sessions that did not reach memory, the health watch.' } },
  ],
};
