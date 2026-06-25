// Hero 2 — variante de dos columnas. Izquierda: chip + headline + subhead + CTA (mismo contenido
// que el hero "messages"). Derecha: video en loop transparente. Sin campo de mensajes, sin bottom
// marquee y sin bubbles de cursor: es una versión estática/limpia. Reusa HeroProps/atoms del hero.

import { renderParagraph } from '../atoms/text';
import { renderRotatingHeading } from '../behaviors/rotating-text';
import { renderButton } from '../atoms/button';
import { heroVideo } from '../../assets/r2';
import type { HeroProps } from './hero';

function buildVideo(): HTMLVideoElement {
  const video = document.createElement('video');
  video.className = 'aa-hero2__video';
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('aria-hidden', 'true');

  const webm = document.createElement('source');
  webm.src = heroVideo.webm;
  webm.type = 'video/webm';

  const mov = document.createElement('source');
  mov.src = heroVideo.mov;
  mov.type = 'video/mp4; codecs=hvc1';

  video.append(webm, mov);
  return video;
}

export function renderHero2(root: Element, props: HeroProps): void {
  const hero = document.createElement('section');
  hero.className = 'aa-hero2';
  hero.setAttribute('data-aa-section-theme', props.theme ?? 'light');
  hero.setAttribute('data-aa-intro', ''); // anima al montar

  const inner = document.createElement('div');
  inner.className = 'aa-hero2__inner aa-container';

  // ── Columna izquierda: contenido ──────────────────────────────────────────────
  const content = document.createElement('div');
  content.className = 'aa-hero2__content';

  const chip = document.createElement('span');
  chip.className = 'aa-hero2__chip';
  chip.textContent = props.tag;
  chip.setAttribute('data-aa-fade', '');
  content.appendChild(chip);

  // El rotating corre su propio SplitText sobre este nodo (sin efecto on-mount extra).
  content.appendChild(
    renderRotatingHeading({
      size: 'xxl',
      tag: 'h1',
      before: props.titleBefore,
      words: props.titleWords,
      after: props.titleAfter,
      className: 'aa-hero2__title aa-text-balance',
    }),
  );

  const subtitle = renderParagraph({
    size: 'l',
    text: props.subtitle,
    className: 'aa-hero2__subtitle aa-text-balance',
  });
  subtitle.setAttribute('data-aa-split', '');
  content.appendChild(subtitle);

  const ctaRow = document.createElement('div');
  ctaRow.className = 'aa-hero2__cta-row';
  ctaRow.setAttribute('data-aa-fade', '');
  ctaRow.setAttribute('data-aa-delay', '0.35');
  ctaRow.append(
    renderButton({ label: props.primaryCta.label, href: props.primaryCta.href, variant: 'primary' }),
  );
  content.appendChild(ctaRow);

  // ── Columna derecha: media ────────────────────────────────────────────────────
  const media = document.createElement('div');
  media.className = 'aa-hero2__media';
  media.setAttribute('data-aa-fade', '');
  media.appendChild(buildVideo());

  inner.append(content, media);
  hero.appendChild(inner);
  root.appendChild(hero);
}
