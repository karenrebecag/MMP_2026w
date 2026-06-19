import { describe, it, expect } from 'vitest';
import { setLang } from '../core/i18n';
import { getSections } from './index';
import type { SectionContent } from './types';
import { es } from './es';
import { en } from './en';
import { pt } from './pt';

// Huella estructural (independiente del idioma): si una traducción suelta/cambia
// una sección, un count o una variante de card, el shape deja de coincidir.
function shape(s: SectionContent): Record<string, unknown> {
  const base: Record<string, unknown> = { kind: s.kind, id: s.id, theme: s.theme };
  switch (s.kind) {
    case 'cards':
      base.layout = s.layout;
      base.variants = s.cards.map((c) => c.variant);
      break;
    case 'manifesto':
      base.bubbles = s.bubbles.map((b) => `${b.kind}|${b.time}`);
      break;
    case 'checklist':
      base.itemCount = s.items.length;
      base.marker = s.marker;
      base.chat = s.media?.chat?.map((c) => `${c.kind}|${c.time}`);
      base.side = s.media?.side;
      base.surface = s.surface?.color;
      break;
    case 'prose':
    case 'statement':
      base.paraCount = s.paragraphs.length;
      base.faqCount = s.faq?.length;
      base.rotateWords = s.rotate?.words.length;
      base.chat = s.media?.chat?.map((c) => `${c.kind}|${c.time}`);
      base.side = s.media?.side;
      base.surface = s.surface?.color;
      break;
    case 'info':
      base.itemCount = s.items.length;
      base.rotateWords = s.rotate?.words.length;
      break;
    case 'audience':
      base.itemCount = s.items.length;
      break;
    case 'cta':
      base.hasBgVideo = Boolean(s.bgVideo);
      break;
  }
  return base;
}

const shapes = (arr: SectionContent[]) => arr.map(shape);

describe('content getSections', () => {
  it('devuelve las secciones del idioma activo', () => {
    setLang('es');
    expect(getSections()).toBe(es);
    setLang('en');
    expect(getSections()).toBe(en);
    setLang('pt');
    expect(getSections()).toBe(pt);
  });

  it('la primera sección es el manifiesto en todos los idiomas', () => {
    for (const lang of ['es', 'en', 'pt'] as const) {
      setLang(lang);
      expect(getSections()[0].kind).toBe('manifesto');
    }
  });
});

describe('paridad estructural es/en/pt', () => {
  it('en tiene la misma forma que es', () => {
    expect(shapes(en)).toEqual(shapes(es));
  });

  it('pt tiene la misma forma que es', () => {
    expect(shapes(pt)).toEqual(shapes(es));
  });

  it('las imágenes de media son compartidas (mismas URLs en todos los idiomas)', () => {
    const srcOf = (arr: SectionContent[]) =>
      arr.map((s) => ('media' in s ? s.media?.src : undefined));
    expect(srcOf(en)).toEqual(srcOf(es));
    expect(srcOf(pt)).toEqual(srcOf(es));
  });
});
