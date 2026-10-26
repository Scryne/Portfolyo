// Vitrin karelerini siteye hazırlar: _portfolyo/ekranlar → public/g/<proje>/<ad>-<genislik>.webp
// ve lib/gorsel-manifest.json (boyutlar + üretilen genişlikler).
//
//   node scripts/gorseller.mjs
//
// sharp çıktıya meta veri yazmaz (EXIF/XMP atılır). Kaynak kareler repoya girmez.

import sharp from 'sharp';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const KOK = path.resolve(import.meta.dirname, '..');
const KAYNAK = path.resolve(KOK, '../_portfolyo/ekranlar');
const HEDEF = path.join(KOK, 'public/g');
const GENISLIKLER = [800, 1400, 2200];

// proje → [hedef ad, kaynak yol (ekranlar/ altına göre)]. Sıra = galeri sırası; ilki kapak.
const SECIM = {
  citefield: [
    ['inceleme', 'Citefield/vitrin/inceleme.webp'],
    ['fatura', 'Citefield/vitrin/fatura.webp'],
    ['genel-bakis', 'Citefield/vitrin/genel-bakis.webp'],
    ['belgeler', 'Citefield/vitrin/belgeler.webp'],
    ['sema', 'Citefield/vitrin/sema.webp'],
    ['inceleme-koyu', 'Citefield/vitrin/inceleme-koyu.webp'],
    ['mobil', 'Citefield/vitrin/mobil.webp'],
  ],
  tenderiq: [
    ['inceleme', 'TenderIQ/vitrin/inceleme-vurgu.webp'],
    ['ihale', 'TenderIQ/vitrin/ihale-analiz.webp'],
    ['panel', 'TenderIQ/vitrin/panel.webp'],
    ['kullanim', 'TenderIQ/vitrin/kullanim.webp'],
    ['inceleme-koyu', 'TenderIQ/vitrin/inceleme-koyu.webp'],
    ['tanitim', 'TenderIQ/vitrin/tanitim.webp'],
  ],
  fabrikaos: [
    ['pano', 'FabrikaOS/vitrin/02-yonetim-panosu.webp'],
    ['lot', 'FabrikaOS/vitrin/03-lot-izlenebilirligi.webp'],
    ['pareto', 'FabrikaOS/vitrin/04-durus-pareto.webp'],
    ['ikiz', 'FabrikaOS/vitrin/08-dijital-ikiz.webp'],
    ['kiosk', 'FabrikaOS/vitrin/05-kiosk.webp'],
    ['harita', 'FabrikaOS/vitrin/07-cografi-harita.webp'],
    ['kanban', 'FabrikaOS/vitrin/06-is-emri-kanban.webp'],
    ['tahmin', 'FabrikaOS/vitrin/09-ai-tahminleri.webp'],
    ['platform', 'FabrikaOS/vitrin/11-platform-tenant.webp'],
    ['kvkk', 'FabrikaOS/vitrin/10-kvkk.webp'],
    ['mobil', 'FabrikaOS/vitrin/13-mobil-pano.webp'],
  ],
  aegis: [
    ['eslesme', 'AEGIS/vitrin/03-screening-confirmed.webp'],
    ['pano', 'AEGIS/vitrin/02-dashboard.webp'],
    ['elenen', 'AEGIS/vitrin/06-screening-dismissed.webp'],
    ['varlik', 'AEGIS/vitrin/04-entity.webp'],
    ['denetim-izi', 'AEGIS/vitrin/05-audit.webp'],
    ['mobil', 'AEGIS/vitrin/08-mobile-dashboard.webp'],
  ],
  ghostbuilding: [
    ['bulgu', 'GhostBuilding/vitrin/04-bulgu-ile-longue.webp'],
    ['esri', 'GhostBuilding/vitrin/03-ile-longue-uydu.webp'],
    ['maptiler', 'GhostBuilding/vitrin/03b-ile-longue-maptiler.webp'],
    ['karsilastir', 'GhostBuilding/vitrin/05-karsilastir-avord.webp'],
    ['avrupa', 'GhostBuilding/vitrin/01-avrupa-bulgu.webp'],
    ['mobil', 'GhostBuilding/vitrin/07-mobil-bulgu.webp'],
  ],
  osintlab: [
    ['calisma-alani', 'OsintLab/vitrin/01-ana-calisma-alani.webp'],
    ['graf', 'OsintLab/vitrin/02-bilgi-grafi.webp'],
    ['olay', 'OsintLab/vitrin/05-olay-celiski.webp'],
    ['dogrulama', 'OsintLab/vitrin/06-bagimsiz-dogrulama.webp'],
    ['sorusturma', 'OsintLab/vitrin/03-sorusturma.webp'],
    ['entity', 'OsintLab/vitrin/04-entity-zaman-cizelgesi.webp'],
    ['arsiv', 'OsintLab/vitrin/08-kaynak-arsivi.webp'],
    ['mobil', 'OsintLab/vitrin/11-mobil-olay.webp'],
  ],
  politikdesk: [
    ['olay', 'PolitikDesk/vitrin/olay.webp'],
    ['kumanda', 'PolitikDesk/vitrin/kumanda.webp'],
    ['gundem', 'PolitikDesk/vitrin/gundem.webp'],
    ['olay-koyu', 'PolitikDesk/vitrin/olay-koyu.webp'],
  ],
  wartrack: [
    ['pano', 'Wartrack/vitrin/pano.webp'],
    ['durum-ozeti', 'Wartrack/vitrin/durum-ozeti.webp'],
    ['katmanlar', 'Wartrack/vitrin/harita-katmanlar.webp'],
    ['kritik', 'Wartrack/vitrin/kritik-olaylar.webp'],
    ['nokta', 'Wartrack/vitrin/harita-nokta.webp'],
    ['mobil', 'Wartrack/vitrin/mobil.webp'],
  ],
  mythatlas: [
    ['harita', 'MythAtlas/sonra/shot_map.png'],
    ['zeus', 'MythAtlas/sonra/shot_deity_zeus.png'],
    ['abu-simbel', 'MythAtlas/sonra/shot_site_abu-simbel.png'],
    ['gilgamis', 'MythAtlas/sonra/shot_myth_gilgamesh-quest.png'],
    ['soy-agaci', 'MythAtlas/sonra/shot_family-tree.png'],
    ['arkeoloji', 'MythAtlas/sonra/shot_archaeology.png'],
  ],
  kokpit: [
    ['pano', 'Kokpit/v25/pano.png'],
    ['ada-cevap', 'Kokpit/v25/ada-cevap.png'],
    ['ada-goz', 'Kokpit/v25/ada-goz.png'],
    ['saglik', 'Kokpit/v25/saglik.png'],
  ],
  yapirisk: [
    ['sonuc', 'YapiRisk/vitrin/sonuc.png'],
    ['form', 'YapiRisk/vitrin/form.png'],
    ['harita', 'YapiRisk/vitrin/harita.png'],
    ['rapor', 'YapiRisk/vitrin/rapor-ust.png'],
    ['yontem', 'YapiRisk/vitrin/yontem.png'],
    ['mobil', 'YapiRisk/vitrin/mobil-form.png'],
  ],
};

