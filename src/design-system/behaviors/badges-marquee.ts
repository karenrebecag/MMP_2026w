// Marquee infinito de badges (sección CAC): loop horizontal continuo a velocidad constante.
// Clona la secuencia base hasta cubrir el contenedor y la duplica para encadenar sin costuras.

import { gsap } from '../../core/motion/gsap-env';

const SPEED = 60; // px/s

const prefersReduced = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Rellena la base hasta superar el ancho visible y la duplica: con dos copias idénticas,
// animar a -mitad encadena el loop sin saltos. Devuelve esa mitad (px).
function fillTrack(track: HTMLElement, viewport: number): number {
  const base = Array.from(track.children);
  let guard = 0;
  while (track.scrollWidth < viewport && guard++ < 40) {
    base.forEach((n) => track.appendChild(n.cloneNode(true)));
  }
  Array.from(track.children).forEach((n) => {
    const clone = n.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  return track.scrollWidth / 2;
}

export function initBadgesMarquee(scope: Element): void {
  const wrap = scope.querySelector<HTMLElement>('[data-aa-badges-marquee]');
  if (!wrap) return;
  const track = wrap.querySelector<HTMLElement>('.aa-cac__track');
  if (!track) return;

  const distance = fillTrack(track, wrap.clientWidth);
  if (distance <= 0 || prefersReduced()) return; // estático y visible

  gsap.to(track, { x: -distance, ease: 'none', duration: distance / SPEED, repeat: -1 });
}
