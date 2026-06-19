# atom-academy

Landing page versionada para ATOM Academy. Lógica + estilos servidos vía jsDelivr;
**el CMS/host solo aporta un punto de montaje**. Build: esbuild + TypeScript + GSAP.
Design language: OSMO (tokens, easing, animaciones, tipografía, espaciado).

> Este proyecto (`ATOM_MPP_Website2026`, MPP = *Mount Point Pattern*) evoluciona la landing
> única hacia un **sitio completo multi-página** sobre el mismo patrón. Las secciones de
> Elementor documentadas abajo son la referencia heredada; el host destino del sitio grande
> es **Webflow** (ver ADR-002).

## Decisiones de arquitectura (ADR)

Registro de decisiones que aplican a TODO el proyecto. No las contravengas sin actualizar este
bloque primero.

### ADR-001 — UI híbrida: vanilla por defecto, Preact solo por excepción

**Decisión:** los componentes se construyen con **vanilla TS (DOM builders imperativos)** por
defecto. **Preact se permite únicamente por excepción**, nunca como default.

**Regla estricta de aplicación:**
- **Default obligatorio = vanilla.** Atoms, molecules, organisms y cualquier sección
  estática/de presentación se escriben como funciones `render*(root): void` que crean DOM
  (el patrón actual de `src/sections/*` y `src/ui/atoms/*`). Atomic Design aquí es
  *organización de carpetas + disciplina de composición*, no un framework.
- **Excepción = Preact**, y solo si el widget cumple **al menos uno** de estos criterios y se
  justifica en el PR:
  - estado local complejo con múltiples transiciones (ej. formularios multi-paso, wizards);
  - re-render frecuente derivado de estado (listas filtrables, experiencias interactivas con UI que cambia en runtime);
  - árbol de UI que sería frágil/ilegible como concatenación de `createElement`.
- Preact vive **aislado dentro del widget** (`widgets/<x>/`), nunca filtra su runtime a
  atoms/organisms vanilla. Import explícito `import { h, render } from 'preact'`.
- Ante la duda: **vanilla**. Meter Preact "por comodidad" está prohibido — el costo es bundle
  y un segundo modelo mental conviviendo.

**Por qué:** mantiene el bundle mínimo y evita un semi-rewrite de las secciones existentes,
sin renunciar a Preact donde el estado lo justifica de verdad.

### ADR-002 — CMS/host destino: Webflow

**Decisión:** el host del sitio grande es **Webflow**. Webflow gestiona contenido (Collections,
campos, SEO, semántica de templates); el bundle servido por jsDelivr aporta estilos, animación
y comportamiento, montado sobre `[data-widget]` / `[data-aa-mount]`. Lógica de negocio y
secretos viven en el backend desacoplado (`waitlist-api/` es el germen), nunca en el repo
público.

## Identidad

| Campo | Valor |
|---|---|
| Repo | `karenrebecag/Academy_LP` (público — requisito de jsDelivr /gh/) |
| Remote | `https://github.com/karenrebecag/Academy_LP.git` |
| CDN loader | `https://cdn.jsdelivr.net/gh/karenrebecag/Academy_LP@latest/loader.js` |
| Bundle JS | `dist/landing.js` |
| Bundle CSS | `dist/landing.css` |

## Cómo se usa en Elementor

Widget **HTML** con el mount + loader:

```html
<div data-aa-mount
     data-aa-theme="light"
     data-aa-lang="es"></div>

<script data-cfasync="false"
  src="https://cdn.jsdelivr.net/gh/karenrebecag/atom-academy@latest/loader.js"></script>
```

Atributos disponibles:
- `data-aa-theme` → `light` | `dark` (default `light`)
- `data-aa-lang`  → `es` | `en` (default `es`)

### Gotcha: plugins de "delay JS" de WordPress (WP Meteor, WP Rocket, Perfmatters…)

La landing se renderiza 100% con JS: si el loader no corre al cargar, la página queda
en blanco. Los plugins de optimización de WordPress **retrasan la ejecución de todo el JS
hasta la primera interacción** (scroll/touch/click). Reescriben el `<script>` del loader a
`type="javascript/blocked"` y mueven la URL a `data-wpmeteor-src` → en mobile no pinta hasta
que el usuario hace scroll (parece loader eterno). Diagnosticado en `atomchat.io/whatsapp-academy/`
(WP Meteor v3.4.18).

