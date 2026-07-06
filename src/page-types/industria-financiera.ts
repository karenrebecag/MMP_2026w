// Composer de la página industria: financiera. Monta el chrome de marca (background, marquee,
// navbar, footer) y compone las secciones. La ESTRUCTURA (íconos, tint, video, orden) vive aquí;
// el COPY viene de content/industrias (i18n por data-aa-lang). Su propio chunk (lazy).

import type { PageContext } from '../core/boot/registry';
import { loadGsap } from '../core/motion/gsap-env';
import { initMotion } from '../core/motion/motion';
import { renderBackground } from '../design-system/behaviors/background';
import { renderMarquee, initMarquee } from '../design-system/behaviors/marquee';
import { initMetaTheme } from '../design-system/behaviors/meta-theme';
import { renderNavbar, initNavbar, initMegaNav } from '../design-system/organisms/navbar';
import { renderFooter } from '../design-system/organisms/footer';
import { initWhatsApp } from '../design-system/behaviors/whatsapp';
import { renderIndustriaHero } from '../design-system/organisms/industria-hero';
import { renderIndustriaLogos } from '../design-system/organisms/industria-logos';
import { renderIndustriaBenefits } from '../design-system/organisms/industria-benefits';
import { renderIndustriaSplit } from '../design-system/organisms/industria-split';
import { renderIndustriaSteps } from '../design-system/organisms/industria-steps';
import { renderIndustriaAutomations } from '../design-system/organisms/industria-automations';
import { renderIndustriaConnect } from '../design-system/organisms/industria-connect';
import { renderReviews } from '../design-system/organisms/content-sections';
import { renderCac } from '../design-system/organisms/cac';
import { initReviewsMarquee } from '../design-system/behaviors/reviews-marquee';
import { initBadgesMarquee } from '../design-system/behaviors/badges-marquee';
import { getIndustria } from '../content/industrias';
import type { IconName } from '../design-system/atoms/icon';
import { industriaHeroVideo } from '../assets/r2';

const INDUSTRY = 'financiera';
// Estructura del cluster: tint (bg sutil) + íconos por card. El copy vive en content/industrias.
const TINT = '#DDE5ED';
const BENEFIT_ICONS: IconName[] = ['user-check', 'timer', 'phone-call', 'hand-coins'];
const SPLIT_ICONS: IconName[] = ['message-circle', 'user-check', 'target', 'calendar-check'];

export async function render(mount: HTMLElement, ctx: PageContext): Promise<void> {
  await loadGsap(); // carga + registra GSAP antes de cualquier tween/ScrollTrigger

  const root = document.createElement('div');
  root.className = 'aa-landing';
  root.setAttribute('data-aa-theme', ctx.theme);
  root.setAttribute('data-aa-lang', ctx.lang);
  root.style.setProperty('--aa-ind-tint', TINT); // token de cluster consumido por las secciones

  renderBackground(root);
  renderMarquee(root);
  renderNavbar(root);

  const c = getIndustria('financiera');
  const main = document.createElement('main');
  main.setAttribute('data-industria', INDUSTRY);

  renderIndustriaHero(main, {
    pill: c.hero.pill,
    heading: { before: c.hero.headingBefore, gradient: c.hero.headingGradient },
    subheading: c.hero.subheading,
    primary: { label: c.hero.primaryCta },
    secondary: { label: c.hero.secondaryCta, href: '#casos-de-uso' },
    videoWebm: industriaHeroVideo.financiera,
  });
  renderIndustriaLogos(main, { label: c.logos.label });
  renderIndustriaBenefits(main, {
    heading: c.benefits.heading,
    subheading: c.benefits.subheading,
    cards: c.benefits.cards.map((card, i) => ({ ...card, icon: BENEFIT_ICONS[i] })),
    cta: { label: c.benefits.cta },
  });
  renderIndustriaSplit(main, {
    heading: c.split.heading,
    subheading: c.split.subheading,
    bullets: c.split.bullets.map((label, i) => ({ label, icon: SPLIT_ICONS[i] })),
  });
  renderIndustriaSteps(main, {
    heading: c.steps.heading,
    subheading: c.steps.subheading,
    steps: c.steps.steps,
  });
  renderIndustriaAutomations(main, {
    eyebrow: c.automations.eyebrow,
    heading: c.automations.heading,
    subheading: c.automations.subheading,
    cta: { label: c.automations.cta },
    steps: c.automations.steps,
  });
  renderIndustriaConnect(main, {
    eyebrow: c.connect.eyebrow,
    heading: {
      before: c.connect.headingBefore,
      gradient: c.connect.headingGradient,
      after: c.connect.headingAfter,
    },
    subheading: c.connect.subheading,
    leftCards: c.connect.leftCards,
    rightCards: c.connect.rightCards,
  });
  renderReviews(main); // strip de reseñas (misma que el home)
  renderCac(main); // bloque CAC: texto + CTA + marquee de badges
  root.appendChild(main);

  renderFooter(root);

  mount.replaceChildren(root);
  initNavbar(root);
  initMegaNav(root);
  initMarquee(root);
  initMetaTheme(root);
  initReviewsMarquee(root); // reseñas: marquee scroll-driven
  initBadgesMarquee(root); // CAC: marquee infinito de badges
  initMotion(root);
  initWhatsApp();
}
