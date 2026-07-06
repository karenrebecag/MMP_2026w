// Industria benefits — heading + subheading (izq) + row de 4 cards (icono + título + desc,
// una resaltada con el tint del cluster) + CTA abajo-derecha. Estructura de celda tipo Relume
// Layout 299 (icono/título/desc centrados), con card container y highlight propios. Reusable
// por las 3 industrias; cada composer pasa su copy.

import { renderButton } from '../atoms/button';
import { iconSvg, type IconName } from '../atoms/icon';

export interface BenefitCard {
  title: string;
  desc: string;
  icon: IconName;
  highlight?: boolean;
}

export interface IndustriaBenefitsConfig {
  eyebrow?: string;
  heading: string;
  subheading: string;
  cards: BenefitCard[];
  cta: { label: string };
  theme?: 'light' | 'dark';
}

function buildCard(card: BenefitCard): HTMLElement {
  const el = document.createElement('article');
  el.className = 'aa-ind-benefits__card';
  el.setAttribute('data-aa-reveal-item', ''); // entra con blur-rise escalonado (ver motion.ts)

  const icon = document.createElement('div');
  icon.className = 'aa-ind-benefits__icon';
  icon.innerHTML = iconSvg(card.icon);

  const title = document.createElement('h3');
  title.className = 'aa-h-m aa-ind-benefits__card-title';
  title.textContent = card.title;

  const desc = document.createElement('p');
  desc.className = 'aa-p-m aa-ind-benefits__card-desc';
  desc.textContent = card.desc;

  el.append(icon, title, desc);
  return el;
}

export function renderIndustriaBenefits(root: Element, cfg: IndustriaBenefitsConfig): void {
  const section = document.createElement('section');
  section.className = 'aa-section aa-ind-benefits';
  section.setAttribute('data-aa-section-theme', cfg.theme ?? 'light');

  const container = document.createElement('div');
  container.className = 'aa-container';

  if (cfg.eyebrow) {
    const eyebrow = document.createElement('span');
    eyebrow.className = 'aa-ind-benefits__eyebrow';
    eyebrow.textContent = cfg.eyebrow;
    eyebrow.setAttribute('data-aa-fade', '');
    container.appendChild(eyebrow);
  }

  const heading = document.createElement('h2');
  heading.className = 'aa-h-l aa-ind-benefits__heading aa-text-balance';
  heading.setAttribute('data-aa-split', '');
  heading.textContent = cfg.heading;

  const sub = document.createElement('p');
  sub.className = 'aa-p-l aa-ind-benefits__sub aa-text-balance';
  sub.setAttribute('data-aa-fade', '');
  sub.textContent = cfg.subheading;

  const grid = document.createElement('div');
  grid.className = 'aa-ind-benefits__grid';
  grid.setAttribute('data-aa-reveal', ''); // grupo: sus cards entran escalonadas
  cfg.cards.forEach((c) => grid.appendChild(buildCard(c)));

  const ctaRow = document.createElement('div');
  ctaRow.className = 'aa-ind-benefits__cta';
  ctaRow.setAttribute('data-aa-fade', '');
  ctaRow.appendChild(renderButton({ label: cfg.cta.label, variant: 'primary' }));

  container.append(heading, sub, grid, ctaRow);
  section.appendChild(container);
  root.appendChild(section);
}
