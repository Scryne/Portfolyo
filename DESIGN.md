---
version: alpha
name: Portfolyo
description: Berkay Karaca'nın portfolyosu. Bir denetim defteri gibi okunur; kırmızı kalem iddiayı çizer, kobalt mürekkep ölçülmüş değeri yazar.
colors:
  # Açık tema: soğuk çizim kâğıdı. Krem değil; hafif yeşilimsi gri.
  paper: "#ECEEEA"
  paper-raised: "#F5F6F2"
  paper-top: "#FBFBF8"
  ink: "#15181B"
  ink-2: "#4D545A"
  ink-3: "#62696F"
  primary: "#2A43CF"
  on-primary: "#FBFBF8"
  pen: "#B3361F"
  # Koyu tema: gece masası. Saf siyah değil; mavi-grafit.
  night: "#101317"
  night-raised: "#171B20"
  night-top: "#1E2329"
  night-ink: "#E6E9E4"
  night-ink-2: "#A3AAAF"
  night-ink-3: "#858D93"
  night-primary: "#94A8FF"
  night-on-primary: "#101317"
  night-pen: "#FF8C74"
typography:
  display:
    fontFamily: Archivo
    fontWeight: 760
    lineHeight: 0.98
    letterSpacing: -0.025em
  heading:
    fontFamily: Archivo
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: -0.015em
  body:
    fontFamily: Archivo
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: IBM Plex Mono
    fontSize: 0.75rem
    fontWeight: 500
    letterSpacing: 0.06em
  readout:
    fontFamily: IBM Plex Mono
    fontWeight: 500
    lineHeight: 1
rounded:
  sm: 6px
  md: 10px
  lg: 16px
spacing:
  gutter: 20px
  gutter-lg: 40px
  section: 144px
  section-sm: 96px
---

# Portfolyo

## Overview

