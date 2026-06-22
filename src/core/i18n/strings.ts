// Contrato de traducciones. Todos los idiomas deben implementar esta interfaz.
export interface Strings {
  navbar: {
    cta: string;
  };
  hero: {
    tag: string;
    titleBefore: string;
    // Última palabra rotatoria del heading ("…nuestra IA [vende|convierte|…]").
    titleWords: string[];
    // Texto estático tras la palabra rotatoria ("…[vende] desde WhatsApp").
    titleAfter: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    // Mensajes de WhatsApp que brotan en el campo del hero (decorativos, glanceables).
    // messages = burbujas claras (usuario); replies = burbujas verdes (atom, el asistente IA).
    messages: string[];
    replies: string[];
  };
  // Strip "qué hace atom" bajo el hero (label + headline 2 líneas + lead corto).
  whatAtom: {
    label: string;
    titleL1: string;
    titleL2: string;
    lead: string;
  };
  // Cinta de flujo del lead (MWG104): hint de scroll + pasos (texto que fluye en la línea).
  // El componente intercala media entre cada paso y resalta algunos con gradiente.
  leadFlow: {
    scroll: string;
    steps: string[];
  };
  // Onboarding/soporte (MWG031): stack 3D de tarjetas. Cada paso = título + 2 bullets +
  // descripción; CTA y label de panel compartidos.
  onboarding: {
    scroll: string;
    cta: string;
    panelLabel: string;
    steps: { title: string; desc: string; features: string[] }[];
  };
  // Sección de features (3 tarjetas: stat + tag + título + body).
  features: {
    responde: { stat: string; tag: string; title: string; body: string };
    califica: { stat: string; tag: string; title: string; body: string };
    cierra: { stat: string; tag: string; title: string; body: string };
  };
  // Sección "Cómo funciona": eyebrow + lead ("La IA que") + cta + marquee vertical de features.
  howItWorks: {
    eyebrow: string;
    lead: string;
    body: string;
    cta: string;
    features: string[];
  };
  // Sección de logos "Trusted by".
  logos: {
    eyebrow: string;
  };
  // Sección CAC: bloque split (texto + CTA a la izquierda, marquee de badges a la derecha).
  cac: {
    heading: string;
    body: string;
    cta: string;
  };
  heroClassic: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    footnote: string;
  };
  waitlist: {
    eyebrow: string;
    heading: string;
    lead: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      company: { label: string; placeholder: string };
      role: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
    };
    // El link de privacidad se construye con la URL de config (SITE_LINKS.privacy);
    // aquí solo viaja el texto envolvente + el texto del ancla.
    privacy: { before: string; link: string; after: string };
    submit: string;
    validation: {
      name: string;
      email: string;
      company: string;
      role: string;
      phone: string;
      form: string;
    };
    status: {
      loading: string;
      success: string;
      error: string;
    };
  };
}
