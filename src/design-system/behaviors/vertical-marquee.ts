// Marquee vertical: una tira de filas de texto que recorre en loop hacia arriba. La fila más
// cercana al centro del viewport va a opacidad plena; las demás se desvanecen por distancia
// (como el grow/squash del bottom-marquee, pero en 1D vertical y solo opacidad). El loop usa dos
// copias de la secuencia base → animar a -mitad encadena sin costura. prefers-reduced-motion →
// estático (sin animación, filas visibles). Engancha por [data-aa-vmarquee].

import { gsap } from '../../core/motion/gsap-env';

const SPEED = 16; // px/s — velocidad constante del scroll vertical (lento)
const FADE_FLOOR = 0; // opacidad mínima en los bordes (desvanecimiento lineal pleno)

const prefersReduced = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Repite la secuencia base hasta cubrir el viewport y la duplica. Devuelve la mitad (px).
function fillTrack(track: HTMLElement, minH: number): number {
  const base = Array.from(track.children);
  let guard = 0;
  while (track.scrollHeight < minH * 1.5 && guard++ < 20) {
    base.forEach((n) => track.appendChild(n.cloneNode(true)));
  }
  Array.from(track.children).forEach((n) => track.appendChild(n.cloneNode(true)));
  return track.scrollHeight / 2;
}

export function initVerticalMarquee(scope: Element): void {
  scope.querySelectorAll<HTMLElement>('[data-aa-vmarquee]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('.aa-vmarquee__track');
    if (!track) return;
    if (prefersReduced()) return; // estático y legible

    // El alto de las filas (texto) depende de la fuente; medir tras cargarla.
    const run = (): void => {
      const half = fillTrack(track, wrap.getBoundingClientRect().height || 1);
      if (!half) return;
      gsap.to(track, { y: -half, ease: 'none', duration: half / SPEED, repeat: -1 });

      const rows = Array.from(track.querySelectorAll<HTMLElement>('.aa-vmarquee__row'));
      // Centro de cada fila en coords de layout (offsetTop, estable frame a frame).
      const centers = rows.map((r) => r.offsetTop + r.offsetHeight / 2);
      const tick = (): void => {
        const vh = wrap.clientHeight;
        if (!vh) return;
        const ty = (gsap.getProperty(track, 'y') as number) || 0;
        const mid = vh / 2;
        rows.forEach((row, i) => {
          // Distancia al centro del viewport, normalizada → opacidad LINEAL centro→costados.
          const d = Math.min(Math.abs(centers[i] + ty - mid) / mid, 1);
          row.style.opacity = String(gsap.utils.interpolate(1, FADE_FLOOR, d));
        });
      };
      gsap.ticker.add(tick);
    };

    if (document.fonts?.ready) void document.fonts.ready.then(run);
    else run();
  });
}
