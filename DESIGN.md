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
  # Hero: renk ağı zemini ve küre. Açık temada soluk, koyu temada derin mor / mavi / gül.
  mesh-violet: "#8C7CF5"
  mesh-blue: "#6F9BFF"
  mesh-rose: "#F08CC0"
  globe-base: "#FFFFFF"
  globe-glow: "#DCE1FF"
  night-mesh-violet: "#5C3CDC"
  night-mesh-blue: "#286EFF"
  night-mesh-rose: "#DC3C8C"
  night-globe-base: "#383D6B"
  night-globe-glow: "#5247B3"
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
lider, TR ve yurt dışı. Kazanılacak sıfat: **kesin**. Hareket derinliği: hero'da canlı küre (tek
sürekli hareket), gerisi kaydırmaya bağlı ve anlamlı (2026-10-21'den beri; aşağıda). Layout ailesi: asimetrik
küre hero'su → kart yığını (seçilmiş işler) → defter → sabitlenen sahne → sabitlenen yöntem hattı → CV bandı.

**Hero (2026-09-28, Scryne seçti; küre v2 aşağıda).** Renk ağı zemininde noktalı bir dünya küresi (`cobe`,
WebGL, tembel yüklenir). Küre projelerin gerçekten geçtiği yerlere sırayla döner (Levant,
Île Longue, Truva, Abu Simbel, Türkiye; kaynak `content/site.ts` → `KURE`); cam bir kart o
projenin ekranını ve tek cümlesini gösterir, kartla işaret arasında kesikli bir çizgi, işarette
nabız atan bir halka durur. İmleç bir işarete gelince tur durur ve o kart açılır; tıklama vakaya
gider; sürükleme küreyi çevirir. Tur için çubuk düğmeleri ve durdur/oynat var (WCAG 2.2.2);
hareket azaltma tercihinde tur kendiliğinden başlamaz. Görünür başlık yok: ad nav'da, `h1`
ekran okuyucu için. Solda rol etiketi + giriş cümlesi + iki düğme.

**Küre v2 (2026-10-04, Scryne: "tüm projelerim gözüksün, noktalar üst üste gelmesin").** On projenin
hepsi kürede, her biri bir kez ve künyesindeki gerçek yerinde (Ankara'da üç proje: KİK, MASAK, TBMM).
Kurallar:
- **Kümeler halkaya açılır.** 9°'den yakın konumlar (Türkiye + Levant) tek küme; üyeler küme ortasının
  çevresinde sabit bir halkaya dizilir, gerçek konuma ince bir çizgi iner (cobe'un küçük noktası).
  Halkadaki sıra coğrafi yöndür ve statiktir: küre dönerken yer değiştirmez.
- **Adlar görünür.** Önde kalan her işaretin yanında mono ad; tek başına duran ad küreden dışarı
  bakar. Adlar birbirine, başka bir noktaya ya da karta binmez: yer yoksa öbür yana geçer, orada da
  yoksa gizlenir (nokta kalır, imleçle görünür). Seçili projenin adı hep görünür. 40rem altında
  yalnız seçili ad.
- **Rota (imza).** Tur bir yerden ötekine geçerken iki konum arasına büyük daire yayı mürekkeple
  çizilir: yüzeyden yükselir, kürenin arkasında kalan parça çizilmez, ucunda kalem noktası, sonra
  söner. Aynı kümedeki komşuya yay yok. Hareket azaltma tercihinde çizilmez.
- **Kart konumu örtmez.** Masaüstünde küre seçili konumun güneybatısına bakar (64–80rem'de daha
  fazla); konum ortanın sağ üstüne düşer. 64–80rem'de kart metin sütununa taşmaz (`left-0`, 17rem).
- Mobilde on çubuk sığmaz: önceki / sayaç / sonraki; masaüstünde çubuklar. Kartta `04 / 10` sayacı.
- Tur sırası coğrafidir (Türkiye → Levant → Mısır → Fransa → San Francisco), `content/site.ts`.

**Sahne (2026-10-21, Scryne: "frontend'i çok daha eşsiz yap", "proje-ülke şeyi saçma duruyor").** Aynı gün kurulan
atlas (noktalı dünya haritası, proje başına konum ve koordinat, vaka sayfasında konum kesiti, "Sonraki proje · 3.090 km
kuzeybatı" rotası) kaldırıldı. Scryne'a iki yol soruldu: konumları uzak ülkelere dağıtmak (uydurma koordinat olurdu)
ya da fikri değiştirmek; "ekran sahnesi"ni seçti. Küre aynen kaldı (Scryne: "küre kalsın"); konum dili yalnız orada.
- **Tüm projeler = sahne.** Geniş ekranda bölüm kaydırma boyunca sabitlenir (proje başına 26svh kaydırma payı):
  solda kompakt numaralı liste, sol çizgisinde mürekkep imleç; sağda sahne: alan + `05 / 10` sayacı, 16:10 kare,
  altında tek satır ve öne çıkan ölçüm (önce üstü çizili → sonra). Kaydırma dilimi, üstüne gelmek ya da klavye odağı
  aktif projeyi seçer; yeni kare kaydırma yönünde perdeyle açılır, içindeki ekran 1,14'ten yerine oturur, eskisi
  geri çekilir. Aktif ad `primary` + `wdth` 125, diğerleri `yazi-3`. Sahne `aria-hidden`: aynı bilgi satırda
  (`lg:sr-only`). Dar ekranda sabitleme yok: her proje kendi karesiyle kart, kaydırdıkça gelir.
- **Kare kaynağı tek:** `content/site.ts` → `KURE.kare` (kürenin kartıyla aynı ekran). Ölçüm seçimi `lib/olcum.ts`
  (İşler bölümüyle aynı kural).
- **Ritim kırıldı.** Bölümler ayrı düzenler: kart yığını, sahne (sabitlenen liste + perde), yöntem (beş adım tek
  bir hat üstünde; geniş ekranda yatay, dar ekranda dikey), CV (iki büyük indirme kutusu + üç iletişim satırı).

**Kart yığını ve yöntem sahnesi (2026-10-21, Scryne: Yöntem "tek scrollda bitiyor, tüm kartlar zaten açık geliyor",
"hâlâ istediğim seviyede değil").** Seçilmiş işler asimetrik sergiden kart yığınına geçti: geniş ve yüksek ekranda
(`64rem` × `36rem`) her proje ekran boyunda yapışık bir kart (solda künye + ölçüm, sağda gerçek ekran; ikinci kare
köşeye biner, telefon karesi çerçeveli), her kart öncekinden 1,25rem aşağıda durur; sonraki biner, alttaki 0,92'ye
küçülüp kararır (`timeline-scope` ile sonraki kartın giriş çizelgesi). Yöntem aynı koşulda ~1,4 ekran boyu
sabitlenir: hat bu yolda çizilir, adım i hat sütununa ulaşınca (`contain` i × 17%) gelir. Dar ekranda ikisi de
akışta kalır. Sahne ölçümü uzun metin olabilir (PolitikDesk); sahne metni kırılır, `nowrap` yatay taşma yapmıştı.

**Reddedilenler (tekrarlama).** Aynı gün: "Yapay zekâyla kuruyorum. Sonra ölçüyorum." başlığı
("garip"), dev ad + rol, denetim ölçümlerinden eğim grafiği (`hero-egim` dalı, "saçma ve kötü"),
statik taslakta dipnotlu büyük paragraf, ürün ekranlarından "şekil masası", Wartrack test
raporu, prototipte proje ağı ve 3D ekran duvarı. Scryne'ın gerekçesi: hero yeterince etkileyici
değildi ve denetim/ölçüm teması hero'da istenmiyor. Tez defterde ve vaka sayfalarında kalır.

**Tez.** Berkay yapay zekâ ajanlarıyla hızlı kuruyor, sonra neyin gerçekten çalıştığını
ölçüyor. Eylül 2026'da dokuz projesini yeniden ölçtü; testler yeşilken ürünlerin çalışmadığı
yerleri buldu ve düzeltti. Site bu yüzden bir **denetim defteri** gibi tasarlandı: iddia
kırmızı kalemle çizilir, ölçülen değer kobalt mürekkeple yazılır.

**Farklılaştırıcı detay (imza).** Hero küresi: işler soyut bir "portfolyo" değil, dünyada yeri
olan yazılımlar olarak görünür. İkinci imza hero'nun hemen altındaki denetim defteri: eski
değer kırmızı kalemle çizilir, yanında ölçülen değer.

**Global varsayılanla ilişki.** Hero global "dark glassmorphism" dilini kullanır: mor / mavi /
gül renk ağı zemin (`mesh-*`, `night-mesh-*`) ve cam kart. Sayfanın geri kalanı ölçüm
anlattığı için sade kalır: zemin ince bir **ölçüm ızgarası**, renk yalnız anlam taşır. Cam
yalnız nav, hero kartı ve lightbox'ta.
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

- **Küre (hero):** `components/Kure.tsx`. Renkler `--kure-taban/-parilti/-isaret` üzerinden temaya bağlı
  (tema değişince küre yeniden boyanır). İşaret izdüşümü cobe gölgelendiricisinin tersi; `izdusum()`.
- **Denetim defteri (hero'nun altı):** satır = proje · ölçülen şey · önce (üstü çizili, `pen`) → sonra
  (`primary`, büyük mono). Satır, projenin vaka sayfasına bağlanır. Mobilde değerler alt satıra iner.
- **Ölçüm cetveli (vaka sayfası):** yatay ölçek, gerçek eşikler tik olarak (ör. CLS 0,1).
  "Önce" içi boş `pen` halka, "sonra" dolu `primary` nokta. Yön metinle de söylenir
  (renk tek başına anlam taşımaz).
- **Künye:** iki kolonlu mono tanım listesi (Dönem, Durum, Repo, Demo, Ölçek).
- **Dürüst sınırlar:** her vaka sayfasında ayrı bölüm; stil olarak sade liste, uyarı kutusu değil.
- **Nav:** üstte sabit cam şerit. Ad solda; bölümler (okunanın altında çizgi), komut paleti (Ctrl K; dar ekranda menü
  düğmesi), dil ve tema sağda.
- **Lightbox:** yerel `<dialog>`, ok tuşlarıyla gezinme, Escape kapatır, odak geri döner.
- **Sahne:** `components/Sahne.tsx` (istemci; kaydırma dilimi → aktif proje), veri ve kareler sunucuda
  `components/Dizin.tsx`. Sabitlenen alanda `view()` kullanılmaz (yapışık öğe kımıldamaz, çizelge yarıda kalır);
  giriş hareketi bölümün çizelgesine (`--projeler`) bağlı. Sabitleme koşulu CSS ve `SABIT` sabitinde aynı.
- **Kart yığını:** `components/Sergi.tsx`; yapışık kart içindeki hareketler girişte biter (kart yapışınca `view()`
  durur). Kaplar `overflow: clip`: `hidden` kaydırma kabı sayılır, içerideki `view()` hiç ilerlemez.
- **Yöntem sahnesi:** `components/Yontem.tsx` (`yontem-iz` > `yontem-yapisik`); sabitleme yalnız animasyon
  desteği ve hareket izni varken, yoksa uzun boş kaydırma kalırdı.
- **Kaydırma hareketi (2026-10-21, Scryne: "scroll animasyonu olsun", "profesyonel ve eşsiz"):** CSS
  `animation-timeline` ile, yalnız transform / opacity / clip-path (başlıkta geniş ekranda `wdth` 70 → 125 yayılma;
  tek satır, alttakini itmez). Her hareket bir şey anlatır: hero geri çekilir (küre küçülür, metin daha hızlı
  kalkar); işler kartları aşağıdan gelir, ekran büyükten yerine oturur, sonraki kart binince alttaki geri çekilir;
  sahne kurulur, satırlar sırayla gelir;
  cetvelde "sonra" noktası "önce" halkasından kalkıp ölçülen yerine yürür; yöntem hattı çizilir, her adım hat ona
  ulaşınca gelir; vaka sayfasında nav altında 2px okuma çizgisi. Taban kurallar son hali taşır: hareket azaltmada
  ve desteklemeyen tarayıcıda her şey yerinde durur, okuma çizgisi hiç görünmez. `overflow:hidden` kap içindeki
  öğenin `view()` çizelgesi kaba göre ölçülür ve ilerlemez: kabın adlı çizelgesini kullan.


## Hareket ve etkileşim katmanı (2026-10-23, Scryne: "en profesyonel ve en eşsiz hale getir, animasyonlar, her şey sana bırakıyorum")

Her parça bir şey anlatır; süs için hareket yok. Hareket azaltmada ve desteklemeyen tarayıcıda hepsi düz çalışır.

- **Açılış.** Sayfa açılınca bir kez: hero'da rol etiketi, giriş cümlesi kelime kelime (26 ms arayla), sonra düğmeler;
  vaka sayfasında geri bağlantısı, alan, başlık cümlesi, künye ve yukarıdan perdeyle açılan kapak. ~1 sn.
- **Okuma.** Defterde ölçülen değer, kalem eski değeri çizip soluklaşma başladığında bir ölçü aletinin göstergesi gibi
  oturur: rakamlar ~0,6 sn taranır, soldan sağa sırayla durur (`components/OkumaDegeri.tsx`). Mono + tabular-nums:
  genişlik oynamaz; ekran okuyucu ve sunucu HTML'i hep gerçek değeri görür.
- **Sayfa geçişi.** React `<ViewTransition>` (`components/Gecis.tsx`). Vakaya giden bağlantı `ileri` (içerik sola
  kayar), ana sayfaya dönen `geri` (sağa), türsüz geçiş (dil, tarayıcının geri tuşu) yalnız soluklaşır; nav sabit
  dayanak. İmza: **projenin adı sayfalar arasında aynı nesne olarak uçar** (dizin satırı → vaka başlığı, "Sonraki
  proje" → bir sonraki vakanın başlığı). Bir sayfada her ad bir kez adlandırılır (Sergi kartındaki ad adsız).
  `html[data-scroll-behavior="smooth"]` şart: yoksa Next yeni sayfayı yumuşak kaydırmayla yukarı taşır.
- **Tema perdesi.** Yeni tema tıklanan noktadan dairesel kırpımla açılır (View Transitions, `lib/tema.ts`).
- **Komut paleti.** Ctrl/⌘ K ya da `/`: projeler, ana sayfa bölümleri, CV, e-posta kopyalama, tema, dil tek aramada;
  aksan ve büyük/küçük harf duyarsız (`components/Komut.tsx`). Dar ekranda nav bağlantıları gizli olduğundan menü
  düğmesi de bunu açar. Yüzey neredeyse opak cam: arkada hero metni olabilir.
- **Konum göstergeleri.** Nav'da okunan bölümün altında kayan mürekkep çizgi (vaka sayfasında "İşler"); vaka
  içindekilerinde sol çizgide okunan bölüme kayan imleç.
- **Küçükler.** Vaka sonunda sonraki projenin ekranı (üstüne gelince yükselir); lightbox'ta dokunmatik kaydırma, komşu
  karenin ön yüklenmesi, yönlü geçiş; e-posta satırında kopyala düğmesi; altbilgide başa dön ve Ctrl K ipucu; vaka
  sayfası için baskı stili (açık tema, adresler yazılır).

## Do's and Don'ts

- Kaynağı `_portfolyo/projeler/*.md` künyesinde olmayan sayıyı siteye koyma.
- `pen` rengini düğmede, bağlantıda ya da süslemede kullanma.
- UI metninde uzun tire (—) kullanma; nokta ya da virgül kullan.
- Emoji yok; ikonlar lucide.
- Gizli repoya bağlantı verme; "özel repo" yaz.
- Açılış hareketi yalnız "Açılış" kuralıyla (bir kez, ~1 sn, transform / opacity / clip-path). Kaydırmaya bağlı hareket
  yalnız yukarıdaki kurallarla; sürekli döngü, zıplama, yay yok.
- Yapışık (sticky) alanın içindeki öğeye `view()` çizelgesi verme; kabın adlı çizelgesine bağla.
- Aynı adlı iki `@keyframes` yazma: sonraki öncekini sessizce ezer (hero kartı bu yüzden 64px zıplıyordu).
