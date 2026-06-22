// Motor del hero "messages": el campo detrás del headline se llena de piezas de WhatsApp que
// brotan, derivan y se autodestruyen. Capa base AMBIENT (timer) en todos lados — resuelve
// mobile/táctil y la discoverability; sobre ella, en desktop con puntero fino, el CURSOR dispara
// spawns por distancia recorrida. Hay 6 tipos de pieza (registro de builders): texto entrante
// (avatar + burbuja blanca), texto saliente atom (verde), nota de audio, llamada, imagen+texto y
// burbuja de emoji. El ciclo de vida (spring-in, deriva, profundidad/blur por cercanía al centro,
// caja de exclusión, salida) es COMPARTIDO; cada builder solo arma su DOM. La selección es
// ponderada para que el texto domine (legibilidad/marca) y los emojis llenen el resto.
// prefers-reduced-motion → hero estático.

import { gsap } from '../../core/motion/gsap-env';
import { audiencePhotos, manifestoShots, featureShots } from '../../assets/r2';

const AMBIENT_MS = 360; // cadencia del auto-spawn ambiente (densidad muy alta)
const RESET_DIST_DIV = 2.5; // umbral de distancia del cursor = innerWidth / 2.5
const MAX_LIVE = 46; // tope de piezas vivas simultáneas (performance)
const SEED_COUNT = 10; // piezas sembradas al montar para que el hero arranque lleno
const EXCLUDE_PAD = 1.12; // 12% de margen alrededor del content box (zona protegida)

// Profundidad falsa (z): valores en el centro (junto al headline) → recede; en los bordes → pleno.
const DEPTH_ALPHA_MIN = 0.82; // opacidad de las piezas más cercanas al centro (piso alto = más sólidas)
const DEPTH_ALPHA_EASE = 0.5; // <1: suben a opacidad plena antes (más cerca del centro)
const DEPTH_SCALE_MIN = 0.9; // tamaño de las más cercanas al centro
const DEPTH_BLUR_MAX = 0.15; // px de blur en el centro (0 hacia los bordes)

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REDUCED = '(prefers-reduced-motion: reduce)';

// Pesos de aparición por tipo (suman 100). El texto domina para no comprometer legibilidad/marca;
// los emojis son baratos y frecuentes; audio/imagen/llamada son acentos ocasionales.
type Kind = 'in' | 'out' | 'audio' | 'call' | 'image' | 'emoji';
const KIND_WEIGHTS: [Kind, number][] = [
  ['emoji', 28],
  ['in', 22],
  ['out', 20],
  ['audio', 12],
  ['image', 10],
  ['call', 8],
];

// Datos decorativos (no i18n): se ciclan dentro de las piezas que no llevan copy traducible.
const EMOJIS = ['🚀', '😍', '🔥', '👏', '💚', '✨', '🎉', '👍', '🙌', '❤️', '💬', '😮'];
const AUDIO_DURATIONS = ['0:08', '0:12', '0:21', '0:34', '1:04'];
const CALL_NAMES = ['Banco', 'Admisiones', 'Concesionario', 'Atom', 'Crédito'];
const CALL_DURATIONS = ['0:12', '0:45', '1:20', '2:03'];
const IMAGE_ACTIONS = ['Quiero conocerlo', 'Llámame ahora', 'Ver oferta', 'Más info'];

// Pool de thumbnails: assets R2 ya existentes (no i18n) reutilizados como foto de la burbuja imagen.
const THUMBS = [
  ...audiencePhotos,
  manifestoShots.top,
  manifestoShots.bottom,
  featureShots.respondeBefore,
  featureShots.respondeAfter,
  ...featureShots.califica,
  ...featureShots.cierra,
];

interface MsgItem {
  text: string;
  avatar: string;
}

