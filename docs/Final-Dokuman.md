---
proje: Portfolyo
created: 2026-09-28
type: final-dokuman
status: onaylandi
---
# Portfolyo — Final Doküman

## Özet

Berkay Karaca'nın iki dilli, statik portfolyo sitesi. Tezi tek cümle: **yapay zekâ ajanlarıyla
hızlı kuruyor, sonra neyin gerçekten çalıştığını ölçüyor.** Ana sayfa bu tezi Eylül 2026
denetiminin ölçülmüş önce/sonra değerleriyle açar. Dokuz projenin her biri künye, ölçümler,
yöntem ve dürüst sınırlarla ayrı bir vaka sayfasında anlatılır. Tüm sayılar
`Projeler/_portfolyo/projeler/*.md` künyelerinden gelir; kaynağı olmayan sayı siteye girmez.

## Teknoloji Stack

| Katman | Seçim | Gerekçe |
| --- | --- | --- |
| Çatı | Next.js 16 (App Router), `output: 'export'` | Statik çıktı: her yerde barınır, sunucu yok. Diğer projelerle aynı sürüm çizgisi. |
| Dil | TypeScript (strict), React 19 | İçerik tipli veri; bir alan eksikse derleme kırılır. |
| Stil | Tailwind CSS v4, token'lar `DESIGN.md` → CSS değişkenleri | Tek kaynak: renk/tip değerleri yalnız DESIGN.md'de. |
| Font | Archivo (değişken, `wdth` + `wght`), IBM Plex Mono; `next/font` ile kendi sunucumuzdan | Çalışma anında Google'a istek yok. Türkçe glifler tam. |
| Görsel | `sharp` betiği: vitrin WebP → 3 genişlik (960/1600/2400) + boyut manifesti | Mobilde 2880 px görsel indirilmez, CLS 0 (boyut önceden biliniyor). EXIF/metadata atılır. |
| Etkileşim | CSS animasyonu + küçük istemci bileşenleri; lightbox yerel `<dialog>` | JS yükü küçük, odak tuzağı tarayıcıdan geliyor. |
| İkon | lucide-react | Emoji yok. |
| Test/doğrulama | `tsc`, ESLint, `gorsel-dogrulama` (4 genişlik × 2 tema), Lighthouse | "Bitti" = ölçülmüş. |

## Mimari

```
content/            tipli içerik (TR + EN), proje başına bir modül
  projeler/*.ts     künye, bölümler, ölçümler, galeri
  site.ts           ana sayfa metinleri, yöntem, iletişim
scripts/gorseller.mjs   _portfolyo/ekranlar/*/vitrin → public/gorsel/<proje>/*-{960,1600,2400}.webp + lib/gorsel-manifest.json
app/(tr)/...        Türkçe rotalar (kök layout lang="tr")
app/(en)/en/...     İngilizce rotalar (kök layout lang="en")
components/         Ledger (imza), Olcum cetveli, Sergi, Dizin, Galeri, Nav ...
```

- İki dil için ayrı kök layout'lar (route group) → her sayfanın `<html lang>` doğru.
- Rotalar: `/`, `/projeler/<slug>/`, `/en/`, `/en/projects/<slug>/`. `trailingSlash: true`.
- Her sayfa `hreflang` karşılığını ve kanonik adresini taşır.
- Gizli repolar bağlantı almaz, "özel repo" yazar. Herkese açık olanlar GitHub'a bağlanır.

## Kapsam (v1)

Ana sayfa (TR/EN), 9 vaka sayfası × 2 dil, CV indirme, tema değiştirici, 404, metadata + OG
görseli + sitemap/robots.

## Riskler ve Doğrulamalar

- **İki kök layout + statik export + 404:** Faz 0'da derlemeyle doğrulanır.
- **Görsel ağırlığı:** vitrin kareleri 2880 px. Duyarlı varyantlar + `loading="lazy"` ile ilk
  yükleme bütçesi Lighthouse'ta ölçülür (hedef: mobil performans ≥ 90).
- **Kişisel veri:** sitede ad var (onaylı). CV PDF'inin web sürümü ve görsel metadata'sı yayından
  önce kontrol edilir (Kurallar: belge meta verisi de).
- **Sayıların doğruluğu:** her ölçüm bir kaynak alanına bağlıdır; içerik dosyasında kaynak yorumu durur.

## Kapsam Dışı

Blog, CMS, form, analitik, canlı demo. Yayın ve alan adı Scryne onayıyla ayrı bir fazda.
