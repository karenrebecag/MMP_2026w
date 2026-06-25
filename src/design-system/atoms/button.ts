// Botón — OSMO "Button 004": dos copias del label (default visible + hover oculta),
// cada una spliteada en chars por initButton004(). El flip 3D de caracteres en hover
// es 100% CSS; el JS solo parte el texto y setea --index/--signed-index/--max-index.

import { WHATSAPP } from '../../core/config/brand';

// Ícono de WhatsApp fijo (no se splitea ni entra al flip). currentColor → hereda el color del
// botón en cada variante (primary: claro sobre fondo oscuro; ghost/secondary: oscuro).
const WHATSAPP_ICON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.049 4.90701C17.3493 3.20721 15.0898 2.18312 12.6912 2.02547C10.2926 1.86782 7.91847 2.58735 6.01096 4.05007C4.10345 5.51278 2.7926 7.61896 2.32257 9.97633C1.85254 12.3337 2.25535 14.7816 3.456 16.864L2.049 22L7.3 20.621C8.75245 21.4124 10.3799 21.8277 12.034 21.829C13.9949 21.8301 15.912 21.2495 17.5429 20.1607C19.1737 19.072 20.445 17.5239 21.1958 15.7125C21.9467 13.9011 22.1434 11.9077 21.7611 9.98441C21.3788 8.06116 20.4346 6.29453 19.048 4.90801L19.049 4.90701ZM12.041 20.157C10.5648 20.1573 9.11572 19.76 7.846 19.007L7.546 18.827L4.428 19.644L5.261 16.605L5.066 16.293C4.38658 15.2118 3.96778 13.9875 3.84265 12.7167C3.71752 11.4459 3.88948 10.1634 4.34497 8.97049C4.80045 7.77755 5.52699 6.70681 6.46722 5.84279C7.40746 4.97877 8.53566 4.34513 9.76277 3.99188C10.9899 3.63863 12.2823 3.57544 13.538 3.8073C14.7937 4.03916 15.9783 4.55973 16.9984 5.3279C18.0184 6.09608 18.8459 7.09084 19.4156 8.23366C19.9853 9.37647 20.2816 10.6361 20.281 11.913C20.2778 14.0977 19.4088 16.192 17.8642 17.7371C16.3197 19.2822 14.2257 20.153 12.041 20.157ZM16.557 13.985C16.311 13.86 15.092 13.263 14.865 13.185C14.638 13.107 14.474 13.06 14.306 13.31C14.138 13.56 13.666 14.11 13.521 14.283C13.376 14.456 13.233 14.47 12.986 14.345C12.2559 14.0533 11.5819 13.6371 10.994 13.115C10.4534 12.6137 9.98909 12.0359 9.616 11.4C9.471 11.154 9.6 11.018 9.726 10.9C9.852 10.782 9.972 10.611 10.097 10.466C10.1992 10.3409 10.2824 10.2014 10.344 10.052C10.3769 9.98367 10.3922 9.90823 10.3887 9.83248C10.3852 9.75674 10.363 9.68304 10.324 9.61801C10.261 9.49301 9.765 8.27401 9.562 7.77801C9.359 7.28201 9.156 7.35201 9 7.34401C8.844 7.33601 8.69 7.33601 8.527 7.33601C8.40171 7.33967 8.2785 7.36898 8.16498 7.42213C8.05147 7.47527 7.95005 7.55113 7.867 7.64501C7.58693 7.9105 7.36521 8.23139 7.21594 8.58725C7.06667 8.94312 6.99313 9.32616 7 9.71201C7.08057 10.6462 7.43193 11.5365 8.011 12.274C9.07331 13.8657 10.5309 15.1541 12.241 16.013C12.831 16.267 13.292 16.419 13.651 16.537C14.156 16.6901 14.6896 16.7244 15.21 16.637C15.5548 16.567 15.8813 16.4264 16.1691 16.224C16.4569 16.0216 16.6996 15.7618 16.882 15.461C17.0444 15.0917 17.0948 14.6827 17.027 14.285C16.969 14.174 16.805 14.114 16.555 13.985H16.557Z" fill="currentColor"></path></svg>`;

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

  // Ícono fijo de WhatsApp antes del texto (fuera del stack: no se splitea ni flipea).
  const icon = document.createElement('span');
  icon.className = 'aa-button__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = WHATSAPP_ICON;

  // Stack de las dos copias del label (default + hover) apiladas para el flip 3D.
  const textStack = document.createElement('span');
  textStack.className = 'aa-button__text-stack';

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

  textStack.append(def, hov);
  inner.append(icon, textStack);

  const bg = document.createElement('span');
  bg.className = 'aa-button__bg';

  el.append(inner, bg);
  return el;
}
