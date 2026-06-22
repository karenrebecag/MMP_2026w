// Navbar minimal bajo el marquee: marca (Atom + Meta) a la izquierda · CTA a la derecha.
// Sin mega-nav, sin nav links, sin selector de idioma. Smart reveal en behaviors/navbar
// (se oculta al bajar, aparece al subir) vía data-aa-navbar.

import { renderButton } from '../atoms/button';
import { UPLOADS } from '../../core/config/brand';
import { t } from '../../core/i18n';

export { initMegaNav } from '../behaviors/mega-nav';

const ATOM_LOGO = `${UPLOADS}/2023/03/logo-atom-chat.png`;
const META_BADGE = `${UPLOADS}/2023/08/MBP-Badge-Dark-backgrounds@1x.png`;

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  attrs: Record<string, string> = {},
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function buildLogo(src: string, alt: string, modifier: string): HTMLImageElement {
  const img = el('img', `aa-nav__logo aa-nav__logo--${modifier}`);
  img.src = src;
  img.alt = alt;
  img.loading = 'eager';
  img.decoding = 'async';
  return img;
}

function buildBrand(): HTMLAnchorElement {
  const brand = el('a', 'aa-nav__brand', { href: '#', 'aria-label': 'Atom' });
  const divider = el('span', 'aa-nav__divider', { 'aria-hidden': 'true' });
  brand.append(
    buildLogo(ATOM_LOGO, 'Atom', 'atom'),
    divider,
    buildLogo(META_BADGE, 'Meta Business Partner', 'meta'),
  );
  return brand;
}

export function renderNavbar(root: Element): void {
  const bar = el('header', 'aa-navbar', { 'data-aa-navbar': '' });
  const barRow = el('div', 'aa-nav__bar');
  const inner = el('div', 'aa-nav__inner aa-container');
  const start = el('div', 'aa-nav__start');

  const cta = el('div', 'aa-nav__cta');
  cta.appendChild(renderButton({ label: t('navbar.cta'), variant: 'primary', size: 'sm' }));

  start.append(buildBrand(), cta);
  inner.appendChild(start);
  barRow.appendChild(inner);
  bar.appendChild(barRow);
  root.appendChild(bar);
}

const TOP_THRESHOLD = 8; // px — por debajo de esto se considera "en el tope"

// Smart reveal: oculta la navbar al bajar (fuera del tope), la muestra al subir o en el tope.
export function initNavbar(scope: Element): void {
  const bar = scope.querySelector<HTMLElement>('[data-aa-navbar]');
  if (!bar) return;

  let lastY = window.scrollY;
  let rafId = 0;
  let hiddenPrev = false;

  const update = (): void => {
    rafId = 0;
    const y = window.scrollY;
    const atTop = y <= TOP_THRESHOLD;
    const scrollingDown = y > lastY;
    const hidden = scrollingDown && !atTop;
    bar.classList.toggle('aa-navbar--hidden', hidden);
    if (hidden && !hiddenPrev) bar.dispatchEvent(new CustomEvent('aa-navbar:hidden'));
    hiddenPrev = hidden;
    lastY = y;
  };

  const onScroll = (): void => {
    if (!rafId) rafId = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update(); // estado inicial
}
