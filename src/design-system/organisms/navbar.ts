// Navbar blanca fija bajo el marquee: logos de marca (Atom + Meta Business)
// agrupados a la izquierda y un CTA a la derecha (space-between). Patrón
// "smart reveal": visible en el tope del scroll y al subir; se oculta (se mete
// tras el marquee) al bajar fuera del tope.

import { renderButton } from '../atoms/button';
import { UPLOADS } from '../../core/config/brand';
import { t } from '../../core/i18n';

const ATOM_LOGO = `${UPLOADS}/2023/03/logo-atom-chat.png`;
const META_BADGE = `${UPLOADS}/2023/08/MBP-Badge-Dark-backgrounds@1x.png`;

function buildLogo(src: string, alt: string, modifier: string): HTMLImageElement {
  const img = document.createElement('img');
  img.className = `aa-navbar__logo aa-navbar__logo--${modifier}`;
  img.src = src;
  img.alt = alt;
  img.loading = 'eager';
  img.decoding = 'async';
  return img;
}

export function renderNavbar(root: Element): void {
  const bar = document.createElement('header');
  bar.className = 'aa-navbar';
  bar.setAttribute('data-aa-navbar', '');

  // Grupo de marca: Atom · divider vertical · Meta Business (flex row).
  const brand = document.createElement('div');
  brand.className = 'aa-navbar__brand';
  const divider = document.createElement('span');
  divider.className = 'aa-navbar__divider';
  divider.setAttribute('aria-hidden', 'true');
  brand.append(
    buildLogo(ATOM_LOGO, 'Atom', 'atom'),
    divider,
    buildLogo(META_BADGE, 'Meta Business Partner', 'meta'),
  );

  const cta = renderButton({
    label: t('navbar.cta'),
    href: '#aa-waitlist',
    variant: 'primary',
    size: 'sm',
  });

  const inner = document.createElement('div');
  inner.className = 'aa-navbar__inner aa-container';
  inner.append(brand, cta);

  bar.appendChild(inner);
  root.appendChild(bar);
}

const TOP_THRESHOLD = 8; // px — por debajo de esto se considera "en el tope"

export function initNavbar(scope: Element): void {
  const bar = scope.querySelector<HTMLElement>('[data-aa-navbar]');
  if (!bar) return;

  let lastY = window.scrollY;
  let rafId = 0;

  const update = (): void => {
    rafId = 0;
    const y = window.scrollY;
    const atTop = y <= TOP_THRESHOLD;
    const scrollingDown = y > lastY;
    // Oculta solo al bajar fuera del tope; muestra en el tope o al subir.
    bar.classList.toggle('aa-navbar--hidden', scrollingDown && !atTop);
    lastY = y;
  };

  const onScroll = (): void => {
    if (!rafId) rafId = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update(); // estado inicial
}
