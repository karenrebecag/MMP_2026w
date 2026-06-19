// Navbar full-width bajo el marquee: mega-nav estilo OSMO adaptado a nuestro DS.
// Estructura: marca (Atom + Meta) a la izq · nav links con dropdowns mega · selector de
// idioma + CTA a la der. Desktop: dropdown morphing con hover intent direccional. Mobile:
// slide-over con burger y paneles laterales. Interacción en behaviors/mega-nav.ts.
// Patrón "smart reveal" heredado: visible en el tope y al subir; se oculta al bajar.
//
// El contenido de los paneles es PLACEHOLDER (a conectar con contenido/IA real luego).

import { renderButton } from '../atoms/button';
import { UPLOADS } from '../../core/config/brand';
import { t, getLang } from '../../core/i18n';
import type { Lang } from '../../core/types';

export { initMegaNav } from '../behaviors/mega-nav';

const ATOM_LOGO = `${UPLOADS}/2023/03/logo-atom-chat.png`;
const META_BADGE = `${UPLOADS}/2023/08/MBP-Badge-Dark-backgrounds@1x.png`;

const LANGS: { code: Lang; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
];

// ─── Modelo de navegación (PLACEHOLDER) ─────────────────────────────────────────
interface PanelLink {
  text: string;
  desc?: string;
  href: string;
}
interface PanelCol {
  label: string;
  links: PanelLink[];
  colored?: boolean;
}
interface NavItem {
  label: string;
  key?: string; // si hay key → dropdown; si no → link plano
  href?: string;
  cols?: PanelCol[];
}

