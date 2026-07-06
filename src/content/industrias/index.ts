// Resolver de contenido de industria por idioma. Espeja content/index.ts y core/i18n:
// una fuente de copy por locale + un selector que lee el idioma activo (setLang en boot).
// La estructura (íconos, tint, video, imagen) vive en los composers; aquí solo el copy.

import type { Lang } from '../../core/types';
import { getLang } from '../../core/i18n';
import type { IndustriasContent } from './types';
import { es } from './es';
import { en } from './en';
import { pt } from './pt';

export * from './types';

const BY_LANG: Record<Lang, IndustriasContent> = { es, en, pt };

// Contenido de una industria en el idioma activo. Llamar dentro de render (post setLang).
export function getIndustria<K extends keyof IndustriasContent>(
  industry: K,
): IndustriasContent[K] {
  return BY_LANG[getLang()][industry];
}
