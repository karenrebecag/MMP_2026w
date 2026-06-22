// Onboarding/soporte (OSMO MWG031 adaptado): stack 3D de tarjetas. Cada slide se pinea y su
// content se inclina hacia atrás (rotationX + scale + rotationZ random) y se desvanece al
// scrollear, revelando la siguiente — mazo de cartas. Maquetación fiel al snippet; colores y
// tipografía mapeados a tokens de marca (cards: claro / verde / coral; surround oscuro).
//
// Copy en i18n (onboarding.steps). 3 pasos: diseño de flujos → integración → activación del equipo.

import { gsap, ScrollTrigger } from '../../core/motion/gsap-env';
import { strings } from '../../core/i18n';
import { renderButton } from '../atoms/button';

const prefersReduced = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function renderOnboarding(root: Element): void {
  const s = strings().onboarding;

  const section = document.createElement('section');
  section.className = 'aa-onb';
  section.setAttribute('data-aa-onboarding', '');
  section.setAttribute('data-aa-section-theme', 'light'); // transparente: deja ver el bg-fixed

  const stack = document.createElement('div');
  stack.className = 'aa-onb__stack';

  s.steps.forEach((step, i) => {
    const slide = document.createElement('div');
    slide.className = 'aa-onb__slide';

    const wrapper = document.createElement('div');
    wrapper.className = 'aa-onb__wrapper';

    const content = document.createElement('div');
    content.className = `aa-onb__content aa-onb__content--${i + 1}`;

    // Head: título (izq) + número grande (der).
    const head = document.createElement('div');
    head.className = 'aa-onb__head';
    const title = document.createElement('h3');
    title.className = 'aa-onb__title';
    title.textContent = step.title;
    const num = document.createElement('span');
    num.className = 'aa-onb__num';
    num.textContent = String(i + 1).padStart(2, '0');
    head.append(title, num);

    // Banda de 2 bullets con divisores.
    const feats = document.createElement('div');
    feats.className = 'aa-onb__feats';
    step.features.forEach((f) => {
      const feat = document.createElement('div');
      feat.className = 'aa-onb__feat';
      const dot = document.createElement('span');
      dot.className = 'aa-onb__feat-dot';
      dot.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.className = 'aa-onb__feat-label';
      label.textContent = f;
      feat.append(dot, label);
      feats.appendChild(feat);
    });

    // Descripción: lead enfatizado (hasta la primera coma) + resto tenue.
    const text = document.createElement('p');
    text.className = 'aa-onb__text';
    const ci = step.desc.indexOf(',');
    if (ci > -1) {
      const lead = document.createElement('span');
      lead.className = 'aa-onb__lead';
      lead.textContent = step.desc.slice(0, ci + 1);
      text.append(lead, document.createTextNode(' ' + step.desc.slice(ci + 1).trim()));
    } else {
      text.textContent = step.desc;
    }

    // CTA centrado — botón oficial del DS (Button 004). Card 1 (clara) → botón oscuro (primary);
    // cards 2/3 (oscuras) → botón claro (secondary), conservando el contraste por card.
    const cta = renderButton({
      label: s.cta,
      href: '#aa-waitlist',
      variant: i === 0 ? 'primary' : 'secondary',
    });
    cta.classList.add('aa-onb__cta');

    // Panel inferior con grid de placeholders (sangra por el borde de la card).
    const panel = document.createElement('div');
    panel.className = 'aa-onb__panel';
    const panelLabel = document.createElement('span');
    panelLabel.className = 'aa-onb__panel-label';
    panelLabel.textContent = s.panelLabel;
    const grid = document.createElement('div');
    grid.className = 'aa-onb__grid';
    grid.setAttribute('aria-hidden', 'true');
    for (let k = 0; k < 10; k++) grid.appendChild(document.createElement('div')).className = 'aa-onb__cell';
    panel.append(panelLabel, grid);

    content.append(head, feats, text, cta, panel);
    wrapper.appendChild(content);
    slide.appendChild(wrapper);
    stack.appendChild(slide);
  });

  section.appendChild(stack);
  root.appendChild(section);
}

export function initOnboarding(scope: Element): void {
  const root = scope.querySelector<HTMLElement>('[data-aa-onboarding]');
  if (!root) return;

  if (prefersReduced()) {
    root.classList.add('is-static'); // sin pin/3D: tarjetas apiladas normales
    return;
  }

  const slides = Array.from(root.querySelectorAll<HTMLElement>('.aa-onb__slide'));
  slides.forEach((slide, i) => {
    // La última card es de reposo: sin pin/tilt/fade, para no desvanecerse sobre la sección
    // siguiente (no tiene nada que revelar). Se lee y se hace scroll normal hacia lo de abajo.
    if (i === slides.length - 1) return;
    const wrapper = slide.querySelector<HTMLElement>('.aa-onb__wrapper');
    const content = slide.querySelector<HTMLElement>('.aa-onb__content');
    if (!wrapper || !content) return;

    // Inclina y encoge la tarjeta mientras está pineada (mazo que se va al fondo).
    gsap.to(content, {
      rotationZ: (Math.random() - 0.5) * 10, // entre -5 y 5°
      scale: 0.7,
      rotationX: 40,
      ease: 'power1.in',
      scrollTrigger: {
        pin: wrapper,
        trigger: slide,
        start: 'top 0%',
        end: () => '+=' + window.innerHeight,
        scrub: true,
      },
    });
    // Fade-out al final del recorrido.
    gsap.to(content, {
      autoAlpha: 0,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: content,
        start: 'top -80%',
        end: () => '+=' + 0.2 * window.innerHeight,
        scrub: true,
      },
    });
  });

  ScrollTrigger.refresh();
}
