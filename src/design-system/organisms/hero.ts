// Hero — card inset (separado del borde del viewport) con video de fondo en loop,
// contenido alineado a la izquierda y burbujas de chat decorativas (tema WhatsApp).

import { renderHeading, renderParagraph } from '../atoms/text';
import { renderButton } from '../atoms/button';
import { R2_CONTENT } from '../../core/config/assets';

// Video de fondo en loop, servido desde Cloudflare R2 (público, con range/faststart).
const HERO_VIDEO_SRC = `${R2_CONTENT}/hero-atom.mp4`;

function buildVideo(): HTMLVideoElement {
  const video = document.createElement('video');
  video.className = 'aa-hero__video';
  video.src = HERO_VIDEO_SRC;
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

// Ventana de chat: el track lo llena initHeroChat() (conversación animada).
function buildChats(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'aa-hero__chats';
  wrap.setAttribute('aria-hidden', 'true');
  const track = document.createElement('div');
  track.className = 'aa-hero__chats-track';
  track.setAttribute('data-aa-hero-chat-track', '');
  wrap.appendChild(track);
  return wrap;
}

export function renderHero(root: Element): void {
  const hero = document.createElement('section');
  hero.className = 'aa-hero';
  hero.setAttribute('data-aa-intro', ''); // anima al montar (no al hacer scroll)
  hero.setAttribute('data-aa-section-theme', 'light');

  // Card inset con video de fondo + overlay para legibilidad
  const card = document.createElement('div');
  card.className = 'aa-hero__card';

  const overlay = document.createElement('div');
  overlay.className = 'aa-hero__overlay';

  // Contenido alineado a la izquierda
  const content = document.createElement('div');
  content.className = 'aa-hero__content';

  content.appendChild(
    renderHeading({
      size: 'xxl',
      text: 'Conviértete en Experto en WhatsApp Marketing',
      tag: 'h1',
      split: true,
      className: 'aa-hero__title aa-text-balance',
    }),
  );

  const subtitle = renderParagraph({
    size: 'l',
    text: 'La primera formación para dominar el canal donde hoy se generan, califican y cierran más oportunidades.',
    className: 'aa-hero__subtitle',
  });
  subtitle.setAttribute('data-aa-fade', '');
  subtitle.setAttribute('data-aa-delay', '0.2');
  content.appendChild(subtitle);

  const buttonRow = document.createElement('div');
  buttonRow.className = 'aa-hero__button-row';
  buttonRow.setAttribute('data-aa-fade', '');
  buttonRow.setAttribute('data-aa-delay', '0.35');
  buttonRow.appendChild(
    renderButton({ label: 'Únete a la lista de espera', href: '#aa-waitlist', variant: 'primary' }),
  );
  content.appendChild(buttonRow);

  card.append(buildVideo(), overlay, content, buildChats());

  // Footnote bajo el card (anclado al lanzamiento real)
  const footnote = document.createElement('p');
  footnote.className = 'aa-hero__footnote';
  footnote.textContent = '* Primera edición en julio · acceso prioritario para la lista de espera.';
  footnote.setAttribute('data-aa-fade', '');
  footnote.setAttribute('data-aa-delay', '0.5');

  hero.append(card, footnote);
  root.appendChild(hero);
}
