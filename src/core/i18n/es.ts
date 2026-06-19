import type { Strings } from './strings';

export const es = {
  navbar: {
    cta: 'Únete a la lista de espera',
  },
  hero: {
    tag: 'Inteligencia de Conversión para WhatsApp',
    titleBefore: 'Tu chatbot responde, nuestra IA',
    titleWords: ['vende', 'convierte', 'cierra', 'factura'],
    titleAfter: 'desde WhatsApp',
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
    replies: [
      'Te paso los planes ahora mismo',
      '¡Genial! Te explico cómo funciona',
      'Sí, con cupo disponible hoy',
      'Claro, te lo resumo en 1 minuto',
      'Sí, enviamos a todo el país',
      'Hoy: 30% off de lanzamiento',
      'Sí, aceptamos todas las tarjetas',
      'Perfecto, te paso el link',
    ],
  },
  whatAtom: {
    label: 'Qué hace atom',
    titleL1: 'Conversa, califica y *cierra.*',
    titleL2: 'Todo en tu *WhatsApp.*',
    lead: 'atom responde a cada lead al instante, lo califica y agenda la venta. Tu equipo solo supervisa y cierra.',
  },
  features: {
    responde: {
      stat: '+89%',
      tag: 'IA Transaccional de Atom',
      title: 'De leads calificados desde WhatsApp, sin subir el presupuesto.',
      body: 'Asciende a tus vendedores a supervisores: la IA transaccional de Atom atiende, convierte y vende, manteniendo la atención humana donde importa. Elimina el trabajo manual y repetitivo de tus agentes.',
    },
    califica: {
      stat: '95%',
      tag: 'Remarketing por WhatsApp',
      title: 'De los leads aún no están listos para comprar.',
      body: 'Mantenlos interesados y conviértelos cuando ya estén listos con las campañas de remarketing por WhatsApp de Atom. Tu inversión en pauta, aprovechada al máximo.',
    },
    cierra: {
      stat: '-30%',
      tag: 'Atom para Marketing',
      title: 'De reducción en costos de adquisición.',
      body: 'Atom envía cada venta cerrada al algoritmo de Meta y Google vía Conversions API; tus campañas se optimizan hacia leads que realmente compran.',
    },
  },
  howItWorks: {
    eyebrow: 'Cómo funciona',
    lead: 'Tu *IA* que',
    body: 'Una sola IA conversacional que opera tu WhatsApp de punta a punta: capta, califica y cierra mientras tu equipo solo supervisa.',
    cta: 'Comenzar',
    features: [
      'Responde en segundos',
      'Califica cada lead',
      'Convierte conversaciones',
      'Registra todo en tu CRM',
      'Llama por WhatsApp',
      'Lanza campañas',
      'Recupera leads fríos',
      'Vende por ti, 24/7',
    ],
  },
  logos: {
    eyebrow: 'Confían en nosotros',
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
