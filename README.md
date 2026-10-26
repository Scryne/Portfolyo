# Portfolyo

https://scryne.github.io/ sitesinin kaynağı: iki dilli (TR `/`, EN `/en/`) statik portfolyo. Next.js 16 statik dışa
aktarım (`output: 'export'`), React 19, Tailwind 4. Bu repo private; public `Scryne/Scryne.github.io` reposunda
yalnız derlenmiş site durur.

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | `out/`'a derler; ardından `postbuild`: segment prefetch dosyalarını düzleştirir (`scripts/duzlestir.mjs`) ve her sayfanın 1200×630 OG kartını çizer (`scripts/og.mjs`, Playwright) |
| `npm run start` | `out/`'u yerelde sunar |
| `npm run lint` / `npm run tip` | ESLint / `tsc --noEmit` |
| `npm run tokens` | `DESIGN.md` → `app/tokens.css` |
| `npm run design:lint` | `DESIGN.md` doğrulaması |
| `npm run gorseller` | `../_portfolyo/ekranlar` → `public/g/<proje>/*.webp` + `lib/gorsel-manifest.json` |
| `npm run cv` | `../_portfolyo/cv/cikti` → `public/cv` (CV birebir aynı kalır) |
| `npm run yayinla` | Derler, `out/`'u `.yayin/` çalışma kopyasından `Scryne.github.io` `main` dalına iter (noreply kimlik) |

## Düzen

- `content/projeler/*.ts`: vaka sayfalarının künyesi, ölçüm cetvelleri ve sınırları (TR + EN). Kaynak malzeme
  `../_portfolyo/projeler/*.md` ve proje repolarının README'leri; her iddia yerel repoyla doğrulanıp yazılır.
- `app/(tr)` ve `app/(en)/en`: iki dilin rotaları (`/projeler/[slug]`, `/en/projects/[slug]`).
- `DESIGN.md`: tasarım kimliği ve token'lar (tek kaynak); `docs/`: fikir, final doküman, roadmap.

## Yayından önce

Kişisel veri istisnası yalnız bu site ve CV için geçerli (ad, e-posta, CV). `yayin-oncesi` taraması ve
`gorsel-dogrulama` (yerel + canlı) temiz olmadan `yayinla` koşulmaz.
