// Selector de tabs (sección "motor de IA"): alterna el panel activo (texto + imagen).
// Vanilla: togglea is-active + estado ARIA. La transición de entrada la hace el CSS.

export function initTabs(scope: Element): void {
  scope.querySelectorAll<HTMLElement>('[data-aa-tabs]').forEach((root) => {
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('.aa-tabs__tab'));
    const panels = Array.from(root.querySelectorAll<HTMLElement>('.aa-tabs__panel'));
    if (tabs.length === 0) return;

    const activate = (index: number): void => {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', String(on));
      });
      panels.forEach((panel, i) => {
        const on = i === index;
        panel.classList.toggle('is-active', on);
        panel.hidden = !on;
      });
    };

    tabs.forEach((tab, i) => tab.addEventListener('click', () => activate(i)));
  });
}
