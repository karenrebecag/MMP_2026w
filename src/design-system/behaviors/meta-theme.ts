// Meta theme-color (barra de estado en móvil) sincronizada con el scroll: muestrea la
// sección bajo el borde superior del viewport con la misma utilidad que el cursor
// (elementFromPoint → closest [data-aa-section-theme]) y lee su color de fondo real.
// Las secciones light van transparentes → usan el blanco del bg fijo.

const LIGHT = '#ffffff';

function isTransparent(color: string): boolean {
  return color === 'transparent' || color.replace(/\s/g, '') === 'rgba(0,0,0,0)';
}

export function initMetaTheme(scope: Element): void {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }

  const marquee = scope.querySelector<HTMLElement>('[data-aa-marquee]');
  let rafId = 0;

  const update = (): void => {
    rafId = 0;
    // Punto de muestreo: justo debajo del marquee fijo (donde se asienta la status bar).
    const y = (marquee?.offsetHeight ?? 0) + 4;
    const x = Math.round(window.innerWidth / 2);
    const section = document
      .elementFromPoint(x, y)
      ?.closest<HTMLElement>('[data-aa-section-theme]');
    if (!section) return;
    const bg = getComputedStyle(section).backgroundColor;
    const color = isTransparent(bg) ? LIGHT : bg;
    if (meta!.content !== color) meta!.content = color;
  };

  const onScroll = (): void => {
    if (!rafId) rafId = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  requestAnimationFrame(update); // estado inicial
}
