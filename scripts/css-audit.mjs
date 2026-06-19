// css:audit — red de seguridad para la co-locación de CSS (sort por selector, no por archivo).
// Verifica contra un baseline pristino que NINGUNA regla se perdió al mover, que todo el CSS
// es alcanzable desde el entry, que no hay @import colgando y que el CSS compila.
//
//   node scripts/css-audit.mjs                      → audita contra scripts/css-baseline.json
//   node scripts/css-audit.mjs --update-baseline <dir>   → regenera baseline escaneando <dir>
//
// El baseline es el inventario de selectores .aa-* y custom props --aa-* del estado pre-reorg
// (ATOM_Academy original). Una relocación pura deja ese inventario invariante; si algo falta,
// una regla se perdió.

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as esbuild from 'esbuild';

const ROOT = process.cwd();
const ENTRY = path.join(ROOT, 'src/styles/index.css');
const SRC = path.join(ROOT, 'src');
const BASELINE = path.join(ROOT, 'scripts/css-baseline.json');

const CLASS_RE = /\.(aa-[a-z0-9_-]+)/g;
const VAR_DEF_RE = /(--aa-[a-z0-9-]+)\s*:/g;
const IMPORT_RE = /@import\s+(?:url\(\s*)?['"]([^'"]+)['"]\s*\)?\s*;/g;

function walkCss(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkCss(p));
    else if (e.name.endsWith('.css')) out.push(p);
  }
  return out;
}

function extract(file) {
  const css = fs.readFileSync(file, 'utf8');
  const classes = new Set();
  const vars = new Set();
  let m;
  while ((m = CLASS_RE.exec(css))) classes.add(m[1]);
  while ((m = VAR_DEF_RE.exec(css))) vars.add(m[1]);
  return { classes, vars };
}

// Inventario {token: [archivos]} sobre un conjunto de archivos.
function inventory(files) {
  const classes = {};
  const vars = {};
  for (const f of files) {
    const { classes: c, vars: v } = extract(f);
    const name = path.basename(f);
    for (const x of c) (classes[x] ??= []).push(name);
    for (const x of v) (vars[x] ??= []).push(name);
  }
  return { classes, vars };
}

