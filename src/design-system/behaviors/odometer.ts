// Odómetro de números (OSMO "Number Odometer" adaptado): cada dígito rueda en una tira
// vertical tipo contador mecánico y aterriza en su valor al entrar en viewport. Los chars
// no numéricos (+, %, €, comas…) quedan estáticos. Scroll-trigger via ScrollTrigger.
// Scopeado: solo procesa los [data-odometer-group] dentro de `scope`. Soporta:
//   [data-odometer-group]            contenedor = trigger de scroll (anima los elementos dentro)
//   [data-odometer-element]          número a animar (su textContent = valor final)
//   [data-odometer-start="N"]        valor inicial (default 0); si tiene menos dígitos, crecen
//   [data-odometer-duration="s"]     duración del roll por elemento
//   [data-odometer-stagger="s"]      delay entre elementos del grupo
//   [data-odometer-stagger-order]    left | right | random
//   [data-odometer-trigger-start]    start de ScrollTrigger (default 'top 80%')

import { gsap, ScrollTrigger } from '../../core/motion/gsap-env';

const INIT_FLAG = 'data-odometer-initialized';

const DEFAULTS = {
  duration: 1,
  ease: 'power3.out',
  elementStagger: 0.1,
  digitStagger: 0.04,
  revealDuration: 0.5,
  revealEase: 'power2.out',
  triggerStart: 'top 80%',
  staggerOrder: 'left',
  digitCycles: 2,
};

interface Segment {
  type: 'digit' | 'static';
  char: string;
  startDigit?: number;
  hidden?: boolean;
}
interface RollerRef {
  roller: HTMLElement;
  targetPos: number;
}
interface RevealRef {
  el: HTMLElement;
  widthEm: number;
}
interface ElementData {
  el: HTMLElement;
  rollers: RollerRef[];
  duration: number;
  step: number;
  revealData: RevealRef[];
  originalText: string;
}

const prefersReduced = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getLineHeightRatio(el: HTMLElement): number {
  const cs = getComputedStyle(el);
  if (cs.lineHeight === 'normal') return 1.2;
  return parseFloat(cs.lineHeight) / parseFloat(cs.fontSize);
}

function parseSegments(text: string): Segment[] {
  return [...text].map((char) => ({ type: /\d/.test(char) ? 'digit' : 'static', char }));
}

function mapStartDigits(segments: Segment[], startValue: number): Segment[] {
  const digitSlots = segments.filter((s) => s.type === 'digit');
  const padded = String(Math.floor(Math.abs(startValue)))
    .padStart(digitSlots.length, '0')
    .slice(-digitSlots.length);
  let di = 0;
  return segments.map((s) =>
    s.type === 'digit' ? { ...s, startDigit: parseInt(padded[di++], 10) } : s,
  );
}

function markHiddenSegments(segments: Segment[], startValue: number): Segment[] {
  const totalDigits = segments.filter((s) => s.type === 'digit').length;
  const absStart = Math.floor(Math.abs(startValue));
  const startDigitCount = absStart === 0 ? 1 : String(absStart).length;
  const leadingZeros = Math.max(0, totalDigits - startDigitCount);
  if (leadingZeros === 0) return segments;
  let digitsSeen = 0;
  let firstDigitSeen = false;
  let prevDigitHidden = false;
  return segments.map((seg) => {
    if (seg.type === 'digit') {
      firstDigitSeen = true;
      const hidden = digitsSeen < leadingZeros;
      prevDigitHidden = hidden;
      digitsSeen++;
      return { ...seg, hidden };
    }
    return { ...seg, hidden: firstDigitSeen && prevDigitHidden };
  });
}

function shouldGrow(
  el: HTMLElement,
  hasExplicitStart: boolean,
  startValue: number,
  segments: Segment[],
): boolean {
  if (el.hasAttribute('data-odometer-grow')) {
    return el.getAttribute('data-odometer-grow') !== 'false';
  }
  if (!hasExplicitStart) return false;
  const absStart = Math.floor(Math.abs(startValue));
  const startDigitCount = absStart === 0 ? 1 : String(absStart).length;
  return startDigitCount < segments.filter((s) => s.type === 'digit').length;
}

