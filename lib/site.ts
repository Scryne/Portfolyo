/**
 * Sitenin kanonik adresi. Yayın yeri henüz seçilmedi (Roadmap Faz 6); seçilince derlemede
 * SITE_URL ortam değişkeni verilir. OG, kanonik ve sitemap adresleri buradan türer.
 */
export const SITE_URL = (process.env.SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
