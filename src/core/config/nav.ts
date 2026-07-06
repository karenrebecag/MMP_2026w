// URLs de navegación por idioma. El sitio vive en new.atomchat.io con un prefijo de idioma
// por locale (ej. /portugues/...). El navbar lee estas URLs según getLang() para que el logo
// y los links de industria conserven el idioma actual. Paths relativos al dominio (leading /).

import type { Lang } from '../types';

export interface NavIndustria {
  label: string;
  href: string;
}

export interface NavUrls {
  home: string;
  industriasLabel: string;
  industrias: NavIndustria[];
}

export const NAV_URLS: Record<Lang, NavUrls> = {
  pt: {
    home: '/portugues/home',
    industriasLabel: 'Indústrias',
    industrias: [
      { label: 'Financeiro', href: '/portugues/industrias/financeiro' },
      { label: 'Automotivo', href: '/portugues/industrias/automotivo' },
      { label: 'Educacional', href: '/portugues/industrias/educacional' },
    ],
  },
  // TODO(urls): confirmar prefijo y slugs es/en cuando se creen esas páginas en Webflow.
  es: {
    home: '/espanol/home',
    industriasLabel: 'Industrias',
    industrias: [
      { label: 'Financiera', href: '/espanol/industrias/financiera' },
      { label: 'Automotriz', href: '/espanol/industrias/automotriz' },
      { label: 'Educativa', href: '/espanol/industrias/educativa' },
    ],
  },
  en: {
    home: '/ingles/home',
    industriasLabel: 'Industries',
    industrias: [
      { label: 'Financial', href: '/ingles/industrias/financial' },
      { label: 'Automotive', href: '/ingles/industrias/automotive' },
      { label: 'Education', href: '/ingles/industrias/education' },
    ],
  },
};
