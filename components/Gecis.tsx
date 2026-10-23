import { ViewTransition } from 'react';

/**
 * Sayfa geçişi. Vakaya giden bağlantılar `ileri`, ana sayfaya dönenler `geri` türü taşır (Link transitionTypes);
 * içerik o yöne kayarak değişir, nav yerinde kalır. Türsüz geçiş (dil anahtarı, tarayıcının geri tuşu) yalnız
 * çapraz soluklaşır. Animasyonlar globals.css'te, "Sayfa geçişi". Desteklemeyen tarayıcıda sayfa anında değişir.
 */
export function SayfaGecisi({ children }: { children: React.ReactNode }) {
  const tur = { ileri: 'ileri', geri: 'geri', default: 'sayfa' };
  return (
    <ViewTransition enter={tur} exit={tur} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/**
 * Projenin adı sayfalar arasında aynı nesne olarak taşınır: dizindeki satırdan vaka başlığına, vaka sonundaki
 * "Sonraki proje"den bir sonraki vakanın başlığına uçar. Bir sayfada her ad yalnız bir kez adlandırılır.
 */
export function ProjeAdi({ slug, children }: { slug: string; children: React.ReactElement }) {
  return (
    <ViewTransition name={`ad-${slug}`} share="ad" default="none">
      {children}
    </ViewTransition>
  );
}
