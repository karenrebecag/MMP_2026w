// Contenido i18n de las páginas de industria. Solo COPY: la estructura (íconos por card,
// tint/accent del cluster, video, imagen, orden de secciones) vive en los composers de
// page-types. Cada locale (es/en/pt) implementa IndustriasContent completo.

export interface Card {
  title: string;
  desc: string;
}

export interface HeroContent {
  pill: string;
  // El heading se parte: `before` + palabra en gradiente.
  headingBefore: string;
  headingGradient: string;
  subheading: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface LogosContent {
  label: string;
}

export interface BenefitsContent {
  eyebrow?: string;
  heading: string;
  subheading: string;
  cards: Card[];
  cta: string;
}

export interface SplitContent {
  heading: string;
  subheading: string;
  bullets: string[];
}

export interface StepsContent {
  heading: string;
  subheading: string;
  steps: { title: string; desc?: string }[];
  cta?: string;
}

export interface ImpactContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: Card[];
  stat: { value: string; label: string; note: string };
}

export interface AutomationsContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  cta: string;
  steps: string[];
}

export interface ConnectContent {
  eyebrow: string;
  headingBefore: string;
  headingGradient?: string;
  headingAfter?: string;
  subheading: string;
  leftCards: Card[];
  rightCards: Card[];
}

// Finanzas y automotriz usan `steps`; educativa usa `impact`.
export interface FinancieraContent {
  hero: HeroContent;
  logos: LogosContent;
  benefits: BenefitsContent;
  split: SplitContent;
  steps: StepsContent;
  automations: AutomationsContent;
  connect: ConnectContent;
}

export type AutomotrizContent = FinancieraContent;

export interface EducativaContent {
  hero: HeroContent;
  logos: LogosContent;
  benefits: BenefitsContent;
  split: SplitContent;
  impact: ImpactContent;
  automations: AutomationsContent;
  connect: ConnectContent;
}

export interface IndustriasContent {
  financiera: FinancieraContent;
  automotriz: AutomotrizContent;
  educativa: EducativaContent;
}
