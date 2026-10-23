import { archivo, plexMono } from '@/lib/fontlar';
import { M } from '@/lib/metin';
import { TEMA_BETIGI } from '@/lib/site';
import type { Dil } from '@/lib/tipler';
import { Altbilgi } from './Altbilgi';
import { Nav } from './Nav';

export function KokDuzen({ dil, children }: { dil: Dil; children: React.ReactNode }) {
  // data-scroll-behavior: Next sayfa değişiminde yumuşak kaydırmayı kapatsın; yoksa yeni sayfa yukarı kayarak gelir.
  return (
    <html lang={dil} data-scroll-behavior="smooth" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
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
