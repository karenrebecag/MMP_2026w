// Resolver de contenido por idioma. Espeja el patrón de core/i18n: una fuente de
// copy por locale + un selector que lee el idioma activo (setLang en boot).

import type { Lang } from '../core/types';
import { getLang } from '../core/i18n';
import type { SectionContent } from './types';
import { es } from './es';
import { en } from './en';
import { pt } from './pt';

export * from './types';

const SECTIONS_BY_LANG: Record<Lang, SectionContent[]> = { es, en, pt };

// Secciones del idioma activo. Llamar dentro de render (después de setLang en boot).
export function getSections(): SectionContent[] {
  return SECTIONS_BY_LANG[getLang()];
}
