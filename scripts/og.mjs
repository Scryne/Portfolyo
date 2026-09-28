// Derleme sonrası: her sayfa için 1200×630 Open Graph kartı → out/og/ ve public/og/.
// Kartlar sitenin kendi derlenmiş CSS'i ve fontlarıyla (Archivo'nun geniş kesimi dahil) çizilir;
// next/og (satori) değişken font eksenini desteklemediği için Playwright kullanılıyor.
// İçerik TS dosyalarından okunur (Node'un yerleşik tip ayıklaması).
import { chromium } from 'playwright-core';
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const KOK = path.resolve(import.meta.dirname, '..');
const OUT = path.join(KOK, 'out');
const CHUNKS = path.join(OUT, '_next/static/chunks');
const css = readdirSync(CHUNKS)
  .filter((f) => f.endsWith('.css'))
  .map((f) => path.join(CHUNKS, f))
  .find((f) => readFileSync(f, 'utf8').includes('--font-archivo'));
if (!css) throw new Error('Derlenmiş CSS bulunamadı; önce next build');
// next/font aile adlarını derlenmiş CSS'ten al (kartta sitedeki fontlar kullanılsın).
const cssMetni = readFileSync(css, 'utf8');
const degisken = (ad) => cssMetni.match(new RegExp(ad + ':([^;}]+)'))?.[1] ?? 'sans-serif';

const SLUGLAR = ['tenderiq', 'fabrikaos', 'aegis', 'ghostbuilding', 'wartrack', 'osintlab', 'politikdesk', 'mythatlas', 'kokpit'];
const projeler = await Promise.all(
  SLUGLAR.map(async (s) => Object.values(await import(pathToFileURL(path.join(KOK, `content/projeler/${s}.ts`)).href))[0]),
);
const { HERO, KISI } = await import(pathToFileURL(path.join(KOK, 'content/site.ts')).href);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sayisal = (s) => /^[\d.,%/ ]+$/.test(s);

function kart({ ust, baslik, alt, olcum, buyuk, adsiz = false }) {
  const satir = olcum
    ? `<div class="olcum"><span class="ne">${esc(olcum.ne)}</span><span class="deger">${
        olcum.once ? `<s>${esc(olcum.once)}</s> ` : ''
      }<b>${esc(olcum.sonra)}</b></span></div>`
    : '';
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${pathToFileURL(css).href}">
<style>
  :root { --font-archivo: ${degisken('--font-archivo')}; --font-plex-mono: ${degisken('--font-plex-mono')}; }
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body { display: flex; flex-direction: column; justify-content: space-between; padding: 64px 72px 60px;
         box-sizing: border-box; background-color: var(--zemin); }
  .ust { font: 500 22px/1 var(--font-sans); font-variation-settings: 'wdth' 112; color: var(--yazi-2); }
  .ust b { color: var(--yazi); font-weight: 650; }
  h1 { margin: 0; font-family: var(--font-sans); font-variation-settings: 'wdth' 125; font-weight: 760;
       letter-spacing: -0.025em; line-height: 0.96; color: var(--yazi); font-size: ${buyuk ? 104 : 118}px; }
  h1 em { font-style: normal; color: var(--murekkep); display: block; }
  h1 em.rol { font-size: 0.52em; font-variation-settings: 'wdth' 112; font-weight: 650; letter-spacing: -0.015em; margin-top: 0.35em; }
  p { margin: 22px 0 0; font: 400 30px/1.3 var(--font-sans); font-variation-settings: 'wdth' 106;
      color: var(--yazi-2); max-width: 30ch; }
  .olcum { display: flex; justify-content: space-between; align-items: baseline; border-top: 2px solid var(--cizgi-guclu); padding-top: 22px; }
  .ne { font: 400 24px/1.2 var(--font-sans); color: var(--yazi-2); }
  .deger { font: 500 52px/1 var(--font-mono); letter-spacing: -0.02em; }
  .deger s { color: var(--yazi-3); text-decoration-color: var(--kalem); text-decoration-thickness: 4px; }
  .deger b { font-weight: 500; color: var(--murekkep); }
</style></head>
<body class="izgara">
  <div class="ust">${adsiz ? '' : `<b>${esc(KISI.ad)}</b> · `}${esc(ust)}</div>
  <div><h1>${baslik}</h1>${alt ? `<p>${esc(alt)}</p>` : ''}</div>
  ${satir || '<div></div>'}
</body></html>`;
}

const isler = [];
for (const dil of ['tr', 'en']) {
  isler.push({
    ad: `${dil}/index`,
    html: kart({ ust: dil === 'tr' ? 'Portfolyo' : 'Portfolio', baslik: `${esc(KISI.ad)}<em class="rol">${esc(HERO.ust[dil])}</em>`, buyuk: true, adsiz: true,
      olcum: { ne: dil === 'tr' ? 'Wartrack · çekilen RSS kaynağı' : 'Wartrack · RSS feeds fetched', once: '0/15', sonra: '15/15' } }),
  });
  for (const p of projeler) {
    const o = p.olcumler.find((x) => x.once && sayisal(x.once[dil]) && sayisal(x.sonra[dil])) ?? p.olcumler.find((x) => x.cetvel);
    isler.push({
      ad: `${dil}/${p.slug}`,
      html: kart({
        ust: p.alan[dil],
        baslik: esc(p.ad),
        alt: p.baslik[dil],
        olcum: o && { ne: o.ne[dil], once: o.once?.[dil], sonra: o.sonra[dil] },
      }),
    });
  }
}

const tarayici = await chromium.launch(process.env.OG_TARAYICI ? { executablePath: process.env.OG_TARAYICI } : { channel: 'msedge' });
const sayfa = await tarayici.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light' });
const gecici = path.join(OUT, '_og.html');
for (const is of isler) {
  writeFileSync(gecici, is.html);
  await sayfa.goto(pathToFileURL(gecici).href);
  await sayfa.evaluate(() => document.fonts.ready);
  for (const kok of [OUT, path.join(KOK, 'public')]) mkdirSync(path.join(kok, 'og', path.dirname(is.ad)), { recursive: true });
  const hedef = path.join(OUT, 'og', `${is.ad}.png`);
  await sayfa.screenshot({ path: hedef });
  copyFileSync(hedef, path.join(KOK, 'public/og', `${is.ad}.png`));
}
await tarayici.close();
(await import('node:fs')).rmSync(gecici);
console.log(`og kartı: ${isler.length}`);
