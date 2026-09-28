// GitHub Pages yayını: derler, out/ içeriğini ayrı bir git çalışma kopyasına (.yayin/) koyar,
// github.com/Scryne/Scryne.github.io main dalına iter. Kaynak kod yayınlanmaz; public repoda
// yalnız derlenmiş site durur. Commit kimliği noreply (kişisel e-posta geçmişe girmez).
//
//   node scripts/yayinla.mjs            → derle + it
//   node scripts/yayinla.mjs --kuru     → derle + commit hazırla, itme
import { execFileSync, execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const KOK = path.resolve(import.meta.dirname, '..');
const YAYIN = path.join(KOK, '.yayin');
const REPO = 'https://github.com/Scryne/Scryne.github.io.git';
const SITE_URL = 'https://scryne.github.io';
const KIMLIK = ['-c', 'user.name=Scryne', '-c', 'user.email=218348029+Scryne@users.noreply.github.com'];
const kuru = process.argv.includes('--kuru');

const git = (...a) => execFileSync('git', a, { cwd: YAYIN, encoding: 'utf8' }).trim();

execSync('npm run build', { cwd: KOK, stdio: 'inherit', env: { ...process.env, SITE_URL } });

if (!existsSync(path.join(YAYIN, '.git'))) {
  mkdirSync(YAYIN, { recursive: true });
  git('init', '-q', '-b', 'main');
  git('remote', 'add', 'origin', REPO);
  // Derlenmiş dosyalar olduğu gibi gitsin; Windows'un CRLF dönüşümü devre dışı.
  git('config', 'core.autocrlf', 'false');
}
// Çalışma kopyasını out/ ile birebir eşle (.git hariç her şeyi sil, sonra kopyala).
for (const ad of readdirSync(YAYIN)) if (ad !== '.git') rmSync(path.join(YAYIN, ad), { recursive: true, force: true });
cpSync(path.join(KOK, 'out'), YAYIN, { recursive: true });

git('add', '-A');
if (!git('status', '--porcelain')) {
  console.log('Değişiklik yok, yayın atlandı.');
  process.exit(0);
}
const kaynak = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: KOK, encoding: 'utf8' }).trim();
execFileSync('git', [...KIMLIK, 'commit', '-q', '-m', `Yayın: Portfolyo ${kaynak}`], { cwd: YAYIN, stdio: 'inherit' });
if (kuru) {
  console.log('Kuru koşu: commit hazır, itilmedi (.yayin/).');
} else {
  execFileSync('git', ['push', '-q', 'origin', 'main'], { cwd: YAYIN, stdio: 'inherit' });
  console.log(`Yayında: ${SITE_URL}/ (Pages derlemesi 1-2 dk sürer)`);
}
