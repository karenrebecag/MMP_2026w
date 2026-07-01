// Sección de features — réplica de la anatomía del bloque `.ai` de fourmula.ai: tarjetas
// redondeadas sobre panel, cada una con tag (dot + label), headline con reveal por palabra
// (data-aa-split), body corto, un cluster visual al centro y un botón circular abajo-derecha.
// Layout: 1 tarjeta grande arriba + 2 abajo (fila → columna en tablet). Slots de imagen R2
// (assets/r2.featureShots) pendientes de subir. Parametrizado por i18n (namespace `features`).

import { renderSection, renderContainer } from '../molecules/layout';
import { renderParagraph } from '../atoms/text';
import { strings } from '../../core/i18n';
import { featureShots } from '../../assets/r2';

// Flecha "antes → después" del cluster del top card.
const ARROW_SVG =
  '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M4 12h13M12 6l6 6-6 6" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round"/></svg>';

// Ícono del botón circular (flecha hacia la app / CTA).
const BTN_SVG =
  '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round"/></svg>';

interface CardCopy {
  stat: string;
  tag: string;
  title: string;
  body: string;
}

function tag(label: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 'aa-feat__tag';
  const dot = document.createElement('span');
  dot.className = 'aa-feat__dot';
  const txt = document.createElement('span');
  txt.className = 'aa-feat__label';
  txt.textContent = label;
  el.append(dot, txt);
  return el;
}

function titleBlock(copy: CardCopy, size: 'xl' | 'l'): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-feat__title-block';
  // El title-block es el grupo del odómetro: su stat rueda al entrar en viewport.
  wrap.setAttribute('data-odometer-group', '');
  // Stat grande en gradiente de marca (no es heading → el gradiente no choca con SplitText).
  // data-odometer-element: el roll ES su entrada (sin data-aa-fade para no animar doble).
  const stat = document.createElement('span');
  stat.className = 'aa-feat__stat aa-text-gradient';
  stat.textContent = copy.stat;
  stat.setAttribute('data-odometer-element', '');
  const h = document.createElement('h3');
  h.className = `aa-h-${size} aa-feat__title`;
  h.textContent = copy.title;
  h.setAttribute('data-aa-split', ''); // reveal por palabra al entrar en viewport
  // Body en `l` — mismo nivel que el subtítulo del hero (aa-p-l).
  const p = renderParagraph({ size: 'l', text: copy.body, className: 'aa-feat__body' });
  p.setAttribute('data-aa-fade', '');
  // Agrupa stat + título: en el top card (full-width) es la columna izquierda y el body la derecha.
  const head = document.createElement('div');
  head.className = 'aa-feat__title-head';
  head.append(stat, h);
  wrap.append(head, p);
  return wrap;
}

function assetImg(src: string): HTMLImageElement {
  const img = document.createElement('img');
  img.className = 'aa-feat__asset';
  img.src = src;
  img.alt = '';
  img.loading = 'lazy';
  return img;
}

function shot(src: string, cls = ''): HTMLElement {
  const box = document.createElement('div');
  box.className = cls ? `aa-feat__shot ${cls}` : 'aa-feat__shot';
  box.appendChild(assetImg(src));
  return box;
}

// Mismo contrato visual que assetImg (clase aa-feat__asset → hereda width/height/object-fit del
// slot), en loop silencioso para poder autoplay sin gesto del usuario.
function assetVideo(src: string): HTMLVideoElement {
  const video = document.createElement('video');
  video.className = 'aa-feat__asset';
  video.src = src;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  return video;
}

function shotVideo(src: string, cls = ''): HTMLElement {
  const box = document.createElement('div');
  box.className = cls ? `aa-feat__shot ${cls}` : 'aa-feat__shot';
  box.appendChild(assetVideo(src));
  return box;
}

function arrow(): HTMLElement {
  const el = document.createElement('span');
  el.className = 'aa-feat__arrow';
  el.innerHTML = ARROW_SVG;
  return el;
}

function btn(href: string): HTMLElement {
  const a = document.createElement('a');
  a.className = 'aa-feat__btn';
  a.href = href;
  a.setAttribute('aria-hidden', 'true');
  a.tabIndex = -1; // el CTA accesible vive en el copy; el botón es decorativo/atajo
  const icon = document.createElement('span');
  icon.className = 'aa-feat__btn-icon';
  icon.innerHTML = BTN_SVG;
  a.appendChild(icon);
  return a;
}

