// Strip "qué hace atom" — debajo del hero. Grid 2-col estilo editorial: eyebrow chico a la
// izquierda, headline grande de 2 líneas a la derecha con divisoria vertical entre columnas.
// Reusa los reveals on-scroll de motion.ts (data-aa-split en el headline, data-aa-fade en el
// resto). Parametrizado por i18n (namespace `whatAtom`). Sección light.

import { renderSection, renderContainer } from '../molecules/layout';
import { renderParagraph } from '../atoms/text';
import { strings } from '../../core/i18n';

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

export function renderWhatAtomDoes(root: Element): void {
  const s = strings().whatAtom;

  const aside = document.createElement('div');
  aside.className = 'aa-whatdo__aside';
  const label = document.createElement('span');
  label.className = 'aa-whatdo__label';
  label.textContent = s.label;
  label.setAttribute('data-aa-fade', '');
  aside.appendChild(label);

  // Headline en dos líneas con highlights en gradiente, revelado con el SplitText on-scroll
  // (data-aa-split). El gradiente sobre las words que genera SplitText lo sostiene el CSS.
  const title = document.createElement('h2');
  title.className = 'aa-h-xxl aa-whatdo__title';
  title.setAttribute('data-aa-split', '');
  appendWithGradient(title, s.titleL1);
  title.appendChild(document.createElement('br'));
  appendWithGradient(title, s.titleL2);

  const lead = renderParagraph({ size: 'l', text: s.lead, className: 'aa-whatdo__lead' });
  lead.setAttribute('data-aa-fade', '');

  const main = document.createElement('div');
  main.className = 'aa-whatdo__main';
  main.append(title, lead);

  const grid = document.createElement('div');
  grid.className = 'aa-whatdo__grid';
  grid.append(aside, main);

  const section = renderSection({
    theme: 'light',
    className: 'aa-whatdo',
    children: [renderContainer({ children: [grid] })],
  });
  root.appendChild(section);
}
