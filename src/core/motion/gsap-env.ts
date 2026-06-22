// Setup único de GSAP: registra plugins, el easing firma de OSMO y los defaults
// canónicos (ease "osmo", duration 0.6). Lo comparten motion.ts y button-rotate.ts.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// Valores canónicos de OSMO (main.js: staggerDefault 0.05, durationDefault 0.6).
export const EASE = 'osmo';
export const DURATION = 0.6;
export const STAGGER = 0.05;

// Registro de plugins en RUNTIME (no como side-effect de módulo). Con esbuild + code
// splitting, registrar a nivel de módulo no quedaba efectivo sobre la instancia de gsap
// que usan los behaviors → todo `scrollTrigger` fallaba con "Missing plugin?". Llamar a
// setupGsap() al inicio de render() garantiza el registro sobre la gsap compartida.
let _ready = false;
export function setupGsap(): void {
  if (_ready) return;
  _ready = true;
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    CustomEase,
    Draggable,
    InertiaPlugin,
    MorphSVGPlugin,
  );
  // GSAP no parsea cubic-bezier como string → hay que registrarlo como CustomEase.
  CustomEase.create('osmo', '0.625, 0.05, 0, 1');
  gsap.defaults({ ease: EASE, duration: DURATION });
}

export { gsap, ScrollTrigger, SplitText, Draggable, MorphSVGPlugin };
