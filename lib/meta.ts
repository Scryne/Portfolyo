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

// Sayfa düzeyindeki openGraph kökteki nesneyi tümüyle ezer; ortak alanlar her sayfada yeniden verilir.
const kart = (dil: Dil, ad: string, alt: string) => {
  const gorsel = { url: `/og/${dil}/${ad}.png`, width: 1200, height: 630, alt };
  return {
    openGraph: {
      siteName: KISI.ad,
      locale: dil === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: dil === 'tr' ? ['en_US'] : ['tr_TR'],
      images: [gorsel],
    },
    twitter: { images: [gorsel] },
  };
};

/** Ana sayfadaki Person verisi: yalnız sayfada görünen bilgiler. */
export function kisiJsonLd(dil: Dil) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: KISI.ad,
    jobTitle: HERO.ust[dil],
    url: `${SITE_URL}${yol.ana(dil)}`,
    sameAs: [KISI.github, KISI.linkedin],
  };
}

export function anaSayfaMeta(dil: Dil): Metadata {
  const k = kart(dil, 'index', `${KISI.ad} · ${HERO.baslik[dil].join(' ')}`);
  return {
    alternates: {
      canonical: yol.ana(dil),
      languages: { tr: yol.ana('tr'), en: yol.ana('en'), 'x-default': yol.ana('tr') },
    },
    openGraph: { url: yol.ana(dil), title: `${KISI.ad} · ${HERO.ust[dil]}`, description: ACIKLAMA[dil], ...k.openGraph },
    twitter: { card: 'summary_large_image', title: `${KISI.ad} · ${HERO.ust[dil]}`, description: ACIKLAMA[dil], ...k.twitter },
  };
}

export function projeMeta(p: Proje, dil: Dil): Metadata {
  const baslik = `${p.ad}: ${p.baslik[dil]}`;
  const aciklama = p.tekCumle[dil].replace(/[`*]/g, '');
  const k = kart(dil, p.slug, baslik);
  return {
    title: p.ad,
    description: aciklama,
    alternates: {
      canonical: yol.proje(dil, p.slug),
      languages: { tr: yol.proje('tr', p.slug), en: yol.proje('en', p.slug), 'x-default': yol.proje('tr', p.slug) },
    },
    openGraph: { type: 'article', url: yol.proje(dil, p.slug), title: baslik, description: aciklama, ...k.openGraph },
    twitter: { card: 'summary_large_image', title: baslik, description: aciklama, ...k.twitter },
  };
}
