// Industria split — dos columnas: media (izq) + contenido (der: heading + subheading + 4
// bullets en grid 2x2, cada uno con badge circular tinteado + label). Portado de Relume
// Layout 639 (imagen espejada a la izquierda; bullets sin descripción). Reusable por las 3
// industrias; el badge usa --aa-ind-tint y el glifo --aa-ind-accent (naranja en automotriz).

import { iconSvg, type IconName } from '../atoms/icon';

export interface SplitBullet {
  label: string;
  icon: IconName;
}

export interface IndustriaSplitConfig {
  heading: string;
  subheading: string;
  bullets: SplitBullet[];
  image?: { src: string; alt: string; video?: boolean };
  theme?: 'light' | 'dark';
}

function buildMedia(image?: IndustriaSplitConfig['image']): HTMLElement {
  const media = document.createElement('div');
  media.className = 'aa-ind-split__media';
  media.setAttribute('data-aa-fade', '');

  if (!image) {
    media.classList.add('is--placeholder');
    return media;
  }
  if (image.video) {
    const video = document.createElement('video');
    video.className = 'aa-ind-split__img';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('aria-hidden', 'true');
    const src = document.createElement('source');
    src.src = image.src;
    src.type = 'video/webm';
    video.appendChild(src);
    media.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.className = 'aa-ind-split__img';
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    media.appendChild(img);
  }
  return media;
}

function buildBullet(bullet: SplitBullet): HTMLElement {
  const el = document.createElement('div');
  el.className = 'aa-ind-split__bullet';
  el.setAttribute('data-aa-fade', '');

  const badge = document.createElement('span');
  badge.className = 'aa-ind-split__badge';
  badge.innerHTML = iconSvg(bullet.icon);

  const label = document.createElement('p');
  label.className = 'aa-p-m aa-ind-split__label';
  label.textContent = bullet.label;

  el.append(badge, label);
  return el;
}

export function renderIndustriaSplit(root: Element, cfg: IndustriaSplitConfig): void {
  const section = document.createElement('section');
  section.className = 'aa-section aa-ind-split';
  section.setAttribute('data-aa-section-theme', cfg.theme ?? 'light');

  const container = document.createElement('div');
  container.className = 'aa-container';

  const inner = document.createElement('div');
  inner.className = 'aa-ind-split__inner';

  // Columna derecha: contenido.
  const content = document.createElement('div');
  content.className = 'aa-ind-split__content';

  const heading = document.createElement('h2');
  heading.className = 'aa-h-l aa-ind-split__heading aa-text-balance';
  heading.setAttribute('data-aa-split', '');
  heading.textContent = cfg.heading;

  const sub = document.createElement('p');
  sub.className = 'aa-p-l aa-ind-split__sub aa-text-balance';
  sub.setAttribute('data-aa-fade', '');
  sub.textContent = cfg.subheading;

  const bullets = document.createElement('div');
  bullets.className = 'aa-ind-split__bullets';
  cfg.bullets.forEach((b) => bullets.appendChild(buildBullet(b)));

  content.append(heading, sub, bullets);
  // DOM: media → content (media a la izquierda vía grid).
  inner.append(buildMedia(cfg.image), content);
  container.appendChild(inner);
  section.appendChild(container);
  root.appendChild(section);
}
