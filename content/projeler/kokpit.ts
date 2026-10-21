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
    tr: 'Bütün projelerin aşamasını, roadmap ilerlemesini ve git durumunu tek panoda toplar; tek tıkla o klasörde gömülü terminalde `claude` açar ve her oturumun ne yaptığını Claude Code’un kancalarından canlı izler. Kendi veritabanı yok: gösterdiği her şey git’in takip ettiği dosyalardan türetilir.',
    en: 'Brings every project’s stage, roadmap progress and git status into one board; opens `claude` in an embedded terminal in that folder with one click and watches what each session does through Claude Code’s hooks. It has no database of its own: everything it shows comes from files git already tracks.',
  },
  donem: { tr: 'Eyl 2026 – Eki 2026', en: 'Sep 2026 – Oct 2026' },
  yil: 202610,
  durum: { tr: 'Çalışır; her gün kullanılıyor', en: 'Working; used every day' },
  repo: { acik: true, url: 'https://github.com/Scryne/Kokpit' },
  demo: { tr: 'Yok. Kişisel masaüstü aracı.', en: 'None. A personal desktop tool.' },
  stack: [
    { grup: { tr: 'Masaüstü', en: 'Desktop' }, ogeler: 'Electron 44.9 (sandbox + contextIsolation, app:// şeması + CSP)' },
    { grup: { tr: 'Terminal', en: 'Terminal' }, ogeler: 'node-pty (ConPTY), ayrı süreçte token korumalı WebSocket PTY sunucusu, xterm.js 6 (WebGL)' },
    { grup: { tr: 'Arayüz', en: 'Interface' }, ogeler: 'React 19, TypeScript, Vite 8, Tailwind 4' },
    { grup: { tr: 'Veri', en: 'Data' }, ogeler: 'git + state.json + roadmap okuyan durum betiği, JSONL oturum defteri, Claude Code HTTP hook’ları (127.0.0.1 + token)' },
  ],
  olcek: [
    { ad: { tr: 'Faz', en: 'Phases' }, deger: { tr: '38 (Faz 0 spike → Faz 37 push durumu)', en: '38 (phase 0 spike → phase 37 push status)' } },
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: 'kanca 101 + pty 21 + ada 70 (Windows CI) · ui 174 (gerçek Electron, CDP) · gerçek claude ile 11', en: 'hooks 101 + pty 21 + Ada 70 (Windows CI) · UI 174 (real Electron, CDP) · 11 against real claude' } },
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
      sonra: { tr: '174', en: '174' },
      not: { tr: 'Artık Ada penceresini de kuruyor; kurmadığı sürece v2.2’den beri süren bir kapanış hatası görünmez kalmıştı. Sonra tepsi, oturumsuz limit, gerçek tam ekran pencere, gerçek imleçle sürükleme, Windows z-sırası ve biten bölmenin yerinde sürdürülmesi de eklendi.', en: 'It now sets up the Ada window too; until it did, a shutdown bug present since v2.2 stayed invisible. Later came the tray, session-less limits, a real full-screen window, dragging with the real cursor, the Windows z-order and resuming a finished pane in place.' },
      cetvel: { min: 0, max: 174, once: 29, sonra: 174, yon: 'yukari' },
      kaynak: 'Kokpit.md · olcek.test',
    },
    {
      ne: { tr: 'Pano’nun durumu okuma süresi (22 proje)', en: 'Time for the board to read status (22 projects)' },
      once: { tr: '2.075 ms', en: '2,075 ms' },
      sonra: { tr: '790 ms', en: '790 ms' },
      not: { tr: 'Durum betiği her depo için git’i sırayla çağırıyordu; sürenin %85’i buydu (profil ölçümü). Depolar paralel okunuyor, çıktı eskisiyle birebir aynı.', en: 'The status script called git for each repository in turn; that was 85% of the time (profiled). Repositories are now read in parallel and the output is byte-for-byte the same.' },
      cetvel: { min: 0, max: 2500, once: 2075, sonra: 790, yon: 'asagi', birim: 'ms' },
      kaynak: 'Kokpit.md · Ölçümler · Tam denetim (v2.9)',
    },
  ],
  bolumler: [
    {
      id: 'problem',
      bloklar: [
        {
          tur: 'p',
          metin: {
            tr: 'Yapay zekâyla çok sayıda projeyi paralel yürütünce darboğaz kod değil bağlam oluyor: hangi proje hangi aşamada, hangi repoda commit’lenmemiş iş var, dünkü oturum not sistemine kaydedildi mi? Üstelik bir Claude Code oturumunu pencereyi kapatarak öldürmek, oturum sonu kancasını atlatıp o oturumu hafızadan siliyordu.',
            en: 'Running many projects in parallel with AI, the bottleneck is context, not code: which project is at which stage, which repo has uncommitted work, did yesterday’s session reach the notes system? And killing a Claude Code session by closing its window skipped the session-end hook, so that session never reached memory.',
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
              '**Lens, depo değil:** pano kendi verisini tutmaz; aşama, roadmap, git ve push durumunu dosyalardan okur.',
              '**Karttan oturuma:** “Aç” gömülü terminalde `claude` başlatır; “Çalıştır” uygulamayı yan bölmede açar, kapatınca süreç ağacı ölür; “Sürdür” ve Ctrl+Shift+T tam o konuşmayı `--resume` ile geri getirir.',
              '**Canlı etkinlik:** claude’a `--settings` ile verilen HTTP hook’ları; bölmede son araç, dosya ve `+N −M`, “bitti” ile “seni bekliyor” ayrı.',
              '**Ada:** ekranın üstünde hep açık küçük pencere; soruları Kokpit öne gelmeden cevaplatır, limitleri gösterir, arka planda görev başlatır.',
              '**Hafıza koruması:** “Güvenli kapat” claude’a çıkış tuşlarını gönderip oturum sonu kancasını bekler; her oturumda “beyne düştü / düşmedi”.',
            ],
            en: [
              '**A lens, not a store:** the board keeps no data of its own; it reads stage, roadmap, git and push status from files.',
              '**From card to session:** “Open” starts `claude` in an embedded terminal; “Run” starts the app in a side pane and kills the whole process tree on close; “Resume” and Ctrl+Shift+T bring back exactly that conversation with `--resume`.',
              '**Live activity:** HTTP hooks given to claude via `--settings`; each pane shows the last tool, file and `+N −M`, with “done” and “waiting for you” kept apart.',
              '**Ada:** a small always-on window at the top of the screen; it answers claude’s questions without bringing Kokpit forward, shows the usage limits and starts tasks in the background.',
              '**Memory protection:** “Safe close” sends claude its exit keys and waits for the session-end hook; every session shows whether it reached memory.',
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
          tur: 'liste',
          ogeler: {
            tr: [
              '**Riskli karar önce gerçek claude ile ölçüldü:** ConPTY için beş spawn varyantı, `--settings` hook’larının proje hook’larıyla birleşmesi, soru formunun tuş dizisi.',
              '**Testler gerçek uygulamayı sürüyor:** test:ui gerçek Electron’u ve Ada penceresini CDP ile kullanıyor, geçici dizinde çalışıp gerçek dosyalara dokunmuyor; testlerin hatayı yakaladığı mutasyonla sınandı.',
            ],
            en: [
              '**Risky decisions measured against real claude first:** five spawn variants for ConPTY, `--settings` hooks merging with project hooks, the question form’s key sequence.',
              '**Tests drive the real app:** test:ui drives real Electron and the Ada window over CDP in a temporary directory, never touching real files; mutations checked that the tests catch bugs.',
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
            tr: 'Testin kurmadığı pencere, testin göremediği hatadır. v2.9 denetiminde yine: bütün testler yeşilken altı haftalık kullanım logu, Ada’nın Alt+Tab’da kaybolup geri geldiğini gösterdi.',
            en: 'A window the test does not set up is a bug the test cannot see. And again in the v2.9 audit: with every test green, six weeks of usage logs showed Ada vanishing and reappearing on Alt+Tab.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Kişisel bir araç: not sistemi ve durum betiği olmadan tek başına işe yaramaz.',
      'Yalnız Windows’ta (ConPTY) test edildi.',
      'Windows Ada’yı zaman zaman normal pencerelerin altına düşürüyor; nedeni henüz bilinmiyor. Ada bunu 0,6 saniyede fark edip kendini geri çıkarıyor.',
    ],
    en: [
      'A personal tool: it is not useful without the notes system and status script it reads.',
      'Tested only on Windows (ConPTY).',
      'Windows occasionally drops Ada below normal windows; the cause is not known yet. Ada notices within 0.6 seconds and puts itself back on top.',
    ],
  },
  galeri: [
    { ad: 'pano', aciklama: { tr: 'Pano: projeler, aşama, roadmap, git durumu, açık oturumlar, sağlık nöbeti uyarısı.', en: 'Board: projects, stage, roadmap, git status, open sessions and a health-watch warning.' } },
    { ad: 'ada-cevap', aciklama: { tr: 'Ada: iki sorulu bir form, Kokpit’i öne getirmeden klavyeyle cevaplanıyor.', en: 'Ada: a two-question form answered from the keyboard without bringing Kokpit forward.' } },
    { ad: 'ada-goz', aciklama: { tr: 'Ada’nın gözü soruda amber halkayla bekliyor; altta 5 saatlik ve haftalık limit.', en: 'Ada’s eye waiting with an amber ring on a question; 5-hour and weekly limits below.' } },
    { ad: 'saglik', aciklama: { tr: 'Sağlık: not sisteminin boru hattı, beyne düşmemiş oturumlar, sağlık nöbeti.', en: 'Health: the notes pipeline, sessions that did not reach memory, the health watch.' } },
  ],
};
