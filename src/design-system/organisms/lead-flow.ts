// Cinta de flujo del lead (OSMO MWG104 adaptado): segmentos de texto + media montados sobre
// una línea SVG. La sección se pinea; al scrollear, el track fluye a lo largo de la línea, que
// se ondula según la velocidad del scroll (morph línea→ola, MorphSVGPlugin) y se relaja al parar.
// Texto e imágenes rotan siguiendo la curva. Light strip. Pasos de acción de atom en gradiente.
//
// Copy en i18n (leadFlow.steps); media = placeholders (rects) hasta tener assets reales.

import { gsap, ScrollTrigger } from '../../core/motion/gsap-env';
import { renderSection } from '../molecules/layout';
import { strings } from '../../core/i18n';

const SVGNS = 'http://www.w3.org/2000/svg';
const GAP = 90; // separación entre segmentos (unidades de viewBox)
const IMG_HEIGHT = 310; // alto de la media en la cinta
const FONT_SIZE = 350; // tamaño del texto (unidades de viewBox 0 0 2577 391)
const MEDIA_W = 420; // ancho del placeholder de media
const HIGHLIGHT = new Set([1, 3]); // pasos en gradiente (acciones de atom)

const prefersReduced = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function svgEl<K extends keyof SVGElementTagNameMap>(tag: K): SVGElementTagNameMap[K] {
  return document.createElementNS(SVGNS, tag);
}

export function renderLeadFlow(root: Element): void {
  const s = strings().leadFlow;

  const scroll = document.createElement('p');
  scroll.className = 'aa-leadflow__scroll';
  scroll.textContent = s.scroll;

  // SVG: defs (clip redondeado, gradiente, línea recta + ola) + track de segmentos.
  const svg = svgEl('svg');
  svg.setAttribute('viewBox', '0 0 2577 391');
  svg.setAttribute('fill', 'none');

  const defs = svgEl('defs');
  const clip = svgEl('clipPath');
  clip.id = 'aa-flow-clip';
  clip.setAttribute('clipPathUnits', 'objectBoundingBox');
  const clipRect = svgEl('rect');
  clipRect.setAttribute('width', '1');
  clipRect.setAttribute('height', '1');
  clipRect.setAttribute('rx', '0.08');
  clipRect.setAttribute('ry', '0.08');
  clip.appendChild(clipRect);

  const grad = svgEl('linearGradient');
  grad.id = 'aa-flow-grad';
  grad.setAttribute('x1', '0');
  grad.setAttribute('y1', '0');
  grad.setAttribute('x2', '1');
  grad.setAttribute('y2', '0');
  [
    ['0', '#8023ff'],
    ['0.5', '#bf44ff'],
    ['1', '#ff6600'],
  ].forEach(([offset, color]) => {
    const stop = svgEl('stop');
    stop.setAttribute('offset', offset);
    stop.setAttribute('stop-color', color);
    grad.appendChild(stop);
  });
  defs.append(clip, grad);

  const line = svgEl('path');
  line.id = 'aa-flow-line';
  line.setAttribute('d', 'M0 195H644H1288H1932H2576');
  const wave = svgEl('path');
  wave.id = 'aa-flow-wave';
  wave.setAttribute(
    'd',
    'M0.21875 190.5C0.21875 190.5 382.004 0.5 644.219 0.5C906.434 0.5 1051.3 78.1239 1288.22 190.5C1531.72 306 1668.87 390.5 1932.22 390.5C2195.57 390.5 2576.22 190.5 2576.22 190.5',
  );
  wave.setAttribute('opacity', '0'); // solo es el target del morph, no se dibuja

  const track = svgEl('g');
  track.id = 'aa-flow-track';

  s.steps.forEach((text, i) => {
    const t = svgEl('text');
    t.setAttribute('class', 'aa-leadflow__seg aa-leadflow__text');
    t.setAttribute('font-size', String(FONT_SIZE));
    if (HIGHLIGHT.has(i)) t.setAttribute('fill', 'url(#aa-flow-grad)');
    const tp = svgEl('textPath');
    tp.setAttribute('href', '#aa-flow-line');
    tp.setAttribute('text-anchor', 'start');
    tp.textContent = text;
    t.appendChild(tp);
    track.appendChild(t);

    // Media placeholder entre cada par de pasos.
    if (i < s.steps.length - 1) {
      const rect = svgEl('rect');
      rect.setAttribute('class', 'aa-leadflow__seg aa-leadflow__media');
      rect.setAttribute('width', String(MEDIA_W));
      rect.setAttribute('height', String(IMG_HEIGHT));
      rect.setAttribute('clip-path', 'url(#aa-flow-clip)');
      track.appendChild(rect);
    }
  });

  svg.append(defs, line, wave, track);

  const container = document.createElement('div');
  container.className = 'aa-leadflow__container';
  container.append(scroll, svg); // hint centrado en el viewport pineado

  const pin = document.createElement('div');
  pin.className = 'aa-leadflow__pin';
  pin.appendChild(container);

  const section = renderSection({
    theme: 'light',
    className: 'aa-leadflow',
    children: [pin],
  });
  section.setAttribute('data-aa-leadflow', '');
  root.appendChild(section);
}

interface TextSeg {
  type: 'text';
  el: SVGTextElement;
  textPath: SVGTextPathElement;
  size: number;
}
interface MediaSeg {
  type: 'media';
  el: SVGGraphicsElement;
  size: number;
  width: number;
  height: number;
}
type Seg = TextSeg | MediaSeg;

