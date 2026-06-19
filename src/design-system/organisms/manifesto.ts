// Sección "manifesto": copy centrada + avatar-bubbles flotantes (preguntas de prospectos)
// en dos bandas (superior/inferior) para no solapar el texto. Rotación + jitter dan el
// look flotante; el momentum-hover (inertia) las hace reaccionar al cursor.

import { renderEyebrow, renderHeading } from '../atoms/text';
import type { ManifestoContent } from '../../content';

import { manifestoShots, avatars as AVATARS } from '../../assets/r2';

const { top: shotTop, bottom: shotBottom } = manifestoShots;

// Rotación leve + desplazamiento vertical (em) para que cada burbuja flote distinto.
const TILT: { rot: number; dy: number }[] = [
  { rot: -7, dy: 0 },
  { rot: 4, dy: 2.6 },
  { rot: -3, dy: 0.8 },
  { rot: 5, dy: 3.4 },
  { rot: -6, dy: 0.4 },
  { rot: 5, dy: 0.4 },
  { rot: -5, dy: 2.4 },
  { rot: 6, dy: 0.8 },
  { rot: -4, dy: 3 },
  { rot: 7, dy: 1.2 },
];

function bubbleItem(
  data: ManifestoContent['bubbles'][number],
  avatar: string,
  tilt: { rot: number; dy: number },
  index: number,
): HTMLElement {
  // Externo: target del reveal (data-aa-fade anima opacity/y).
  const item = document.createElement('div');
  item.className = `aa-mw__item aa-mw__item--${data.kind}`;
  item.setAttribute('data-aa-fade', '');
  item.setAttribute('data-aa-delay', `${(index % 5) * 0.06}`);
  item.setAttribute('aria-hidden', 'true');

  // Rotación + jitter estáticos (separados del transform del reveal y del hover).
  const rot = document.createElement('div');
  rot.className = 'aa-mw__rot';
  rot.style.transform = `rotate(${tilt.rot}deg) translateY(${tilt.dy}em)`;
  rot.setAttribute('data-momentum-hover-element', '');

  // Target del momentum-hover: el inertia anima x/y/rotation aquí (0 → velocidad → 0).
  const inner = document.createElement('div');
  inner.className = 'aa-mw__inner';
  inner.setAttribute('data-momentum-hover-target', '');

  const img = document.createElement('img');
  img.className = 'aa-mw__avatar';
  img.src = avatar;
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';

  const bubble = document.createElement('div');
  bubble.className = 'aa-mw__bubble';
  const text = document.createElement('span');
  text.className = 'aa-mw__bubble-text';
  text.textContent = data.text;
  const time = document.createElement('span');
  time.className = 'aa-mw__bubble-time';
  time.textContent = data.time;
  bubble.append(text, time);

  inner.append(img, bubble);
  rot.appendChild(inner);
  item.appendChild(rot);
  return item;
}

function band(
  variant: 'top' | 'bottom',
  bubbles: ManifestoContent['bubbles'],
  offset: number,
): HTMLElement {
  const el = document.createElement('div');
  el.className = `aa-mw__band aa-mw__band--${variant}`;
  bubbles.forEach((b, i) => {
    const idx = offset + i;
    el.appendChild(bubbleItem(b, AVATARS[idx], TILT[idx], idx));
  });
  return el;
}

// Rejilla decorativa: líneas verticales sutiles alineadas al contenedor (estilo OSMO).
const GRID_LINES = 5;

function buildGrid(): HTMLElement {
  const grid = document.createElement('div');
  grid.className = 'aa-mw__grid';
  grid.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < GRID_LINES; i++) {
    const line = document.createElement('span');
    line.className = 'aa-mw__grid-line';
    grid.appendChild(line);
  }
  return grid;
}

// Convierte **texto** en <strong> (peso para resaltar) sin usar innerHTML.
function richParagraph(markup: string): HTMLElement {
  const p = document.createElement('p');
  p.className = 'aa-mw__p';
  p.setAttribute('data-aa-fade', '');
  markup.split('**').forEach((part, i) => {
    if (!part) return;
    if (i % 2 === 1) {
      const strong = document.createElement('strong');
      strong.textContent = part;
      p.appendChild(strong);
    } else {
      p.appendChild(document.createTextNode(part));
    }
  });
  return p;
}

// Captura full-width de las burbujas — solo visible en mobile (reemplaza las bandas).
function mobileShot(src: string, variant: 'top' | 'bottom'): HTMLElement {
  const img = document.createElement('img');
  img.className = `aa-mw__shot aa-mw__shot--${variant}`;
  img.src = src;
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.setAttribute('aria-hidden', 'true');
  return img;
}

export function buildManifesto(c: ManifestoContent): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-mw';
  wrap.setAttribute('data-momentum-hover-init', '');
  wrap.appendChild(buildGrid());

  const usable = c.bubbles.slice(0, AVATARS.length);
  const half = Math.ceil(usable.length / 2);

  // Texto centrado
  const text = document.createElement('div');
  text.className = 'aa-mw__text';
  if (c.eyebrow) {
    const eyebrow = renderEyebrow(c.eyebrow);
    eyebrow.setAttribute('data-aa-fade', '');
    text.appendChild(eyebrow);
  }
  text.appendChild(
    renderHeading({ size: 'l', text: c.heading, split: true, className: 'aa-text-balance' }),
  );
  c.paragraphs.forEach((p) => text.appendChild(richParagraph(p)));

  wrap.append(
    band('top', usable.slice(0, half), 0),
    mobileShot(shotTop, 'top'),
    text,
    mobileShot(shotBottom, 'bottom'),
    band('bottom', usable.slice(half), half),
  );
  return wrap;
}
