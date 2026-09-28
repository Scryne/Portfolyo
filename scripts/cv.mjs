// _portfolyo/cv/cikti/web → public/cv. Web sürümü telefonsuz ve e-postasız üretilir:
//   cd ../_portfolyo/cv && node olustur.mjs --web
import { copyFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const kok = path.resolve(import.meta.dirname, '..');
const kaynak = path.resolve(kok, '../_portfolyo/cv/cikti/web');
const hedef = path.join(kok, 'public/cv');
mkdirSync(hedef, { recursive: true });
for (const dil of ['TR', 'EN']) {
  const ad = `Berkay-Karaca-CV-${dil}.pdf`;
  copyFileSync(path.join(kaynak, ad), path.join(hedef, ad));
  console.log(`public/cv/${ad}`);
}
