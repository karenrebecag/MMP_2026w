// Contrato de traducciones. Todos los idiomas deben implementar esta interfaz.
export interface Strings {
  navbar: {
    cta: string;
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
