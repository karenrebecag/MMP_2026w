// Registro de páginas: mapea data-page → el chunk del composer correspondiente.
// El entry hace import() dinámico, así cada page-type es su propio chunk (code splitting):
// data-page="academy" carga solo el composer de academy, no el de home.

import type { Theme, Lang } from '../types';

export interface PageContext {
  theme: Theme;
  lang: Lang;
}

export interface PageModule {
  render: (mount: HTMLElement, ctx: PageContext) => void | Promise<void>;
}

export const PAGES: Record<string, () => Promise<PageModule>> = {
  home: () => import('../../page-types/home'),
};
