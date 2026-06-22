// WhatsApp Conversion Intelligence (WCI): inyecta el SDK de AtomChat en modo `attach`.
// No crea UI (sin float): se engancha a los [data-atom-button] que renderiza el botón
// primario, genera un chatId por click, dispara el webhook de atribución y abre WhatsApp.
// Llamar tras montar el DOM (los botones deben existir). Fire-and-forget: si falla, el
// href wa.me del botón sigue abriendo WhatsApp.

import { WHATSAPP } from '../../core/config/brand';

let _injected = false;

export function initWhatsApp(): void {
  if (_injected || document.querySelector('script[data-atom-wci]')) {
    _injected = true;
    return;
  }
  _injected = true;

  const s = document.createElement('script');
  s.src = WHATSAPP.widget;
  s.async = true;
  s.setAttribute('data-atom-wci', ''); // marcador de deduplicación
  s.setAttribute('data-company-token', WHATSAPP.companyToken);
  s.setAttribute('data-phone', WHATSAPP.phone);
  s.setAttribute('data-message', WHATSAPP.message);
  s.setAttribute('data-mode', 'attach'); // solo adjunta WCI a [data-atom-button], no crea float
  document.head.appendChild(s);
}
