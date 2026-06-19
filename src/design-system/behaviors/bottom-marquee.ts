// Bottom marquee del hero — réplica de OSMO MWG 047: tira de imágenes alineadas al bottom
// que recorren en loop horizontal. Cada imagen "crece" desde su borde izquierdo al entrar
// por la derecha (scaleX 0→1) y se "aplasta" contra su borde derecho al salir por la
// izquierda (scaleX 1→0). El original ata ese efecto al scroll horizontal (Lenis +
// ScrollTrigger scrub); aquí el movimiento es automático (loop GSAP constante, como
// marquee.ts) y el grow/squash se calcula por la posición EN VIVO de cada imagen cada
// frame (gsap.ticker), con los mismos umbrales (left 100→80%, right 20→0%).

import { gsap } from '../../core/motion/gsap-env';

// TEMP: imágenes servidas desde el CDN de Webflow (header76). Swap por R2 antes de prod.
const MEDIA_BASE = 'https://cdn.prod.website-files.com/6890d2a7153362eed21e1c49';
const MEDIA = [
  '68a8a96593e91b3f86901dac_waa-calls-retail.webp',
  '68b0bb3605e02c54787f0f02_waa-message-security_b.webp',
  '68b0bb364ae9efd28e67a691_waa-message-retail-2_b.webp',
  '68a8a9655ee51d0403d94425_waa-calls-automotive.webp',
  '68b0bb36bbbf0afbb1832a99_waa-message-finance_b.webp',
  '68b0bb35104ee1ac61d10dbe_waa-message-retail_b.webp',
  '68b0bb364ae9efd28e67a6db_waa-message-admissions_b.webp',
  '68b0bb36c40519207871087c_waa-message-security-2_b.webp',
  '68b0bb36d98bb531da6bc397_waa_message-finance-2_b.webp',
  '68a8a96510dbc5166960cdb4_waa-calls-finance.webp',
  '68b0bb36b098cb140c18b1ad_waa-message-admissions-2_b.webp',
  '68a8a96436713226ab637bf8_waa-calls-university.webp',
].map((file) => `${MEDIA_BASE}/${file}`);

// Las imágenes de Webflow comparten aspect ratio, así que el borde superior saldría plano. El
// reference (MWG 047) deja el ANCHO uniforme y deja que varíe la ALTURA: columnas parejas, borde
// superior escalonado. Aquí lo forzamos con altura por media (object-fit: cover recorta) en un
// patrón de ONDA SUAVE — no aleatorio — para que el escalonado se lea intencional y no caótico.
// vw. Doble seno sobre 12 ítems: tile sin costura al repetirse en el loop.
const MEDIA_HEIGHTS = [13.5, 15, 13.5, 11.5, 10.5, 11.5, 13.5, 15, 13.5, 11.5, 10.5, 11.5];

const SPEED = 60; // px/s — velocidad constante del loop horizontal (auto-movement base)
const ENTER_FROM = 100; // % del ancho: borde izq donde arranca a crecer
const ENTER_TO = 80; // % del ancho: borde izq donde llega a tamaño pleno
const EXIT_AT = 20; // % del ancho: borde der donde arranca a aplastarse

// Scroll acceleration (réplica del scrub Lenis del MWG 047, pero ADITIVO sobre el auto-loop):
// el scroll vertical de la página inyecta velocidad horizontal que decae sola. Conserva el
// movimiento automático y lo "empuja" cuando el usuario hace scroll.
const SCROLL_GAIN = 0.35; // px de avance por cada px scrolleado en el frame
const SCROLL_FRICTION = 0.85; // decaimiento por frame del impulso de scroll (→ 0)

const prefersReduced = (): boolean =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export function renderBottomMarquee(root: Element): void {
  const wrap = document.createElement('div');
  wrap.className = 'aa-bmarquee';
  wrap.setAttribute('data-aa-bmarquee', '');
  wrap.setAttribute('aria-hidden', 'true'); // decorativo

  const track = document.createElement('ul');
  track.className = 'aa-bmarquee__track';
  MEDIA.forEach((src, i) => {
    const li = document.createElement('li');
    li.className = 'aa-bmarquee__media';
    li.style.setProperty('--bm-h', `${MEDIA_HEIGHTS[i % MEDIA_HEIGHTS.length]}vw`);
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    li.appendChild(img);
    track.appendChild(li);
  });

  wrap.appendChild(track);
  root.appendChild(wrap);
}

