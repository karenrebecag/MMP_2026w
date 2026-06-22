// Sección de logos "Trusted by": eyebrow a la izquierda + marquee horizontal de tarjetas con
// logos (placeholder gris hasta subir los SVG a R2). El scroll es CSS puro (keyframes), con el
// track duplicado 2× para loop sin costura. Sección light.

import { renderSection, renderContainer } from '../molecules/layout';
import { strings } from '../../core/i18n';
import { trustedLogos } from '../../assets/r2';

export function renderLogos(root: Element): void {
  const s = strings().logos;

  const label = document.createElement('span');
  label.className = 'aa-logos__label';
  label.textContent = s.eyebrow;
  label.setAttribute('data-aa-fade', '');

  const track = document.createElement('div');
  track.className = 'aa-logos__track';
  // 2× la lista → translateX(-50%) encadena el loop sin costura.
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
  row.className = 'aa-logos__row';
  row.append(label, marquee);

  const section = renderSection({
    theme: 'light',
    className: 'aa-logos',
    children: [renderContainer({ children: [row] })],
  });
  root.appendChild(section);
}
