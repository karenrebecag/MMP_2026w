// Marquee superior fijo — barra electric fina que funciona como botón de registro
// permanente (todo el bloque es <a href="#aa-waitlist">). Dos filas apiladas con loop
// horizontal infinito en sentidos opuestos; al hacer scroll ruedan verticalmente (efecto
// MWG024: una sale por arriba, la otra entra), atado al progreso con scrub.

import { gsap, ScrollTrigger } from '../../core/motion/gsap-env';

const PHRASE = 'Únete a la lista de espera';
const BASE_REPEAT = 4; // secuencia base; initMarquee la rellena hasta cubrir el viewport
const SPEED = 70; // px/s — velocidad constante del loop horizontal

function buildItem(): HTMLElement {
  const item = document.createElement('span');
  item.className = 'aa-marquee__item';
  const dot = document.createElement('span');
  dot.className = 'aa-marquee__dot';
  dot.setAttribute('aria-hidden', 'true');
  const text = document.createElement('span');
  text.className = 'aa-marquee__text';
  text.textContent = PHRASE;
  item.append(dot, text);
  return item;
}

function buildRow(modifier: '1' | '2'): HTMLElement {
  const row = document.createElement('div');
  row.className = `aa-marquee__row aa-marquee__row--${modifier}`;
  if (modifier === '2') row.setAttribute('aria-hidden', 'true');
  const track = document.createElement('div');
  track.className = 'aa-marquee__track';
  for (let i = 0; i < BASE_REPEAT; i++) track.appendChild(buildItem());
  row.appendChild(track);
  return row;
}

export function renderMarquee(root: Element): void {
  const bar = document.createElement('a');
  bar.className = 'aa-marquee';
  bar.href = '#aa-waitlist';
  bar.setAttribute('data-aa-marquee', '');
  bar.setAttribute('aria-label', PHRASE);

  const rows = document.createElement('div');
  rows.className = 'aa-marquee__rows';
  rows.append(buildRow('1'), buildRow('2'));

  bar.appendChild(rows);
  root.appendChild(bar);
}

const prefersReduced = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Rellena la secuencia base hasta superar el viewport y la duplica: con dos copias
// idénticas, animar a -mitad encadena el loop sin costuras. Devuelve esa mitad (px).
function fillTrack(track: HTMLElement): number {
  const base = Array.from(track.children);
  let guard = 0;
  while (track.scrollWidth < window.innerWidth && guard++ < 40) {
    base.forEach((n) => track.appendChild(n.cloneNode(true)));
  }
  Array.from(track.children).forEach((n) => {
    const clone = n.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  return track.scrollWidth / 2;
}

export function initMarquee(scope: Element): void {
  const bar = scope.querySelector<HTMLElement>('[data-aa-marquee]');
  if (!bar) return;
  const rows = Array.from(bar.querySelectorAll<HTMLElement>('.aa-marquee__row'));
  const tracks = Array.from(bar.querySelectorAll<HTMLElement>('.aa-marquee__track'));
  if (rows.length < 2 || tracks.length < 2) return;

  const distances = tracks.map(fillTrack);

  if (prefersReduced()) return; // sin movimiento: la fila 1 queda estática y visible

  // Loop horizontal infinito en sentidos opuestos (fila 1 ←, fila 2 →).
  gsap.to(tracks[0], {
    x: -distances[0],
    ease: 'none',
    duration: distances[0] / SPEED,
    repeat: -1,
  });
  gsap.fromTo(
    tracks[1],
    { x: -distances[1] },
    { x: 0, ease: 'none', duration: distances[1] / SPEED, repeat: -1 },
  );

  // Roll vertical atado al scroll: la fila 2 arranca abajo; el progreso de scroll sube
  // ambas filas 100% (fila 1 sale por arriba, fila 2 entra). Como el snippet original:
  // roll completo en ~1 viewport (end '+=100%'), ease power1.inOut, scrub 0.4.
  gsap.set(rows[1], { yPercent: 100 });
  gsap.to(rows, {
    yPercent: '-=100',
    ease: 'power1.inOut',
    scrollTrigger: { trigger: scope, start: 'top top', end: '+=100%', scrub: 0.4 },
  });

  ScrollTrigger.refresh();
}
