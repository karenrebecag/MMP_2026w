// Industria impact — dos columnas: contenido (izq) + imagen (der). El contenido lleva pill +
// heading + subheading + lista numerada (nº en círculo + título + desc) + bloque de stat
// (valor grande + label) junto a una nota. Reusable; base conceptual Relume Stats 24 (sin la
// interacción de tabs). Scoped a .aa-landing.

export interface ImpactItem {
  title: string;
  desc: string;
}

export interface IndustriaImpactConfig {
  eyebrow?: string;
  heading: string;
  subheading: string;
  items: ImpactItem[];
  stat: { value: string; label: string; note: string };
  image?: { src: string; alt: string; video?: boolean };
  theme?: 'light' | 'dark';
}

function buildMedia(image?: IndustriaImpactConfig['image']): HTMLElement {
  const media = document.createElement('div');
  media.className = 'aa-ind-impact__media';
  media.setAttribute('data-aa-fade', '');

  if (!image) {
    media.classList.add('is--placeholder');
    return media;
  }
  if (image.video) {
    const video = document.createElement('video');
    video.className = 'aa-ind-impact__img';
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
    img.className = 'aa-ind-impact__img';
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    media.appendChild(img);
  }
  return media;
}

function buildItem(item: ImpactItem, index: number): HTMLElement {
  const el = document.createElement('div');
  el.className = 'aa-ind-impact__item';
  el.setAttribute('data-aa-fade', '');

  const num = document.createElement('span');
  num.className = 'aa-h-m aa-ind-impact__num';
  num.textContent = String(index + 1);

  const body = document.createElement('div');
  body.className = 'aa-ind-impact__item-body';
  const title = document.createElement('h3');
  title.className = 'aa-h-m aa-ind-impact__item-title';
  title.textContent = item.title;
  const desc = document.createElement('p');
  desc.className = 'aa-p-l aa-ind-impact__item-desc';
  desc.textContent = item.desc;
  body.append(title, desc);

  el.append(num, body);
  return el;
}

export function renderIndustriaImpact(root: Element, cfg: IndustriaImpactConfig): void {
  const section = document.createElement('section');
  section.className = 'aa-section aa-ind-impact';
  section.setAttribute('data-aa-section-theme', cfg.theme ?? 'light');

  const container = document.createElement('div');
  container.className = 'aa-container';

  const inner = document.createElement('div');
  inner.className = 'aa-ind-impact__inner';

  // Columna izquierda: contenido.
  const content = document.createElement('div');
  content.className = 'aa-ind-impact__content';

  if (cfg.eyebrow) {
    const eyebrow = document.createElement('span');
    eyebrow.className = 'aa-ind-impact__eyebrow';
    eyebrow.textContent = cfg.eyebrow;
    eyebrow.setAttribute('data-aa-fade', '');
    content.appendChild(eyebrow);
  }

  const heading = document.createElement('h2');
  heading.className = 'aa-h-l aa-ind-impact__heading aa-text-balance';
  heading.setAttribute('data-aa-split', '');
  heading.textContent = cfg.heading;

  const sub = document.createElement('p');
  sub.className = 'aa-p-l aa-ind-impact__sub aa-text-balance';
  sub.setAttribute('data-aa-fade', '');
  sub.textContent = cfg.subheading;

  const items = document.createElement('div');
  items.className = 'aa-ind-impact__items';
  cfg.items.forEach((it, i) => items.appendChild(buildItem(it, i)));

  // Bloque de stat + nota.
  const statRow = document.createElement('div');
  statRow.className = 'aa-ind-impact__stat-row';
  statRow.setAttribute('data-aa-fade', '');

  const statBox = document.createElement('div');
  statBox.className = 'aa-ind-impact__stat-box';
  const statValue = document.createElement('div');
  statValue.className = 'aa-h-l aa-text-gradient aa-ind-impact__stat-value';
  statValue.textContent = cfg.stat.value;
  const statLabel = document.createElement('div');
  statLabel.className = 'aa-ind-impact__stat-label';
  statLabel.textContent = cfg.stat.label;
  statBox.append(statValue, statLabel);

  const statNote = document.createElement('p');
  statNote.className = 'aa-p-l aa-ind-impact__stat-note';
  statNote.textContent = cfg.stat.note;

  statRow.append(statBox, statNote);

  content.append(heading, sub, items, statRow);
  // DOM: contenido → media (imagen a la derecha vía grid).
  inner.append(content, buildMedia(cfg.image));
  container.appendChild(inner);
  section.appendChild(container);
  root.appendChild(section);
}
