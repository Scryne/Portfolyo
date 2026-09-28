import type { Proje } from '@/lib/tipler';

// Kaynak: _portfolyo/projeler/Kokpit.md (repo 2026-09-27'den beri herkese açık)
export const kokpit: Proje = {
  slug: 'kokpit',
  ad: 'Kokpit',
  alan: { tr: 'Geliştirici aracı · Masaüstü', en: 'Developer tool · Desktop' },
  baslik: {
    tr: 'Projeleri tek ekranda gösteren ve karttan Claude Code oturumu açan masaüstü uygulaması',
    en: 'A desktop app that shows every project on one screen and opens Claude Code sessions from a card',
  },
  tekCumle: {
    tr: 'Bütün projelerin aşamasını, roadmap ilerlemesini ve git durumunu tek panoda toplar; tek tıkla o klasörde gömülü terminalde `claude` açar ve kapanan her oturumun not sistemine düşüp düşmediğini gösterir. Kendi veritabanı yok: gösterdiği her şey git’in zaten takip ettiği dosyalardan türetilir.',
    en: 'Brings every project’s stage, roadmap progress and git status into one board; opens `claude` in an embedded terminal in that folder with one click, and shows whether each closed session made it into the notes system. It has no database of its own: everything it shows is derived from files git already tracks.',
  },
  donem: { tr: 'Eyl 2026', en: 'Sep 2026' },
  yil: 202609,
  durum: { tr: 'Çalışır; her gün kullanılıyor', en: 'Working; used every day' },
  repo: { acik: true, url: 'https://github.com/Scryne/Kokpit' },
  demo: { tr: 'Yok. Kişisel masaüstü aracı.', en: 'None. A personal desktop tool.' },
  stack: [
    { grup: { tr: 'Masaüstü', en: 'Desktop' }, ogeler: 'Electron 44 (sandbox + contextIsolation, app:// şeması + CSP)' },
    { grup: { tr: 'Terminal', en: 'Terminal' }, ogeler: 'node-pty (ConPTY), ayrı süreçte token korumalı WebSocket PTY sunucusu, xterm.js 6 (WebGL)' },
    { grup: { tr: 'Arayüz', en: 'Interface' }, ogeler: 'React 19, TypeScript, Vite 8, Tailwind 4' },
    { grup: { tr: 'Veri', en: 'Data' }, ogeler: 'git + state.json + roadmap okuyan durum betiği, JSONL oturum defteri' },
  ],
  olcek: [
    { ad: { tr: 'Faz', en: 'Phases' }, deger: { tr: '11 (Faz 0 spike → Faz 10 cila)', en: '11 (phase 0 spike → phase 10 polish)' } },
    { ad: { tr: 'Test', en: 'Tests' }, deger: { tr: 'test:pty 11 kontrol (Windows CI) + test:ui 29 kontrol (gerçek Electron, CDP)', en: 'test:pty 11 checks (Windows CI) + test:ui 29 checks (real Electron, CDP)' } },
    { ad: { tr: 'Sayfa', en: 'Pages' }, deger: { tr: 'Pano, Terminaller, Sağlık, Envanter', en: 'Board, Terminals, Health, Inventory' } },
  ],
  olcumler: [
    {
      ne: { tr: 'Faz 0 spike: ConPTY + Electron ayrı süreç', en: 'Phase 0 spike: ConPTY + Electron in a separate process' },
      sonra: { tr: '5 spawn varyantı', en: '5 spawn variants' },
      not: { tr: 'Unicode, yeniden boyutlandırma ve yetim süreç ölçüldü; mimari ancak sonra finalize edildi.', en: 'Unicode, resize and orphan processes were measured; the architecture was finalised only afterwards.' },
      kaynak: 'Kokpit.md · Ne yaptım',
    },
    {
      ne: { tr: 'Gerçek Electron üzerinde arayüz kontrolü', en: 'UI checks against real Electron' },
      sonra: { tr: '29/29', en: '29/29' },
      cetvel: { min: 0, max: 29, sonra: 29, yon: 'yukari' },
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
              '**Karttan oturuma:** “Aç” o klasörde gömülü terminalde `claude` başlatır; sekmeler, yan yana bölmeler, claude bitince ya da soru sorunca sekme rozeti ve Windows bildirimi.',
              '**Hafıza koruması:** altında canlı süreç varken sekme ya da uygulama kapatılırsa onay diyaloğu; açık oturumlarla kapanırsa sonraki açılışta `claude --continue` ile geri yükleme; her oturum satırında “beyne düştü / düşmedi”.',
              '**Sağlık ve Envanter:** not sisteminin boru hattı, kaydedilmemiş oturumlar ve geri doldurma komutu, 7 günlük token bütçesi, skill/MCP envanteri.',
            ],
            en: [
              '**A lens, not a store:** the board keeps no data of its own; it reads git status, project stage and roadmap progress from files. Delete the app and nothing is lost.',
              '**From card to session:** “Open” starts `claude` in an embedded terminal in that folder, with tabs, split panes, and a tab badge plus Windows notification when claude finishes or asks a question.',
              '**Memory protection:** closing a tab or the app over a live process asks for confirmation; closing with open sessions offers `claude --continue` restore on next launch; every session row shows whether it reached memory.',
              '**Health and Inventory:** the notes pipeline, unsaved sessions with a backfill command, a 7-day token budget and the skill/MCP inventory.',
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
            tr: 'Plan → spike → final doküman → faz faz roadmap; her fazın “bitti” kriteri ölçülerek kapandı. PTY sunucusu ayrı süreçte ve token’lı; test:pty tokensiz bağlantının reddini ve ebeveyn kapanınca yetim süreç kalmadığını kanıtlıyor. test:ui gerçek Electron’u CDP ile sürüyor (zil, arama, kısayolların terminale sızmaması, geri yükleme dahil 29 kontrol) ve kullanıcının gerçek ayar dosyalarını test sonunda geri koyuyor.',
            en: 'Plan → spike → final document → phased roadmap, each phase closed only when its “done” criterion was measured. The PTY server runs in a separate, token-protected process; test:pty proves that tokenless connections are refused and that no orphan process survives the parent. test:ui drives real Electron over CDP (29 checks, including the bell, search, shortcuts not leaking into the terminal, and restore) and puts the user’s real settings files back afterwards.',
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
            tr: '“Hiçbir yere yazmaz” kuralı ancak test ve ekran betikleri de ona uyunca tamamlanıyor: Eylül 2026 denetiminde ekran görüntüsü betiği, kapanışta bekleyen bir geri yükleme teklifini tüketiyordu. Artık o da dokunduğu iki dosyayı geri koyuyor.',
            en: 'A “writes nothing anywhere” rule is complete only when the test and screenshot scripts obey it too: the September 2026 audit found the screenshot script consuming a pending restore offer. It now puts back the two files it touches.',
          },
        },
      ],
    },
  ],
  sinirlar: {
    tr: [
      'Kişisel bir araç: not sistemi ve durum betiği olmadan tek başına işe yaramaz.',
      'Yalnız Windows’ta (ConPTY) test edildi.',
    ],
    en: [
      'A personal tool: it is not useful without the notes system and status script it reads.',
      'Tested only on Windows (ConPTY).',
    ],
  },
  galeri: [
    { ad: 'pano', aciklama: { tr: 'Pano: projeler, aşama, roadmap, git durumu, oturum geri yükleme teklifi.', en: 'Board: projects, stage, roadmap, git status and a session-restore offer.' } },
    { ad: 'saglik', aciklama: { tr: 'Sağlık: not sisteminin boru hattı ve kaydedilmemiş oturumlar.', en: 'Health: the notes pipeline and unsaved sessions.' } },
    { ad: 'envanter', aciklama: { tr: 'Envanter: skill ve MCP listesi.', en: 'Inventory: skills and MCP servers.' } },
  ],
};
