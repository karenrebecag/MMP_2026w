// Registro de assets servidos desde Cloudflare R2 (bucket de media). La base vive en config.
import { R2_MEDIA as R2 } from '../core/config/assets';

export const contourTexture = `${R2}/contour.jpg`;

export const audiencePhotos = [`${R2}/aud-1.jpg`, `${R2}/aud-2.jpg`, `${R2}/aud-3.jpg`];

export const manifestoShots = {
  top: `${R2}/bubbles-top.webp`,
  bottom: `${R2}/bubbles-bottom.webp`,
};

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
