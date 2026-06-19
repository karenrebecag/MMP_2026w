// Composer de la página home: compone los organisms/widgets dentro del mount y arranca
// los behaviors. Sus imports estáticos quedan en el chunk de home; GSAP y atoms comunes
// los extrae esbuild a chunks compartidos.

import type { PageContext } from '../core/boot/registry';
import { initMotion } from '../core/motion/motion';
import { initAccordion } from '../design-system/behaviors/accordion';
import { initSliders } from '../design-system/behaviors/slider';
import { initChats } from '../design-system/behaviors/chat';
import { initMomentumHover } from '../design-system/behaviors/momentum-hover';
import { initCursor } from '../design-system/behaviors/cursor';
import { initRotatingText } from '../design-system/behaviors/rotating-text';
import { renderBackground } from '../design-system/behaviors/background';
import { renderMarquee, initMarquee } from '../design-system/behaviors/marquee';
import { initMetaTheme } from '../design-system/behaviors/meta-theme';
import { renderNavbar, initNavbar } from '../design-system/organisms/navbar';
import { renderHero, initHeroMessages, heroFromStrings } from '../design-system/organisms/hero';
import { renderContentSections } from '../design-system/organisms/content-sections';
import { renderFooter } from '../design-system/organisms/footer';
import { renderWaitlist } from '../widgets/contact-form/presets/waitlist';

// Scroll suave para anclas internas (#id) con scroll nativo.
function initAnchorScroll(root: HTMLElement): void {
  root.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href')?.slice(1);
    if (!id) return;
    const target = root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export function render(mount: HTMLElement, ctx: PageContext): void {
  // Root wrapper — todo el CSS está scopeado a .aa-landing
  const root = document.createElement('div');
  root.className = 'aa-landing';
  root.setAttribute('data-aa-theme', ctx.theme);
  root.setAttribute('data-aa-lang', ctx.lang);

  // Cada sección se importa como módulo y recibe `root` como contenedor.
  renderBackground(root); // bg fijo texturizado detrás de todo
  renderMarquee(root); // barra fija superior (botón de registro permanente)
  renderNavbar(root); // navbar blanca de marca bajo el marquee
  renderHero(root, heroFromStrings()); // hero "messages": mensajes que brotan
  renderContentSections(root);
  renderWaitlist(root);
  renderFooter(root);
  // El form vive entre "Para quién" (audience) y "Primera generación" (#aa-generacion).
  const waitlist = root.querySelector('#aa-waitlist');
  const generacion = root.querySelector('#aa-generacion');
  if (waitlist && generacion) root.insertBefore(waitlist, generacion);

  mount.replaceChildren(root);
  initAnchorScroll(root);
  initHeroMessages(root); // motor de spawn (ambient + cursor) — tras montar en el DOM
  initAccordion(root);
  initSliders(root);
  initChats(root);
  initMomentumHover(root);
  initCursor(root);
  initRotatingText(root);
  initMarquee(root);
  initNavbar(root);
  initMetaTheme(root);
  initMotion(root);
}
