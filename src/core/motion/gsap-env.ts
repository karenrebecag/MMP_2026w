// Carga de GSAP + plugins vía dynamic import (patrón recomendado bajo code-splitting).
// Con imports estáticos + esbuild splitting, el `gsap.registerPlugin(...)` corría antes de
// que el módulo del plugin estuviera inicializado (lazy __esm), recibía el plugin como
// undefined y lo ignoraba en silencio → todos los `scrollTrigger` fallaban con
// "Missing plugin?". Con `await import()` el módulo llega completamente inicializado antes
// de registrar, y GSAP sale del payload inicial (chunk aparte, on-demand).
//
// Las exportaciones gsap/ScrollTrigger/… son live bindings: quedan definidas tras
// resolver loadGsap(). Llamar y await loadGsap() al inicio de render(), antes de cualquier
// tween/ScrollTrigger. Ningún módulo debe usarlas en top-level (solo dentro de funciones).

export let gsap: typeof import('gsap')['gsap'];
export let ScrollTrigger: typeof import('gsap/ScrollTrigger')['ScrollTrigger'];
export let SplitText: typeof import('gsap/SplitText')['SplitText'];
export let Draggable: typeof import('gsap/Draggable')['Draggable'];
export let MorphSVGPlugin: typeof import('gsap/MorphSVGPlugin')['MorphSVGPlugin'];

// Valores canónicos de OSMO (main.js: staggerDefault 0.05, durationDefault 0.6).
export const EASE = 'osmo';
export const DURATION = 0.6;
export const STAGGER = 0.05;

let _promise: Promise<void> | null = null;

// Carga e inicializa GSAP una sola vez (idempotente, cacheado).
export function loadGsap(): Promise<void> {
  if (!_promise) {
    _promise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
      import('gsap/CustomEase'),
      import('gsap/Draggable'),
      import('gsap/InertiaPlugin'),
      import('gsap/MorphSVGPlugin'),
    ]).then(([core, st, split, ce, drag, inertia, morph]) => {
      gsap = core.gsap;
      ScrollTrigger = st.ScrollTrigger;
      SplitText = split.SplitText;
      Draggable = drag.Draggable;
      MorphSVGPlugin = morph.MorphSVGPlugin;
      // Registro explícito (GSAP lo recomienda para que el bundler no haga tree-shake).
      gsap.registerPlugin(
        ScrollTrigger,
        SplitText,
        ce.CustomEase,
        Draggable,
        inertia.InertiaPlugin,
        MorphSVGPlugin,
      );
      // GSAP no parsea cubic-bezier como string → registrarlo como CustomEase.
      ce.CustomEase.create('osmo', '0.625, 0.05, 0, 1');
      gsap.defaults({ ease: EASE, duration: DURATION });
    });
  }
  return _promise;
}