// Grafo @import en orden de cascada (preorder), partiendo del entry.
function reachable(entry) {
  const order = [];
  const seen = new Set();
  const dangling = [];
  (function visit(file) {
    if (seen.has(file)) return;
    seen.add(file);
    order.push(file);
    const css = fs.readFileSync(file, 'utf8');
    let m;
    while ((m = IMPORT_RE.exec(css))) {
      const spec = m[1];
      if (/^(https?:)?\/\//.test(spec)) continue; // remoto (Google Fonts) — fuera de scope
      const target = path.resolve(path.dirname(file), spec);
      if (!fs.existsSync(target)) {
        dangling.push({ from: path.relative(ROOT, file), spec });
        continue;
      }
      visit(target);
    }
  })(entry);
  return { order, dangling };
}

function updateBaseline(dir) {
  const files = walkCss(path.resolve(ROOT, dir));
  const inv = inventory(files);
  const out = {
    source: dir,
    files: files.length,
    classCount: Object.keys(inv.classes).length,
    varCount: Object.keys(inv.vars).length,
    classes: inv.classes,
    vars: inv.vars,
  };
  fs.writeFileSync(BASELINE, JSON.stringify(out, null, 2) + '\n');
  console.log(
    `baseline escrito: ${out.classCount} selectores .aa-*, ${out.varCount} props --aa-* (de ${out.files} archivos en ${dir})`,
  );
}

function audit() {
  if (!fs.existsSync(BASELINE)) {
    console.error('No hay baseline. Corre: node scripts/css-audit.mjs --update-baseline <dir>');
    process.exit(2);
  }
  const base = JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
  const results = [];

  const { order, dangling } = reachable(ENTRY);
  const reachableSet = new Set(order);
  const cur = inventory(order); // solo lo que realmente entra al bundle

  // 1. @import colgando
  results.push({
    name: '@import resuelven',
    ok: dangling.length === 0,
    detail: dangling.map((d) => `  ${d.from} → ${d.spec} (no existe)`),
  });

  // 2. CSS alcanzable (ningún .css huérfano fuera del grafo)
  const allCss = walkCss(SRC);
  const orphans = allCss.filter((f) => !reachableSet.has(f)).map((f) => path.relative(ROOT, f));
  results.push({
    name: 'CSS alcanzable desde index.css',
    ok: orphans.length === 0,
    warn: true,
    detail: orphans.map((f) => `  ${f} (no @importado → no entra al bundle)`),
  });

  // 3. Selectores y props del baseline siguen definidos (sort por selector no perdió reglas)
  const lostClasses = Object.keys(base.classes).filter((s) => !(s in cur.classes));
  const lostVars = Object.keys(base.vars).filter((v) => !(v in cur.vars));
  results.push({
    name: `selectores .aa-* preservados (${Object.keys(base.classes).length} baseline)`,
    ok: lostClasses.length === 0,
    detail: lostClasses.map((s) => `  .${s} PERDIDO (estaba en ${base.classes[s].join(', ')})`),
  });
  results.push({
    name: `custom props --aa-* preservadas (${Object.keys(base.vars).length} baseline)`,
    ok: lostVars.length === 0,
    detail: lostVars.map((v) => `  ${v} PERDIDO (estaba en ${base.vars[v].join(', ')})`),
  });

  // 4. Orden de cascada: tokens antes de cualquier regla de componente
  const tokenIdx = order.map((f, i) => ({ f, i })).filter(({ f }) => f.includes('/tokens/'));
  // El entry (order[0]=index.css) se excluye: sus reglas inline (reset/base/utils) van
  // físicamente después de sus @import, así que cascadean al final, no en pos 0.
  const compIdx = order
    .map((f, i) => ({ f, i }))
    .filter(({ f, i }) => {
      if (i === 0) return false;
      const { classes } = extract(f);
      return [...classes].some((c) => c !== 'aa-landing');
    });
  const lastToken = tokenIdx.length ? Math.max(...tokenIdx.map((x) => x.i)) : -1;
  const firstComp = compIdx.length ? Math.min(...compIdx.map((x) => x.i)) : Infinity;
  results.push({
    name: 'orden de cascada (tokens antes de componentes)',
    ok: lastToken < firstComp,
    warn: true,
    detail:
      lastToken < firstComp
        ? []
        : [`  un archivo de tokens se importa después de un componente (pos ${lastToken} vs ${firstComp})`],
  });

  // 5. Compila (esbuild resuelve @import y minifica)
  let compileErr = null;
  try {
    esbuild.buildSync({
      entryPoints: [ENTRY],
      bundle: true,
      write: false,
      logLevel: 'silent',
      external: ['*.woff2', '*.otf'],
    });
  } catch (e) {
    compileErr = e.message;
  }
  results.push({
    name: 'CSS compila (esbuild)',
    ok: !compileErr,
    detail: compileErr ? [`  ${compileErr.split('\n')[0]}`] : [],
  });

  // Reporte
  let failed = false;
  console.log(`\ncss:audit — ${order.length} archivos en el grafo, ${allCss.length} .css en src\n`);
  for (const r of results) {
    const tag = r.ok ? 'PASS' : r.warn ? 'WARN' : 'FAIL';
    if (!r.ok && !r.warn) failed = true;
    console.log(`[${tag}] ${r.name}`);
    if (!r.ok) for (const line of r.detail) console.log(line);
  }
  console.log('');
  process.exit(failed ? 1 : 0);
}

const arg = process.argv[2];
if (arg === '--update-baseline') {
  const dir = process.argv[3];
  if (!dir) {
    console.error('Falta <dir>. Ej: node scripts/css-audit.mjs --update-baseline ../ATOM_Academy/src/styles');
    process.exit(2);
  }
  updateBaseline(dir);
} else {
  audit();
}
