// Industria hero — dos columnas (Relume Header 36 portado a vanilla). Izquierda: pill +
// heading (con palabra en gradiente) + subheading + CTA row (primario + secundario).
// Derecha: video en loop. Reusable por las 3 páginas de industria; cada una pasa su copy
// y su tint de cluster (--aa-ind-tint, seteado por el composer en el root).

import { renderParagraph } from '../atoms/text';
import { renderButton } from '../atoms/button';

export interface IndustriaHeroConfig {
  pill: string;
  // El heading se parte para pintar solo `gradient` con el gradiente de marca.
  heading: { before: string; gradient: string; after?: string };
  subheading: string;
  primary: { label: string };
  secondary: { label: string; href?: string };
  videoWebm: string;
  theme?: 'light' | 'dark';
}

function buildVideo(src: string): HTMLVideoElement {
  const video = document.createElement('video');
  video.className = 'aa-ind-hero__video';
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('aria-hidden', 'true');

  const webm = document.createElement('source');
  webm.src = src;
  webm.type = 'video/webm';
  video.appendChild(webm);
  return video;
}

export function renderIndustriaHero(root: Element, cfg: IndustriaHeroConfig): void {
  const hero = document.createElement('section');
  hero.className = 'aa-ind-hero';
  hero.setAttribute('data-aa-section-theme', cfg.theme ?? 'light');
  hero.setAttribute('data-aa-intro', ''); // anima al montar

  const inner = document.createElement('div');
  inner.className = 'aa-ind-hero__inner aa-container';

  // ── Columna izquierda: contenido ──────────────────────────────────────────────
  const content = document.createElement('div');
  content.className = 'aa-ind-hero__content';

  const pill = document.createElement('span');
  pill.className = 'aa-ind-hero__pill';
  pill.textContent = cfg.pill;
  pill.setAttribute('data-aa-fade', '');
  content.appendChild(pill);

  // Heading con palabra en gradiente + mount word-rise (data-aa-split → SplitText en
  // playIntro). El gradiente sobre las words que genera SplitText lo sostiene el CSS
  // (.aa-ind-hero__title .aa-text-gradient *), igual que en what-atom-does.
  const h1 = document.createElement('h1');
  h1.className = 'aa-h-xxl aa-ind-hero__title aa-text-balance';
  h1.setAttribute('data-aa-split', '');
  h1.appendChild(document.createTextNode(cfg.heading.before));
  const grad = document.createElement('span');
  grad.className = 'aa-text-gradient';
  grad.textContent = cfg.heading.gradient;
  h1.appendChild(grad);
  if (cfg.heading.after) h1.appendChild(document.createTextNode(cfg.heading.after));
  content.appendChild(h1);

  const subtitle = renderParagraph({
    size: 'l',
    text: cfg.subheading,
    className: 'aa-ind-hero__subtitle aa-text-balance',
  });
  subtitle.setAttribute('data-aa-fade', '');
  subtitle.setAttribute('data-aa-delay', '0.2');
  content.appendChild(subtitle);

  const ctaRow = document.createElement('div');
  ctaRow.className = 'aa-ind-hero__cta-row';
  ctaRow.setAttribute('data-aa-fade', '');
  ctaRow.setAttribute('data-aa-delay', '0.35');
  ctaRow.append(
    renderButton({ label: cfg.primary.label, variant: 'primary' }),
    renderButton({ label: cfg.secondary.label, href: cfg.secondary.href ?? '#', variant: 'secondary' }),
  );
  content.appendChild(ctaRow);

  // ── Columna derecha: media ────────────────────────────────────────────────────
  const media = document.createElement('div');
  media.className = 'aa-ind-hero__media';
  media.setAttribute('data-aa-fade', '');
  media.appendChild(buildVideo(cfg.videoWebm));

  inner.append(content, media);
  hero.appendChild(inner);
  root.appendChild(hero);
}