// Hora del dispositivo (HH:MM) para el timestamp estilo WhatsApp de cada pieza.
function clockHHMM(): string {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function div(cls: string): HTMLDivElement {
  const d = document.createElement('div');
  d.className = cls;
  return d;
}
function span(cls: string, txt?: string): HTMLSpanElement {
  const s = document.createElement('span');
  s.className = cls;
  if (txt != null) s.textContent = txt;
  return s;
}
function img(src: string, cls: string): HTMLImageElement {
  const i = document.createElement('img');
  i.className = cls;
  i.src = src;
  i.alt = '';
  i.loading = 'lazy';
  i.setAttribute('aria-hidden', 'true');
  return i;
}

export function initHeroMessages(scope: Element): void {
  const field = scope.querySelector<HTMLElement>('[data-aa-hero-field]');
  if (!field) return;
  const content = scope.querySelector<HTMLElement>('.aa-hero__content');

  // Fuente: nodos ocultos que renderiza hero.ts. Dos pools de texto por emisor: usuario (claras,
  // con avatar) y atom (verdes, data-kind="out"). El motor solo los lee.
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

  // Pools derivados: avatares (de los entrantes) y captions (texto de ambos emisores) para imagen.
  const avatarPool = userItems.map((i) => i.avatar).filter(Boolean);
  if (!avatarPool.length) avatarPool.push('');
  const captions = [...userItems.map((i) => i.text), ...atomItems.map((i) => i.text)].filter(
    Boolean,
  );

  // Índices de ciclado por pool (round-robin estable, no repite hasta agotar).
  let inIdx = 0;
  let outIdx = 0;
  let avaIdx = 0;
  let capIdx = 0;
  let thumbIdx = 0;
  let audIdx = 0;
  let callNameIdx = 0;
  let callDurIdx = 0;
  let emojiIdx = 0;
  let actIdx = 0;
  let live = 0;

  const nextAvatar = (): string => avatarPool[avaIdx++ % avatarPool.length];

  function pickKind(): Kind {
    let r = Math.random() * 100;
    for (const [k, w] of KIND_WEIGHTS) {
      r -= w;
      if (r < 0) {
        // Sin pool atom, "out" cae a "in" (todo queda en burbujas de usuario).
        if (k === 'out' && !atomItems.length) return 'in';
        return k;
      }
    }
    return 'in';
  }

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

  // Empuja un punto dentro de la caja hacia su borde más cercano (las piezas la esquivan).
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

  // Builders: cada uno arma su DOM y devuelve la pieza + el avatar a "popear" (o null).
  interface Built {
    el: HTMLElement;
    avatar: HTMLElement | null;
  }

  function buildText(kind: 'in' | 'out'): Built {
    const item =
      kind === 'in' ? userItems[inIdx++ % userItems.length] : atomItems[outIdx++ % atomItems.length];
    const el = div(`aa-hero__msg aa-hero__msg--${kind}`);
    let avatar: HTMLElement | null = null;
    if (kind === 'in') avatar = img(item.avatar, 'aa-hero__msg-avatar');
    const text = span('aa-hero__msg-text', item.text);
    const time = span('aa-hero__msg-time', clockHHMM());
    time.setAttribute('aria-hidden', 'true');
    if (avatar) el.append(avatar, text, time);
    else el.append(text, time);
    return { el, avatar };
  }

  function buildAudio(): Built {
    const el = div('aa-hero__msg aa-hero__msg--audio');
    const avatar = img(nextAvatar(), 'aa-hero__msg-avatar');
    const play = span('aa-hero__audio-play');
    play.setAttribute('aria-hidden', 'true');
    const body = div('aa-hero__audio-body');
    const wave = div('aa-hero__audio-wave');
    // Barras de la onda: altura por patrón senoidal (decorativo, no representa audio real).
    for (let i = 0; i < 24; i++) {
      const bar = document.createElement('i');
      bar.style.height = `${3 + Math.round(Math.abs(Math.sin(i * 1.3)) * 9)}px`;
      wave.appendChild(bar);
    }
    const meta = div('aa-hero__audio-meta');
    const mic = span('aa-hero__audio-mic');
    mic.setAttribute('aria-hidden', 'true');
    const dur = span('aa-hero__audio-dur', AUDIO_DURATIONS[audIdx++ % AUDIO_DURATIONS.length]);
    const time = span('aa-hero__msg-time', clockHHMM());
    time.setAttribute('aria-hidden', 'true');
    const checks = span('aa-hero__msg-checks', '✓✓');
    checks.setAttribute('aria-hidden', 'true');
    meta.append(mic, dur, time, checks);
    body.append(wave, meta);
    el.append(avatar, play, body);
    return { el, avatar };
  }

  function buildCall(): Built {
    const el = div('aa-hero__msg aa-hero__msg--call');
    const head = div('aa-hero__call-head');
    const min = span('aa-hero__call-btn aa-hero__call-min');
    const id = div('aa-hero__call-id');
    const name = span('aa-hero__call-name', CALL_NAMES[callNameIdx++ % CALL_NAMES.length]);
    const dur = span('aa-hero__call-dur', CALL_DURATIONS[callDurIdx++ % CALL_DURATIONS.length]);
    id.append(name, dur);
    const add = span('aa-hero__call-btn aa-hero__call-add');
    head.append(min, id, add);
    const actions = div('aa-hero__call-actions');
    for (const k of ['more', 'cam', 'spk', 'mute', 'end']) {
      const ctl = span(`aa-hero__call-ctl aa-hero__call-ctl--${k}`);
      ctl.setAttribute('aria-hidden', 'true');
      actions.appendChild(ctl);
    }
    el.append(head, actions);
    return { el, avatar: null };
  }

  function buildImage(): Built {
    const el = div('aa-hero__msg aa-hero__msg--image');
    const thumb = img(THUMBS[thumbIdx++ % THUMBS.length], 'aa-hero__img-thumb');
    const body = div('aa-hero__img-body');
    const text = span('aa-hero__msg-text', captions[capIdx++ % captions.length]);
    const time = span('aa-hero__msg-time', clockHHMM());
    time.setAttribute('aria-hidden', 'true');
    body.append(text, time);
    const action = span('aa-hero__img-action', IMAGE_ACTIONS[actIdx++ % IMAGE_ACTIONS.length]);
    el.append(thumb, body, action);
    return { el, avatar: null };
  }

  function buildEmoji(): Built {
    const el = div('aa-hero__msg aa-hero__msg--emoji');
    el.append(span('aa-hero__emoji-glyph', EMOJIS[emojiIdx++ % EMOJIS.length]));
    return { el, avatar: null };
  }

  function build(kind: Kind): Built {
    switch (kind) {
      case 'audio':
        return buildAudio();
      case 'call':
        return buildCall();
      case 'image':
        return buildImage();
      case 'emoji':
        return buildEmoji();
      case 'out':
        return buildText('out');
      default:
        return buildText('in');
    }
  }

  function spawn(x: number, y: number, vx: number, vy: number): void {
    if (live >= MAX_LIVE) return;
    const p = avoid(x, y);
    const { el, avatar } = build(pickKind());
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
      rotation: (Math.random() - 0.5) * 6, // ±3°: las piezas no tumbornean
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
    // Entra con un scale-up sutil hasta su opacidad/tamaño de profundidad.
    tl.to(el, { scale: restScale, autoAlpha: restAlpha, ease: 'back.out(1.5)', duration: 0.55 }, 0);
    // Avatar popea un beat después (sensación de notificación) — solo donde hay avatar.
    if (avatar) tl.to(avatar, { scale: 1, ease: 'back.out(3)', duration: 0.5 }, 0.08);
    // Deriva en la dirección de la velocidad (cursor) o aleatoria suave (ambient).
    tl.to(el, { x: '+=' + vx * 3, y: '+=' + vy * 3, ease: 'power3.out', duration: 1.7 }, 0);
    // Salida.
    tl.to(
      el,
      { scale: restScale * 0.72, autoAlpha: 0, duration: 0.45, ease: 'back.in(1.6)' },
      '-=0.45',
    );
  }

  // Ambient: brota en una posición aleatoria del field (avoid() lo saca del headline),
  // con deriva suave en dirección aleatoria.
  function ambient(): void {
    const r = field!.getBoundingClientRect();
    const ang = Math.random() * Math.PI * 2;
    spawn(Math.random() * r.width, Math.random() * r.height, Math.cos(ang) * 12, Math.sin(ang) * 12);
  }
  window.setInterval(ambient, AMBIENT_MS);
  for (let i = 0; i < SEED_COUNT; i++) ambient(); // siembra inicial: el hero arranca poblado

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