`data-cfasync="false"` **NO** exime de esto (eso es solo para Cloudflare Rocket Loader). Hay
que eximir el loader del plugin de delay. Para **WP Meteor** basta el atributo:

```html
<script data-cfasync="false" data-wpmeteor-nooptimize="true"
  src="https://cdn.jsdelivr.net/gh/karenrebecag/Academy_LP@latest/loader.js"></script>
```

Para otros plugins (WP Rocket, Perfmatters, Flying Scripts), excluir la URL del loader
(`jsdelivr`/`loader.js`) en su lista de "no retrasar / exclude from delay".

Los scripts que el loader inyecta luego (`landing.js`) se crean vía JS, así que el plugin no
los toca; solo hay que eximir el `<script>` del loader.

> Para no quedar en blanco durante la descarga, montar un placeholder de marca **dentro** del
> `data-aa-mount`; `boot()` lo reemplaza con `mount.replaceChildren(root)` al terminar.
>
> Cache: jsDelivr sirve el loader `@latest` con `max-age` de 7 días en el navegador. Tras
> cambiar el embed o publicar versión, probar con hard-refresh o incógnito para no quedarse
> con el loader viejo cacheado.

## Arquitectura

```
src/*.ts  --esbuild-->  dist/landing.js (GSAP inlined, minificado) + dist/landing.css
push main -> CI: typecheck + build + tag patch + regenera loader.js + commitea dist + purga @latest
```

### Estructura (scaffold MPP — en migración)

Target del scaffold (ADR-001/002). Esqueleto creado; la migración es incremental para
mantener el build verde en cada paso.

```
src/
├── index.ts                  # entry slim: resuelve mount (theme/lang/page) + setLang + dispatch al composer
├── core/                     # capa base, sin dependencias de UI
│   ├── types.ts              # Theme, Lang, LandingConfig, MountAttrs
│   ├── utils/dom.ts          # $, $$, has (helpers de query)
│   ├── boot/                 # registry.ts — data-page → import() del composer (PageModule/PageContext)
│   ├── config/               # endpoints.ts, brand.ts, assets.ts — URLs/constantes globales (cero secretos)
│   ├── api/                  # (pendiente Fase 1) client.ts + endpoints/  → backend desacoplado
│   ├── i18n/                 # strings.ts + es/en/pt + resolver t()/setLang()/getLang()/strings()
│   ├── api/                  # client.ts (createApiClient + ApiError; cors/omit, timeout)
│   ├── state/                # (pendiente) signals/store
│   └── motion/               # gsap-env (engine), motion (reveals globales), button004
├── design-system/            # CSS co-locado: cada componente tiene su .css junto al .ts
│   ├── tokens/               # color/space/type/motion/layout.css (← split de styles/tokens.css)
│   ├── atoms/                # button, checkbox, input, text (+ .css c/u)
│   ├── molecules/            # layout (renderSection/Container/Grid + SectionTheme) (+ layout.css)
│   ├── organisms/            # hero, navbar, footer, manifesto, audience, content-sections, info, styleguide (+ .css)
│   │                         #   (waitlist.ts → superseded por widgets/contact-form; retirar a deprecated/)
│   ├── behaviors/            # accordion, slider, marquee, rotating-text, cursor, chat, hero-chat,
│   │                         #   background, momentum-hover, meta-theme (+ .css los que tienen estilos)
│   └── templates/            # (pendiente)
├── widgets/                  # unidades montables reutilizables
│   └── contact-form/         # motor genérico (schema-driven) + contact-form.css + presets/ (waitlist)
├── page-types/               # composers por página: home.ts (render(mount,ctx)). 1 page-type = 1 chunk
├── content/                  # types.ts + shared.ts + es/en/pt + getSections() (← src/content.ts, i18n)
├── deprecated/               # código retirado, fuera del árbol activo: button-rotate.ts
└── styles/                   # solo CSS global cross-cutting (sin dueño de componente)
    ├── index.css             # entry esbuild: @import de tokens + componentes + globales → dist/landing.css
    ├── fonts.css             # @font-face
    ├── split.css             # SplitText (aplicado globalmente por motion.ts)
    └── section-theme.css     # strips de tema (dark/light) cross-cutting
```

Constantes globales en `core/config/`: `endpoints.ts` (API waitlist), `brand.ts`
(SITE/UPLOADS/SITE_LINKS/SOCIAL/PARTNERS), `assets.ts` (bases R2: `R2_MEDIA`, `R2_CONTENT`).
Regla: cero URLs hardcodeadas en organisms/behaviors — todo enlace de marca/infra sale de config.

