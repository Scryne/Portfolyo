/**
 * Tema değişimi. Destekleyen tarayıcıda yeni tema tıklanan noktadan dairesel bir perdeyle açılır (View
 * Transitions API); desteklemeyende ve hareket azaltmada anında değişir. Tema düğmesi ve komut paleti kullanır.
 */
export function temaDegistir(nokta?: { x: number; y: number }) {
  const kok = document.documentElement;
  const yeni = kok.dataset.theme === 'dark' ? 'light' : 'dark';
  const uygula = () => {
    kok.dataset.theme = yeni;
    try {
      localStorage.setItem('tema', yeni);
    } catch {
      // Gizli pencere ya da kapalı depolama: tercih yalnız bu sayfa için geçerli kalır.
    }
  };

  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return uygula();

  const x = nokta?.x ?? innerWidth - 40;
  const y = nokta?.y ?? 32;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  // Sayfa geçişlerinin kuralları (nav'ın sabit kalması) bu geçişte devre dışı: tüm sayfa birlikte açılsın.
  kok.dataset.vt = 'tema';
  const gecis = document.startViewTransition(uygula);
  gecis.ready
    .then(() =>
      kok.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 560, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
    .catch(() => {});
  gecis.finished.finally(() => delete kok.dataset.vt);
}
