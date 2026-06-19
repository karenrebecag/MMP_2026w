# Academy_LP

Landing page versionada para ATOM Academy (formación WhatsApp Marketing). La lógica y los
estilos se sirven vía **jsDelivr**; **Elementor solo aporta un punto de montaje**.

Build: esbuild + TypeScript + GSAP. Design language basado en OSMO (tokens, easing,
animaciones, tipografía, espaciado).

## Uso en Elementor

Pega esto en un widget **HTML** (no en el widget Form de Elementor):

```html
<div data-aa-mount data-aa-theme="light" data-aa-lang="es"></div>

<script data-cfasync="false"
  src="https://cdn.jsdelivr.net/gh/karenrebecag/Academy_LP@latest/loader.js"></script>
```

Atributos del mount:
- `data-aa-theme` → `light` | `dark` (default `light`)
- `data-aa-lang`  → `es` | `en` (default `es`)

## Distribución

```
push main → CI (.github/workflows/release.yml): typecheck + build + tag patch +
            regenera loader.js + commitea dist + purga jsDelivr @latest
loader.js @latest → inyecta el tag inmutable @vX.Y.Z (CSS + JS)
```

El repo **debe ser público** (requisito de jsDelivr `/gh/`).

## Desarrollo

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run build       # genera dist/
npm run dev         # build + watch + server en :8766 (sirve preview.html)
```

Ver `CLAUDE.md` para arquitectura, tokens y sistema de animación.
