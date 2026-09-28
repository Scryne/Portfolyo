import localFont from 'next/font/local';

// Kendi sunucumuzdan, siteye göre küçültülmüş dosyalar (bkz. app/fonts/OKU-BENI.md).
// Archivo'nun `wdth` ekseni tipografinin imzası: başlıklar geniş kesimde (bkz. DESIGN.md).
export const archivo = localFont({
  src: '../app/fonts/Archivo-tr.woff2',
  weight: '400 800',
  style: 'normal',
  variable: '--font-archivo',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '100% 125%' }],
});

export const plexMono = localFont({
  src: [
    { path: '../app/fonts/IBMPlexMono-400-tr.woff2', weight: '400', style: 'normal' },
    { path: '../app/fonts/IBMPlexMono-500-tr.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-plex-mono',
  display: 'swap',
});
