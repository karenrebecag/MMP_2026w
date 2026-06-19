// Endpoints del backend desacoplado. El bundle es público: solo URLs, cero secretos.
// El secreto (URL/token del Apps Script) vive en env vars de Vercel, no aquí.

export const WAITLIST_ENDPOINT = 'https://atom-academy-waitlist-api.vercel.app/api/waitlist';
