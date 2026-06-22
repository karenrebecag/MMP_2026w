// Copy en español (idioma principal). El theme de cada sección sigue la narrativa
// (no alternancia mecánica): dark = momentos de peso; light = el resto.
// **…** marca palabras a resaltar (peso tipográfico) para reforzar la narrativa.

import type { SectionContent } from './types';
import { WAITLIST, CTA_BG_VIDEO, ENGINE_IMG } from './shared';

// Arco narrativo: por qué → tesis → problema (agitar el dolor) → solución (visión/rol)
// → programa → para quién → urgencia → CTA.
export const es: SectionContent[] = [
  {
    kind: 'manifesto',
    theme: 'light',
    eyebrow: 'El cambio',
    heading: '¿Por qué convertirte en WhatsApp Marketer?',
    paragraphs: [
      'Porque el marketing cambió. Antes, el desafío era generar tráfico. Después, fue generar leads. Hoy, el verdadero desafío es **convertir conversaciones**.',
      'Los usuarios ya no quieren llenar formularios y esperar. Quieren **escribir, recibir respuesta inmediata** y avanzar por WhatsApp.',
      'Pero para que eso funcione, no alcanza con “tener WhatsApp”. **Se necesita estrategia.**',
      'Un **WhatsApp Marketer** entiende cómo convertir ese canal en una **máquina de crecimiento**: conecta anuncios, mensajes, automatización, IA, CRM, datos y ventas en una experiencia que **realmente convierte**.',
    ],
    bubbles: [
      { kind: 'in', text: '¿Esto sirve si vendo por DM?', time: '11:58' },
      { kind: 'out', text: '¿Cuánto cuesta?', time: '11:59' },
      { kind: 'in', text: '¿Necesito saber de tecnología?', time: '11:59' },
      { kind: 'in', text: '¿En cuánto tiempo veo resultados?', time: '12:00' },
      { kind: 'out', text: '¿Funciona para mi tienda?', time: '12:00' },
      { kind: 'in', text: '¿Y si no sé de marketing?', time: '12:01' },
      { kind: 'in', text: '¿Da certificado?', time: '12:01' },
      { kind: 'out', text: '¿Sirve para agencias?', time: '12:02' },
      { kind: 'in', text: '¿Incluye plantillas?', time: '12:02' },
      { kind: 'in', text: '¿Hay cupo todavía?', time: '12:03' },
    ],
  },
  {
    kind: 'statement',
    id: 'aa-tesis',
    theme: 'light',
    eyebrow: 'La tesis',
    heading: 'Todo lo que necesitas para operar WhatsApp como un canal de ventas',
    paragraphs: [],
  },
  {
    kind: 'cards',
    id: 'aa-programa',
    theme: 'light',
    heading: '',
    layout: 'slider',
    cards: [
      {
        variant: 'mint',
        title: 'IA Transaccional en WhatsApp',
        desc: 'Una IA que gestiona tus conversaciones de WhatsApp de punta a punta, para que tus vendedores solo intervengan cuando sea necesario.',
      },
      {
        variant: 'lavender',
        title: 'Remarketing inteligente',
        desc: 'Con mensajes y llamadas de seguimiento, Atom recupera leads que no compran en el primer contacto y los mantiene interesados hasta que estén listos para avanzar.',
      },
      {
        variant: 'peach',
        title: 'Servicio con expertos',
        desc: 'Nuestro equipo de expertos en tu industria te acompaña en la implementación de la IA en tu operación y te capacita para que logres autonomía.',
      },
      {
        variant: 'sky',
        title: 'Del clic en el anuncio a la venta, todo es visible',
        desc: 'El único sistema que convierte, recupera y traza cada lead, desde Meta, Google o TikTok hasta el cierre en tu CRM.',
      },
      {
        variant: 'mint',
        title: 'Más conversiones, menos costo',
        desc: 'Con la integración con Conversions API, aumenta los leads calificados y reduce hasta 30% tus costos en anuncios.',
      },
    ],
  },
  {
    kind: 'tabs',
    id: 'aa-vision',
    theme: 'light',
    eyebrow: 'El motor de IA de Atom',
    heading: 'Un *motor de IA* enfocado en acelerar tus procesos',
    tabs: [
      {
        label: 'Resumen de la conversación',
        heading: 'Resumen de la conversación',
        paragraphs: [
          'Mientras otros bots solo guardan el historial, la IA de Atom lee cada conversación y te entrega un resumen claro: qué quiere el lead, en qué etapa está y cuál es el siguiente paso.',
          'Tu equipo retoma cualquier chat en segundos, sin leer cientos de mensajes ni perder contexto.',
        ],
        image: { src: ENGINE_IMG.summary, alt: 'Asesor revisando el resumen de una conversación' },
      },
      {
        label: 'Sugerencias inteligentes',
        heading: 'Sugerencias inteligentes',
        paragraphs: [
          'Atom no se limita a respuestas predefinidas: sugiere el siguiente mensaje ideal según el contexto real de la conversación y tu estrategia de ventas.',
          'Tus asesores responden mejor y más rápido, con la consistencia de un experto en cada chat.',
        ],
        image: {
          src: ENGINE_IMG.suggestions,
          alt: 'Profesional recibiendo sugerencias inteligentes de la IA',
        },
      },
      {
        label: 'Priorización de conversaciones',
        heading: 'Priorización de conversaciones',
        paragraphs: [
          'En vez de una bandeja infinita por orden de llegada, la IA de Atom detecta la intención de compra y prioriza los leads calientes primero.',
          'Tu equipo dedica su tiempo a las conversaciones que de verdad cierran ventas.',
        ],
        image: {
          src: ENGINE_IMG.priority,
          alt: 'Equipo priorizando las conversaciones más importantes',
        },
      },
      {
        label: 'Llamadas de WhatsApp con AI',
        heading: 'Llamadas de WhatsApp con AI',
        paragraphs: [
          'Atom va más allá del texto: realiza y asiste llamadas de WhatsApp con IA para resolver dudas, agendar y cerrar sin fricción.',
          'Una capa de voz que ningún chatbot tradicional ofrece, integrada en el mismo canal.',
        ],
        image: {
          src: ENGINE_IMG.calls,
          alt: 'Profesional en una llamada de WhatsApp asistida por IA',
        },
      },
    ],
  },
  {
    kind: 'info',
    theme: 'light',
    scribble: '¿Qué hace?',
    heading:
      'Un Experto en WhatsApp Marketing convierte conversaciones en crecimiento: diseña la experiencia, optimiza los mensajes y conecta cada chat con la estrategia comercial.',
    rotate: {
      before: 'Un Experto en WhatsApp Marketing convierte conversaciones en crecimiento:',
      words: [
        'diseña la experiencia',
        'optimiza los mensajes',
        'conecta cada chat con la estrategia comercial',
      ],
      block: true, // frases largas → modo bloque (propia línea, multilínea)
    },
    items: [
      {
        title: 'Diseña la conversación',
        desc: 'Crea journeys conversacionales y mensajes que califican, educan y convierten, llevando al lead del primer clic a la venta sin fricción.',
      },
      {
        title: 'Optimiza la captación',
        desc: 'Lanza y afina campañas Click to WhatsApp para que cada anuncio termine en una conversación real, sin perder leads en el camino.',
      },
      {
        title: 'Integra datos e IA',
        desc: 'Conecta WhatsApp con el CRM, la automatización y la IA para medir la conversión real y recuperar los leads que dejaron de responder.',
      },
      {
        title: 'Alinea marketing y ventas',
        desc: 'Hace que ambos equipos trabajen sobre el mismo canal, con más contexto y mejores resultados.',
      },
    ],
  },
  {
    kind: 'audience',
    id: 'aa-audience',
    theme: 'light',
    eyebrow: 'Para quién',
    heading: 'Esta formación es para ti si…',
    intro:
      'El WhatsApp Marketing es para quienes viven entre el marketing y la venta, y quieren convertir mejor cada conversación.',
    items: [
      'Trabajas en marketing, ventas, growth, performance, CRM, lifecycle, customer experience o revenue.',
      'Gestionas campañas que llevan leads a WhatsApp.',
      'Quieres reducir la pérdida de oportunidades después del clic.',
      'Necesitas mejorar la conversión entre lead, conversación y venta.',
      'Buscas integrar WhatsApp con IA, automatización, CRM y datos.',
      'Quieres desarrollar una habilidad cada vez más importante para los equipos comerciales modernos.',
    ],
  },
  {
    kind: 'reviews',
    id: 'aa-reviews',
    theme: 'light',
    eyebrow: 'Reseñas',
    heading: 'Equipos comerciales reales. Resultados medibles.',
    subheading: 'Lo que dicen los equipos que ya operan WhatsApp con Atom.',
    reviews: [
      {
        quote: 'Hemos logrado automatizar todo nuestro proceso de ventas en WhatsApp.',
        name: 'Reyna P.',
        role: 'Gerente de Operaciones',
        rating: 5,
      },
      {
        quote: 'Atom nos da una ventaja competitiva muy fuerte y profesional.',
        name: 'Carlos M.',
        role: 'Jefe de Atención al Cliente',
        rating: 5,
      },
      {
        quote: 'La facilidad de segmentar a los clientes según el motivo por el que nos contactan.',
        name: 'Hamit A.',
        role: 'Logística y Transporte',
        rating: 5,
      },
      {
        quote: 'La integración con Facebook y WhatsApp fue, sin duda, mi función favorita.',
        name: 'Frederick G.',
        role: 'Director Ejecutivo',
        rating: 4,
      },
      {
        quote: 'Es intuitivo y se siente muy productivo desde el primer día.',
        name: 'Laura S.',
        role: 'Gerente de Beneficios',
        rating: 4,
      },
      {
        quote: 'Toda la funcionalidad que necesitas, envuelta en una interfaz limpia.',
        name: 'Sean D.',
        role: 'Asistente de Marketing',
        rating: 5,
      },
      {
        quote: 'Lo fluido que es de usar, con una interfaz muy amigable.',
        name: 'Nteziyaremye I.',
        role: 'Tecnologías de la Información',
        rating: 4,
      },
      {
        quote: 'Nos impresionaron sus funciones y su rendimiento.',
        name: 'Chris C.',
        role: 'Director General de TI',
        rating: 4,
      },
    ],
  },
  {
    kind: 'prose',
    id: 'aa-generacion',
    theme: 'light',
    eyebrow: 'Primera generación · Julio 2026',
    heading: 'Sé parte de la primera generación de Expertos en WhatsApp Marketing',
    paragraphs: [
      'La primera edición se lanza en julio con acceso prioritario para la lista de espera. Regístrate, conoce el programa completo y asegura tu lugar antes de la apertura general.',
    ],
    faq: [
      { q: '¿Cuándo se lanza la formación?', a: 'La formación se lanza en julio.' },
      {
        q: '¿Quiénes podrán acceder primero?',
        a: 'En esta primera edición, el acceso será priorizado para las personas registradas en la lista de espera.',
      },
      {
        q: '¿Necesito experiencia previa en WhatsApp Business?',
        a: 'No necesariamente. La formación está pensada para profesionales de marketing, ventas, growth, CRM, performance y experiencia del cliente que quieran aprender a usar WhatsApp como canal estratégico de conversión.',
      },
      {
        q: '¿La formación es solo para equipos técnicos?',
        a: 'No. Está diseñada para perfiles de negocio que necesitan entender estrategia, automatización, IA, datos y conversión sin depender exclusivamente de conocimientos técnicos.',
      },
      {
        q: '¿Qué voy a lograr al finalizar?',
        a: 'Vas a entender cómo diseñar, implementar y optimizar estrategias de WhatsApp Marketing para captar, calificar, recuperar y convertir leads con mayor eficiencia.',
      },
    ],
    cta: { label: 'Quiero entrar a la lista de espera', href: WAITLIST },
  },
  {
    kind: 'cta',
    theme: 'dark',
    heading: 'El futuro del marketing no termina en el clic. Empieza en la conversación.',
    paragraphs: [
      'Regístrate en la lista de espera y sé parte de la primera formación para convertirte en Experto en WhatsApp Marketing.',
    ],
    cta: { label: 'Unirme a la lista de espera', href: WAITLIST },
    bgVideo: CTA_BG_VIDEO,
  },
];
