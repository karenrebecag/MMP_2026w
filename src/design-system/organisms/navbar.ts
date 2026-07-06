// Navbar minimal bajo el marquee: marca (Atom + Meta) a la izquierda · CTA a la derecha.
// Sin mega-nav, sin nav links, sin selector de idioma. Smart reveal en behaviors/navbar
// (se oculta al bajar, aparece al subir) vía data-aa-navbar.

import { renderButton } from '../atoms/button';
import { UPLOADS } from '../../core/config/brand';
import { NAV_URLS, type NavUrls } from '../../core/config/nav';
import { t, getLang } from '../../core/i18n';

export { initMegaNav } from '../behaviors/mega-nav';

const ATOM_LOGO = `${UPLOADS}/2023/03/logo-atom-chat.png`;
const META_BADGE = `${UPLOADS}/2023/08/MBP-Badge-Dark-backgrounds@1x.png`;

// Chevron del dropdown (inline, currentColor). Trusted static string.
const CHEVRON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;

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

// El logo lleva al home del idioma actual (language-aware).
function buildBrand(homeHref: string): HTMLAnchorElement {
  const brand = el('a', 'aa-nav__brand', { href: homeHref, 'aria-label': 'Atom' });
  const divider = el('span', 'aa-nav__divider', { 'aria-hidden': 'true' });
  brand.append(
    buildLogo(ATOM_LOGO, 'Atom', 'atom'),
    divider,
    buildLogo(META_BADGE, 'Meta Business Partner', 'meta'),
  );
  return brand;
}

// Dropdown "Industrias" con las 3 páginas del idioma actual.
function buildNavLinks(nav: NavUrls): HTMLElement {
  const wrap = el('nav', 'aa-nav__links', { 'aria-label': nav.industriasLabel });
  const dd = el('div', 'aa-nav__dropdown', { 'data-aa-nav-dropdown': '' });

  const trigger = el('button', 'aa-nav__dropdown-trigger', {
    type: 'button',
    'aria-haspopup': 'true',
    'aria-expanded': 'false',
  });
  const label = document.createElement('span');
  label.textContent = nav.industriasLabel;
  const chevron = el('span', 'aa-nav__chevron', { 'aria-hidden': 'true' });
  chevron.innerHTML = CHEVRON;
  trigger.append(label, chevron);

  const menu = el('ul', 'aa-nav__menu');
  nav.industrias.forEach((it) => {
    const li = document.createElement('li');
    li.className = 'aa-nav__menu-item';
    const a = el('a', 'aa-nav__menu-link', { href: it.href });
    a.textContent = it.label;
    li.appendChild(a);
    menu.appendChild(li);
  });

  dd.append(trigger, menu);
  wrap.appendChild(dd);
  return wrap;
}

export function renderNavbar(root: Element): void {
  const nav = NAV_URLS[getLang()];
  const bar = el('header', 'aa-navbar', { 'data-aa-navbar': '' });
  const barRow = el('div', 'aa-nav__bar');
  const inner = el('div', 'aa-nav__inner aa-container');
  const start = el('div', 'aa-nav__start');

  const cta = el('div', 'aa-nav__cta');
  cta.appendChild(renderButton({ label: t('navbar.cta'), variant: 'primary' }));

  start.append(buildBrand(nav.home), buildNavLinks(nav), cta);
  inner.appendChild(start);
  barRow.appendChild(inner);
  bar.appendChild(barRow);
  root.appendChild(bar);
}

// Toggle del dropdown por click (táctil/teclado); en desktop además abre por hover (CSS).
function initNavDropdown(scope: Element): void {
  const dd = scope.querySelector<HTMLElement>('[data-aa-nav-dropdown]');
  const trigger = dd?.querySelector<HTMLButtonElement>('.aa-nav__dropdown-trigger');
  if (!dd || !trigger) return;

  const close = (): void => {
    dd.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  };

  trigger.addEventListener('click', () => {
    const open = dd.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target as Node)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
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

  initNavDropdown(scope);
}