function buildRollerDOM(
  el: HTMLElement,
  segments: Segment[],
  step: number,
  grow: boolean,
): { rollers: RollerRef[]; revealEls: HTMLElement[] } {
  el.innerHTML = '';
  el.style.height = '';
  const rollers: RollerRef[] = [];
  const revealEls: HTMLElement[] = [];
  const totalCells = 10 * DEFAULTS.digitCycles;

  segments.forEach((seg) => {
    if (seg.type === 'static') {
      const span = document.createElement('span');
      span.setAttribute('data-odometer-part', 'static');
      span.style.height = `${step}em`;
      span.style.lineHeight = String(step);
      span.textContent = seg.char;
      el.appendChild(span);
      if (grow && seg.hidden) {
        gsap.set(span, { opacity: 0 });
        revealEls.push(span);
      }
      return;
    }
    const mask = document.createElement('span');
    mask.setAttribute('data-odometer-part', 'mask');
    mask.style.height = `${step}em`;
    mask.style.lineHeight = String(step);
    const roller = document.createElement('span');
    roller.setAttribute('data-odometer-part', 'roller');
    roller.style.lineHeight = String(step);

    const digits: number[] = [];
    for (let d = 0; d < totalCells; d++) digits.push(d % 10);
    roller.textContent = digits.join('\n');
    mask.appendChild(roller);
    el.appendChild(mask);

    const startDigit = seg.startDigit ?? 0;
    const isReveal = grow && !!seg.hidden;
    gsap.set(roller, { y: isReveal ? `${step}em` : `${-startDigit * step}em` });
    const endDigit = parseInt(seg.char, 10);
    const targetPos = endDigit > startDigit ? endDigit : 10 + endDigit;
    rollers.push({ roller, targetPos });
    if (isReveal) revealEls.push(mask);
  });
  return { rollers, revealEls };
}

function cleanupElement(el: HTMLElement, originalText: string): void {
  el.style.overflow = '';
  el.style.height = '';
  const digits = [...originalText].filter((c) => /\d/.test(c));
  let di = 0;
  el.querySelectorAll<HTMLElement>('[data-odometer-part="mask"]').forEach((mask) => {
    mask.querySelector('[data-odometer-part="roller"]')?.remove();
    mask.textContent = digits[di++] ?? '';
    mask.style.opacity = '';
    mask.style.overflow = '';
  });
  el.querySelectorAll<HTMLElement>('[data-odometer-part="static"]').forEach((stat) => {
    stat.style.opacity = '';
  });
}

function applyStaggerOrder(items: ElementData[], order: string): ElementData[] {
  const arr = [...items];
  if (order === 'right') return arr.reverse();
  if (order === 'random') {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  return arr;
}

export function initOdometer(scope: Element): void {
  scope.querySelectorAll<HTMLElement>('[data-odometer-group]').forEach((group) => {
    if (group.hasAttribute(INIT_FLAG)) return;
    group.setAttribute(INIT_FLAG, '');

    const elements = Array.from(group.querySelectorAll<HTMLElement>('[data-odometer-element]'));
    if (!elements.length || prefersReduced()) return;

    const staggerOrder = group.getAttribute('data-odometer-stagger-order') || DEFAULTS.staggerOrder;
    const triggerStart = group.getAttribute('data-odometer-trigger-start') || DEFAULTS.triggerStart;
    const elementStagger =
      parseFloat(group.getAttribute('data-odometer-stagger') ?? '') || DEFAULTS.elementStagger;

    const elementData: ElementData[] = elements.map((el) => {
      const originalText = el.textContent?.trim() ?? '';
      const hasExplicitStart = el.hasAttribute('data-odometer-start');
      const startValue = parseFloat(el.getAttribute('data-odometer-start') ?? '') || 0;
      const duration = parseFloat(el.getAttribute('data-odometer-duration') ?? '') || DEFAULTS.duration;
      const step = getLineHeightRatio(el);

      let segments = parseSegments(originalText);
      segments = mapStartDigits(segments, startValue);
      segments = markHiddenSegments(segments, startValue);

      const grow = shouldGrow(el, hasExplicitStart, startValue, segments);
      const { rollers, revealEls } = buildRollerDOM(el, segments, step, grow);

      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      const revealData: RevealRef[] = revealEls.map((revealEl) => {
        const widthEm = revealEl.offsetWidth / fontSize;
        gsap.set(revealEl, { width: 0, overflow: 'hidden' });
        return { el: revealEl, widthEm };
      });

      return { el, rollers, duration, step, revealData, originalText };
    });

    const ordered = applyStaggerOrder(elementData, staggerOrder);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: group, start: triggerStart, once: true },
      onComplete() {
        elementData.forEach(({ el, originalText }) => cleanupElement(el, originalText));
      },
    });

    ordered.forEach((data, orderIdx) => {
      const { rollers, duration, step, revealData } = data;
      const offset = orderIdx * elementStagger;
      revealData.forEach(({ el, widthEm }) => {
        tl.to(
          el,
          { width: `${widthEm}em`, opacity: 1, duration: DEFAULTS.revealDuration, ease: DEFAULTS.revealEase },
          offset,
        );
      });
      rollers.forEach(({ roller, targetPos }, digitIdx) => {
        const reversedIdx = rollers.length - 1 - digitIdx;
        tl.to(
          roller,
          { y: `${-targetPos * step}em`, duration, ease: DEFAULTS.ease, force3D: true },
          offset + reversedIdx * DEFAULTS.digitStagger,
        );
      });
    });
  });

  ScrollTrigger.refresh();
}
