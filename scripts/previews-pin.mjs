// Pinea los previews (previews/*.html) al tag que ESTE push va a publicar.
// El CI (release.yml) calcula el próximo tag como: último tag vX.Y.Z + 1 al patch.
// Aquí replicamos esa predicción contra los tags REMOTOS (la fuente disponible) y
// reescribimos el tag inmutable en cada preview ANTES de pushear. Tras el push, el
// CI publica ese tag y jsDelivr sirve los assets exactos que el preview referencia.
//
// Uso:
//   node scripts/previews-pin.mjs            # predice y pinea
//   node scripts/previews-pin.mjs --check    # solo imprime la versión predicha (no escribe)

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = 'karenrebecag/MMP_2026w';
const PREVIEWS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'previews');

// Último tag publicado en el remoto (misma semántica que el CI, pero sobre origin).
function latestRemoteTag() {
  const out = execSync("git ls-remote --tags origin 'v*'", { encoding: 'utf8' });
  const versions = [...out.matchAll(/v(\d+)\.(\d+)\.(\d+)/g)].map((m) => [
    Number(m[1]),
    Number(m[2]),
    Number(m[3]),
  ]);
  if (versions.length === 0) return [1, 0, 0];
  versions.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  return versions[versions.length - 1];
}

// Predice el próximo release: patch + 1 (idéntico a release.yml).
function predictNext() {
  const [major, minor, patch] = latestRemoteTag();
  return `v${major}.${minor}.${patch + 1}`;
}

function pinPreviews(tag) {
  const files = readdirSync(PREVIEWS_DIR).filter((f) => f.endsWith('.html'));
  for (const file of files) {
    const path = join(PREVIEWS_DIR, file);
    const src = readFileSync(path, 'utf8');
    // Reescribe el tag inmutable en el src del loader (nunca @latest en previews).
    const next = src.replace(
      new RegExp(`(cdn\\.jsdelivr\\.net/gh/${REPO}@)v\\d+\\.\\d+\\.\\d+`, 'g'),
      `$1${tag}`,
    );
    if (next !== src) {
      writeFileSync(path, next);
      console.log(`pinned ${file} → ${tag}`);
    }
  }
}

const next = predictNext();
if (process.argv.includes('--check')) {
  console.log(next);
} else {
  pinPreviews(next);
  console.log(`\nprevious pinned to ${next}. Push para que el CI publique ese tag.`);
}
