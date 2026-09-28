---
proje: Portfolyo
created: 2026-09-28
type: roadmap
status: aktif
---
# Portfolyo — Roadmap

Durum sütunu session-start hook'u tarafından otomatik okunur — format bozulmasın:
⏳ Bekliyor / 🔄 Devam Ediyor / ✅ Tamamlandı.

| Faz | Adı | Durum | Bitti Kriteri |
| --- | --- | --- | --- |
| 0 | İskelet ve token'lar | 🔄 Devam Ediyor | `npm run build` statik `out/` üretir; iki dilin kök layout'u ve 404 çalışır; DESIGN.md lint temiz |
| 1 | İçerik ve görsel hattı | ⏳ Bekliyor | 9 proje TR+EN tipli içerikte; her sayı `_portfolyo/projeler` künyesine izlenir; görsel betiği varyant + manifest üretir |
| 2 | Ana sayfa | ⏳ Bekliyor | Denetim defteri, sergiler, dizin, yöntem, CV bandı; gorsel-dogrulama 4 genişlik × 2 tema temiz |
| 3 | Vaka sayfaları | ⏳ Bekliyor | 9 × 2 sayfa, galeri + lightbox klavyeyle çalışır; gorsel-dogrulama temiz |
| 4 | CV ve iletişim | ⏳ Bekliyor | Web CV sürümü (kişisel veri kararına göre) indirilebilir; PDF meta verisi kontrol edildi |
| 5 | Sertleştirme | ⏳ Bekliyor | Erişilebilirlik, hareket performansı, metadata/OG/sitemap, metin pası; Lighthouse mobil ≥ 90 / a11y 100 / BP 100 / SEO 100 |
| 6 | Yayın (tetiklemeli) | ⏳ Bekliyor | Scryne'ın onayladığı yerde yayında; canlı adreste gorsel-dogrulama temiz |

## Faz Detayları

### Faz 0: İskelet ve token'lar
- **İşler:** Next 16 + Tailwind v4 + TS kurulumu, statik export, `(tr)`/`(en)` kök layout'ları,
  fontlar, DESIGN.md → CSS token'ları, tema değiştirici (flaşsız).
- **Bitti Kriteri:** yukarıdaki tablo.

### Faz 1: İçerik ve görsel hattı
- **İşler:** `content/projeler/*.ts` (TR+EN), ölçüm verisi, `scripts/gorseller.mjs`.
- **Notlar:** Kokpit ve MythAtlas'ın `vitrin/` klasörü yok; `sonra/` karelerinden seçilecek.

### Faz 2: Ana sayfa
- **İşler:** Hero + denetim defteri (imza), seçilmiş projeler, dizin, yöntem, CV/iletişim, altbilgi.

### Faz 3: Vaka sayfaları
- **İşler:** künye, bölümler, ölçüm cetvelleri, galeri, sonraki proje.

### Faz 4: CV ve iletişim
- **İşler:** `_portfolyo/cv` üreticisine web sürümü; indirme bağlantıları.

### Faz 5: Sertleştirme
- **İşler:** fixing-accessibility, fixing-motion-performance, fixing-metadata, ux-writing, Lighthouse.

### Faz 6: Yayın (tetiklemeli)
- **İşler:** barındırma + alan adı Scryne'ın kararıyla; CI (build + link kontrolü).
