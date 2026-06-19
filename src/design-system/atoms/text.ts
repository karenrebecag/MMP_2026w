// Helpers de texto — contraparte programática de .aa-h-* / .aa-eyebrow / .aa-p-*.
// `split: true` marca el elemento con data-aa-split para el reveal de motion.ts.

export type HeadingSize = 'xxl' | 'xl' | 'l' | 'ml' | 'm';
export type ParagraphSize = 'l' | 'm';

interface HeadingOptions {
  size: HeadingSize;
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
  split?: boolean;
  gradient?: boolean;
  className?: string;
}

interface ParagraphOptions {
  size: ParagraphSize;
  text: string;
  className?: string;
}

function cx(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

// Convierte **bold** en <strong> con nodos DOM reales (sin innerHTML). El texto sin
// marcadores cae a un único text node — equivalente a textContent.
function appendRichText(el: HTMLElement, text: string): void {
  text.split(/\*\*(.+?)\*\*/g).forEach((part, i) => {
    if (!part) return;
    if (i % 2 === 1) {
      const strong = document.createElement('strong');
      strong.textContent = part;
      el.appendChild(strong);
    } else {
      el.appendChild(document.createTextNode(part));
    }
  });
}

export function renderHeading(opts: HeadingOptions): HTMLElement {
  const { size, text, tag = 'h2', split, gradient, className } = opts;
  const el = document.createElement(tag);
  el.className = cx(`aa-h-${size}`, gradient && 'aa-text-gradient', className);
  el.textContent = text;
  if (split) el.setAttribute('data-aa-split', '');
  return el;
}

export function renderEyebrow(text: string, className?: string): HTMLElement {
  const el = document.createElement('span');
  el.className = cx('aa-eyebrow', className);
  el.textContent = text;
  return el;
}

export function renderParagraph(opts: ParagraphOptions): HTMLElement {
  const { size, text, className } = opts;
  const el = document.createElement('p');
  el.className = cx(`aa-p-${size}`, className);
  appendRichText(el, text);
  return el;
}
