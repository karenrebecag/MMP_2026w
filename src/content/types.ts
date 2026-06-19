// Tipos de contenido de la landing. La estructura (kind, theme, layout, variantes,
// media, surface, ids) es independiente del idioma; solo el copy cambia por locale.

import type { SectionTheme } from '../design-system/molecules/layout';

export interface ProseContent {
  kind: 'prose' | 'statement';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  // Palabra rotatoria opcional en el heading: before + (words ciclando) + after.
  // `heading` se mantiene como fallback/SEO; si hay `rotate`, manda el rotatorio.
  rotate?: { before: string; words: string[]; after?: string; block?: boolean };
  paragraphs: string[];
  // FAQ opcional embebido (acordeón) dentro del mismo bloque, antes del CTA.
  faq?: { q: string; a: string }[];
  cta?: { label: string; href: string };
  // Layout con imagen lateral + superficie de color con textura (opcional).
  media?: {
    side: 'left' | 'right';
    src?: string;
    alt?: string;
    chat?: { kind: 'in' | 'out'; text: string; time: string }[]; // burbujas WhatsApp sobre la foto
  };
  surface?: { color: string; text?: 'light' | 'dark' };
}

export interface CardsContent {
  kind: 'cards';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  layout?: 'grid' | 'slider';
  cards: {
    title: string;
    desc: string;
    tag?: string;
    variant?: 'dark' | 'electric' | 'purple' | 'neutral'; // variantes reales de product-card
  }[];
}

export interface ChecklistContent {
  kind: 'checklist';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  intro?: string[];
  items: string[];
  marker?: 'check' | 'dot';
  outro?: string[];
  cta?: { label: string; href: string };
  // Layout con imagen lateral + superficie de color con textura (opcional).
  media?: {
    side: 'left' | 'right';
    src?: string;
    alt?: string;
    chat?: { kind: 'in' | 'out'; text: string; time: string }[]; // burbujas WhatsApp sobre la foto
  };
  surface?: { color: string; text?: 'light' | 'dark' };
}

export interface AudienceContent {
  kind: 'audience';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  intro?: string; // lead corto en la columna izquierda
  items: string[]; // criterios "para ti si…" (lista con líneas)
}

export interface ManifestoContent {
  kind: 'manifesto';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  // Burbujas flotantes: preguntas de prospectos. El avatar y la posición los asigna el renderer.
  bubbles: { text: string; time: string; kind: 'in' | 'out' }[];
}

export interface InfoContent {
  kind: 'info';
  id?: string;
  theme: SectionTheme;
  scribble?: string; // eyebrow flotante (coral) tipo "scribble" de OSMO
  heading: string; // statement largo que responde la pregunta
  rotate?: { before: string; words: string[]; after?: string; block?: boolean }; // palabra/frase rotatoria
  items: { title: string; desc: string }[]; // filas label (izq) + párrafo (der)
  image?: { src: string; alt: string }; // imagen de la columna izquierda
}

export interface FaqContent {
  kind: 'faq';
  id?: string;
  theme: SectionTheme;
  eyebrow?: string;
  heading: string;
  items: { q: string; a: string }[];
}

export interface CtaContent {
  kind: 'cta';
  id?: string;
  theme: SectionTheme;
  heading: string;
  paragraphs?: string[];
  cta: { label: string; href: string };
  // Video de fondo hospedado en R2 (no se inlina: el bundle es público en jsDelivr).
  bgVideo?: { webm: string; mp4: string; poster: string };
}

export type SectionContent =
  | ProseContent
  | CardsContent
  | ChecklistContent
  | AudienceContent
  | ManifestoContent
  | InfoContent
  | FaqContent
  | CtaContent;
