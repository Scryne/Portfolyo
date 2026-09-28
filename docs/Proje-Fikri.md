---
proje: Portfolyo
created: 2026-09-28
type: proje-fikri
status: onaylandi
---
# Portfolyo — Proje Fikri

## Problem

Berkay Karaca'nın (GitHub'da "Scryne") dokuz projesi var: çok kiracılı SaaS, belge yapay zekâsı,
OSINT ve endüstriyel yazılım. Çoğu gizli repoda duruyor, hiçbirinin barındırılan bir demosu yok.
Bir işe alım mühendisi bu işi ancak tek bir sayfadan, birkaç dakikada görebilir. CV tek sayfaya
beş projeyi sığdırıyor; neyin nasıl kurulduğunu, ekranları ve sınırları göstermiyor.

İşin asıl ayırt edici yanı da CV'de görünmüyor: projeler yapay zekâ kodlama ajanlarıyla hızlı
kuruldu, sonra Eylül 2026'da tek tek yeniden **ölçüldü**. Denetimde ölçülen önce/sonra değerleri
kayıtlı: Wartrack RSS 0/15 → 15/15, GhostBuilding sıradan konumda yanlış alarm 39/40 → 0/7,
MythAtlas kaynak 1.826 → 274. Portfolyonun tezi bu olmalı.

## Hedef Kullanıcı

1. **İşe alım yapan mühendis / teknik lider** (TR ve yurt dışı): 60 saniyede "bu kişi gerçek
   sistemler kuruyor ve yapay zekâ çıktısını doğrulayabiliyor" kanısına varmalı, sonra bir
   vaka çalışmasına inebilmeli.
2. **İK / ilk eleme**: CV'yi (TR/EN PDF) tek tıkla indirebilmeli, iletişim yolunu bulabilmeli.

## Temel Özellikler (v1)

- İki dil: Türkçe (`/`) ve İngilizce (`/en/`), her sayfanın karşılığı var.
- Ana sayfa: tez + Eylül 2026 denetiminden ölçülmüş önce/sonra değerleri, seçilmiş projeler,
  tam proje dizini, çalışma yöntemi, CV ve iletişim.
- Dokuz proje için vaka sayfası: künye (dönem, durum, repo, stack, ölçek), problem, ne yapıyor,
  ölçümler, yapay zekânın nasıl kullanıldığı, tasarım, dürüst sınırlar, ekran galerisi.
- CV PDF'leri indirilebilir.
- Açık/koyu tema, mobil öncelikli, erişilebilir, hızlı (statik).

## Kapsam Dışı

- Blog, CMS, iletişim formu (sunucu gerektirir), analitik/izleme çerezleri.
- Canlı demo gömme (projelerin barındırılan demosu yok).

## Kararlar (Scryne, 2026-09-28)

- Sitede ad yazar ("Berkay Karaca"). GitHub kimliği "Scryne" olarak kalır, siteden bağlanır.
- Tasarım: "son derece profesyonel ve eşsiz". Yetki tamamen Aria'da.

## Açık Sorular

- Sitedeki CV PDF'inde telefon, e-posta ve okul kalsın mı? (Kurallar: herkese açık yüzeyde
  kişisel veri yok; ad için açık onay var, diğerleri için yok.) Varsayılan: web sürümü telefonsuz
  ve e-postasız üretilir, okul CV'nin eğitim bölümünde durur. Scryne'a sorulacak.
- Yayın yeri ve alan adı (GitHub Pages / Cloudflare Pages / Vercel). Yayın dışarı çıkan bir iş,
  onaysız yapılmaz.
