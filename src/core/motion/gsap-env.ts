// GSAP se consume del GLOBAL que inyecta Webflow (Core + plugins activados en Project settings →
// GSAP), NO se empaqueta en el bundle (marcado external en esbuild.config.mjs). Una sola instancia
// de GSAP en la página → se elimina el conflicto de doble copia que causaba "Missing plugin?
// ScrollTrigger" sobre el mount point (nuestros plugins ESM y los UMD del host competían por el core).
//
// Requiere activado en Webflow: ScrollTrigger, SplitText, Draggable, Inertia, CustomEase (+ MorphSVG
// para lead-flow). Si falta alguno, loadGsap() lanza un error nombrándolo en vez de fallar en silencio.
//
// Las exportaciones son live bindings: quedan definidas tras resolver loadGsap(). Llamar y await
// loadGsap() al inicio de render(), antes de cualquier tween/ScrollTrigger. Ningún módulo debe
// usarlas en top-level (solo dentro de funciones que corran después de loadGsap).

// Tipos solo-tipo (se borran en build, no empaquetan gsap): mantienen el intellisense.
type Gsap = typeof import('gsap')['gsap'];
type ScrollTriggerT = typeof import('gsap/ScrollTrigger')['ScrollTrigger'];
type SplitTextT = typeof import('gsap/SplitText')['SplitText'];
type DraggableT = typeof import('gsap/Draggable')['Draggable'];
type MorphSVGT = typeof import('gsap/MorphSVGPlugin')['MorphSVGPlugin'];
type CustomEaseT = typeof import('gsap/CustomEase')['CustomEase'];

export let gsap: Gsap;
export let ScrollTrigger: ScrollTriggerT;
export let SplitText: SplitTextT;
export let Draggable: DraggableT;
export let MorphSVGPlugin: MorphSVGT;

// Valores canónicos de OSMO (main.js: staggerDefault 0.05, durationDefault 0.6).
export const EASE = 'osmo';
export const DURATION = 0.6;
export const STAGGER = 0.05;

interface GsapWindow {
  gsap?: Gsap;
  ScrollTrigger?: ScrollTriggerT;
  SplitText?: SplitTextT;
  Draggable?: DraggableT;
  InertiaPlugin?: unknown;
  MorphSVGPlugin?: MorphSVGT;
  CustomEase?: CustomEaseT;
}

const gsapWindow = (): GsapWindow => window as unknown as GsapWindow;

// Globales que deben existir para el home (= plugins activados en Webflow). MorphSVG queda fuera:
// solo lo usa lead-flow, que no vive en todas las páginas → se registra si está, pero no se exige.
const REQUIRED: (keyof GsapWindow)[] = [
  'gsap',
  'ScrollTrigger',
  'SplitText',
  'Draggable',
  'InertiaPlugin',
  'CustomEase',
];

// El script GSAP de Webflow va en el <head>, pero el bundle puede arrancar antes en algún timing.
// Poll corto hasta que window.gsap exista, con timeout y mensaje claro.
function waitForGsap(timeoutMs = 6000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    const tick = (): void => {
      if (gsapWindow().gsap) return resolve();
      if (performance.now() - start > timeoutMs) {
        return reject(
          new Error(
            '[gsap-env] window.gsap no apareció. Activa "Enable GSAP animation library" en Webflow (Project settings → GSAP) y republica.',
          ),
        );
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}

let _promise: Promise<void> | null = null;

// Toma GSAP + plugins del global de Webflow una sola vez (idempotente, cacheado).
export function loadGsap(): Promise<void> {
  if (_promise) return _promise;

  _promise = waitForGsap().then(() => {
    const w = gsapWindow();

    const missing = REQUIRED.filter((k) => !w[k]);
    if (missing.length) {
      throw new Error(
        `[gsap-env] faltan plugins de GSAP en el global de Webflow: ${missing.join(', ')}. ` +
          'Actívalos en Project settings → GSAP y republica el sitio.',
      );
    }

    gsap = w.gsap as Gsap;
    ScrollTrigger = w.ScrollTrigger as ScrollTriggerT;
    SplitText = w.SplitText as SplitTextT;
    Draggable = w.Draggable as DraggableT;
    MorphSVGPlugin = w.MorphSVGPlugin as MorphSVGT;

    // Webflow ya registra sus plugins sobre window.gsap, pero re-registrar los presentes es
    // idempotente y blinda contra órdenes de carga raros. Filtra los ausentes (ej. MorphSVG).
    const plugins = [
      w.ScrollTrigger,
      w.SplitText,
      w.Draggable,
      w.InertiaPlugin,
      w.MorphSVGPlugin,
      w.CustomEase,
    ].filter(Boolean);
    gsap.registerPlugin(...(plugins as Parameters<typeof gsap.registerPlugin>));

    // GSAP no parsea cubic-bezier como string → registrar el ease 'osmo' como CustomEase.
    w.CustomEase?.create(EASE, '0.625, 0.05, 0, 1');
    gsap.defaults({ ease: EASE, duration: DURATION });
  });

  return _promise;
}
