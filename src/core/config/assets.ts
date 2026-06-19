// Bases públicas de los buckets de Cloudflare R2. Los assets se sirven aparte del bundle
// para no inflarlo con data-URLs (parseo lento en mobile = pantalla blanca).

export const R2_MEDIA = 'https://pub-c8d801a0ff204d758910633021fa302b.r2.dev'; // texturas, fotos, avatars
export const R2_CONTENT = 'https://pub-09dc8675a13e4b6d9ff1f7e15d49ade2.r2.dev'; // videos + imágenes de contenido
