// Conversación viva del hero: muestra burbujas una a una (con indicador de "escribiendo"
// antes de cada turno), las apila desde abajo y deja que el overflow superior las recorte.
// Hace rolling de las más viejas para no crecer el DOM. Pausa cuando el hero no está visible.

import { gsap } from '../../core/motion/gsap-env';

interface Turn {
  kind: 'in' | 'out'; // in = lead (blanco, izq), out = negocio (verde, der)
  name?: string;
  text: string;
  time: string;
}

const SCRIPT: Turn[] = [
  { kind: 'in', name: 'Sofía', text: 'Hola, vi su anuncio 👀 ¿precio?', time: '11:51' },
  { kind: 'out', text: '¡Hola Sofía! 🙌 Te paso todo en un momento', time: '11:51' },
  { kind: 'out', text: 'El plan completo queda en $1,290 MXN', time: '11:52' },
  { kind: 'in', name: 'Sofía', text: 'Uff, está un poco arriba 😅', time: '11:52' },
  { kind: 'out', text: 'Te entiendo 💚 hoy tengo 30% off por lanzamiento', time: '11:53' },
  { kind: 'out', text: 'Quedaría en $903 y lo apartas con $200', time: '11:53' },
  { kind: 'in', name: 'Sofía', text: 'Ah, así sí 🔥 ¿cómo pago?', time: '11:54' },
  { kind: 'out', text: 'Aquí tu link seguro 👉 pago.atom.la/sofia', time: '11:54' },
  { kind: 'in', name: 'Sofía', text: '¡Listo, ya aparté! ✅', time: '11:56' },
  { kind: 'out', text: '¡Vendido! 🎉 Te llega el acceso a tu correo', time: '11:56' },
];

const TYPE_IN_MIN = 1000; // el lead "escribe" un poco más (pequeños delays)
const TYPE_IN_MAX = 1700;
const TYPE_OUT_MIN = 550;
const TYPE_OUT_MAX = 950;
const PAUSE_MIN = 700;
const PAUSE_MAX = 1200;
const MAX_BUBBLES = 6; // las que sobran se recortan por el overflow superior

const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));
const rand = (min: number, max: number): number => min + Math.random() * (max - min);
const prefersReduced = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

function bubbleEl(turn: Turn): HTMLElement {
  const bubble = document.createElement('div');
  bubble.className = `aa-hero__bubble aa-hero__bubble--${turn.kind}`;
  if (turn.name) {
    const name = document.createElement('span');
    name.className = 'aa-hero__bubble-name';
    name.textContent = turn.name;
    bubble.appendChild(name);
  }
  const text = document.createElement('p');
  text.className = 'aa-hero__bubble-text';
  text.textContent = turn.text;
  const time = document.createElement('span');
  time.className = 'aa-hero__bubble-time';
  time.textContent = turn.time;
  bubble.append(text, time);
  return bubble;
}

function typingEl(kind: Turn['kind']): HTMLElement {
  const bubble = document.createElement('div');
  bubble.className = `aa-hero__bubble aa-hero__bubble--${kind} aa-hero__bubble--typing`;
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    dot.className = 'aa-hero__typing-dot';
    bubble.appendChild(dot);
  }
  return bubble;
}

// Aparece creciendo en alto (empuja a las de arriba hacia el overflow) + fade.
function animateIn(track: HTMLElement, el: HTMLElement): void {
  track.appendChild(el);
  el.style.overflow = 'hidden';
  gsap.from(el, {
    height: 0,
    opacity: 0,
    duration: 0.4,
    ease: 'power3.out',
    onComplete: () => {
      el.style.overflow = '';
      gsap.set(el, { clearProps: 'height,opacity' });
    },
  });
}

function animateOutRemove(el: HTMLElement): Promise<void> {
  return new Promise((res) => {
    el.style.overflow = 'hidden';
    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        el.remove();
        res();
      },
    });
  });
}

function trimOld(track: HTMLElement): void {
  while (track.children.length > MAX_BUBBLES) track.firstElementChild?.remove();
}

export function initHeroChat(scope: Element): void {
  const track = scope.querySelector<HTMLElement>('[data-aa-hero-chat-track]');
  if (!track) return;

  // Sin animación: muestra los últimos turnos de forma estática.
  if (prefersReduced()) {
    SCRIPT.slice(-3).forEach((turn) => track.appendChild(bubbleEl(turn)));
    return;
  }

  let visible = true;
  const card = scope.querySelector('.aa-hero__card') ?? scope;
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
    },
    {
      threshold: 0.08,
    },
  );
  io.observe(card);

  const waitVisible = async (): Promise<void> => {
    while (!visible) await delay(300);
  };

  let i = 0;
  const run = async (): Promise<void> => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await waitVisible();
      const turn = SCRIPT[i % SCRIPT.length];
      i++;

      const typing = typingEl(turn.kind);
      animateIn(track, typing);
      const typeRange =
        turn.kind === 'in' ? [TYPE_IN_MIN, TYPE_IN_MAX] : [TYPE_OUT_MIN, TYPE_OUT_MAX];
      await delay(rand(typeRange[0], typeRange[1]));
      await animateOutRemove(typing);

      animateIn(track, bubbleEl(turn));
      trimOld(track);
      await delay(rand(PAUSE_MIN, PAUSE_MAX));
    }
  };

  void run();
}
