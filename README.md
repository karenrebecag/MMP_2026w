# MMP_2026w

Sitio multipágina versionado sobre **Mount Point Pattern**: el CMS/host (Webflow/Elementor)
solo aporta un punto de montaje; toda la lógica y los estilos se compilan y se sirven vía
**jsDelivr**. El bundle se monta sobre un `<div>` declarativo y carga el chunk de cada página
on-demand.

Build: esbuild + TypeScript + GSAP. Design language basado en OSMO (tokens, easing, animaciones,
tipografía, espaciado). Repo público (requisito de jsDelivr `/gh/`); cero secretos en el bundle.

## Uso en el host (Webflow / Elementor)

Pega esto en un widget/embed **HTML** (no en el widget Form):

```html
<div data-aa-mount
     data-page="home"
     data-aa-theme="light"
     data-aa-lang="es"></div>

<script data-cfasync="false"
  src="https://cdn.jsdelivr.net/gh/karenrebecag/MMP_2026w@latest/loader.js"></script>
```

Atributos del mount:
- `data-page` → page-type a renderizar (ej. `home`); el composer se carga como chunk on-demand
- `data-aa-theme` → `light` | `dark` (default `light`)
- `data-aa-lang` → `es` | `en` | `pt` (default `es`)

## Entry contract (cadena de carga)

Contrato estable hacia el host: **el embed solo referencia `loader.js@latest`.** Nada más del
bundle se nombra en el host, así el versionado nunca toca el CMS.

```
host embed
  └─ loader.js@latest                 (estable; CI lo regenera con la versión nueva)
       └─ inyecta @vX.Y.Z inmutable    (evita el cache agresivo de jsDelivr en @latest)
            ├─ dist/landing.css        (un solo CSS, todos los componentes)
            └─ dist/landing.js         (entry ~0.8kb)
                 └─ import('./chunks/<page>')   page-type chunk on-demand (según data-page)
                      └─ import('./chunks/…')    GSAP + atoms compartidos
```

- **`loader.js`** es la única superficie pública y es inmutable en forma: inyecta el tag exacto
  `@vX.Y.Z` para CSS y JS. Auto-generado por el CI (no editar la versión a mano).
- **`dist/landing.js`** es el entry mínimo: resuelve la config del mount, siembra el idioma y
  hace `import()` del composer de `data-page`. esbuild parte un chunk por page-type + chunks
  compartidos.
- El versionado vive entre `loader.js` y los tags; el host nunca lo ve.

## Distribución (CI)

```
push main → .github/workflows/release.yml:
            typecheck → test → build → tag patch (vX.Y.Z+1) →
            regenera loader.js → commitea dist → purga jsDelivr @latest
```

## Desarrollo

```bash
npm install
npm run typecheck   # tsc --noEmit
npm test            # vitest run (unit: i18n, api client, paridad de contenido)
npm run build       # genera dist/
npm run dev         # build + watch + server en :8766 (sirve preview.html)
```

## Estructura

Ver `CLAUDE.md` para arquitectura completa, frontera page-types/widgets, tokens y animación.
El backend de formularios vive en `form-api/` (subproyecto Vercel, monorepo).
