import { archivo, plexMono } from '@/lib/fontlar';
import { M } from '@/lib/metin';
import type { Dil } from '@/lib/tipler';
import { Altbilgi } from './Altbilgi';
import { Nav } from './Nav';

// İlk boyamadan önce tema: kayıtlı tercih, yoksa sistem. Hata olursa CSS'teki
// prefers-color-scheme yedeği devrede kalır.
const TEMA_BETIGI = `(function(){try{var t=localStorage.getItem('tema');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export function KokDuzen({ dil, children }: { dil: Dil; children: React.ReactNode }) {
  return (
    <html lang={dil} className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- Pages Router kuralı; App Router kök layout'unda <head> geçerli */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEMA_BETIGI }} />
      </head>
      <body>
        <a
          href="#icerik"
          className="sr-only z-50 rounded-sm bg-murekkep px-4 py-2 text-murekkep-ustu focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {M.anaIcerigeGec[dil]}
        </a>
        <Nav dil={dil} />
        <main id="icerik">{children}</main>
        <Altbilgi dil={dil} />
      </body>
    </html>
  );
}
