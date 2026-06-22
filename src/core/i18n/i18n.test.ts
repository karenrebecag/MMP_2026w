import { describe, it, expect, beforeEach } from 'vitest';
import { setLang, getLang, t, strings } from './index';

describe('i18n resolver', () => {
  beforeEach(() => setLang('es')); // ES es el default; reset entre tests

  it('setLang/getLang reflejan el idioma activo', () => {
    setLang('en');
    expect(getLang()).toBe('en');
    setLang('pt');
    expect(getLang()).toBe('pt');
  });

  it('t() resuelve claves dot-notation por idioma', () => {
    setLang('es');
    expect(t('navbar.cta')).toBe('Agendar demo');
    setLang('en');
    expect(t('navbar.cta')).toBe('Book a demo');
    setLang('pt');
    expect(t('navbar.cta')).toBe('Agendar demo');
  });

  it('t() resuelve claves anidadas profundas', () => {
    setLang('en');
    expect(t('waitlist.fields.email.label')).toBe('Email');
    expect(t('waitlist.status.loading')).toBe('Sending…');
  });

  it('t() devuelve la clave tal cual si no existe en ningún idioma', () => {
    setLang('es');
    expect(t('does.not.exist')).toBe('does.not.exist');
  });

  it('strings() da acceso tipado estructurado (privacy.before/link/after)', () => {
    setLang('es');
    const p = strings().waitlist.privacy;
    expect(p.before).toContain('Acepto');
    expect(p.link).toBe('política de privacidad');
    expect(p.after).toBe('.');
  });

  it('strings() devuelve el snapshot del idioma activo', () => {
    setLang('pt');
    expect(strings().navbar.cta).toBe('Agendar demo');
  });
});
