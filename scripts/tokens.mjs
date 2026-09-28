// DESIGN.md → app/tokens.css. design.md CLI çıktısını dosyaya yönlendirince Windows'ta boş
// dosya bırakıyor (süreç akış boşalmadan çıkıyor); bu yüzden çıktıyı burada yakalıyoruz.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const kok = path.resolve(import.meta.dirname, '..');
const cli = path.join(kok, 'node_modules/@google/design.md/dist/index.js');
const css = execFileSync(process.execPath, [cli, 'export', '--format', 'css-tailwind', 'DESIGN.md'], {
  cwd: kok,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
});
if (!css.includes('@theme')) throw new Error('design.md export beklenen çıktıyı vermedi');
writeFileSync(path.join(kok, 'app/tokens.css'), '/* Üretildi: npm run tokens (kaynak DESIGN.md). Elle düzenleme. */\n' + css);
console.log('app/tokens.css yazıldı');
