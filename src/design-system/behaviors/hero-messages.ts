// Motor del hero "messages": píldoras de WhatsApp (avatar + texto) que brotan en el campo.
// Capa base AMBIENT (timer) en todos lados — resuelve mobile/táctil y la discoverability.
// Sobre ella, en desktop con puntero fino, el CURSOR dispara spawns por distancia recorrida.
// Appearing: la burbuja entra con spring y el avatar popea un beat después (notificación) →
// deriva → encoge y se autodestruye. Legibilidad: el campo va detrás del headline (z-index)
// y se evita una caja de exclusión alrededor del content. prefers-reduced-motion → estático.

import { gsap } from '../../core/motion/gsap-env';

const AMBIENT_MS = 1400; // cadencia del auto-spawn ambiente
const RESET_DIST_DIV = 2.5; // umbral de distancia del cursor = innerWidth / 2.5 (menor densidad)
const MAX_LIVE = 14; // tope de píldoras vivas simultáneas (performance)
const EXCLUDE_PAD = 1.12; // 12% de margen alrededor del content box (zona protegida)

// Profundidad falsa (z): valores en el centro (junto al headline) → recede; en los bordes → pleno.
const DEPTH_ALPHA_MIN = 0.3; // opacidad de las burbujas más cercanas al centro
const DEPTH_ALPHA_EASE = 0.5; // <1: suben a opacidad plena antes (más cerca del centro)
const DEPTH_SCALE_MIN = 0.9; // tamaño de las más cercanas al centro
const DEPTH_BLUR_MAX = 0.15; // px de blur en el centro (0 hacia los bordes)

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REDUCED = '(prefers-reduced-motion: reduce)';

interface MsgItem {
  text: string;
  avatar: string;
}

