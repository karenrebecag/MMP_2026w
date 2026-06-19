// Motor de chat animado reutilizable (mismo comportamiento que el hero): muestra
// burbujas una a una con indicador de "escribiendo", las apila desde abajo y hace
// rolling de las viejas. renderChatTrack() crea el track (con el guion serializado);
// initChats() lo anima tras el montaje. Pausa cuando no está visible.

import { gsap } from '../../core/motion/gsap-env';

export interface ChatTurn {
  kind: 'in' | 'out';
  name?: string;
  text: string;
  time: string;
}

const TYPE_IN_MIN = 1000;
const TYPE_IN_MAX = 1700;
const TYPE_OUT_MIN = 550;
const TYPE_OUT_MAX = 950;
const PAUSE_MIN = 700;
const PAUSE_MAX = 1200;
const MAX_BUBBLES = 6;

const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));
const rand = (min: number, max: number): number => min + Math.random() * (max - min);
const prefersReduced = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Track vacío con el guion serializado: la animación corre después del montaje.
export function renderChatTrack(script: ChatTurn[]): HTMLElement {
  const track = document.createElement('div');
  track.className = 'aa-chat__track';
  track.setAttribute('data-aa-chat', JSON.stringify(script));
  return track;
}

function bubbleEl(turn: ChatTurn): HTMLElement {
  const bubble = document.createElement('div');
  bubble.className = `aa-chat__bubble aa-chat__bubble--${turn.kind}`;
  if (turn.name) {
    const name = document.createElement('span');
    name.className = 'aa-chat__bubble-name';
    name.textContent = turn.name;
    bubble.appendChild(name);
  }
  const text = document.createElement('span');
  text.className = 'aa-chat__bubble-text';
  text.textContent = turn.text;
  const time = document.createElement('span');
  time.className = 'aa-chat__bubble-time';
  time.textContent = turn.time;
  bubble.append(text, time);
  return bubble;
}

function typingEl(kind: ChatTurn['kind']): HTMLElement {
  const bubble = document.createElement('div');
  bubble.className = `aa-chat__bubble aa-chat__bubble--${kind} aa-chat__bubble--typing`;
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    dot.className = 'aa-chat__typing-dot';
    bubble.appendChild(dot);
  }
  return bubble;
}

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

function runChat(track: HTMLElement, script: ChatTurn[]): void {
  let visible = true;
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
    },
    {
      threshold: 0.05,
    },
  );
  io.observe(track);
  const waitVisible = async (): Promise<void> => {
    while (!visible) await delay(300);
  };

  let i = 0;
  const run = async (): Promise<void> => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await waitVisible();
      const turn = script[i % script.length];
      i++;

      const typing = typingEl(turn.kind);
      animateIn(track, typing);
      const range = turn.kind === 'in' ? [TYPE_IN_MIN, TYPE_IN_MAX] : [TYPE_OUT_MIN, TYPE_OUT_MAX];
      await delay(rand(range[0], range[1]));
      await animateOutRemove(typing);

      animateIn(track, bubbleEl(turn));
      trimOld(track);
      await delay(rand(PAUSE_MIN, PAUSE_MAX));
    }
  };
  void run();
}

export function initChats(scope: Element): void {
  scope.querySelectorAll<HTMLElement>('[data-aa-chat]').forEach((track) => {
    let script: ChatTurn[];
    try {
      script = JSON.parse(track.getAttribute('data-aa-chat') || '[]') as ChatTurn[];
    } catch {
      return;
    }
    if (!script.length) return;

    if (prefersReduced()) {
      script.slice(-3).forEach((turn) => track.appendChild(bubbleEl(turn)));
      return;
    }
    runChat(track, script);
  });
}