// Resuelve cuando todas las imágenes tienen tamaño intrínseco. El ancho de cada media sale
// del aspect ratio (height fija, width auto), así que medir antes de la carga daría 0.
function whenImagesReady(imgs: HTMLImageElement[]): Promise<void> {
  return Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalWidth
        ? Promise.resolve()
        : new Promise<void>((res) => {
            img.addEventListener('load', () => res(), { once: true });
            img.addEventListener('error', () => res(), { once: true });
          }),
    ),
  ).then(() => undefined);
}

// Repite la secuencia base hasta cubrir el viewport y la duplica: con dos copias idénticas,
// animar a -mitad encadena el loop sin costuras. Devuelve esa mitad (px). Llamar SÓLO tras
// whenImagesReady: el ancho de los li depende del aspect ratio ya cargado.
function fillTrack(track: HTMLElement): number {
  const base = Array.from(track.children);
  let guard = 0;
  while (track.scrollWidth < window.innerWidth * 1.5 && guard++ < 40) {
    base.forEach((n) => track.appendChild(n.cloneNode(true)));
  }
  Array.from(track.children).forEach((n) => track.appendChild(n.cloneNode(true)));
  return track.scrollWidth / 2;
}

export function initBottomMarquee(scope: Element): void {
  const wrap = scope.querySelector<HTMLElement>('[data-aa-bmarquee]');
  if (!wrap) return;
  const track = wrap.querySelector<HTMLElement>('.aa-bmarquee__track');
  if (!track) return;

  const baseImgs = Array.from(track.querySelectorAll<HTMLImageElement>('img'));

  if (prefersReduced()) {
    gsap.set(baseImgs, { scaleX: 1, transformOrigin: '0% 50%' }); // estático y visible
    return;
  }

  // El ancho de cada media (y por tanto el del track) sólo es real tras cargar las imágenes.
  void whenImagesReady(baseImgs).then(() => {
    const half = fillTrack(track);
    // Se mide el <li> (ancho estable por layout), no el <img>: el scaleX del img colapsa su
    // propio bounding rect y falsearía la posición.
    const medias = Array.from(track.querySelectorAll<HTMLElement>('.aa-bmarquee__media'))
      .map((el) => ({ el, img: el.querySelector<HTMLImageElement>('img') }))
      .filter((m): m is { el: HTMLElement; img: HTMLImageElement } => m.img !== null);

    // Posición manejada a mano (no por tween) para poder SUMARle la velocidad de scroll. offset
    // crece hacia +; el track se desplaza a -offset (←). Se envuelve módulo `half`: con las dos
    // copias idénticas del track, eso encadena el loop sin costura.
    let offset = 0;
    let scrollImpulse = 0; // px/frame que aporta el scroll; decae por SCROLL_FRICTION
    let lastY = window.scrollY || window.pageYOffset || 0;
    const scrollY = (): number => window.scrollY || window.pageYOffset || 0;

    // Grow/squash por posición en vivo — reemplaza al ScrollTrigger scrub. Las dos fases
    // (entrar por la derecha / salir por la izquierda) son excluyentes para una media y ambas
    // valen scaleX=1 en su frontera, así que el cambio de transform-origin no salta.
    const tick = (_time: number, deltaTime: number): void => {
      const box = wrap.getBoundingClientRect();
      const w = box.width;
      if (!w) return;

      // Avance: base constante (px/s → px/frame por dt) + impulso de scroll que decae.
      const y = scrollY();
      scrollImpulse = scrollImpulse * SCROLL_FRICTION + (y - lastY) * SCROLL_GAIN * (1 - SCROLL_FRICTION);
      lastY = y;
      offset += (SPEED * deltaTime) / 1000 + scrollImpulse;
      offset = ((offset % half) + half) % half; // wrap robusto ante valores negativos
      gsap.set(track, { x: -offset }); // antes del read: getBoundingClientRect fuerza reflow y ve la nueva x

      for (const { el, img } of medias) {
        const r = el.getBoundingClientRect();
        const leftPct = ((r.left - box.left) / w) * 100;
        const rightPct = ((r.right - box.left) / w) * 100;
        if (leftPct > ENTER_TO) {
          const p = gsap.utils.clamp(0, 1, (ENTER_FROM - leftPct) / (ENTER_FROM - ENTER_TO));
          gsap.set(img, { scaleX: p, transformOrigin: '0% 50%' });
        } else if (rightPct < EXIT_AT) {
          const p = gsap.utils.clamp(0, 1, rightPct / EXIT_AT);
          gsap.set(img, { scaleX: p, transformOrigin: '100% 50%' });
        } else {
          gsap.set(img, { scaleX: 1, transformOrigin: '0% 50%' });
        }
      }
    };
    gsap.ticker.add(tick);
  });
}
