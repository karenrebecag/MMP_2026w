// Industria automations — strip DARK de dos columnas: contenido (izq: pill + heading +
// subheading + CTA) + imagen (der). Reusable por las 3 industrias; el dot del pill usa el
// highlight de cada una (--aa-ind-accent → fallback electric). El tema dark remapea los
// tokens --aa-* (section-theme.css), así que todo se adapta solo.

import { renderButton } from '../atoms/button';

export interface IndustriaAutomationsConfig {
  eyebrow: string;
  heading: string;
  subheading: string;
  cta: { label: string };
  // Fila de 4 pasos numerados bajo el bloque de 2 columnas (una línea por paso).
  steps?: string[];
  image?: { src: string; alt: string; video?: boolean };
}

// Fila de steps: reusa las clases aa-ind-steps__* (industria-steps.css); los overrides dark
// viven en aa-ind-auto (automations.css). Círculo con el número sobre el tint de la industria.
function buildStepsRow(steps: string[]): HTMLElement {
  const row = document.createElement('div');
  row.className = 'aa-ind-steps__row';
  row.setAttribute('data-aa-reveal', ''); // entra escalonado (ver motion.ts)

  steps.forEach((text, i) => {
    const step = document.createElement('div');
    step.className = 'aa-ind-steps__step';
    step.setAttribute('data-aa-reveal-item', '');

    const num = document.createElement('span');
    num.className = 'aa-ind-steps__num';
    num.textContent = String(i + 1);

    const body = document.createElement('div');
    body.className = 'aa-ind-steps__step-body';
    const title = document.createElement('p');
    title.className = 'aa-p-m aa-ind-steps__step-title';
    title.textContent = text;
    body.appendChild(title);

    step.append(num, body);
    row.appendChild(step);
  });
  return row;
}

function buildMedia(image?: IndustriaAutomationsConfig['image']): HTMLElement {
  const media = document.createElement('div');
  media.className = 'aa-ind-auto__media';
  media.setAttribute('data-aa-fade', '');

  if (!image) {
    media.classList.add('is--placeholder');
    return media;
  }
  if (image.video) {
    const video = document.createElement('video');
    video.className = 'aa-ind-auto__img';
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
    img.className = 'aa-ind-auto__img';
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    media.appendChild(img);
  }
  return media;
}

export function renderIndustriaAutomations(root: Element, cfg: IndustriaAutomationsConfig): void {
  const section = document.createElement('section');
  section.className = 'aa-section aa-ind-auto';
  section.setAttribute('data-aa-section-theme', 'dark');

  const container = document.createElement('div');
  container.className = 'aa-container';

  const inner = document.createElement('div');
  inner.className = 'aa-ind-auto__inner';

  // Columna izquierda: contenido.
  const content = document.createElement('div');
  content.className = 'aa-ind-auto__content';

  const pill = document.createElement('span');
  pill.className = 'aa-ind-auto__pill';
  pill.textContent = cfg.eyebrow;
  pill.setAttribute('data-aa-fade', '');

  const heading = document.createElement('h2');
  heading.className = 'aa-h-l aa-ind-auto__heading aa-text-balance';
  heading.setAttribute('data-aa-split', '');
  heading.textContent = cfg.heading;

  const sub = document.createElement('p');
  sub.className = 'aa-p-l aa-ind-auto__sub aa-text-balance';
  sub.setAttribute('data-aa-fade', '');
  sub.textContent = cfg.subheading;

  const ctaRow = document.createElement('div');
  ctaRow.className = 'aa-ind-auto__cta';
  ctaRow.setAttribute('data-aa-fade', '');
  ctaRow.appendChild(renderButton({ label: cfg.cta.label, variant: 'primary' }));

  content.append(pill, heading, sub, ctaRow);
  inner.append(content, buildMedia(cfg.image));
  container.appendChild(inner);
  // Fila de steps a todo el ancho, bajo el bloque de dos columnas.
  if (cfg.steps?.length) container.appendChild(buildStepsRow(cfg.steps));
  section.appendChild(container);
  root.appendChild(section);
}
