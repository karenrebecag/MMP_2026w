// Lottie lazy: monta animaciones [data-lottie] solo cuando se acercan al viewport.
// lottie-web se importa de forma dinámica DENTRO del observer → queda en un chunk aparte
// que solo se descarga si el usuario llega a la sección (no infla el entry).
//
// Los JSON se sirven desde R2 (no bundleados, no rutas relativas al host → evita 404 en jsDelivr/Webflow).

import { R2_MEDIA as R2 } from '../../core/config/assets';

const SOURCES: Record<string, string> = {
  'integrations-features': `${R2}/integrations-features.json`,
  'atom-logo': `${R2}/atom-logo.json`,
};

const prefersReduced = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export function initLottie(scope: Element): void {
  const nodes = Array.from(scope.querySelectorAll<HTMLElement>('[data-lottie]'));
  if (!nodes.length) return;

  const reduced = prefersReduced();
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        obs.unobserve(el);
        const path = SOURCES[el.getAttribute('data-lottie') ?? ''];
        if (!path) return;
        // fit: 'cover' (slice, llena y recorta) por defecto; 'contain' (meet, entero) para logos.
        const fit = el.getAttribute('data-lottie-fit') === 'contain' ? 'meet' : 'slice';
        void import('lottie-web').then(({ default: lottie }) => {
          lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop: !reduced, // reduced-motion: sin loop, queda en el primer frame
            autoplay: !reduced,
            path,
            rendererSettings: { preserveAspectRatio: `xMidYMid ${fit}` },
          });
        });
      });
    },
    { rootMargin: '200px' }, // precarga un poco antes de entrar
  );
  nodes.forEach((n) => io.observe(n));
}