**Brief.** Alan: yazılım mühendisliği portfolyosu. Kitle: işe alım yapan mühendis ve teknik
lider, TR ve yurt dışı. Kazanılacak sıfat: **kesin**. Hareket derinliği: tek bir orkestre an
(hero'daki kalem çizgisi), gerisi sessiz geri bildirim. Layout ailesi: tam genişlik tipografik
hero → asimetrik sergi → tam genişlik görsel → dizin tablosu → numaralı yöntem yığını → bant.

**Hero.** Başlık adın kendisi, altında rol kobalt mürekkeple. Scryne 2026-09-28: "Yapay zekâyla
kuruyorum. Sonra ölçüyorum." cümlesi garip geldi, kaldırıldı. Tez başlıkta değil, defterde durur.

**Tez.** Berkay yapay zekâ ajanlarıyla hızlı kuruyor, sonra neyin gerçekten çalıştığını
ölçüyor. Eylül 2026'da dokuz projesini yeniden ölçtü; testler yeşilken ürünlerin çalışmadığı
yerleri buldu ve düzeltti. Site bu yüzden bir **denetim defteri** gibi tasarlandı: iddia
kırmızı kalemle çizilir, ölçülen değer kobalt mürekkeple yazılır.

**Farklılaştırıcı detay (imza).** Hero'daki denetim defteri: her satırda bir proje, eski değer
kırmızı bir kalem çizgisiyle üstü çizilmiş, yanında ölçülmüş yeni değer. Sayfa açılışında
kalem çizgileri sırayla çekilir. Sitenin tek orkestre hareketi budur.

**Global varsayılandan sapma.** Global "dark glassmorphism" varsayılanının mor/mavi/pembe
gradient mesh arkaplanı burada kullanılmıyor: ölçüm ve kanıt anlatan bir sayfada dekoratif
renk, "renk yalnız anlam taşır" ilkesini (Berkay'ın kendi projelerinin ortak tasarım kararı)
bozar. Camın arkasındaki doku bunun yerine ince bir **ölçüm ızgarası** (milimetrik kâğıt) ve
sol üstten gelen yumuşak kobalt ışıktır. Cam yalnız navigasyon çubuğunda ve lightbox'ta.
Taban disiplin (blur 12px, 1px ışık kenarı, kontrast, fallback) globalden aynen gelir.

**Bilerek kaçınılan varsayılan.** `ui-ux-pro-max` bu brief'e "koyu lacivert + yeşil aksan,
JetBrains Mono + IBM Plex Sans" önerdi. Bu, geliştirici portfolyolarının istatistiksel
ortalaması; reddedildi.

## Colors

İki anlamlı mürekkep, gerisi nötr:

- **`primary` (kobalt) = ölçülmüş / sonra / etkileşim.** Ölçülen yeni değer, bağlantı, birincil düğme,
  odak halkası. Mavi mürekkep: laboratuvar defterine yazılan değer.
- **`pen` = iddia / önce / kırık.** Yalnız üstü çizilen eski değerde ve ölçüm cetvelindeki
  "önce" işaretinde. Hata ya da uyarı rengi olarak başka yerde kullanılmaz; düğmede asla.
- Nötrler (`paper*`, `ink*`) her şeyi taşır. Üçüncü bir renk açılmaz.

Tema: sistem tercihine uyar, kullanıcı değiştirebilir. Koyu tema tersine çevrilmiş değil,
ayrı tasarlanmış: yüzeyler yükseldikçe açılır, mürekkepler doygunluğu azaltılmış açık tonlar.
Ölçülen kontrast (sayfa / yükseltilmiş / üst zeminde): `ink-3` 4.77–5.37, `primary` 6.42–7.23,
`pen` 5.19–5.85; koyu temada `night-ink-3` 4.69–5.52, `night-primary` 7.01–8.25,
`night-pen` 6.97–8.21. Hepsi normal metin için 4.5:1'in üstünde.

## Typography

**Archivo** tek UI ailesi; değişken `wdth` ekseni tipografinin kendisini imza yapar:
- Görüntü başlıkları (hero'da ad, proje adları, bölüm başlıkları) **geniş** kesimde (`wdth` 118–125),
  ağır ve sıkı. Kısa tutulur; hiçbir başlık üç satırı geçmez.
- Gövde normal genişlikte (`wdth` 100), 65ch ölçü.
- **IBM Plex Mono** yalnız makine değerleri için: ölçüm, tarih, repo yolu, künye alanları,
  etiketler. Mono görüldüğü yerde "bu bir kayıt" demektir; dekoratif kullanılmaz.
- Sayılar her yerde `tabular-nums`. Etiketler büyük harf değil, küçük boy + açık aralık.
- Font dosyaları siteye göre küçültülmüş alt kümeler (`app/fonts/`, 75 KB). İçeriğe Türkçe ve
  Latin-1 dışında bir karakter girerse `app/fonts/OKU-BENI.md`'deki komutla yeniden üret.

Token → CSS: `npm run tokens` bu dosyanın frontmatter'ını `app/tokens.css`'e yazar;
`app/globals.css` yalnız hangi temada hangi token'ın kullanılacağını eşler (`--zemin`,
`--yazi`, `--murekkep`, `--kalem` …). Bileşenlerde ham renk yok.

## Layout

12 kolonlu ızgara, maksimum içerik genişliği 1360px, kenar boşluğu `gutter` (mobil) /
`gutter-lg` (≥ 1024px). Bölüm arası `section` (mobilde `section-sm`). Ardışık iki bölüm aynı
kolon yapısını kullanmaz.

Ekran görüntüleri bir rapordaki şekil gibi durur: `paper-top` / `night-top` zemin üstünde 1px
kenarlı çerçeve, altında mono başlık. Görsel kendi en-boy oranını korur, kırpılmaz.

## Elevation & Depth

Derinlik gölgeyle değil yüzey katmanı ve 1px kenarla kurulur. Gölge yalnız lightbox'ta ve
hover'da yükselen sergi görselinde, düşük opaklıkla. `backdrop-filter` hiçbir zaman anime
edilmez; destek yoksa daha opak düz zemin kullanılır.

## Shapes

Yumuşak ama keskin: `sm` etiket/düğme, `md` görsel çerçevesi ve kart, `lg` lightbox. Hap
(pill) şekli yalnız dil/tema anahtarında.

## Components

- **Denetim defteri (hero):** satır = proje · ölçülen şey · önce (üstü çizili, `pen`) → sonra
  (`primary`, büyük mono). Satır, projenin vaka sayfasına bağlanır. Mobilde değerler alt satıra iner.
- **Ölçüm cetveli (vaka sayfası):** yatay ölçek, gerçek eşikler tik olarak (ör. CLS 0,1).
  "Önce" içi boş `pen` halka, "sonra" dolu `primary` nokta. Yön metinle de söylenir
  (renk tek başına anlam taşımaz).
- **Künye:** iki kolonlu mono tanım listesi (Dönem, Durum, Repo, Demo, Ölçek).
- **Dürüst sınırlar:** her vaka sayfasında ayrı bölüm; stil olarak sade liste, uyarı kutusu değil.
- **Nav:** üstte sabit cam şerit. Ad solda, bölümler, dil ve tema sağda.
- **Lightbox:** yerel `<dialog>`, ok tuşlarıyla gezinme, Escape kapatır, odak geri döner.

## Do's and Don'ts

- Kaynağı `_portfolyo/projeler/*.md` künyesinde olmayan sayıyı siteye koyma.
- `pen` rengini düğmede, bağlantıda ya da süslemede kullanma.
- UI metninde uzun tire (—) kullanma; nokta ya da virgül kullan.
- Emoji yok; ikonlar lucide.
- Gizli repoya bağlantı verme; "özel repo" yaz.
- Kalem çizgisi dışında sayfa açılışında anime edilen öğe ekleme.
