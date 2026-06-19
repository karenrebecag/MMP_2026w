import type { Lang } from '../types';
import type { Strings } from './strings';
import { es } from './es';
import { en } from './en';
import { pt } from './pt';

const TRANSLATIONS: Record<Lang, Strings> = { es, en, pt };

function resolve(obj: unknown, path: string): string {
  const keys = path.split('.');
  let node: unknown = obj;
  for (const key of keys) {
    if (node == null || typeof node !== 'object') return path;
    node = (node as Record<string, unknown>)[key];
  }
  return typeof node === 'string' ? node : path;
}

let _lang: Lang = 'es';

export function setLang(lang: Lang): void {
  _lang = lang;
}

export function getLang(): Lang {
  return _lang;
}

// Snapshot tipado del idioma activo. Útil para handlers async que deben cerrar
// sobre su idioma (no leer el singleton global más tarde) y para acceso estructurado.
export function strings(): Strings {
  return TRANSLATIONS[_lang];
}

// Resuelve una clave dot-notation contra el idioma activo.
// Fallback a ES si la clave no existe en el idioma activo.
// Devuelve la clave misma si no se encuentra en ningún idioma (visible en UI para debug).
export function t(key: string): string {
  const result = resolve(TRANSLATIONS[_lang], key);
  if (result === key && _lang !== 'es') {
    return resolve(TRANSLATIONS.es, key);
  }
  return result;
}
