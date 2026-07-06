// Industria steps — header (izq) + imagen full-width + row de pasos como cards numeradas
// (círculo con número + ícono + título + descripción opcional). Reusable por las industrias
// que usen este layout; el círculo usa --aa-ind-tint y el ícono --aa-ind-accent (naranja en
// automotriz). CTA opcional abajo-derecha.

import { renderButton } from '../atoms/button';

export interface Step {
  title: string;
  desc?: string;
}

export interface IndustriaStepsConfig {
  eyebrow?: string;
  heading: string;
  subheading: string;
  steps: Step[];
  image?: { src: string; alt: string; video?: boolean };
  cta?: { label: string };
  theme?: 'light' | 'dark';
}

function buildMedia(image?: IndustriaStepsConfig['image']): HTMLElement {
  const media = document.createElement('div');
  media.className = 'aa-ind-steps__media';
  media.setAttribute('data-aa-fade', '');

  if (!image) {
    media.classList.add('is--placeholder');
    return media;
  }
  if (image.video) {
    const video = document.createElement('video');
    video.className = 'aa-ind-steps__img';
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
    img.className = 'aa-ind-steps__img';
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    media.appendChild(img);
  }
  return media;
}

function buildStep(step: Step, index: number): HTMLElement {
  const el = document.createElement('div');
  el.className = 'aa-ind-steps__step';
  el.setAttribute('data-aa-fade', '');

  // Círculo con el número del paso (bg tint, número fg).
  const num = document.createElement('span');
  num.className = 'aa-ind-steps__num';
  num.textContent = String(index + 1);

  const body = document.createElement('div');
  body.className = 'aa-ind-steps__step-body';

  const title = document.createElement('h3');
  title.className = 'aa-p-m aa-ind-steps__step-title';
  title.textContent = step.title;
  body.appendChild(title);

  if (step.desc) {
    const desc = document.createElement('p');
    desc.className = 'aa-p-m aa-ind-steps__step-desc';
    desc.textContent = step.desc;
    body.appendChild(desc);
  }

  el.append(num, body);
  return el;
}

export function renderIndustriaSteps(root: Element, cfg: IndustriaStepsConfig): void {
  const section = document.createElement('section');
  section.className = 'aa-section aa-ind-steps';
  section.setAttribute('data-aa-section-theme', cfg.theme ?? 'light');

  const container = document.createElement('div');
  container.className = 'aa-container';

  // Header (izquierda).
  const header = document.createElement('div');
  header.className = 'aa-ind-steps__header';

  if (cfg.eyebrow) {
    const eyebrow = document.createElement('span');
    eyebrow.className = 'aa-ind-steps__eyebrow';
    eyebrow.textContent = cfg.eyebrow;
    eyebrow.setAttribute('data-aa-fade', '');
    header.appendChild(eyebrow);
  }

  const heading = document.createElement('h2');
  heading.className = 'aa-h-l aa-ind-steps__heading aa-text-balance';
  heading.setAttribute('data-aa-split', '');
  heading.textContent = cfg.heading;

  const sub = document.createElement('p');
  sub.className = 'aa-p-l aa-ind-steps__sub aa-text-balance';
  sub.setAttribute('data-aa-fade', '');
  sub.textContent = cfg.subheading;

  header.append(heading, sub);

  const steps = document.createElement('div');
  steps.className = 'aa-ind-steps__row';
  cfg.steps.forEach((s, i) => steps.appendChild(buildStep(s, i)));

  container.append(header, buildMedia(cfg.image), steps);

  if (cfg.cta) {
    const ctaRow = document.createElement('div');
    ctaRow.className = 'aa-ind-steps__cta';
    ctaRow.setAttribute('data-aa-fade', '');
    ctaRow.appendChild(renderButton({ label: cfg.cta.label, variant: 'primary' }));
    container.appendChild(ctaRow);
  }

  section.appendChild(container);
  root.appendChild(section);
}