const PH = 'Placeholder';
const NAV: NavItem[] = [
  {
    label: 'Producto',
    key: 'product',
    cols: [
      {
        label: 'Plataforma',
        links: [
          { text: 'Overview', desc: PH, href: '#' },
          { text: 'Analítica', desc: PH, href: '#' },
          { text: 'Integraciones', desc: PH, href: '#' },
        ],
      },
      {
        label: 'Capacidades',
        links: [
          { text: 'Automatización', desc: PH, href: '#' },
          { text: 'Reportes', desc: PH, href: '#' },
          { text: 'IA', desc: PH, href: '#' },
        ],
      },
      {
        label: 'Infraestructura',
        colored: true,
        links: [
          { text: 'Cloud', desc: PH, href: '#' },
          { text: 'Seguridad', desc: PH, href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Soluciones',
    key: 'solutions',
    cols: [
      {
        label: 'Por caso de uso',
        links: [
          { text: 'Retail', desc: PH, href: '#' },
          { text: 'Finanzas', desc: PH, href: '#' },
          { text: 'Educación', desc: PH, href: '#' },
        ],
      },
      {
        label: 'Por tamaño',
        links: [
          { text: 'Startups', desc: PH, href: '#' },
          { text: 'Enterprise', desc: PH, href: '#' },
        ],
      },
      {
        label: 'Enlaces',
        colored: true,
        links: [
          { text: 'Casos de éxito', href: '#' },
          { text: 'Partners', href: '#' },
        ],
      },
    ],
  },
  { label: 'Precios', href: '#' },
];

const CHEVRON = `<svg width="100%" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6.6665 8.3335L9.99984 11.6668L13.3332 8.3335" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const BACK_ICON = `<svg width="100%" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M11.6665 6.6665L8.33317 9.99984L11.6665 13.3332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

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
  const brand = el('a', 'aa-nav__brand', { 'data-menu-logo': '', href: '#', 'aria-label': 'Atom' });
  const divider = el('span', 'aa-nav__divider', { 'aria-hidden': 'true' });
  brand.append(
    buildLogo(ATOM_LOGO, 'Atom', 'atom'),
    divider,
    buildLogo(META_BADGE, 'Meta Business Partner', 'meta'),
  );
  return brand;
}

function buildNavList(): HTMLUListElement {
  const list = el('ul', 'aa-nav__list');
  NAV.forEach((item) => {
    const li = el('li', '', { 'data-nav-list-item': '' });
    if (item.key) {
      const btn = el('button', 'aa-nav__link is--dropdown', {
        'data-dropdown-toggle': item.key,
        'aria-expanded': 'false',
        'aria-haspopup': 'true',
      });
      btn.innerHTML = `<span class="aa-nav__link-label">${item.label}</span><span class="aa-nav__link-icon is--dropdown">${CHEVRON}</span>`;
      li.appendChild(btn);
    } else {
      const a = el('a', 'aa-nav__link', { href: item.href ?? '#' });
      a.innerHTML = `<span class="aa-nav__link-label">${item.label}</span>`;
      li.appendChild(a);
    }
    list.appendChild(li);
  });
  return list;
}

function buildLangSelector(): HTMLDivElement {
  const current = getLang();
  const wrap = el('div', 'aa-nav__lang', { 'data-lang-selector': '' });
  const toggle = el('button', 'aa-nav__lang-toggle', {
    'aria-haspopup': 'true',
    'aria-expanded': 'false',
    'aria-label': 'Idioma',
  });
  const label = LANGS.find((l) => l.code === current)?.label ?? 'ES';
  toggle.innerHTML = `<span class="aa-nav__lang-current">${label}</span><span class="aa-nav__link-icon is--dropdown">${CHEVRON}</span>`;
  const menu = el('ul', 'aa-nav__lang-menu');
  LANGS.forEach((l) => {
    const item = el('li', '');
    const opt = el('button', `aa-nav__lang-opt${l.code === current ? ' is--active' : ''}`, {
      'data-lang': l.code,
    });
    opt.textContent = l.label;
    item.appendChild(opt);
    menu.appendChild(item);
  });
  wrap.append(toggle, menu);
  return wrap;
}

function buildPanel(item: NavItem): HTMLDivElement {
  const panel = el('div', 'aa-nav__panel', {
    'data-panel-state': '',
    'data-nav-content': item.key ?? '',
    role: 'region',
    'aria-label': `${item.label} menu`,
  });
  const inner = el('div', 'aa-nav__panel-inner aa-container');
  (item.cols ?? []).forEach((col) => {
    const colEl = el('div', `aa-nav__col${col.colored ? ' is--colored' : ''}`, {
      'data-menu-fade': '',
    });
    const label = el('span', 'aa-nav__col-label', { 'data-menu-fade': '' });
    label.textContent = col.label;
    const ul = el('ul', 'aa-nav__col-list');
    col.links.forEach((lk) => {
      const liEl = el('li', '', { 'data-menu-fade': '' });
      const a = el('a', 'aa-nav__panel-link', { href: lk.href });
      a.innerHTML = `<span class="aa-nav__panel-link-text">${lk.text}</span>${lk.desc ? `<span class="aa-nav__panel-link-desc">${lk.desc}</span>` : ''}`;
      liEl.appendChild(a);
      ul.appendChild(liEl);
    });
    colEl.append(label, ul);
    inner.appendChild(colEl);
  });
  panel.appendChild(inner);
  return panel;
}

export function renderNavbar(root: Element): void {
  const bar = el('header', 'aa-navbar', {
    'data-aa-navbar': '',
    'data-menu-wrap': '',
    'data-menu-open': 'false',
  });

  // Barra principal
  const barRow = el('div', 'aa-nav__bar');
  const inner = el('div', 'aa-nav__inner aa-container');
  const start = el('div', 'aa-nav__start');

  // Marca + lista de nav (en mobile, la lista se vuelve panel slide-over).
  const navGroup = el('div', 'aa-nav__group', { 'data-nav-list': '', 'data-mobile-nav': '' });
  const list = buildNavList();

  const actions = el('ul', 'aa-nav__list is--actions', { 'data-nav-list-item': '' });
  const langLi = el('li', 'aa-nav__action');
  langLi.appendChild(buildLangSelector());
  const ctaLi = el('li', 'aa-nav__action');
  ctaLi.appendChild(
    renderButton({ label: t('navbar.cta'), href: '#aa-waitlist', variant: 'primary', size: 'sm' }),
  );
  actions.append(langLi, ctaLi);
  navGroup.append(list, actions);

  // Burger (mobile) + back (mobile, dentro de panel)
  const end = el('div', 'aa-nav__end');
  const burger = el('button', 'aa-nav__burger', {
    'data-burger-toggle': '',
    'aria-label': 'toggle menu',
    'aria-expanded': 'false',
  });
  burger.innerHTML = `<span data-burger-line="top" class="aa-nav__burger-line"></span><span data-burger-line="mid" class="aa-nav__burger-line"></span><span data-burger-line="bot" class="aa-nav__burger-line"></span>`;
  end.appendChild(burger);

  const back = el('div', 'aa-nav__back', { 'data-mobile-back': '' });
  back.innerHTML = `<button aria-label="back to menu" class="aa-nav__link is--back"><span class="aa-nav__link-icon">${BACK_ICON}</span><span class="aa-nav__link-label">Volver</span></button>`;

  start.append(buildBrand(), navGroup, end, back);
  inner.appendChild(start);
  barRow.appendChild(inner);

  // Dropdown wrapper (paneles mega)
  const ddWrap = el('div', 'aa-nav__dd-wrap', { 'data-dropdown-wrapper': '' });
  const ddContainer = el('div', 'aa-nav__dd-container', { 'data-dropdown-container': '' });
  ddContainer.appendChild(el('div', 'aa-nav__dd-bg', { 'data-dropdown-bg': '' }));
  NAV.filter((i) => i.key).forEach((i) => ddContainer.appendChild(buildPanel(i)));
  ddWrap.appendChild(ddContainer);

  const backdrop = el('div', 'aa-nav__backdrop', { 'data-menu-backdrop': '' });

  bar.append(barRow, ddWrap, backdrop);
  root.appendChild(bar);
}

const TOP_THRESHOLD = 8; // px — por debajo de esto se considera "en el tope"

export function initNavbar(scope: Element): void {
  const bar = scope.querySelector<HTMLElement>('[data-aa-navbar]');
  if (!bar) return;

  // Selector de idioma: abre/cierra menú; al elegir, persiste y recarga (boot lo lee).
  const langSel = bar.querySelector<HTMLElement>('[data-lang-selector]');
  if (langSel) {
    const toggle = langSel.querySelector<HTMLButtonElement>('.aa-nav__lang-toggle');
    toggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = langSel.classList.toggle('is--open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    langSel.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((opt) => {
      opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        if (!lang) return;
        try {
          localStorage.setItem('aa-lang', lang);
        } catch {
          /* storage no disponible: el reload caerá al data-aa-lang del embed */
        }
        location.reload();
      });
    });
    document.addEventListener('click', (e) => {
      if (!langSel.contains(e.target as Node)) {
        langSel.classList.remove('is--open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  let lastY = window.scrollY;
  let rafId = 0;
  let hiddenPrev = false;

  const update = (): void => {
    rafId = 0;
    const y = window.scrollY;
    const atTop = y <= TOP_THRESHOLD;
    const scrollingDown = y > lastY;
    // Oculta solo al bajar fuera del tope; muestra en el tope o al subir.
    const hidden = scrollingDown && !atTop;
    bar.classList.toggle('aa-navbar--hidden', hidden);
    // Al ocultarse, el mega-nav escucha esto para cerrar su dropdown (mismo comportamiento).
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
