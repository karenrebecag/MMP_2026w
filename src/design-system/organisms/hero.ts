// Hero del home — "messages": chip + headline + subhead + 2 CTAs sobre un campo donde brotan
// mensajes de WhatsApp con avatar (motor en behaviors/hero-messages.ts). Sección light: no
// pinta fondo, deja ver el .aa-bg-fixed. Z-layering: campo detrás, content encima (legibilidad).
//
// Parametrizado por props (i18n-agnóstico). heroFromStrings() puentea al namespace `hero`.

import { renderParagraph } from '../atoms/text';
import { renderRotatingHeading } from '../behaviors/rotating-text';
import { renderButton } from '../atoms/button';
import type { SectionTheme } from '../molecules/layout';
import { strings } from '../../core/i18n';
import { avatars } from '../../assets/r2';

export { initHeroMessages } from '../behaviors/hero-messages';

export interface HeroProps {
  tag: string;
  titleBefore: string;
  titleWords: string[];
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  messages: string[];
  // Avatares para las píldoras de mensaje (se ciclan junto a messages).
  avatars: string[];
  theme?: SectionTheme;
}

// Puente i18n: arma los props desde el namespace `hero` del idioma activo + avatares de assets.
export function heroFromStrings(
  opts: { primaryHref?: string; secondaryHref?: string } = {},
): HeroProps {
  const s = strings().hero;
  return {
    tag: s.tag,
    titleBefore: s.titleBefore,
    titleWords: s.titleWords,
    subtitle: s.subtitle,
    primaryCta: { label: s.ctaPrimary, href: opts.primaryHref ?? '#aa-waitlist' },
    secondaryCta: { label: s.ctaSecondary, href: opts.secondaryHref ?? '#aa-demo' },
    messages: s.messages,
    avatars,
  };
}

export function renderHero(root: Element, props: HeroProps): void {
  const hero = document.createElement('section');
  hero.className = 'aa-hero';
  hero.setAttribute('data-aa-section-theme', props.theme ?? 'light');
  hero.setAttribute('data-aa-intro', ''); // anima al montar

  // Campo de spawn — detrás del contenido (z bajo, pointer-events:none vía CSS).
  const field = document.createElement('div');
  field.className = 'aa-hero__field';
  field.setAttribute('data-aa-hero-field', '');
  field.setAttribute('aria-hidden', 'true');
  // Nodos fuente ocultos: texto + avatar. El motor los lee (behavior desacoplado de i18n).
  props.messages.forEach((text, i) => {
    const src = document.createElement('span');
    src.className = 'aa-hero__msg-source';
    src.textContent = text;
    src.setAttribute('data-avatar', props.avatars[i % props.avatars.length]);
    field.appendChild(src);
  });

  // Contenido — encima del campo (z alto = legibilidad garantizada).
  const content = document.createElement('div');
  content.className = 'aa-hero__content';

  const chip = document.createElement('span');
  chip.className = 'aa-hero__chip';
  chip.textContent = props.tag;
  chip.setAttribute('data-aa-fade', '');
  content.appendChild(chip);

  // Sin efecto on-mount: el rotating ya corre su propio SplitText sobre este nodo.
  content.appendChild(
    renderRotatingHeading({
      size: 'xxl',
      tag: 'h1',
      before: props.titleBefore,
      words: props.titleWords,
      className: 'aa-hero__title aa-text-balance',
    }),
  );

  const subtitle = renderParagraph({
    size: 'l',
    text: props.subtitle,
    className: 'aa-hero__subtitle aa-text-balance',
  });
  subtitle.setAttribute('data-aa-split', '');
  content.appendChild(subtitle);

  const ctaRow = document.createElement('div');
  ctaRow.className = 'aa-hero__cta-row';
  ctaRow.setAttribute('data-aa-fade', '');
  ctaRow.setAttribute('data-aa-delay', '0.35');
  ctaRow.append(
    renderButton({ label: props.primaryCta.label, href: props.primaryCta.href, variant: 'primary' }),
    renderButton({
      label: props.secondaryCta.label,
      href: props.secondaryCta.href,
      variant: 'secondary',
    }),
  );
  content.appendChild(ctaRow);

  hero.append(field, content);
  root.appendChild(hero);
}
