// Hero "classic" — template reutilizable: card inset con video de fondo en loop, contenido
// a la izquierda y burbujas de chat decorativas (tema WhatsApp). Deprecado del home;
// conservado como opción para otra sección.
//
// Parametrizado por props (i18n-agnóstico): la copy entra resuelta. heroClassicFromStrings()
// puentea al namespace `heroClassic` del idioma activo. El chat lo anima initHeroClassicChat
// (llamar tras montar en el DOM, como cualquier behavior).

import { renderHeading, renderParagraph } from '../atoms/text';
import { renderButton } from '../atoms/button';
import { R2_CONTENT } from '../../core/config/assets';
import type { SectionTheme } from '../molecules/layout';
import { strings } from '../../core/i18n';

export { initHeroClassicChat } from './hero-classic-chat';

export interface HeroClassicProps {
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  footnote?: string;
  videoSrc?: string;
  theme?: SectionTheme;
}

const DEFAULT_VIDEO = `${R2_CONTENT}/hero-atom.mp4`;

// Puente i18n: arma los props desde el namespace heroClassic del idioma activo.
export function heroClassicFromStrings(href = '#aa-waitlist'): HeroClassicProps {
  const s = strings().heroClassic;
  return {
    title: s.title,
    subtitle: s.subtitle,
    cta: { label: s.ctaLabel, href },
    footnote: s.footnote,
  };
}

function buildVideo(src: string): HTMLVideoElement {
  const video = document.createElement('video');
  video.className = 'aa-hero-classic__video';
  video.src = src;
  // Autoplay silencioso en loop (requiere muted + playsinline en móvil).
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('preload', 'auto');
  video.setAttribute('aria-hidden', 'true');
  return video;
}

// Ventana de chat: el track lo llena initHeroClassicChat() (conversación animada).
function buildChats(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-hero-classic__chats';
  wrap.setAttribute('aria-hidden', 'true');
  const track = document.createElement('div');
  track.className = 'aa-hero-classic__chats-track';
  track.setAttribute('data-aa-hero-classic-chat-track', '');
  wrap.appendChild(track);
  return wrap;
}

export function renderHeroClassic(root: Element, props: HeroClassicProps): void {
  const hero = document.createElement('section');
  hero.className = 'aa-hero-classic';
  hero.setAttribute('data-aa-intro', ''); // anima al montar (no al hacer scroll)
  hero.setAttribute('data-aa-section-theme', props.theme ?? 'light');

  // Card inset con video de fondo + overlay para legibilidad
  const card = document.createElement('div');
  card.className = 'aa-hero-classic__card';

  const overlay = document.createElement('div');
  overlay.className = 'aa-hero-classic__overlay';

  // Contenido alineado a la izquierda
  const content = document.createElement('div');
  content.className = 'aa-hero-classic__content';

  content.appendChild(
    renderHeading({
      size: 'xxl',
      text: props.title,
      tag: 'h1',
      split: true,
      className: 'aa-hero-classic__title aa-text-balance',
    }),
  );

  const subtitle = renderParagraph({
    size: 'l',
    text: props.subtitle,
    className: 'aa-hero-classic__subtitle',
  });
  subtitle.setAttribute('data-aa-fade', '');
  subtitle.setAttribute('data-aa-delay', '0.2');
  content.appendChild(subtitle);

  const buttonRow = document.createElement('div');
  buttonRow.className = 'aa-hero-classic__button-row';
  buttonRow.setAttribute('data-aa-fade', '');
  buttonRow.setAttribute('data-aa-delay', '0.35');
  buttonRow.appendChild(
    renderButton({ label: props.cta.label, href: props.cta.href, variant: 'primary' }),
  );
  content.appendChild(buttonRow);

  card.append(buildVideo(props.videoSrc ?? DEFAULT_VIDEO), overlay, content, buildChats());
  hero.append(card);

  // Footnote opcional bajo el card
  if (props.footnote) {
    const footnote = document.createElement('p');
    footnote.className = 'aa-hero-classic__footnote';
    footnote.textContent = props.footnote;
    footnote.setAttribute('data-aa-fade', '');
    footnote.setAttribute('data-aa-delay', '0.5');
    hero.append(footnote);
  }

  root.appendChild(hero);
}
