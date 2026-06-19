// Entry point. Cada punto de montaje declara su configuración por atributos:
//   <div data-aa-mount
//        data-page="home"
//        data-aa-theme="light|dark"
//        data-aa-lang="es|en|pt"></div>
//
//   <script data-cfasync="false"
//     src="https://cdn.jsdelivr.net/gh/karenrebecag/Academy_LP@latest/loader.js"></script>
//
// El entry es mínimo: resuelve config del mount, siembra el idioma y delega el render en
// el composer de la página (chunk cargado on-demand vía import() según data-page).
const _v =
  document
    .querySelector<HTMLScriptElement>('script[src*="Academy_LP@"]')
    ?.src.match(/Academy_LP@([^/]+)/)?.[1] ?? 'dev';
console.log(`[academy-lp] v${_v} loaded`);

import { type Theme, type Lang } from './core/types';
import { setLang } from './core/i18n';
import { PAGES } from './core/boot/registry';

function resolveTheme(raw: string | undefined): Theme {
  return raw === 'dark' ? 'dark' : 'light';
}

function resolveLang(raw: string | undefined): Lang {
  return raw === 'en' || raw === 'pt' ? raw : 'es';
}

async function boot(): Promise<void> {
  const mounts = document.querySelectorAll<HTMLElement>('[data-aa-mount]');
  for (const mount of mounts) {
    const theme = resolveTheme(mount.dataset.aaTheme);
    const lang = resolveLang(mount.dataset.aaLang);
    const page = mount.dataset.page ?? 'home';
    setLang(lang); // resuelve t()/strings() para los render* de esta instancia

    const load = PAGES[page] ?? PAGES.home;
    const mod = await load();
    await mod.render(mount, { theme, lang });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => void boot());
} else {
  void boot();
}
