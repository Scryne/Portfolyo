# Fontlar

Archivo (değişken, `wdth` + `wght`) ve IBM Plex Mono, Google Fonts reposundan (OFL 1.1) alınıp
bu siteye göre küçültüldü. Mobil LCP'yi font yüklemesi belirliyordu: next/font/google'ın
latin + latin-ext dosyaları toplam ~214 KB'tı, bunlar ~75 KB.

- Eksenler: Archivo `wdth` 100–125, `wght` 400–800 (sitede kullanılan aralık).
- Karakterler: Basic Latin, Latin-1, Türkçe (Ğğ İı Şş), tırnaklar, tire, ok, ₺.

Yeni bir karakter (ör. Lehçe, Almanca ß dışı) içeriğe girerse kaynaktan yeniden üret:

```bash
U="U+0020-007E,U+00A0-00FF,U+011E-011F,U+0130-0131,U+015E-015F,U+2013-2014,U+2018-201D,U+2022,U+2026,U+20BA,U+2192,U+2212"
uv run --no-project --with fonttools --with brotli python -m fontTools.varLib.instancer "Archivo[wdth,wght].ttf" wdth=100:125 wght=400:800 -o a.ttf
uv run --no-project --with fonttools --with brotli pyftsubset a.ttf --unicodes="$U" --layout-features='kern,liga,calt,tnum,case,ccmp,locl,mark,mkmk' --flavor=woff2 --output-file=Archivo-tr.woff2
```

Kaynaklar: github.com/google/fonts `ofl/archivo/Archivo[wdth,wght].ttf`, `ofl/ibmplexmono/IBMPlexMono-{Regular,Medium}.ttf`.
