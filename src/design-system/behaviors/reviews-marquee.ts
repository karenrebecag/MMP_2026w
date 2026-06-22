// Marquee de reseñas scroll-driven (adaptación de MWG effect 087 a dos filas en sentidos
// opuestos): la sección se ancla (pin) y, al hacer scroll con scrub, la fila 1 viaja a la
// izquierda y la fila 2 a la derecha. Cada card, al entrar, se desplaza según la velocidad
// de su fila y vuelve a 0 (efecto de lag por velocidad del snippet original).

import { gsap, ScrollTrigger } from '../../core/motion/gsap-env';

type Tween = ReturnType<typeof gsap.to>;

const prefersReduced = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Clona la secuencia base hasta superar `minWidth` para dar recorrido horizontal al marquee
// (solo hay 4 cards por fila). Los clones se ocultan a lectores de pantalla.
function fillTrack(track: HTMLElement, minWidth: number): void {
  const base = Array.from(track.children);
  let guard = 0;
  while (track.scrollWidth < minWidth && guard++ < 20) {
    base.forEach((node) => {
      const clone = node.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }
}

export function initReviewsMarquee(scope: Element): void {
  const root = scope.querySelector<HTMLElement>('[data-aa-reviews]');
  if (!root) return;
  // Se ancla la sección completa (heading + filas), no solo el área de marquees.
  const pinTarget = root.closest<HTMLElement>('.aa-section--reviews') ?? root;
  const rows = Array.from(root.querySelectorAll<HTMLElement>('.aa-reviews__row'));
  const tracks = Array.from(root.querySelectorAll<HTMLElement>('.aa-reviews__track'));
  if (rows.length < 2 || tracks.length < 2) return;

  if (prefersReduced()) return; // sin pin ni movimiento: las filas quedan estáticas y visibles

  const vw = window.innerWidth;
  tracks.forEach((t) => fillTrack(t, vw * 2.4));

  const d0 = Math.max(0, tracks[0].scrollWidth - vw);
  const d1 = Math.max(0, tracks[1].scrollWidth - vw);
  const pinLen = Math.max(d0, d1);
  if (pinLen <= 0) return;

  // Fila 1 viaja ← (0 → -d0). Fila 2 arranca en -d1 y llega a 0 → viaja → (sentido opuesto).
  // Solo la fila 1 ancla la sección; ambas comparten start/end para ir sincronizadas.
  const tween0: Tween = gsap.to(tracks[0], {
    x: -d0,
    ease: 'none',
    scrollTrigger: {
      trigger: pinTarget,
      pin: true,
      scrub: true,
      start: 'top top',
      end: '+=' + pinLen,
    },
  });
  const tween1: Tween = gsap.fromTo(
    tracks[1],
    { x: -d1 },
    {
      x: 0,
      ease: 'none',
      scrollTrigger: { trigger: pinTarget, scrub: true, start: 'top top', end: '+=' + pinLen },
    },
  );

  // Velocidad por fila (px movidos entre ticks); alimenta el lag de cada card al entrar.
  let old0 = 0;
  let v0 = 0;
  let old1 = 0;
  let v1 = 0;
  const tick = (): void => {
    const c0 = gsap.getProperty(tracks[0], 'x') as number;
    v0 = c0 - old0;
    old0 = c0;
    const c1 = gsap.getProperty(tracks[1], 'x') as number;
    v1 = c1 - old1;
    old1 = c1;
  };

  const lag = (el: Element, v: number): void => {
    gsap.fromTo(el, { xPercent: -v * 3 }, { xPercent: 0, ease: 'power3.out', duration: 0.7 });
  };

  const wireRow = (track: HTMLElement, tween: Tween, vel: () => number): void => {
    track.querySelectorAll<HTMLElement>('.aa-reviews__card').forEach((card) => {
      const inner = card.firstElementChild;
      if (!inner) return;
      ScrollTrigger.create({
        trigger: card,
        containerAnimation: tween,
        start: 'left 100%',
        end: 'right 0%',
        onEnter: () => lag(inner, vel()),
        onEnterBack: () => lag(inner, vel()),
      });
    });
  };
  wireRow(tracks[0], tween0, () => v0);
  wireRow(tracks[1], tween1, () => v1);

  // El ticker de velocidad solo corre mientras la sección está en pantalla.
  ScrollTrigger.create({
    trigger: root,
    onEnter: () => gsap.ticker.add(tick),
    onLeave: () => gsap.ticker.remove(tick),
    onEnterBack: () => gsap.ticker.add(tick),
    onLeaveBack: () => gsap.ticker.remove(tick),
  });

  ScrollTrigger.refresh();
}
