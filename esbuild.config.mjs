// Build del bundle servido por jsDelivr (entry + chunks + CSS).
import * as esbuild from 'esbuild';
import { cpSync } from 'node:fs';

// Self-hosted fonts: copia src/fonts → dist/fonts. Las @font-face referencian
// ./fonts/... (relativo a dist/landing.css), así que deben vivir junto al CSS.
cpSync('src/fonts', 'dist/fonts', { recursive: true });

// Bundle TS + GSAP + CSS hacia dist/. jsDelivr sirve el tag versionado.
const shared = {
  bundle: true,
  format: 'esm',
  target: ['es2019'],
  logLevel: 'info',
};

// Code splitting: el entry (index.ts) dynamic-importa el composer de cada página, así
// esbuild parte chunks por page-type + chunks compartidos (GSAP, atoms). El entry sigue
// emitiéndose como dist/landing.js (contrato del loader/CDN); los chunks van a dist/chunks/.
const jsOptions = {
  ...shared,
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  entryNames: 'landing',
  chunkNames: 'chunks/[name]-[hash]',
  splitting: true,
  minify: true,
  sourcemap: true,
  // GSAP NO se empaqueta: el host (Webflow) lo inyecta como global (Core + plugins activados en
  // el panel GSAP). El bundle lo consume vía window en core/motion/gsap-env. Externalizarlo evita
  // la doble instancia (causa del "Missing plugin? ScrollTrigger") y baja ~150kb. Todo acceso a
  // GSAP debe pasar por gsap-env; un `import 'gsap'` directo fallaría en runtime (bare specifier).
  external: ['gsap', 'gsap/*'],
};

const cssOptions = {
  ...shared,
  entryPoints: ['src/styles/index.css'],
  outfile: 'dist/landing.css',
  minify: true,
  // Conserva las URLs de fuentes literales (./fonts/...) en vez de intentar empaquetarlas.
  external: ['*.woff2', '*.otf'],
};

const watch = process.argv.includes('--watch');
const serve = process.argv.includes('--serve');

if (watch || serve) {
  const jsCtx = await esbuild.context(jsOptions);
  const cssCtx = await esbuild.context(cssOptions);
  await Promise.all([jsCtx.watch(), cssCtx.watch()]);
  if (serve) {
    const { host, port } = await jsCtx.serve({ servedir: '.', port: 8766 });
    console.log(`dev server: http://${host}:${port}`);
  } else {
    console.log('watching src/...');
  }
} else {
  await Promise.all([esbuild.build(jsOptions), esbuild.build(cssOptions)]);
}
