// _portfolyo/cv/cikti → public/cv. Sitedeki CV başvuru sürümünün birebir aynısı (telefon dahil);
// Scryne kararı 2026-09-28: "CV aynı kalmalıydı". Önce: cd ../_portfolyo/cv && node olustur.mjs
import { copyFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const kok = path.resolve(import.meta.dirname, '..');
const kaynak = path.resolve(kok, '../_portfolyo/cv/cikti');
const hedef = path.join(kok, 'public/cv');
mkdirSync(hedef, { recursive: true });
for (const dil of ['TR', 'EN']) {
  const ad = `Berkay-Karaca-CV-${dil}.pdf`;
  copyFileSync(path.join(kaynak, ad), path.join(hedef, ad));
  console.log(`public/cv/${ad}`);
}
