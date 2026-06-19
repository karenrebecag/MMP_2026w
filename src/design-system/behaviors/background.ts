// Fondo fijo global: color claro sólido + textura topográfica con blend, pineado al
// viewport (100vh). Las secciones light van transparentes y dejan ver este bg → se
// pinta una sola vez en lugar de por strip. Las secciones dark lo cubren con su color.

import { contourTexture } from '../../assets/r2';

export function renderBackground(root: Element): void {
  const bg = document.createElement('div');
  bg.className = 'aa-bg-fixed';
  bg.setAttribute('aria-hidden', 'true');

  const texture = document.createElement('div');
  texture.className = 'aa-bg-fixed__texture';
  texture.style.backgroundImage = `url(${contourTexture})`;
  bg.appendChild(texture);

  root.prepend(bg);
}
