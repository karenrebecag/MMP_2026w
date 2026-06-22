// Botón — OSMO "Button 004": dos copias del label (default visible + hover oculta),
// cada una spliteada en chars por initButton004(). El flip 3D de caracteres en hover
// es 100% CSS; el JS solo parte el texto y setea --index/--signed-index/--max-index.

import { WHATSAPP } from '../../core/config/brand';

export interface ButtonOptions {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm';
  target?: '_blank' | '_self';
}

// Los CTAs primarios convierten por WhatsApp (WCI). El SDK en modo attach intercepta el
// click sobre [data-atom-button] y añade tracking; el href wa.me es el fallback sin SDK.
function waHref(): string {
  return `https://wa.me/${WHATSAPP.phone}?text=${encodeURIComponent(WHATSAPP.message)}`;
}
function ctaSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function renderButton(opts: ButtonOptions): HTMLElement {
  const { label, href, variant = 'primary', size = 'default', target } = opts;

  // Primary = CTA de conversión → WhatsApp (override del href + atributos WCI).
  const isWa = variant === 'primary';
  const finalHref = isWa ? waHref() : href;

  const tag = finalHref ? 'a' : 'button';
  const el = document.createElement(tag) as HTMLAnchorElement | HTMLButtonElement;
  el.className = `aa-button aa-button--${variant} aa-button--${size}`;
  el.setAttribute('data-aa-btn004', '');

  if (isWa) {
    el.setAttribute('data-atom-button', '');
    el.setAttribute('data-cta', ctaSlug(label));
  }

  if (finalHref && el instanceof HTMLAnchorElement) {
    el.href = finalHref;
    const tgt = isWa ? '_blank' : target;
    if (tgt) el.target = tgt;
    if (tgt === '_blank') el.rel = 'noopener noreferrer';
  }

  const inner = document.createElement('span');
  inner.className = 'aa-button__inner';

  // default = visible/accesible; hover = copia que entra (aria-hidden).
  const def = document.createElement('span');
  def.className = 'aa-button__text is--default';
  def.setAttribute('data-aa-btn004-text', '');
  def.textContent = label;

  const hov = document.createElement('span');
  hov.className = 'aa-button__text is--hover';
  hov.setAttribute('aria-hidden', 'true');
  hov.setAttribute('data-aa-btn004-text', '');
  hov.textContent = label;

  inner.append(def, hov);

  const bg = document.createElement('span');
  bg.className = 'aa-button__bg';

  el.append(inner, bg);
  return el;
}