const manifest = {};
let toplam = 0;

for (const [proje, liste] of Object.entries(SECIM)) {
  await mkdir(path.join(HEDEF, proje), { recursive: true });
  for (const [ad, kaynak] of liste) {
    const girdi = path.join(KAYNAK, kaynak);
    const meta = await sharp(girdi).metadata();
    const genislikler = GENISLIKLER.filter((g) => g < meta.width * 0.85);
    genislikler.push(Math.min(meta.width, 2880));
    const benzersiz = [...new Set(genislikler)].sort((a, b) => a - b);
    for (const g of benzersiz) {
      const cikti = path.join(HEDEF, proje, `${ad}-${g}.webp`);
      await sharp(girdi).resize({ width: g }).webp({ quality: 80, effort: 5 }).toFile(cikti);
      toplam += (await stat(cikti)).size;
    }
    // Bulanık ön izleme yerine kareye yakın bir zemin rengi: yükleme sırasında boş kutu parlamasın.
    const { dominant } = await sharp(girdi).stats();
    manifest[`${proje}/${ad}`] = {
      w: meta.width,
      h: meta.height,
      genislikler: benzersiz,
      zemin: `rgb(${dominant.r} ${dominant.g} ${dominant.b})`,
    };
  }
  console.log(`${proje}: ${liste.length} kare`);
}

await writeFile(path.join(KOK, 'lib/gorsel-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`toplam ${(toplam / 1024 / 1024).toFixed(1)} MB`);
