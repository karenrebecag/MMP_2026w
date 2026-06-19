// Sección "audience" (Para quién) — réplica del community-meet de OSMO: intro centrado,
// columna izquierda con lista de criterios, columna derecha con un abanico de 3 fotos.

import { renderEyebrow, renderHeading, renderParagraph } from '../atoms/text';
import type { AudienceContent } from '../../content';

import { audiencePhotos as PHOTOS } from '../../assets/r2';

const CHECK_ICON =
  '<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M2.5 7.5 5.5 10.5 11.5 3.5" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round"/></svg>';

function listItem(text: string): HTMLElement {
  const item = document.createElement('li');
  item.className = 'aa-aud__item';
  item.setAttribute('data-aa-fade', '');
  const icon = document.createElement('span');
  icon.className = 'aa-aud__item-icon';
  icon.innerHTML = CHECK_ICON;
  const span = document.createElement('span');
  span.className = 'aa-aud__item-text';
  span.textContent = text;
  item.append(icon, span);
  return item;
}

function buildFan(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-aud__img-w';
  wrap.setAttribute('data-aa-pop', ''); // pop escalonado de entrada
  wrap.setAttribute('aria-hidden', 'true');
  PHOTOS.forEach((src, i) => {
    // card = posición + rotación del abanico (estático) + listener del momentum-hover;
    // media = nodo animado (entrada pop + inercia del hover).
    const card = document.createElement('div');
    card.className = `aa-aud__img is--${i + 1}`;
    card.setAttribute('data-momentum-hover-element', '');
    const media = document.createElement('div');
    media.className = 'aa-aud__media';
    media.setAttribute('data-aa-pop-item', '');
    media.setAttribute('data-momentum-hover-target', '');
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    media.appendChild(img);
    card.appendChild(media);
    wrap.appendChild(card);
  });
  return wrap;
}

export function buildAudience(c: AudienceContent): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-aud';
  wrap.setAttribute('data-momentum-hover-init', ''); // rastrea velocidad del cursor para la inercia

  // Intro centrado: eyebrow + heading
  const intro = document.createElement('div');
  intro.className = 'aa-aud__intro';
  if (c.eyebrow) {
    const eyebrow = renderEyebrow(c.eyebrow, 'aa-aud__eyebrow');
    eyebrow.setAttribute('data-aa-fade', '');
    intro.appendChild(eyebrow);
  }
  intro.appendChild(
    renderHeading({
      size: 'xl',
      text: c.heading,
      split: true,
      className: 'aa-text-balance aa-text-center',
    }),
  );

  // Fila de dos columnas
  const row = document.createElement('div');
  row.className = 'aa-aud__row';

  const leftCol = document.createElement('div');
  leftCol.className = 'aa-aud__col';
  const info = document.createElement('div');
  info.className = 'aa-aud__info';
  if (c.intro) {
    const lead = renderParagraph({ size: 'l', text: c.intro, className: 'aa-aud__lead' });
    lead.setAttribute('data-aa-fade', '');
    info.appendChild(lead);
  }
  const list = document.createElement('ul');
  list.className = 'aa-aud__list';
  c.items.forEach((text) => list.appendChild(listItem(text)));
  info.appendChild(list);
  leftCol.appendChild(info);

  const rightCol = document.createElement('div');
  rightCol.className = 'aa-aud__col aa-aud__col--media';
  rightCol.appendChild(buildFan());

  row.append(leftCol, rightCol);
  wrap.append(intro, row);
  return wrap;
}
