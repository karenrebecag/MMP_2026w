// Helpers de texto — contraparte programática de .aa-h-* / .aa-eyebrow / .aa-p-*.
// `split: true` marca el elemento con data-aa-split para el reveal de motion.ts.

export type HeadingSize = 'xxl' | 'xl' | 'l' | 'ml' | 'm';
export type ParagraphSize = 'l' | 'm';

interface HeadingOptions {
  size: HeadingSize;
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4';
  split?: boolean;
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

export function renderHeading(opts: HeadingOptions): HTMLElement {
  const { size, text, tag = 'h2', split, className } = opts;
  const el = document.createElement(tag);
  el.className = cx(`aa-h-${size}`, className);
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
  el.textContent = text;
  return el;
}