// Patrón grid-small de fourmula. srcs: [izq, centro-grande, abajo-1, abajo-2, der]. Los paneles
// laterales sangran por el borde de la card (redondeados solo en su esquina interna).
// Contenedor de lottie lazy: 'cover' (slice) por defecto; 'contain' (entero) para logos.
function lottieBox(key: string, fit: 'cover' | 'contain'): HTMLElement {
  const lot = document.createElement('div');
  lot.className = 'aa-feat__lottie';
  lot.setAttribute('data-lottie', key);
  if (fit === 'contain') lot.setAttribute('data-lottie-fit', 'contain');
  lot.setAttribute('aria-hidden', 'true');
  return lot;
}

function gridCluster(
  srcs: string[],
  opts: { leftLottie?: string; cellLottie?: string; leadVideo?: string } = {},
): HTMLElement {
  const m = document.createElement('div');
  m.className = 'aa-feat__media aa-feat__media--grid';

  const left = document.createElement('div');
  left.className = 'aa-feat__grid-side is-left';
  left.appendChild(opts.leftLottie ? lottieBox(opts.leftLottie, 'cover') : assetImg(srcs[0]));

  const col = document.createElement('div');
  col.className = 'aa-feat__grid-col';
  const lead = document.createElement('div');
  lead.className = 'aa-feat__grid-cell is-lead';
  lead.appendChild(opts.leadVideo ? assetVideo(opts.leadVideo) : assetImg(srcs[1]));
  const row = document.createElement('div');
  row.className = 'aa-feat__grid-row';
  // El cell 0 = cuadro 1:1 inferior-izquierdo (recibe el lottie si se pide).
  [srcs[2], srcs[3]].forEach((src, idx) => {
    const cell = document.createElement('div');
    cell.className = 'aa-feat__grid-cell';
    cell.appendChild(idx === 0 && opts.cellLottie ? lottieBox(opts.cellLottie, 'contain') : assetImg(src));
    row.appendChild(cell);
  });
  col.append(lead, row);

  const right = document.createElement('div');
  right.className = 'aa-feat__grid-side is-right';
  right.appendChild(assetImg(srcs[4]));

  m.append(left, col, right);
  return m;
}

export function renderFeatures(root: Element): void {
  const s = strings().features;

  // TOP — Responde (tarjeta grande, cluster "antes → después").
  const topMedia = document.createElement('div');
  topMedia.className = 'aa-feat__media aa-feat__media--duo';
  topMedia.append(
    shot(featureShots.respondeBefore, 'is-before'),
    arrow(),
    shotVideo(featureShots.respondeAfterVideo, 'is-after'),
  );
  const top = document.createElement('div');
  top.className = 'aa-feat__card aa-feat__top';
  top.append(tag(s.responde.tag), topMedia, titleBlock(s.responde, 'xl'), btn('#aa-waitlist'));

  // BOTTOM — Califica + Cierra (collage de 3 slots c/u).
  const left = document.createElement('div');
  left.className = 'aa-feat__card aa-feat__left';
  left.append(
    tag(s.califica.tag),
    gridCluster(featureShots.califica, {
      cellLottie: 'atom-logo', // logo en el 1:1 inferior-izq
      leadVideo: featureShots.calificaLeadVideo, // video en el cell grande superior (is-lead)
    }),
    titleBlock(s.califica, 'l'),
    btn('#aa-waitlist'),
  );

  const right = document.createElement('div');
  right.className = 'aa-feat__card aa-feat__right';
  right.append(
    tag(s.cierra.tag),
    gridCluster(featureShots.cierra, {
      leftLottie: 'integrations-features', // lottie en el panel izquierdo
      leadVideo: featureShots.cierraLeadVideo, // video en el cell grande superior (is-lead)
    }),
    titleBlock(s.cierra, 'l'),
    btn('#aa-waitlist'),
  );

  const bottom = document.createElement('div');
  bottom.className = 'aa-feat__bottom';
  bottom.append(left, right);

  const section = renderSection({
    theme: 'light',
    className: 'aa-feat',
    children: [renderContainer({ children: [top, bottom] })],
  });
  root.appendChild(section);
}
