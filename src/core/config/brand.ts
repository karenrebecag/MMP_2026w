// URLs públicas de marca ATOM (sitio atomchat.io, redes, partners/reviews).
// El frontend es público: nada de secretos, solo enlaces públicos.

export const SITE = 'https://atomchat.io';
export const UPLOADS = `${SITE}/wp-content/uploads`;

export const SITE_LINKS = {
  home: `${SITE}/`,
  terms: `${SITE}/terminos-y-condiciones/`,
  privacy: `${SITE}/politica-de-privacidad/`,
  subscriptionTerms: `${SITE}/terminos-de-suscripcion/`,
  about: `${SITE}/acerca-de-nosotros/`,
  english: `${SITE}/en/`,
  support: 'https://soporte.atomchat.io',
  blog: 'https://blog.atomchat.io/blog/',
};

export const SOCIAL = {
  facebook: 'https://www.facebook.com/atomchat.io/',
  instagram: 'https://www.instagram.com/atom_chat/',
  youtube: 'https://www.youtube.com/channel/UCvVlbyMlf5X_h-HvjoC14nA',
  linkedin: 'https://www.linkedin.com/company/atomchat',
};

export const PARTNERS = {
  g2Reviews: 'https://www.g2.com/products/atomchat-io/reviews',
  hubspot: 'https://ecosystem.hubspot.com/marketplace/apps/marketing/live-chat/atomchat-1053281',
  meta: 'https://www.facebook.com/business/partner-directory/search?solution_type=messaging&ref=pd_home_hero_cta&id=3701304469998183&section=overview',
};

// WhatsApp Conversion Intelligence (WCI): Atom convierte por WhatsApp, no por forms.
// El SDK (modo attach) se engancha a los [data-atom-button] del bundle, genera chatId,
// dispara webhook de atribución y abre WhatsApp. El company-token es público (tipo
// publishable key); el phone incluye código de país. wa.me como fallback si el SDK no carga.
export const WHATSAPP = {
  widget: 'https://api.atomchat.io/wci/widget.js',
  companyToken: '2461fbb8-911f-c77b-5ba1-aef91156d512',
  phone: '5215535150142',
  message: 'Hola, quiero más información sobre Atom',
};
