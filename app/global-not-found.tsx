import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { archivo, plexMono } from '@/lib/fontlar';

export const metadata: Metadata = {
  title: '404 · Berkay Karaca',
  robots: { index: false },
};

const TEMA_BETIGI = `(function(){try{var t=localStorage.getItem('tema');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

// Hangi dilde gelindiği bilinmez; iki dil birlikte.
export default function GlobalNotFound() {
  return (
    <html lang="tr" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEMA_BETIGI }} />
      </head>
      <body>
        <main className="izgara grid min-h-dvh place-items-center">
          <div className="kap py-24">
            <p className="okuma text-[clamp(4rem,14vw,10rem)] text-yazi-3">
              <del className="decoration-kalem decoration-4">200</del> <span className="text-murekkep">404</span>
            </p>
            <h1 className="gosterge mt-8 max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)]">Bu sayfa yok.</h1>
            <p className="mt-4 text-lg text-yazi-2" lang="en">
              This page does not exist.
            </p>
            <p className="mt-10 flex flex-wrap gap-6">
              <Link href="/" className="baglanti text-lg">
                Ana sayfaya dön
              </Link>
              <Link href="/en/" className="baglanti text-lg" lang="en" hrefLang="en">
                Go to the home page
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
