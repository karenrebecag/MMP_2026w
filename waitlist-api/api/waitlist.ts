// Vercel Edge Function — proxy de la lista de espera (bundle público → Google Sheets).
// El secreto (URL del Apps Script + token) vive SOLO en env vars de Vercel; el bundle
// público de la landing únicamente conoce la URL de esta función. Valida, filtra bots
// (honeypot) y reenvía al Apps Script Web App, que escribe la fila en la hoja.
//
// Deploy: este subproyecto (waitlist-api/) es el Root Directory del proyecto en Vercel.
// La ruta pública resultante es /api/waitlist.
//
// Env vars (Vercel → Project Settings → Environment Variables):
//   SHEETS_WEBHOOK_URL  URL /exec del Apps Script Web App (requerida)
//   SHEETS_TOKEN        token compartido que el Apps Script verifica (recomendada)
//   ALLOWED_ORIGINS     orígenes permitidos separados por coma (ej. https://atomchat.io)

export const config = { runtime: 'edge' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{6,}$/;

interface Payload {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  phone?: string;
  company_url?: string; // honeypot: debe llegar vacío
}

function allowList(): string[] {
  return (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function cors(origin: string | null): Record<string, string> {
  const allowed = allowList();
  const allow = allowed.length === 0 ? '*' : origin && allowed.includes(origin) ? origin : '';
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
  if (allow) headers['Access-Control-Allow-Origin'] = allow;
  return headers;
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(origin) },
  });
}

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
  if (req.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405, origin);

  const allowed = allowList();
  if (allowed.length && origin && !allowed.includes(origin)) {
    return json({ ok: false, error: 'forbidden' }, 403, origin);
  }

  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400, origin);
  }

  // Honeypot lleno → bot. Respondemos ok sin escribir, para no delatar el campo.
  if (data.company_url) return json({ ok: true }, 200, origin);

  const name = (data.name ?? '').trim();
  const email = (data.email ?? '').trim();
  const company = (data.company ?? '').trim();
  const role = (data.role ?? '').trim();
  const phone = (data.phone ?? '').trim();

  if (!name || !company || !role || !EMAIL_RE.test(email) || !PHONE_RE.test(phone)) {
    return json({ ok: false, error: 'validation' }, 422, origin);
  }

  const webhook = process.env.SHEETS_WEBHOOK_URL;
  if (!webhook) return json({ ok: false, error: 'server_misconfig' }, 500, origin);

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: process.env.SHEETS_TOKEN ?? '',
        name,
        email,
        company,
        role,
        phone,
        ts: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error('sheet_write_failed');
  } catch {
    return json({ ok: false, error: 'forward_failed' }, 502, origin);
  }

  return json({ ok: true }, 200, origin);
}