let measureCanvas: HTMLCanvasElement | null = null;
function measureTextWidth(textEl: SVGTextElement, content: string): number {
  const fontSize = parseFloat(textEl.getAttribute('font-size') ?? '') || FONT_SIZE;
  measureCanvas ??= document.createElement('canvas');
  const ctx = measureCanvas.getContext('2d');
  if (!ctx) return content.length * fontSize * 0.5;
  const { fontWeight, fontFamily } = getComputedStyle(textEl);
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  return ctx.measureText(content).width;
}

export function initLeadFlow(scope: Element): void {
  const root = scope.querySelector<HTMLElement>('[data-aa-leadflow]');
  if (!root) return;
  const pinHeight = root.querySelector<HTMLElement>('.aa-leadflow__pin');
  const container = root.querySelector<HTMLElement>('.aa-leadflow__container');
  const line = root.querySelector<SVGPathElement>('#aa-flow-line');
  const track = root.querySelector<SVGGElement>('#aa-flow-track');
  if (!pinHeight || !container || !line || !track) return;

  let segments: Seg[] = [];
  let totalLength = 0;
  let scrollProgress = 0;

  function measureSegments(): void {
    segments = Array.from(track!.children).map((el): Seg => {
      if (el.tagName === 'text') {
        const tEl = el as SVGTextElement;
        const tp = tEl.querySelector('textPath') as SVGTextPathElement;
        return { type: 'text', el: tEl, textPath: tp, size: measureTextWidth(tEl, tp.textContent ?? '') };
      }
      const g = el as SVGGraphicsElement;
      const w = Number(g.getAttribute('width'));
      const h = Number(g.getAttribute('height'));
      return { type: 'media', el: g, size: w, width: w, height: h };
    });
    totalLength = segments.reduce(
      (sum, seg, i) => sum + seg.size + (i < segments.length - 1 ? GAP : 0),
      0,
    );
  }

  function placeMediaOnPath(el: SVGGraphicsElement, len: number, width: number, height: number): void {
    const pl = line!.getTotalLength();
    if (len < -width || len > pl + width) {
      el.style.opacity = '0';
      return;
    }
    el.style.opacity = '1';
    const clamped = gsap.utils.clamp(0, pl, len);
    const pt = line!.getPointAtLength(clamped);
    const next = line!.getPointAtLength(gsap.utils.clamp(0, pl, clamped + 1));
    const angle = (Math.atan2(next.y - pt.y, next.x - pt.x) * 180) / Math.PI;
    el.setAttribute('x', String(pt.x - width / 2));
    el.setAttribute('y', String(pt.y - height));
    el.setAttribute('transform', `rotate(${angle} ${pt.x} ${pt.y})`);
  }

  function update(): void {
    const pl = line!.getTotalLength();
    let cursor = pl + totalLength - scrollProgress * (pl + totalLength);
    for (let i = segments.length - 1; i >= 0; i--) {
      const seg = segments[i];
      cursor -= seg.size;
      if (seg.type === 'media') {
        placeMediaOnPath(seg.el, cursor + seg.size / 2, seg.width, seg.height);
      } else {
        seg.textPath.setAttribute('startOffset', `${(cursor / pl) * 100}%`);
        seg.el.style.opacity = cursor >= pl || cursor + seg.size <= 0 ? '0' : '1';
      }
      cursor -= GAP;
    }
  }

  // Ola por velocidad de scroll: amplitude → progress del morph línea→ola.
  const morphTl = gsap.timeline({ paused: true }).to(line, {
    morphSVG: '#aa-flow-wave',
    duration: 1,
    ease: 'none',
  });
  const amplitude = { value: 0 };
  const amplitudeTo = gsap.quickTo(amplitude, 'value', {
    duration: 1,
    ease: 'power2',
    onUpdate: () => {
      morphTl.progress(gsap.utils.clamp(0, 1, amplitude.value / 50));
      update();
    },
  });
  let wheelTimeout = 0;
  function bumpAmplitude(amount: number): void {
    amplitudeTo(Math.abs(amount));
    clearTimeout(wheelTimeout);
    wheelTimeout = window.setTimeout(() => amplitudeTo(0), 66);
  }

  const start = (): void => {
    measureSegments();

    if (prefersReduced()) {
      scrollProgress = 0.5; // ribbon estático a media cinta, sin pin/scroll-jacking
      update();
      return;
    }

    const scrollHint = root.querySelector<HTMLElement>('.aa-leadflow__scroll');
    if (scrollHint) {
      gsap.to(scrollHint, {
        autoAlpha: 0,
        duration: 0.2,
        scrollTrigger: { trigger: root, start: 'top top', end: 'top top-=1', toggleActions: 'play none reverse none' },
      });
    }

    let prevScroll: number | null = null;
    ScrollTrigger.create({
      trigger: pinHeight,
      start: 'top top',
      end: 'bottom bottom',
      pin: container,
      scrub: true,
      onUpdate: (self) => {
        const sc = self.scroll();
        if (prevScroll != null) bumpAmplitude(sc - prevScroll);
        prevScroll = sc;
        scrollProgress = self.progress;
        update();
      },
    });
    root.addEventListener('wheel', (e) => bumpAmplitude((e as WheelEvent).deltaY), { passive: true });
    ScrollTrigger.refresh();
  };

  // El measure depende de la fuente display ya cargada (medición canvas).
  void Promise.all([
    document.fonts.ready,
    document.fonts.load(`500 ${FONT_SIZE}px Grift`).catch(() => undefined),
  ]).then(start);
}
