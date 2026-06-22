// Constantes estructurales compartidas por todos los idiomas (no son copy).
// Single-source: si cambia un asset o el ancla, se cambia aquí, no en cada locale.

import { R2_CONTENT } from '../core/config/assets';

export const WAITLIST = '#aa-waitlist';

// Video de fondo de la sección CTA (mismo asset en todos los idiomas).
const CTA_VIDEO_KEY = 'bgvideoCTASectionATOMAcademy';
export const CTA_BG_VIDEO = {
  webm: `${R2_CONTENT}/${CTA_VIDEO_KEY}.webm`,
  mp4: `${R2_CONTENT}/${CTA_VIDEO_KEY}.mp4`,
  poster: `${R2_CONTENT}/${CTA_VIDEO_KEY}.jpg`,
};

// Imágenes laterales de las secciones con media (compartidas entre idiomas).
export const PROBLEMA_IMG = `${R2_CONTENT}/5a069a75-ec80-4f6a-8d01-6ceb09f53151-2026-06-18_6daced8ee45a9b8d02e25d24e7d1b682d9c1bbeea923e2be04b8b07fba430e43.webp`;
export const VISION_IMG = `${R2_CONTENT}/young-woman-sitting-indoors-with-camera-and-plants-2026-03-25-00-44-37-utc_4f3b97c7a1c234f0c5642e46019cb9e156219e01d4663ddab5f36e6cf94c37e9.webp`;

// Imágenes de la sección "motor de IA" (tabs), generadas on-brand vía MCP.
// TODO(assets): URLs temporales de fal.media — migrar a R2 para permanencia.
export const ENGINE_IMG = {
  summary: 'https://v3b.fal.media/files/b/0a9f57e6/HC3HhG5fE2uHvSEX7zA7-.jpg',
  suggestions: 'https://v3b.fal.media/files/b/0a9f57e7/ADkGtRpbRC2mWoLBaWHmf.jpg',
  priority: 'https://v3b.fal.media/files/b/0a9f57e7/s83z0dHCgz9KmQpZEfj1t.jpg',
  calls: 'https://v3b.fal.media/files/b/0a9f57e8/dDVuYmhlSSjQkxipMZdo3.jpg',
};
