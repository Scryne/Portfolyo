/**
 * Sitenin kanonik adresi (GitHub Pages). OG, kanonik ve sitemap adresleri buradan türer. Varsayılan yayın
 * adresidir: düz `npm run build` de doğru adresli çıktı üretir. Başka bir alan adı için SITE_URL ver.
 */
export const SITE_URL = (process.env.SITE_URL ?? 'https://scryne.github.io').replace(/\/$/, '');

/**
 * İlk boyamadan önce tema: kayıtlı tercih, yoksa sistem. Hata olursa CSS'teki prefers-color-scheme yedeği
 * devrede kalır. Kök layout ve global 404 aynı betiği kullanır.
 */
export const TEMA_BETIGI = `(function(){try{var t=localStorage.getItem('tema');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;
