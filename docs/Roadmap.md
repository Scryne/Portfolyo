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
| 0 | İskelet ve token'lar | ✅ Tamamlandı | `npm run build` statik `out/` üretir; iki dilin kök layout'u ve 404 çalışır; DESIGN.md lint temiz |
| 1 | İçerik ve görsel hattı | ✅ Tamamlandı | 9 proje TR+EN tipli içerikte; her sayı `_portfolyo/projeler` künyesine izlenir; görsel betiği varyant + manifest üretir |
| 2 | Ana sayfa | ✅ Tamamlandı | Denetim defteri, sergiler, dizin, yöntem, CV bandı; gorsel-dogrulama 4 genişlik × 2 tema temiz |
| 3 | Vaka sayfaları | ✅ Tamamlandı | 9 × 2 sayfa, galeri + lightbox klavyeyle çalışır; gorsel-dogrulama temiz |
| 4 | CV ve iletişim | ✅ Tamamlandı | Web CV sürümü (kişisel veri kararına göre) indirilebilir; PDF meta verisi kontrol edildi |
| 5 | Sertleştirme | ✅ Tamamlandı | Erişilebilirlik, hareket performansı, metadata/OG/sitemap, metin pası; Lighthouse mobil ≥ 90 / a11y 100 / BP 100 / SEO 100 |
| 6 | Yayın (tetiklemeli) | ✅ Tamamlandı | Scryne'ın onayladığı yerde yayında; canlı adreste gorsel-dogrulama temiz |

## Faz Detayları

### Faz 0: İskelet ve token'lar
- **İşler:** Next 16 + Tailwind v4 + TS kurulumu, statik export, `(tr)`/`(en)` kök layout'ları,
  fontlar, DESIGN.md → CSS token'ları, tema değiştirici (flaşsız).
- **Bitti Kriteri:** yukarıdaki tablo.
- **Notlar (2026-09-28):** Next 16.3 statik export segment prefetch dosyalarını klasör olarak
  yazıyor (`__next.!X/…/__PAGE__.txt`), istemci noktalı düz ad istiyor → her statik sunucuda 404.
  `scripts/duzlestir.mjs` (postbuild) düz kopyaları yazıyor. Next yükseltmesinde tekrar kontrol et.
  `design.md export` Windows'ta dosyaya yönlendirilince boş dosya bırakıyor → `scripts/tokens.mjs`.

### Faz 1: İçerik ve görsel hattı
- **İşler:** `content/projeler/*.ts` (TR+EN), ölçüm verisi, `scripts/gorseller.mjs`.
- **Notlar:** Kokpit ve MythAtlas'ın `vitrin/` klasörü yok; `sonra/` karelerinden seçildi.
  Görseller: 56 kare, 800/1400/2200/2880 varyant, 10,4 MB (kaynak karelerin kendisi repoda yok).

### Faz 2: Ana sayfa
- **İşler:** Hero + denetim defteri (imza), seçilmiş projeler, dizin, yöntem, CV/iletişim, altbilgi.
- **Notlar:** gorsel-dogrulama tam sayfa kareyi kaydırmadan çektiği için tembel görseller boş
  görünür; tasarım incelemesi için kaydırıp `img.decode()` bekleyen ayrı çekim gerekiyor.
  Next'in prefetch HEAD isteği Chromium'da ERR_ABORTED raporlanıyor (zararsız); doğrulama
  betiğine bu istisna eklendi.

### Faz 3: Vaka sayfaları
- **İşler:** künye, bölümler, ölçüm cetvelleri, galeri, sonraki proje.

### Faz 4: CV ve iletişim
- **İşler:** `_portfolyo/cv` üreticisine web sürümü; indirme bağlantıları.
- **Sonuç (2026-09-28):** Sitede başvuru CV'sinin birebir aynısı (Scryne: "CV aynı kalmalıydı";
  önce telefonsuz bir web sürümü yapılmıştı, geri alındı). E-posta `berkaykaraca10@gmail.com` hem
  CV'de hem sitede (sitede adres HTML'de tek parça değil). CV'ye site adresi eklendi.
  `npm run cv` → `_portfolyo/cv/cikti` → `public/cv`.

### Faz 5: Sertleştirme
- **İşler:** fixing-accessibility, fixing-motion-performance, fixing-metadata, ux-writing, Lighthouse.
- **Sonuç (2026-09-28):** axe 0 ihlal (5 rota × 2 genişlik × 2 tema); klavye testi (atla
  bağlantısı, lightbox ok/Escape, odak dönüşü, tema kalıcılığı, dil anahtarı) geçti; Lighthouse
  mobil perf 95–97 / a11y 100 / BP 100 / SEO 100, CLS 0. Font alt kümesi LCP'yi 3,6 → 2,9 sn indirdi.
  OG kartları `scripts/og.mjs` ile (satori değişken font eksenini desteklemiyor).

### Faz 6: Yayın (tetiklemeli)
- **İşler:** barındırma + alan adı Scryne'ın kararıyla; CI (build + link kontrolü).
- **Sonuç (2026-09-28):** GitHub Pages, https://scryne.github.io/ — public `Scryne/Scryne.github.io`
  repoda yalnız derlenmiş site (kaynak yerelde). `npm run yayinla` derler + iter (noreply kimlik,
  autocrlf kapalı). `public/.nojekyll` şart (`_next`). Canlıda gorsel-dogrulama 160 kare 0 sorun.
  CI kurulmadı: yayın yerelden, ölçümle.
