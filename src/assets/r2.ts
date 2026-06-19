// Registro de assets servidos desde Cloudflare R2 (bucket de media). La base vive en config.
import { R2_MEDIA as R2 } from '../core/config/assets';

export const contourTexture = `${R2}/contour.jpg`;

export const audiencePhotos = [`${R2}/aud-1.jpg`, `${R2}/aud-2.jpg`, `${R2}/aud-3.jpg`];

export const manifestoShots = {
  top: `${R2}/bubbles-top.webp`,
  bottom: `${R2}/bubbles-bottom.webp`,
};

// Slots de la sección de features (organisms/features). Pendientes de subir a R2.
// califica/cierra siguen el patrón grid-small de fourmula: [izq, centro-grande, abajo-1, abajo-2, der].
export const featureShots = {
  respondeBefore: `${R2}/feat-responde-a.webp`,
  respondeAfter: `${R2}/feat-responde-b.webp`,
  califica: [
    `${R2}/feat-califica-1.webp`,
    `${R2}/feat-califica-2.webp`,
    `${R2}/feat-califica-3.webp`,
    `${R2}/feat-califica-4.webp`,
    `${R2}/feat-califica-5.webp`,
  ],
  cierra: [
    `${R2}/feat-cierra-1.webp`,
    `${R2}/feat-cierra-2.webp`,
    `${R2}/feat-cierra-3.webp`,
    `${R2}/feat-cierra-4.webp`,
    `${R2}/feat-cierra-5.webp`,
  ],
};

// Logos "Trusted by" (organisms/logos). Pendientes de subir a R2 (SVG monocromo ideal).
export const trustedLogos = Array.from({ length: 7 }, (_, i) => `${R2}/logo-${String(i + 1).padStart(2, '0')}.svg`);

export const avatars = [
  `${R2}/avatar-01.jpg`,
  `${R2}/avatar-02.jpg`,
  `${R2}/avatar-03.jpg`,
  `${R2}/avatar-04.jpg`,
  `${R2}/avatar-05.jpg`,
  `${R2}/avatar-06.jpg`,
  `${R2}/avatar-07.jpg`,
  `${R2}/avatar-08.jpg`,
  `${R2}/avatar-09.jpg`,
  `${R2}/avatar-10.jpg`,
];
