// Mega-nav (OSMO "Directional Hover" adaptado): dropdown morphing en desktop (hover intent +
// cambio direccional de panel) y slide-over en mobile (≤991px). Scopeado al [data-menu-wrap]
// del navbar; toda referencia DOM se busca dentro de él. GSAP desde gsap-env.

import { gsap } from '../../core/motion/gsap-env';

type TL = ReturnType<typeof gsap.timeline> | null;

const DUR = {
  bgMorph: 0.4,
  contentIn: 0.3,
  contentOut: 0.2,
  stagger: 0.25,
  backdropIn: 0.3,
  backdropOut: 0.2,
  openScale: 0.35,
  closeScale: 0.25,
};
const HOVER_ENTER = 120;
const HOVER_LEAVE = 150;
const MOBILE_MAX = 991;

export function initMegaNav(scope: Element): void {
  const menuWrap = scope.querySelector<HTMLElement>('[data-menu-wrap]');
  if (!menuWrap) return;

  const q = <T extends Element = HTMLElement>(sel: string): T | null =>
    menuWrap.querySelector<T>(sel);
  const qa = <T extends Element = HTMLElement>(sel: string): T[] =>
    Array.from(menuWrap.querySelectorAll<T>(sel));

  const navList = q('[data-nav-list]');
  const dropWrapper = q('[data-dropdown-wrapper]');
  const dropContainer = q('[data-dropdown-container]');
  const backdrop = q('[data-menu-backdrop]');
  const toggles = qa<HTMLButtonElement>('[data-dropdown-toggle]');
  const panels = qa('[data-nav-content]');
  const burger = q<HTMLButtonElement>('[data-burger-toggle]');
  const backBtn = q('[data-mobile-back]');
  const logo = q('[data-menu-logo]');
  const lineTop = q("[data-burger-line='top']");
  const lineMid = q("[data-burger-line='mid']");
  const lineBot = q("[data-burger-line='bot']");
  if (!navList || !dropWrapper || !dropContainer || !backdrop || !burger || !backBtn || !logo) return;

  const state = {
    isOpen: false,
    activePanel: null as string | null,
    isMobile: window.innerWidth <= MOBILE_MAX,
    mobileMenuOpen: false,
    mobilePanelActive: null as string | null,
    hoverTimer: 0,
    leaveTimer: 0,
    tl: null as TL,
    mobileTl: null as TL,
    mobilePanelTl: null as TL,
  };

  const getPanel = (name: string): HTMLElement | null =>
    menuWrap.querySelector<HTMLElement>(`[data-nav-content="${name}"]`);
  const getToggle = (name: string): HTMLElement | null =>
    menuWrap.querySelector<HTMLElement>(`[data-dropdown-toggle="${name}"]`);
  const getFade = (el: Element): HTMLElement[] =>
    Array.from(el.querySelectorAll<HTMLElement>('[data-menu-fade]'));
  const getNavItems = (): HTMLElement[] =>
    Array.from(navList.querySelectorAll<HTMLElement>('[data-nav-list-item]'));
  const getIndex = (name: string): number => toggles.indexOf(getToggle(name) as HTMLButtonElement);
  const staggerCfg = (n: number): number | gsap.StaggerVars =>
    n <= 1 ? 0 : { amount: DUR.stagger };

  function clearTimers(): void {
    clearTimeout(state.hoverTimer);
    clearTimeout(state.leaveTimer);
    state.hoverTimer = state.leaveTimer = 0;
  }
  function killTl(key: 'tl' | 'mobileTl' | 'mobilePanelTl'): void {
    if (state[key]) {
      state[key]!.kill();
      state[key] = null;
    }
  }
  function killDropdown(): void {
    killTl('tl');
    gsap.killTweensOf(dropContainer);
    gsap.killTweensOf(backdrop);
    panels.forEach((p) => {
      gsap.killTweensOf(p);
      gsap.killTweensOf(getFade(p));
    });
  }
  function resetToggles(): void {
    toggles.forEach((tg) => tg.setAttribute('aria-expanded', 'false'));
  }

  function resetDesktop(): void {
    panels.forEach((p) => {
      gsap.set(p, { visibility: 'hidden', opacity: 0, pointerEvents: 'none', x: 0, y: 0 });
      gsap.set(getFade(p), { autoAlpha: 0, x: 0, y: 0 });
    });
    gsap.set(dropContainer, { height: 0, clearProps: 'transform' });
    gsap.set(backdrop, { autoAlpha: 0 });
    menuWrap!.setAttribute('data-menu-open', 'false');
    resetToggles();
  }

  function setupMobile(): void {
    panels.forEach((p) => {
      gsap.set(p, { autoAlpha: 0, xPercent: 0, visibility: 'visible', pointerEvents: 'none' });
      gsap.set(getFade(p), { xPercent: 20, autoAlpha: 0 });
    });
    gsap.set(getNavItems(), { xPercent: 0, y: 0, autoAlpha: 1 });
    gsap.set(navList, { autoAlpha: 0, x: 0 });
    gsap.set(backBtn, { autoAlpha: 0 });
    gsap.set(logo, { autoAlpha: 1 });
    gsap.set(dropContainer, { clearProps: 'height' });
    gsap.set(backdrop, { autoAlpha: 0 });
  }

  // Mide la altura del panel sin mostrarlo (para morphear el contenedor).
  function measurePanel(name: string): number {
    const elp = getPanel(name);
    if (!elp) return 0;
    const s = elp.style;
    const prev = [s.visibility, s.opacity, s.pointerEvents] as const;
    Object.assign(s, { visibility: 'visible', opacity: '0', pointerEvents: 'none' });
    const h = elp.getBoundingClientRect().height;
    [s.visibility, s.opacity, s.pointerEvents] = prev;
    return h;
  }

  // ── DESKTOP: abrir ──────────────────────────────────────────────────────────
  function openDropdown(name: string): void {
    if (state.isOpen && state.activePanel === name) return;
    if (state.isOpen) return switchPanel(state.activePanel as string, name);

    const height = measurePanel(name);
    if (!height) return;
    killDropdown();
    resetDesktop();

    const elp = getPanel(name)!;
    const fade = getFade(elp);
    const toggle = getToggle(name);

    state.isOpen = true;
    state.activePanel = name;
    menuWrap!.setAttribute('data-menu-open', 'true');
    toggle?.setAttribute('aria-expanded', 'true');

    gsap.set(dropContainer, { height: 0 });
    const tl = gsap.timeline();
    state.tl = tl;
    tl.to(backdrop, { autoAlpha: 1, duration: DUR.backdropIn, ease: 'power2.out' }, 0);
    tl.to(dropContainer, { height, duration: DUR.openScale, ease: 'power3.out' }, 0);
    tl.set(elp, { visibility: 'visible', opacity: 1, pointerEvents: 'auto' }, 0.05);
    if (fade.length) {
      tl.fromTo(
        fade,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: DUR.contentIn, stagger: staggerCfg(fade.length), ease: 'power3.out' },
        0.1,
      );
    }
  }

  // ── DESKTOP: cerrar ─────────────────────────────────────────────────────────
  function closeDropdown(): void {
    if (!state.isOpen) return;
    const elp = state.activePanel ? getPanel(state.activePanel) : null;
    const fade = elp ? getFade(elp) : [];
    killDropdown();
    const tl = gsap.timeline({
      onComplete() {
        state.isOpen = false;
        state.activePanel = null;
        state.tl = null;
        resetDesktop();
      },
    });
    state.tl = tl;
    if (fade.length) tl.to(fade, { autoAlpha: 0, y: -4, duration: DUR.contentOut * 0.7, ease: 'power2.in' }, 0);
    tl.to(dropContainer, { height: 0, duration: DUR.closeScale, ease: 'power2.in' }, 0.05);
    tl.to(backdrop, { autoAlpha: 0, duration: DUR.backdropOut, ease: 'power2.out' }, 0);
    if (elp) tl.set(elp, { visibility: 'hidden', opacity: 0, pointerEvents: 'none' });
  }

  // ── DESKTOP: cambiar de panel (direccional) ──────────────────────────────────
  function switchPanel(fromName: string, toName: string): void {
    const dir = getIndex(toName) > getIndex(fromName) ? 1 : -1;
    const fromEl = getPanel(fromName);
    const toEl = getPanel(toName);
    if (!fromEl || !toEl) return;
    const fromFade = getFade(fromEl);
    const toFade = getFade(toEl);
    const toHeight = measurePanel(toName);
    if (!toHeight) return;
    killDropdown();

    panels.forEach((p) => {
      gsap.set(p, { visibility: 'hidden', opacity: 0, pointerEvents: 'none', xPercent: 0 });
      gsap.set(getFade(p), { autoAlpha: 0, x: 0, y: 0 });
    });
    gsap.set(fromEl, { visibility: 'visible', opacity: 1, pointerEvents: 'auto', x: 0 });
    if (fromFade.length) gsap.set(fromFade, { autoAlpha: 1, x: 0, y: 0 });
    gsap.set(backdrop, { autoAlpha: 1 });

    state.activePanel = toName;
    resetToggles();
    getToggle(toName)?.setAttribute('aria-expanded', 'true');

    const xOut = dir * -30;
    const xIn = dir * 30;
    const tl = gsap.timeline();
    state.tl = tl;
    if (fromFade.length) tl.to(fromFade, { autoAlpha: 0, x: xOut, duration: DUR.contentOut, ease: 'power2.in' }, 0);
    tl.set(fromEl, { visibility: 'hidden', opacity: 0, pointerEvents: 'none' }, DUR.contentOut);
    tl.to(dropContainer, { height: toHeight, duration: DUR.bgMorph, ease: 'power3.out' }, 0.05);
    tl.set(toEl, { visibility: 'visible', opacity: 1, pointerEvents: 'auto' }, DUR.contentOut * 0.5);
    if (toFade.length) {
      tl.fromTo(
        toFade,
        { autoAlpha: 0, x: xIn },
        { autoAlpha: 1, x: 0, duration: DUR.contentIn, stagger: staggerCfg(toFade.length), ease: 'power3.out' },
        DUR.contentOut * 0.6,
      );
    }
  }

  // ── DESKTOP: hover intent ─────────────────────────────────────────────────────
  function onToggleEnter(e: Event): void {
    if (state.isMobile) return;
    const name = (e.currentTarget as HTMLElement).getAttribute('data-dropdown-toggle');
    if (!name) return;
    clearTimeout(state.leaveTimer);
    state.leaveTimer = 0;
    clearTimeout(state.hoverTimer);
    state.hoverTimer = window.setTimeout(() => openDropdown(name), state.isOpen ? 0 : HOVER_ENTER);
  }
  function onToggleLeave(): void {
    if (state.isMobile) return;
    clearTimeout(state.hoverTimer);
    state.hoverTimer = 0;
    state.leaveTimer = window.setTimeout(closeDropdown, HOVER_LEAVE);
  }
  function onWrapperEnter(): void {
    if (state.isMobile) return;
    clearTimeout(state.leaveTimer);
    state.leaveTimer = 0;
  }
  function onWrapperLeave(): void {
    if (state.isMobile) return;
    state.leaveTimer = window.setTimeout(closeDropdown, HOVER_LEAVE);
  }

  // ── MOBILE: burger → X ────────────────────────────────────────────────────────
  function animateBurger(toX: boolean): ReturnType<typeof gsap.timeline> {
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    if (toX) {
      tl.to(lineTop, { y: '0.3125em', duration: 0.15 }, 0);
      tl.to(lineBot, { y: '-0.3125em', duration: 0.15 }, 0);
      tl.to(lineMid, { autoAlpha: 0, duration: 0.1 }, 0.1);
      tl.to(lineTop, { rotation: 45, duration: 0.2 }, 0.15);
      tl.to(lineBot, { rotation: -45, duration: 0.2 }, 0.15);
    } else {
      tl.to([lineTop, lineBot], { rotation: 0, duration: 0.2 }, 0);
      tl.to([lineTop, lineBot], { y: 0, duration: 0.15 }, 0.15);
      tl.to(lineMid, { autoAlpha: 1, duration: 0.1 }, 0.15);
    }
    return tl;
  }

  function openMobileMenu(): void {
    killTl('mobileTl');
    gsap.killTweensOf([navList, lineTop, lineMid, lineBot]);
    state.mobileMenuOpen = true;
    menuWrap!.setAttribute('data-menu-open', 'true');
    burger!.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const items = getNavItems();
    const tl = gsap.timeline();
    state.mobileTl = tl;
    tl.add(animateBurger(true), 0);
    tl.to(navList, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }, 0);
    if (items.length) {
      tl.fromTo(items, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power3.out' }, 0.15);
    }
  }

  function closeMobileMenu(): void {
    const hadPanel = state.mobilePanelActive;
    const panelEl = hadPanel ? getPanel(hadPanel) : null;
    killTl('mobileTl');
    killTl('mobilePanelTl');
    gsap.killTweensOf([navList, lineTop, lineMid, lineBot]);
    menuWrap!.setAttribute('data-menu-open', 'false');
    state.mobileMenuOpen = false;
    state.mobilePanelActive = null;
    burger!.setAttribute('aria-expanded', 'false');
    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = '';
        state.mobileTl = null;
        setupMobile();
      },
    });
    state.mobileTl = tl;
    tl.add(animateBurger(false), 0);
    if (panelEl) {
      tl.to(panelEl, { autoAlpha: 0, duration: 0.3, ease: 'power2.inOut' }, 0.05);
      tl.to(backBtn, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, 0.05);
    }
    tl.to(navList, { autoAlpha: 0, duration: 0.3, ease: 'power2.inOut' }, 0.05);
  }

  function openMobilePanel(name: string): void {
    const elp = getPanel(name);
    if (!elp) return;
    killTl('mobilePanelTl');
    state.mobilePanelActive = name;
    const navItems = getNavItems();
    const fade = getFade(elp);
    const tl = gsap.timeline();
    state.mobilePanelTl = tl;
    if (navItems.length) tl.to(navItems, { xPercent: -10, autoAlpha: 0, duration: 0.35, stagger: 0.03, ease: 'power2.in' }, 0);
    tl.to(logo, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, 0);
    tl.to(backBtn, { autoAlpha: 1, duration: 0.25, ease: 'power2.inOut' }, 0.15);
    tl.set(elp, { autoAlpha: 1, xPercent: 0, pointerEvents: 'auto' }, 0.2);
    if (fade.length) {
      tl.fromTo(fade, { xPercent: 8, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.3, stagger: staggerCfg(fade.length), ease: 'power3.out' }, 0.25);
    }
  }

  function closeMobilePanel(): void {
    if (!state.mobilePanelActive) return;
    const elp = getPanel(state.mobilePanelActive);
    if (!elp) return;
    killTl('mobilePanelTl');
    const navItems = getNavItems();
    const tl = gsap.timeline({
      onComplete() {
        state.mobilePanelActive = null;
        state.mobilePanelTl = null;
      },
    });
    state.mobilePanelTl = tl;
    tl.to(elp, { xPercent: 20, autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, 0);
    tl.set(elp, { autoAlpha: 0, pointerEvents: 'none' }, 0.25);
    tl.to(backBtn, { autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, 0);
    tl.to(logo, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' }, 0.15);
    if (navItems.length) {
      tl.fromTo(navItems, { xPercent: -20, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.35, stagger: 0.03, ease: 'power3.out' }, 0.25);
    }
  }

  function onToggleClick(e: Event): void {
    if (!state.isMobile || !state.mobileMenuOpen) return;
    const name = (e.currentTarget as HTMLElement).getAttribute('data-dropdown-toggle');
    if (name) {
      e.preventDefault();
      openMobilePanel(name);
    }
  }

  // ── Cierre por teclado / click afuera ─────────────────────────────────────────
  function onEscape(e: KeyboardEvent): void {
    if (e.key !== 'Escape') return;
    if (state.isMobile) {
      if (state.mobilePanelActive) closeMobilePanel();
      else if (state.mobileMenuOpen) closeMobileMenu();
      return;
    }
    if (state.isOpen) {
      const tg = state.activePanel ? getToggle(state.activePanel) : null;
      closeDropdown();
      tg?.focus();
    }
  }
  function onToggleKeydown(e: KeyboardEvent): void {
    if (state.isMobile) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    const name = (e.currentTarget as HTMLElement).getAttribute('data-dropdown-toggle');
    if (!name) return;
    if (state.isOpen && state.activePanel === name) closeDropdown();
    else openDropdown(name);
  }
  function onDocClick(e: Event): void {
    if (state.isMobile || !state.isOpen) return;
    if (!(e.target as HTMLElement).closest('[data-menu-wrap]')) closeDropdown();
  }

  // ── Resize: rehidrata el modo correcto ────────────────────────────────────────
  let resizeTimer = 0;
  let lastWidth = window.innerWidth;
  function onResize(): void {
    const w = window.innerWidth;
    if (w === lastWidth) return;
    lastWidth = w;
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const was = state.isMobile;
      state.isMobile = window.innerWidth <= MOBILE_MAX;
      if (was && !state.isMobile) {
        killTl('mobileTl');
        killTl('mobilePanelTl');
        gsap.set(navList, { clearProps: 'all' });
        gsap.set(getNavItems(), { clearProps: 'all' });
        gsap.set(backBtn, { autoAlpha: 0 });
        gsap.set(logo, { clearProps: 'all' });
        gsap.set([lineTop, lineMid, lineBot], { rotation: 0, y: 0, autoAlpha: 1 });
        panels.forEach((p) => {
          gsap.set(p, { clearProps: 'all' });
          gsap.set(getFade(p), { clearProps: 'all' });
        });
        burger!.setAttribute('aria-expanded', 'false');
        state.mobileMenuOpen = false;
        state.mobilePanelActive = null;
        document.body.style.overflow = '';
        resetDesktop();
      }
      if (!was && state.isMobile) {
        killDropdown();
        state.isOpen = false;
        state.activePanel = null;
        clearTimers();
        menuWrap!.setAttribute('data-menu-open', 'false');
        resetToggles();
        setupMobile();
      }
    }, 150);
  }

  // ── Bind ──────────────────────────────────────────────────────────────────────
  toggles.forEach((btn) => {
    btn.addEventListener('mouseenter', onToggleEnter);
    btn.addEventListener('mouseleave', onToggleLeave);
    btn.addEventListener('keydown', onToggleKeydown);
    btn.addEventListener('click', onToggleClick);
  });
  dropWrapper.addEventListener('mouseenter', onWrapperEnter);
  dropWrapper.addEventListener('mouseleave', onWrapperLeave);
  backdrop.addEventListener('click', closeDropdown);
  document.addEventListener('keydown', onEscape);
  document.addEventListener('click', onDocClick);
  burger.addEventListener('click', () => (state.mobileMenuOpen ? closeMobileMenu() : openMobileMenu()));
  backBtn.addEventListener('click', closeMobilePanel);
  window.addEventListener('resize', onResize);

  // El dropdown se oculta bajo el mismo comportamiento del navbar: cuando éste se mete tras
  // el marquee (evento 'aa-navbar:hidden'), cerramos el panel para que no quede colgando.
  menuWrap.addEventListener('aa-navbar:hidden', () => {
    if (!state.isMobile && state.isOpen) closeDropdown();
  });

  // INIT
  if (state.isMobile) setupMobile();
  else resetDesktop();
}
