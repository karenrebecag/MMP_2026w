// Copy en español (idioma principal). El theme de cada sección sigue la narrativa
// (no alternancia mecánica): dark = momentos de peso; light = el resto.
// **…** marca palabras a resaltar (peso tipográfico) para reforzar la narrativa.

import type { SectionContent } from './types';
import { WAITLIST, CTA_BG_VIDEO, PROBLEMA_IMG, VISION_IMG } from './shared';

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
    theme: 'dark',
    eyebrow: 'La tesis',
    heading: 'WhatsApp Marketing no es enviar mensajes. Es diseñar conversaciones que venden.',
    rotate: {
      before: 'WhatsApp Marketing no es enviar mensajes. Es diseñar conversaciones que',
      words: ['venden', 'convierten', 'cierran', 'fidelizan', 'escalan'],
      after: '.',
    },
    paragraphs: [
      'En esta formación vas a aprender cómo pensar WhatsApp como un canal estratégico dentro del funnel comercial. Desde el primer clic en una campaña hasta la calificación del lead, el seguimiento, la recuperación de oportunidades inactivas y la medición real de resultados.',
      'Porque cada conversación puede ser una venta. Pero solo si está diseñada para avanzar.',
    ],
  },
  {
    kind: 'checklist',
    id: 'aa-problema',
    theme: 'dark',
    eyebrow: 'El problema',
    heading: 'De lead perdido a oportunidad convertida',
    media: {
      side: 'left',
      src: PROBLEMA_IMG,
      alt: '',
      // El lead se enfría: escribe varias veces y nadie responde a tiempo.
      chat: [
        { kind: 'in', text: 'Hola, me interesa 🙌', time: '18:40' },
        { kind: 'in', text: '¿Me pasan precio?', time: '18:41' },
        { kind: 'in', text: '¿Hola? ¿Siguen ahí?', time: '19:55' },
        { kind: 'in', text: 'Sigo esperando 😐', time: '20:48' },
        { kind: 'in', text: 'Bueno, busco otra opción', time: '21:30' },
        { kind: 'in', text: 'Gracias de todos modos 👋', time: '21:31' },
      ],
    },
    intro: [
      'La mayoría de las empresas invierte en generar demanda, pero pierde oportunidades cuando el lead llega a WhatsApp.',
    ],
    marker: 'dot',
    items: [
      'Respuestas lentas.',
      'Mensajes sin contexto.',
      'Asesores saturados.',
      'Falta de seguimiento.',
      'Datos que no vuelven a las campañas.',
      'Leads interesados que nunca llegan a ventas.',
    ],
    outro: [
      'El WhatsApp Marketing existe para resolver ese problema.',
      'No se trata de generar más conversaciones. Se trata de convertir mejor las conversaciones que ya estás generando.',
    ],
  },
  {
    kind: 'prose',
    id: 'aa-vision',
    theme: 'dark',
    eyebrow: 'La visión',
    heading: 'El nuevo rol que las empresas van a necesitar',
    surface: { color: '#25d366', text: 'dark' },
    media: {
      side: 'right',
      src: VISION_IMG,
      alt: '',
      // Demo del rol en acción: un WhatsApp Marketer atiende y cierra un lead real.
      chat: [
        { kind: 'in', text: 'Hola, vi su anuncio 👀', time: '12:01' },
        { kind: 'out', text: '¡Hola! 👋 ¿Te cuento cómo funciona?', time: '12:01' },
        { kind: 'in', text: 'Sí, porfa', time: '12:02' },
        { kind: 'out', text: 'Conectamos tu anuncio → WhatsApp → cierre', time: '12:02' },
        { kind: 'in', text: '¿Y si no contesto a tiempo?', time: '12:03' },
        { kind: 'out', text: 'La IA responde al instante y te avisa ⚡', time: '12:03' },
        { kind: 'in', text: 'Me interesa 🔥 ¿precio?', time: '12:05' },
        { kind: 'out', text: 'Hoy con cupo de lanzamiento: 30% off', time: '12:05' },
        { kind: 'in', text: 'Lo quiero 🙌', time: '12:06' },
        { kind: 'out', text: 'Te paso el link para agendar 📅', time: '12:06' },
        { kind: 'in', text: '¡Agendado! ✅', time: '12:08' },
      ],
    },
    paragraphs: [
      'Las empresas ya tienen especialistas en pauta. Especialistas en CRM. Especialistas en automatización. Especialistas en ventas.',
      'Pero entre el clic y la venta hay una zona crítica: la conversación. Ahí es donde nace el rol del WhatsApp Marketer.',
      'Una persona capaz de entender la estrategia, diseñar la experiencia, optimizar los mensajes, leer los datos y convertir WhatsApp en un canal de crecimiento.',
      'No se trata solo de responder más rápido. Se trata de vender mejor.',
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
    kind: 'cards',
    id: 'aa-programa',
    theme: 'dark',
    eyebrow: 'Programa',
    heading: 'Lo que vas a aprender',
    layout: 'slider',
    cards: [
      {
        variant: 'dark',
        tag: 'Base',
        title: 'Fundamentos',
        desc: 'Por qué WhatsApp es hoy uno de los canales clave de marketing y ventas en LATAM.',
      },
      {
        variant: 'electric',
        tag: 'Estrategia',
        title: 'Estrategia conversacional',
        desc: 'Journeys, flujos y mensajes que llevan al lead del interés a la compra.',
      },
      {
        variant: 'purple',
        tag: 'Captación',
        title: 'Click to WhatsApp',
        desc: 'Campañas que llevan al usuario directo a WhatsApp sin perder leads tras el primer mensaje.',
      },
      {
        variant: 'neutral',
        tag: 'IA',
        title: 'Automatización e IA',
        desc: 'IA para responder, calificar, agendar y recuperar leads sin perder personalización.',
      },
      {
        variant: 'dark',
        tag: 'Datos',
        title: 'Trazabilidad y datos',
        desc: 'Mide lo que pasa dentro de WhatsApp y conéctalo con tu CRM para optimizar campañas.',
      },
      {
        variant: 'electric',
        tag: 'Conversión',
        title: 'Optimización comercial',
        desc: 'Mejora tiempos de respuesta, prioriza leads y recupera oportunidades inactivas.',
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
