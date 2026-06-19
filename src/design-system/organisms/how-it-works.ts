// Sección "Cómo funciona" — mismo patrón de grid que la strip "Qué hace atom": eyebrow a la
// izquierda + divisoria vertical + contenido a la derecha. A la derecha, un marquee VERTICAL de
// features (motor en behaviors/vertical-marquee): "La IA que [responde en segundos / califica
// leads / …]". Frases derivadas de lo que hace atom en atomchat.io. Sección light.

import { renderSection, renderContainer } from '../molecules/layout';
import { renderParagraph } from '../atoms/text';
import { renderButton } from '../atoms/button';
import { strings } from '../../core/i18n';

export { initVerticalMarquee } from '../behaviors/vertical-marquee';

// Marca `*palabra*` → span con gradiente de marca; el resto cae a text nodes. Sin innerHTML.
function appendWithGradient(el: HTMLElement, text: string): void {
  text.split(/\*(.+?)\*/g).forEach((part, i) => {
    if (!part) return;
    if (i % 2 === 1) {
      const span = document.createElement('span');
      span.className = 'aa-text-gradient';
      span.textContent = part;
      el.appendChild(span);
    } else {
      el.appendChild(document.createTextNode(part));
    }
  });
}

export function renderHowItWorks(root: Element): void {
  const s = strings().howItWorks;

  // Izquierda: eyebrow + lead ("Tu IA que", con highlight en gradiente) + botón abajo.
  const label = document.createElement('span');
  label.className = 'aa-hiw__label';
  label.textContent = s.eyebrow;
  label.setAttribute('data-aa-fade', '');

  const lead = document.createElement('h2');
  lead.className = 'aa-h-xxl aa-hiw__lead';
  appendWithGradient(lead, s.lead);
  lead.setAttribute('data-aa-split', '');

  const body = renderParagraph({ size: 'l', text: s.body, className: 'aa-hiw__body' });
  body.setAttribute('data-aa-fade', '');

  const cta = document.createElement('div');
  cta.className = 'aa-hiw__cta';
  cta.setAttribute('data-aa-fade', '');
  cta.appendChild(renderButton({ label: s.cta, href: '#aa-waitlist', variant: 'primary' }));

  const aside = document.createElement('div');
  aside.className = 'aa-hiw__aside';
  aside.append(label, lead, body, cta);

  // Derecha: marquee vertical de features. El motor (vertical-marquee) lo anima por [data-aa-vmarquee].
  const track = document.createElement('div');
  track.className = 'aa-vmarquee__track';
  s.features.forEach((text) => {
    const row = document.createElement('div');
    row.className = 'aa-vmarquee__row';
    row.textContent = text;
    track.appendChild(row);
  });
  const marquee = document.createElement('div');
  marquee.className = 'aa-vmarquee aa-hiw__marquee';
  marquee.setAttribute('data-aa-vmarquee', '');
  marquee.setAttribute('aria-hidden', 'true'); // decorativo; la lista accesible no es crítica aquí
  marquee.appendChild(track);

  const grid = document.createElement('div');
  grid.className = 'aa-hiw__grid';
  grid.append(aside, marquee);

  const section = renderSection({
    theme: 'light',
    className: 'aa-hiw',
    children: [renderContainer({ children: [grid] })],
  });
  root.appendChild(section);
}