// Hora del dispositivo (HH:MM) para el timestamp estilo WhatsApp de cada burbuja.
function clockHHMM(): string {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function initHeroMessages(scope: Element): void {
  const field = scope.querySelector<HTMLElement>('[data-aa-hero-field]');
  if (!field) return;
  const content = scope.querySelector<HTMLElement>('.aa-hero__content');

  // Fuente: nodos ocultos que renderiza hero.ts. Dos pools por emisor: usuario (claras, con
  // avatar) y atom (verdes, data-kind="out", sin avatar). El motor solo los lee.
  const sources = Array.from(field.querySelectorAll<HTMLElement>('.aa-hero__msg-source'));
  const userItems: MsgItem[] = sources
    .filter((n) => n.getAttribute('data-kind') !== 'out')
    .map((n) => ({ text: n.textContent ?? '', avatar: n.getAttribute('data-avatar') ?? '' }))
    .filter((it) => it.text);
  const atomItems: MsgItem[] = sources
    .filter((n) => n.getAttribute('data-kind') === 'out')
    .map((n) => ({ text: n.textContent ?? '', avatar: '' }))
    .filter((it) => it.text);
  if (!userItems.length) return;

  if (window.matchMedia(REDUCED).matches) return; // accesibilidad: sin motion, hero estático

  let inIdx = 0;
  let outIdx = 0;
  let nextKind: 'in' | 'out' = 'in'; // alterna usuario → atom → usuario …
  let live = 0;

  // Caja de exclusión (headline) en coordenadas del field, con padding.
  function exclusion(): DOMRect | null {
    if (!content) return null;
    const f = field!.getBoundingClientRect();
    const c = content.getBoundingClientRect();
    const cx = c.left + c.width / 2 - f.left;
    const cy = c.top + c.height / 2 - f.top;
    const hw = (c.width * EXCLUDE_PAD) / 2;
    const hh = (c.height * EXCLUDE_PAD) / 2;
    return new DOMRect(cx - hw, cy - hh, hw * 2, hh * 2);
  }

  // Empuja un punto dentro de la caja hacia su borde más cercano (los mensajes la esquivan).
  function avoid(x: number, y: number): { x: number; y: number } {
    const r = exclusion();
    if (!r || x < r.left || x > r.right || y < r.top || y > r.bottom) return { x, y };
    const dl = x - r.left;
    const dr = r.right - x;
    const dt = y - r.top;
    const db = r.bottom - y;
    const min = Math.min(dl, dr, dt, db);
    if (min === dl) return { x: r.left, y };
    if (min === dr) return { x: r.right, y };
    if (min === dt) return { x, y: r.top };
    return { x, y: r.bottom };
  }

  function spawn(x: number, y: number, vx: number, vy: number): void {
    if (live >= MAX_LIVE) return;
    const p = avoid(x, y);
    // Alterna emisor: usuario (in) ↔ atom (out). Si no hay pool atom, todo queda en usuario.
    const kind: 'in' | 'out' = nextKind === 'out' && atomItems.length ? 'out' : 'in';
    nextKind = kind === 'in' ? 'out' : 'in';
    const item =
      kind === 'in' ? userItems[inIdx % userItems.length] : atomItems[outIdx % atomItems.length];
    if (kind === 'in') inIdx++;
    else outIdx++;

    const el = document.createElement('div');
    el.className = `aa-hero__msg aa-hero__msg--${kind}`;

    // Avatar solo en entrantes — en WhatsApp tus propios mensajes (out) no llevan avatar.
    let avatar: HTMLImageElement | null = null;
    if (kind === 'in') {
      avatar = document.createElement('img');
      avatar.className = 'aa-hero__msg-avatar';
      avatar.src = item.avatar;
      avatar.alt = '';
      avatar.loading = 'lazy';
      avatar.setAttribute('aria-hidden', 'true');
    }

    const text = document.createElement('span');
    text.className = 'aa-hero__msg-text';
    text.textContent = item.text;

    const time = document.createElement('span');
    time.className = 'aa-hero__msg-time';
    time.textContent = clockHHMM();
    time.setAttribute('aria-hidden', 'true');

    if (avatar) el.append(avatar, text, time);
    else el.append(text, time);
    field!.appendChild(el);
    live++;

    // Profundidad por distancia al centro del headline: cerca → tenue/borroso/pequeño
    // (no compite con el copy); hacia los bordes → opacidad, tamaño y nitidez plenos.
    const f = field!.getBoundingClientRect();
    let cx = f.width / 2;
    let cy = f.height / 2;
    if (content) {
      const c = content.getBoundingClientRect();
      cx = c.left + c.width / 2 - f.left;
      cy = c.top + c.height / 2 - f.top;
    }
    const maxD = Math.hypot(Math.max(cx, f.width - cx), Math.max(cy, f.height - cy));
    const t = maxD > 0 ? Math.min(Math.hypot(p.x - cx, p.y - cy) / maxD, 1) : 1;
    const restAlpha = gsap.utils.interpolate(DEPTH_ALPHA_MIN, 1, Math.pow(t, DEPTH_ALPHA_EASE));
    const restScale = gsap.utils.interpolate(DEPTH_SCALE_MIN, 1, t);
    const blurPx = gsap.utils.interpolate(DEPTH_BLUR_MAX, 0, t);

    gsap.set(el, {
      x: p.x,
      y: p.y,
      xPercent: -50,
      yPercent: -50,
      rotation: (Math.random() - 0.5) * 6, // ±3°: los mensajes no tumbornean
      scale: restScale * 0.95, // scale-up sutil: 95% → 100% del tamaño de profundidad
      autoAlpha: 0,
      filter: blurPx < 0.15 ? 'none' : `blur(${blurPx.toFixed(2)}px)`,
    });
    if (avatar) gsap.set(avatar, { scale: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        el.remove();
        live--;
        tl.kill();
      },
    });
    // Burbuja entra con un scale-up sutil hasta su opacidad/tamaño de profundidad.
    tl.to(el, { scale: restScale, autoAlpha: restAlpha, ease: 'back.out(1.5)', duration: 0.55 }, 0);
    // Avatar popea un beat después (sensación de notificación) — solo en entrantes.
    if (avatar) tl.to(avatar, { scale: 1, ease: 'back.out(3)', duration: 0.5 }, 0.08);
    // Deriva en la dirección de la velocidad (cursor) o aleatoria suave (ambient).
    tl.to(el, { x: '+=' + vx * 3, y: '+=' + vy * 3, ease: 'power3.out', duration: 1.7 }, 0);
    // Salida.
    tl.to(el, { scale: restScale * 0.72, autoAlpha: 0, duration: 0.45, ease: 'back.in(1.6)' }, '-=0.45');
  }

  // Ambient: brota en una posición aleatoria del field (avoid() lo saca del headline),
  // con deriva suave en dirección aleatoria.
  function ambient(): void {
    const r = field!.getBoundingClientRect();
    const ang = Math.random() * Math.PI * 2;
    spawn(Math.random() * r.width, Math.random() * r.height, Math.cos(ang) * 12, Math.sin(ang) * 12);
  }
  window.setInterval(ambient, AMBIENT_MS);
  ambient(); // uno al inicio para que el hero tenga vida de entrada

  // Cursor: solo con puntero fino (desktop). Acumula distancia recorrida como el snippet.
  if (window.matchMedia(FINE_POINTER).matches) {
    let incr = 0;
    let ox = 0;
    let oy = 0;
    let primed = false;
    scope.addEventListener('mousemove', (e) => {
      const me = e as MouseEvent;
      const r = field!.getBoundingClientRect();
      const x = me.clientX - r.left;
      const y = me.clientY - r.top;
      if (!primed) {
        ox = x;
        oy = y;
        primed = true;
        return;
      }
      const dx = x - ox;
      const dy = y - oy;
      incr += Math.abs(dx) + Math.abs(dy);
      if (incr > window.innerWidth / RESET_DIST_DIV) {
        incr = 0;
        spawn(x, y, dx, dy);
      }
      ox = x;
      oy = y;
    });
  }
}
