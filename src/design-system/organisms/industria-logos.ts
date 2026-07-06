// Industria logos — row: frase descriptiva (izq) + marquee horizontal de logos (der).
// Layout tipo Relume Logo 4, pero la columna derecha reusa el mecanismo de marquee de
// logos.ts (clases .aa-logos__marquee/track/card/logo → scroll CSS puro, track 2×).
// La frase de la izquierda la pasa cada composer de industria.

import { renderSection, renderContainer } from '../molecules/layout';
import { trustedLogos } from '../../assets/r2';

export interface IndustriaLogosConfig {
  label: string;
  theme?: 'light' | 'dark';
}

export function renderIndustriaLogos(root: Element, cfg: IndustriaLogosConfig): void {
  const label = document.createElement('p');
  label.className = 'aa-ind-logos__label';
  label.textContent = cfg.label;
  label.setAttribute('data-aa-fade', '');

  // Track duplicado 2× → translateX(-50%) encadena el loop sin costura (misma técnica que logos.ts).
  const track = document.createElement('div');
  track.className = 'aa-logos__track';
  const fill = (): void =>
    trustedLogos.forEach(({ name, src }) => {
      const card = document.createElement('div');
      card.className = 'aa-logos__card';
      const img = document.createElement('img');
      img.className = 'aa-logos__logo';
      img.src = src;
      img.alt = name;
      img.loading = 'lazy';
      card.appendChild(img);
      track.appendChild(card);
    });
  fill();
  fill();

  const marquee = document.createElement('div');
  marquee.className = 'aa-logos__marquee';
  marquee.setAttribute('aria-hidden', 'true');
  marquee.appendChild(track);

  const row = document.createElement('div');
  row.className = 'aa-ind-logos__row';
  row.append(label, marquee);

  const section = renderSection({
    theme: cfg.theme ?? 'light',
    className: 'aa-ind-logos',
    children: [renderContainer({ children: [row] })],
  });
  root.appendChild(section);
}
