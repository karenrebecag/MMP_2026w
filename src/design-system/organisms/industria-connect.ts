// Industria connect — header centrado (pill + heading con palabra en gradiente + subheading)
// y grid de 3 columnas: cards (izq) · imagen con glow del tint (centro) · cards (der). La card
// (título + descripción) es el bloque que se repite. Reusable por las 3 industrias; el glow usa
// --aa-ind-tint. Scoped a .aa-landing.

export interface ConnectCard {
  title: string;
  desc: string;
}

export interface IndustriaConnectConfig {
  eyebrow: string;
  // El heading se parte para pintar `gradient` (la palabra final distintiva) con el gradiente.
  heading: { before: string; gradient?: string; after?: string };
  subheading: string;
  leftCards: ConnectCard[];
  rightCards: ConnectCard[];
  image?: { src: string; alt: string; video?: boolean };
}

function buildCard(card: ConnectCard): HTMLElement {
  const el = document.createElement('div');
  el.className = 'aa-ind-connect__card';
  el.setAttribute('data-aa-reveal-item', '');

  const title = document.createElement('h3');
  title.className = 'aa-h-m aa-ind-connect__card-title';
  title.textContent = card.title;

  const desc = document.createElement('p');
  desc.className = 'aa-p-m aa-ind-connect__card-desc';
  desc.textContent = card.desc;

  el.append(title, desc);
  return el;
}

function buildColumn(cards: ConnectCard[]): HTMLElement {
  const col = document.createElement('div');
  col.className = 'aa-ind-connect__col';
  col.setAttribute('data-aa-reveal', ''); // sus cards entran escalonadas
  cards.forEach((c) => col.appendChild(buildCard(c)));
  return col;
}

function buildMedia(image?: IndustriaConnectConfig['image']): HTMLElement {
  const media = document.createElement('div');
  media.className = 'aa-ind-connect__media';
  media.setAttribute('data-aa-fade', '');

  const frame = document.createElement('div');
  frame.className = 'aa-ind-connect__image';
  if (!image) {
    frame.classList.add('is--placeholder');
  } else if (image.video) {
    const video = document.createElement('video');
    video.className = 'aa-ind-connect__img';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('aria-hidden', 'true');
    const src = document.createElement('source');
    src.src = image.src;
    src.type = 'video/webm';
    video.appendChild(src);
    frame.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.className = 'aa-ind-connect__img';
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    frame.appendChild(img);
  }
  media.appendChild(frame);
  return media;
}

export function renderIndustriaConnect(root: Element, cfg: IndustriaConnectConfig): void {
  const section = document.createElement('section');
  section.className = 'aa-section aa-ind-connect';
  section.setAttribute('data-aa-section-theme', 'light');

  const container = document.createElement('div');
  container.className = 'aa-container';

  // Header centrado.
  const header = document.createElement('div');
  header.className = 'aa-ind-connect__header';

  const eyebrow = document.createElement('span');
  eyebrow.className = 'aa-ind-connect__eyebrow';
  eyebrow.textContent = cfg.eyebrow;
  eyebrow.setAttribute('data-aa-fade', '');

  const heading = document.createElement('h2');
  heading.className = 'aa-h-l aa-ind-connect__heading aa-text-balance';
  heading.setAttribute('data-aa-split', '');
  heading.appendChild(document.createTextNode(cfg.heading.before));
  if (cfg.heading.gradient) {
    const grad = document.createElement('span');
    grad.className = 'aa-text-gradient';
    grad.textContent = cfg.heading.gradient;
    heading.appendChild(grad);
  }
  if (cfg.heading.after) heading.appendChild(document.createTextNode(cfg.heading.after));

  const sub = document.createElement('p');
  sub.className = 'aa-p-l aa-ind-connect__sub aa-text-balance';
  sub.setAttribute('data-aa-fade', '');
  sub.textContent = cfg.subheading;

  header.append(eyebrow, heading, sub);

  // Grid de 3 columnas: cards · imagen · cards.
  const grid = document.createElement('div');
  grid.className = 'aa-ind-connect__grid';
  grid.append(buildColumn(cfg.leftCards), buildMedia(cfg.image), buildColumn(cfg.rightCards));

  container.append(header, grid);
  section.appendChild(container);
  root.appendChild(section);
}
