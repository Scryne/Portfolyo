import { Archivo, IBM_Plex_Mono } from 'next/font/google';

// next/font dosyaları derlemede indirip bizim sunucumuzdan verir; çalışma anında Google'a istek yok.
// Archivo'nun `wdth` ekseni tipografinin imzası: başlıklar geniş kesimde (bkz. DESIGN.md).
export const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});
