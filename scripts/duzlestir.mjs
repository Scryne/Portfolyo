// Derleme sonrası: Next 16.3 statik export segment prefetch dosyalarını klasör olarak yazıyor
// (`__next.!X/en/projects/$d$slug/__PAGE__.txt`), istemci ise noktayla birleşmiş düz ad istiyor
// (`__next.!X.en.projects.$d$slug.__PAGE__.txt`). Statik sunucuda bu 404 ve konsol hatası demek.
// Her dosyanın düz adlı kopyasını yanına yazarız; klasörler de kalır.
import { copyFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '../out');
let sayi = 0;

function dosyalar(dizin) {
  return readdirSync(dizin).flatMap((ad) => {
    const tam = path.join(dizin, ad);
    return statSync(tam).isDirectory() ? dosyalar(tam) : [tam];
  });
}

function gez(dizin) {
  for (const ad of readdirSync(dizin)) {
    const tam = path.join(dizin, ad);
    if (!statSync(tam).isDirectory()) continue;
    if (ad.startsWith('__next.')) {
      for (const d of dosyalar(tam)) {
        const goreli = path.relative(tam, d).split(path.sep).join('.');
        copyFileSync(d, path.join(dizin, `${ad}.${goreli}`));
        sayi++;
      }
    } else if (ad !== '_next' && ad !== 'g') {
      gez(tam);
    }
  }
}

gez(OUT);
console.log(`segment dosyası düzleştirildi: ${sayi}`);
