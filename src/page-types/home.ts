// Composer de la página home: compone los organisms/widgets dentro del mount y arranca
// los behaviors. Sus imports estáticos quedan en el chunk de home; GSAP y atoms comunes
// los extrae esbuild a chunks compartidos.

import type { PageContext } from '../core/boot/registry';
import { loadGsap } from '../core/motion/gsap-env';
import { initMotion } from '../core/motion/motion';
import { initAccordion } from '../design-system/behaviors/accordion';
import { initSliders } from '../design-system/behaviors/slider';
import { initChats } from '../design-system/behaviors/chat';
import { initMomentumHover } from '../design-system/behaviors/momentum-hover';
import { initCursor } from '../design-system/behaviors/cursor';
import { initRotatingText } from '../design-system/behaviors/rotating-text';
import { initOdometer } from '../design-system/behaviors/odometer';
import { initLottie } from '../design-system/behaviors/lottie';
import { renderBackground } from '../design-system/behaviors/background';
import { renderMarquee, initMarquee } from '../design-system/behaviors/marquee';
import { initMetaTheme } from '../design-system/behaviors/meta-theme';
import { renderNavbar, initNavbar, initMegaNav } from '../design-system/organisms/navbar';
import {
  renderHero,
  initHeroMessages,
  initBottomMarquee,
  heroFromStrings,
} from '../design-system/organisms/hero';
import { renderWhatAtomDoes } from '../design-system/organisms/what-atom-does';
import { renderFeatures } from '../design-system/organisms/features';
import { renderOnboarding, initOnboarding } from '../design-system/organisms/onboarding';
import { renderHowItWorks, initVerticalMarquee } from '../design-system/organisms/how-it-works';
import { renderLogos } from '../design-system/organisms/logos';
import { renderContentSections } from '../design-system/organisms/content-sections';
import { initReviewsMarquee } from '../design-system/behaviors/reviews-marquee';
import { initTabs } from '../design-system/behaviors/tabs';
import { renderCac } from '../design-system/organisms/cac';
import { initBadgesMarquee } from '../design-system/behaviors/badges-marquee';
import { renderFooter } from '../design-system/organisms/footer';
// import { renderWaitlist } from '../widgets/contact-form/presets/waitlist'; // strip oculta en el home

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

export async function render(mount: HTMLElement, ctx: PageContext): Promise<void> {
  await loadGsap(); // carga + registra GSAP (dynamic import) antes de cualquier tween/ScrollTrigger

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
  renderWhatAtomDoes(root); // strip "qué hace atom" bajo el hero
  renderFeatures(root); // tarjetas de features (réplica anatomía fourmula)
  renderHowItWorks(root); // "Cómo funciona": grid + marquee vertical de features
  renderLogos(root); // "Trusted by": marquee horizontal de logos
  renderOnboarding(root); // soporte/facilidad: stack 3D de pasos, bajo el marquee de logos
  renderContentSections(root);
  renderCac(root); // bloque CAC: texto + CTA + marquee de badges (movidas del footer)
  // Strip del formulario oculta en el home.
  // renderWaitlist(root);
  renderFooter(root);
  // El bloque CAC vive justo arriba de la sección de reseñas.
  const cac = root.querySelector('#aa-cac');
  const reviews = root.querySelector('#aa-reviews');
  if (cac && reviews) root.insertBefore(cac, reviews);
  // El form vive entre "Para quién" (audience) y "Primera generación" (#aa-generacion).
  // const waitlist = root.querySelector('#aa-waitlist');
  // const generacion = root.querySelector('#aa-generacion');
  // if (waitlist && generacion) root.insertBefore(waitlist, generacion);

  mount.replaceChildren(root);
  initAnchorScroll(root);
  initHeroMessages(root); // motor de spawn (ambient + cursor) — tras montar en el DOM
  initBottomMarquee(root); // loop + grow/squash de la tira inferior del hero
  initVerticalMarquee(root); // marquee vertical de "Cómo funciona"
  initAccordion(root);
  initSliders(root);
  initChats(root);
  initMomentumHover(root);
  initCursor(root);
  initRotatingText(root);
  initOdometer(root); // stats que ruedan al entrar en viewport
  initOnboarding(root); // pin + 3D del stack de pasos
  initReviewsMarquee(root); // reseñas: marquee scroll-driven en sentidos opuestos
  initBadgesMarquee(root); // CAC: marquee infinito de badges
  initTabs(root); // sección "motor de IA": selector de tabs
  initLottie(root); // lotties lazy (carga el lib al acercarse al viewport)
  initMarquee(root);
  initNavbar(root);
  initMegaNav(root);
  initMetaTheme(root);
  initMotion(root);
}
