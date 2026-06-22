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
    `${R2}/OldWomanEN_98b23750bfa961c97918904bf8a72a2b86a4699f099acaf10617e9c33f1c52d1.webp`,
  ],
  cierra: [
    `${R2}/feat-cierra-1.webp`,
    `${R2}/feat-cierra-2.webp`,
    `${R2}/feat-cierra-3.webp`,
    `${R2}/feat-cierra-4.webp`,
    `${R2}/BandejasEN_d7fa72a9a0a83806069f2c3b1516092419bc20228556b351f40131e79da2c6ed.webp`,
  ],
};

// Logos "Trusted by" (organisms/logos). Pendientes de subir a R2 (SVG monocromo ideal).
// Logos "Trusted by" — servidos del CDN de Webflow (mismo bucket que el bottom marquee).
// TEMP: swap por R2 antes de prod.
const WF_CDN = 'https://cdn.prod.website-files.com/6890d2a7153362eed21e1c49';
export const trustedLogos: { name: string; src: string }[] = [
  { name: 'Jetour', src: `${WF_CDN}/6a1f4a4ea001ddddbfa53a5a_jetour.svg` },
  { name: 'KIA', src: `${WF_CDN}/6a1f4a4edf567a7654329a1b_kia.svg` },
  { name: 'Finandina', src: `${WF_CDN}/6a1f4a4ecea605e1f474079f_finandina.svg` },
  { name: 'Farma Value', src: `${WF_CDN}/6a1f4a4e3af4992f365bd5ed_farma-value.svg` },
  { name: 'Berlitz', src: `${WF_CDN}/6a1f4a4e9f0e2fcba998dcca_Berlitz.svg` },
  { name: 'Areandina', src: `${WF_CDN}/6a1f4a4e3eead4fcccb94e08_areandina.svg` },
  { name: 'Toyota', src: `${WF_CDN}/6a1f4a4e37ac0e747fc40d79_toyota.svg` },
  { name: 'CNCI', src: `${WF_CDN}/6a1f4a4ede5478cee0196163_cnci.svg` },
  { name: 'Avista', src: `${WF_CDN}/6a1f4a4f485ce08c1a53d06d_avista.svg` },
  { name: 'Volkswagen', src: `${WF_CDN}/6a1f4a4f35da0ec096c03d85_volkswagen.svg` },
  { name: 'Anahuac', src: `${WF_CDN}/6a1f4a4ffee97aeff0529279_anahuac.svg` },
  { name: 'Ford', src: `${WF_CDN}/6a1f4a4f7df4f7e56979db80_ford.svg` },
  { name: 'Salud SA', src: `${WF_CDN}/6a1f4a4fb281d0f1bfa4294f_salud-sa.svg` },
  { name: 'Hertz', src: `${WF_CDN}/6a1f4a4f7df4f7e56979db84_hertz.svg` },
];

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
