import type { Strings } from './strings';

export const es = {
  navbar: {
    cta: 'Únete a la lista de espera',
  },
  hero: {
    tag: 'Inteligencia de Conversión para WhatsApp',
    titleBefore: 'Tu chatbot responde, nuestra IA',
    titleWords: ['vende', 'convierte', 'cierra', 'factura'],
    subtitle:
      'Asciende a tus vendedores a **supervisores de la IA** que califica leads, cierra ventas y reduce los costos de adquisición **hasta 30%**.',
    ctaPrimary: 'Agendar demo',
    ctaSecondary: 'Ver demo',
    messages: [
      '¿Cuánto cuesta?',
      'Me interesa',
      '¿Está disponible?',
      'Quiero más info',
      '¿Hacen envíos?',
      '¿Tienen promo?',
      '¿Aceptan tarjeta?',
      'Quiero comprar',
    ],
  },
  heroClassic: {
    title: 'Conviértete en Experto en WhatsApp Marketing',
    subtitle:
      'La primera formación para dominar el canal donde hoy se generan, califican y cierran más oportunidades.',
    ctaLabel: 'Únete a la lista de espera',
    footnote: '* Primera edición en julio · acceso prioritario para la lista de espera.',
  },
  waitlist: {
    eyebrow: 'Lista de espera · Lanzamiento julio',
    heading: 'Únete a la lista de espera',
    lead: 'En esta primera edición, el acceso será exclusivo para quienes se registren. Déjanos tus datos y te avisamos antes de la apertura general.',
    fields: {
      name: { label: 'Nombre', placeholder: 'Tu nombre' },
      email: { label: 'Email', placeholder: 'tunombre@email.com' },
      company: { label: 'Empresa', placeholder: 'Empresa donde trabajas' },
      role: { label: 'Cargo', placeholder: 'Tu cargo o rol' },
      phone: { label: 'Teléfono', placeholder: '+52 55 1234 5678' },
    },
    privacy: {
      before: 'Acepto recibir información sobre la formación y la ',
      link: 'política de privacidad',
      after: '.',
    },
    submit: 'Únete a la lista de espera',
    validation: {
      name: 'Ingresa tu nombre.',
      email: 'Ingresa un email válido.',
      company: 'Ingresa tu empresa.',
      role: 'Ingresa tu cargo.',
      phone: 'Ingresa un teléfono válido.',
      form: 'Revisa los campos marcados.',
    },
    status: {
      loading: 'Enviando…',
      success: '¡Listo! Te avisaremos antes del lanzamiento.',
      error: 'No se pudo enviar. Intenta de nuevo en un momento.',
    },
  },
} satisfies Strings;
