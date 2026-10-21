// Atlas haritası: noktalı dünya haritasını ve her projenin iğnesini lib/harita.json'a yazar.
//
//   node scripts/harita.mjs
//
// Derlemede değil elle çalışır (gorseller.mjs gibi); çıktı repoya girer, site çalışırken hesap yok.
// Konumlar küreyle aynı kaynaktan: content/site.ts → KURE (slug + konum). Hero küresi projeleri 3B'de
// gösterir, atlas aynı yerleri düz izdüşümde: Equal Earth (alanlar doğru, kıtalar tanıdık).
// dotted-map (MIT) yalnız bu betikte; siteye girmez.

import DottedMap from 'dotted-map';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const KOK = path.resolve(import.meta.dirname, '..');
const site = readFileSync(path.join(KOK, 'content/site.ts'), 'utf8');

// KURE dizisindeki her kayıt: slug: '...', ... konum: [enlem, boylam]
const kure = site.slice(site.indexOf('export const KURE'), site.indexOf('export const DEFTER'));
const kayitlar = [...kure.matchAll(/slug: '([a-z]+)'[\s\S]*?konum: \[(-?[\d.]+), (-?[\d.]+)\]/g)].map((m) => ({
  slug: m[1],
  enlem: Number(m[2]),
  boylam: Number(m[3]),
}));
if (kayitlar.length < 10) throw new Error('KURE okunamadı: ' + kayitlar.length + ' kayıt');

const harita = new DottedMap({
  height: 64,
  grid: 'diagonal',
  projection: { name: 'equalEarth' },
  // Antarktika ve kuzey buzulları atlasın işine yaramıyor; yer kaplıyordu.
  region: { lat: { min: -56, max: 78 }, lng: { min: -180, max: 180 } },
});
const noktalar = harita.getPoints().map((p) => [Math.round(p.x * 100) / 100, Math.round(p.y * 100) / 100]);
const { width, height } = harita.image;

// İğneler ızgaraya yapıştırılmaz: kaba ızgarada Türkiye'deki altı proje iki noktaya çöküyordu. Equal
// Earth ileri formülü (Šavrič, Patterson, Jenny 2018) ile tam yer; kütüphanenin ızgarasıyla yarım
// adım içinde örtüştüğü ölçüldü (2026-10-21).
const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2;
const ee = (enlem, boylam) => {
  const t = Math.asin(M * Math.sin((enlem * Math.PI) / 180));
  const t2 = t * t, t6 = t2 * t2 * t2;
  return [((boylam * Math.PI) / 180) * Math.cos(t) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2))), t * (A1 + A2 * t2 + t6 * (A3 + A4 * t2))];
};
const [xMin] = ee(0, -180), [xMax] = ee(0, 180), [, yMin] = ee(-56, 0), [, yMax] = ee(78, 0);
const pinler = {};
for (const k of kayitlar) {
  const [x, y] = ee(k.enlem, k.boylam);
  pinler[k.slug] = [Math.round(((x - xMin) / (xMax - xMin)) * width * 100) / 100, Math.round(((yMax - y) / (yMax - yMin)) * height * 100) / 100];
}
const genislik = Math.round(width * 100) / 100;
const yukseklik = Math.round(height * 100) / 100;
// Noktalar statik SVG'ye: sayfada CSS maskesi olarak kullanılır (renk temadan gelir, dosya önbellekte
// kalır, HTML'e 3 bin nokta gömülmez). Tek yol, her nokta sıfır uzunluklu yuvarlak uçlu çizgi.
const cizim = noktalar.map(([x, y]) => `M${x} ${y}h0`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${genislik} ${yukseklik}"><path d="${cizim}" stroke="#000" stroke-width=".62" stroke-linecap="round"/></svg>\n`;
writeFileSync(path.join(KOK, 'public/harita.svg'), svg);

// Vaka sayfasındaki yakın kesit için sık harita: aynı izdüşüm ve bölge, 2,5 kat yoğun. Kaba haritada
// 4× yakınlaşınca noktalar iri bir ızgaraya dönüşüp coğrafya okunmuyordu. Yalnız vaka sayfaları yükler.
const sik = new DottedMap({ height: 160, grid: 'diagonal', projection: { name: 'equalEarth' }, region: { lat: { min: -56, max: 78 }, lng: { min: -180, max: 180 } } });
const sikG = Math.round(sik.image.width * 100) / 100;
const sikY = Math.round(sik.image.height * 100) / 100;
if (Math.abs(sikG / sikY - width / height) > 0.01) throw new Error('sık haritanın oranı farklı: iğneler kayar');
const sikCizim = sik.getPoints().map((p) => `M${Math.round(p.x * 10) / 10} ${Math.round(p.y * 10) / 10}h0`).join('');
writeFileSync(path.join(KOK, 'public/harita-sik.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sikG} ${sikY}"><path d="${sikCizim}" stroke="#000" stroke-width=".62" stroke-linecap="round"/></svg>\n`);
// İğneler yüzde olarak: bileşen haritayı herhangi bir boyda çizer, iğneyi aynı orana koyar.
const yuzde = Object.fromEntries(
  Object.entries(pinler).map(([slug, [x, y]]) => [slug, [Math.round((x / genislik) * 10000) / 100, Math.round((y / yukseklik) * 10000) / 100]]),
);
writeFileSync(path.join(KOK, 'lib/harita.json'), JSON.stringify({ oran: Math.round((genislik / yukseklik) * 10000) / 10000, pinler: yuzde }, null, 2) + '\n');
console.log(`harita: ${noktalar.length} nokta (${Math.round(svg.length / 1024)} KB), ${Object.keys(pinler).length} iğne, ${genislik}×${yukseklik}`);