#### Reorg de código: COMPLETA

Hecho: `sections/*`→`organisms/`, `ui/text`→`atoms/`, `ui/layout`→`molecules/`,
`ui/{gsap-env,motion,button004}`→`core/motion/`, resto de `ui/*`→`design-system/behaviors/`.
Íconos SVG de `footer.ts` eliminados (`TODO(icons)`). Prettier configurado (key en `package.json`).
URLs/constantes centralizadas en `core/config/`. `landing.css`→`index.css`.
`button-rotate.ts` (huérfano) → `deprecated/`. `src/ui/` ya no existe.

Pendiente (NO es reorg — es feature/contenido de fases posteriores):

| Trabajo | Destino | Fase |
|---|---|---|
| externalizar copy a i18n | `core/i18n/` + `content/` (es/en/pt) — **hecho** | 3 |
| split de `styles/*.css` | co-locado con su componente en `design-system/**` — **hecho** | 0.x tardía |
| capa cliente HTTP | `core/api/client.ts` (consumido por preset waitlist) — **hecho** | 1 |

Hecho Fase 2: entry slim + `core/boot/registry.ts` + `page-types/home.ts` + esbuild `splitting`.
Output: `dist/landing.js` (entry ~0.8kb) + `dist/chunks/` (composer + compartidos). Loader/CDN sin cambios.

## Design system tokens (prefijo --aa-)

| Categoría | Variables clave |
|---|---|
| Colores neutros | `--aa-neutral-50` → `--aa-neutral-950` (13 pasos) |
| Accents | `--aa-color-electric` (#25d366 verde WhatsApp), `--aa-color-purple` (#0a290f verde oscuro), `--aa-color-coral` (#f84131) — ⚠️ nombres heredados ≠ color real (drift, ver `tokens/color.css`) |
| Semánticos | `--aa-bg`, `--aa-fg`, `--aa-fg-muted`, `--aa-border`, `--aa-accent` |
| Espaciado | `--aa-padding-{xxs|xs|s|m|l|xl|xxl}`, `--aa-gap-{xxs|xs|s|m|l|xl|xxl}` |
| Tipografía | `--aa-text-{xxs|xs|s|m|ml|l|xl|xxl}` (clamp responsive) |
| Animación | `--aa-ease` (OSMO: `cubic-bezier(0.625, 0.05, 0, 1)`), `--aa-duration-{xs|s|m|l|xl}` |
| Radio | `--aa-radius-{s|m|l|xl|pill}` |

## Animaciones (data attributes en HTML)

| Atributo | Efecto |
|---|---|
| `data-aa-split` | SplitText: words suben desde abajo con rotate + stagger |
| `data-aa-fade` | Fade + translateY, con `data-aa-delay="0.2"` opcional |
| `data-aa-stagger` | Stagger sobre hijos directos del elemento |

## Desarrollo

```bash
npm install
npm run typecheck     # tsc --noEmit
npm run build         # genera dist/
npm run dev           # build + watch + server en :8766 (sirve preview.html)
```

`preview.html` monta dos instancias (light / dark) contra dist local.

## Deploy

`git push origin main` (SSH). El CI: typecheck + build + tag patch (vX.Y.(Z+1)) + regenera
loader.js + commitea dist + purga `@latest`. Antes del siguiente push: `git pull --rebase origin main`.

## Añadir una sección

1. Crear `src/sections/mi-seccion.ts` que exporte `renderMiSeccion(root: Element): void`
2. Importar y llamar en `src/index.ts` dentro de `boot()`:
   ```ts
   import { renderMiSeccion } from './sections/mi-seccion';
   // dentro de boot(), después de crear root:
   renderMiSeccion(root);
   ```
3. Agregar clases del DS (`aa-section`, `aa-container`, `aa-h-xl`, etc.) en el HTML generado
4. Para animaciones: añadir `data-aa-split` / `data-aa-fade` / `data-aa-stagger` a los elementos

## Reglas de operación

- CSS prefijado `.aa-*` — nunca selectores globales (colisionan con Elementor)
- Pegas en widget **HTML**, NO en el widget Form de Elementor
- No meter secretos: el bundle es público en jsDelivr
- Repo debe ser público (requisito de jsDelivr /gh/)
