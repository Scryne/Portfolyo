import type { Metadata } from 'next';
import { HERO, KISI } from '@/content/site';
import type { Dil, Proje } from './tipler';
import { yol } from './metin';
import { SITE_URL } from './site';

const ACIKLAMA = {
  tr: `${KISI.ad}: yazılım geliştirici. ${HERO.giris.tr}`,
  en: `${KISI.ad}: software developer. ${HERO.giris.en}`,
};

export function kokMeta(dil: Dil): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${KISI.ad} · ${HERO.ust[dil]}`, template: `%s · ${KISI.ad}` },
    description: ACIKLAMA[dil],
    authors: [{ name: KISI.ad, url: KISI.github }],
    creator: KISI.ad,
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: {
      type: 'website',
      siteName: KISI.ad,
      locale: dil === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: dil === 'tr' ? ['en_US'] : ['tr_TR'],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export function anaSayfaMeta(dil: Dil): Metadata {
  return {
    alternates: {
      canonical: yol.ana(dil),
      languages: { tr: yol.ana('tr'), en: yol.ana('en'), 'x-default': yol.ana('tr') },
    },
    openGraph: { url: yol.ana(dil), title: `${KISI.ad} · ${HERO.ust[dil]}`, description: ACIKLAMA[dil] },
  };
}

export function projeMeta(p: Proje, dil: Dil): Metadata {
  const baslik = `${p.ad}: ${p.baslik[dil]}`;
  return {
    title: p.ad,
    description: p.tekCumle[dil].replace(/[`*]/g, ''),
    alternates: {
      canonical: yol.proje(dil, p.slug),
      languages: { tr: yol.proje('tr', p.slug), en: yol.proje('en', p.slug), 'x-default': yol.proje('tr', p.slug) },
    },
    openGraph: { type: 'article', url: yol.proje(dil, p.slug), title: baslik, description: p.tekCumle[dil].replace(/[`*]/g, '') },
  };
}
