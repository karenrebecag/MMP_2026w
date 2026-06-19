# atom-academy-waitlist-api

Proxy serverless (Vercel Edge Function) para la lista de espera de ATOM Academy.
Recibe el POST del bundle público de la landing, valida, filtra bots y reenvía a un
Apps Script Web App que escribe la fila en Google Sheets.

```
landing (jsDelivr/Elementor) ──POST JSON──► /api/waitlist (Vercel) ──► Apps Script ──► Google Sheet
   waitlist.ts                                 guarda el secreto
```

La URL de la función es pública (va en el bundle); **el secreto vive solo en las env
vars de Vercel**, nunca en el repo.

## Estructura

```
waitlist-api/
├── api/waitlist.ts   Edge Function (cero dependencias, solo fetch)
├── package.json
├── tsconfig.json
├── .env.example      plantilla de env vars (sin valores)
└── README.md
```

## Variables de entorno

| Var | Requerida | Descripción |
|---|---|---|
| `SHEETS_WEBHOOK_URL` | sí | URL `/exec` del Apps Script Web App |
| `SHEETS_TOKEN` | recomendada | token compartido; el Apps Script lo verifica |
| `ALLOWED_ORIGINS` | recomendada | orígenes permitidos, coma para varios. Vacío = `*` |

## Deploy a Vercel

1. **New Project** → importa el repo `karenrebecag/Academy_LP`.
2. En la config del proyecto:
   - **Root Directory**: `waitlist-api`
   - **Framework Preset**: Other
   - **Build Command / Output Directory**: déjalos vacíos (no hay build; las funciones son la salida).
3. **Environment Variables**: pega las tres (Production + Preview). Valores en `vercel.env.local`.
4. **Deploy**. La función queda en `https://<proyecto>.vercel.app/api/waitlist`.

## Cerrar el círculo en la landing

Reemplaza `TU-PROYECTO` por el dominio real en `src/sections/waitlist.ts`
(`WAITLIST_ENDPOINT`) y haz push a `main` para que el CI republique el bundle.

## Probar

```bash
curl -sS -L -X POST https://<proyecto>.vercel.app/api/waitlist \
  -H "Content-Type: application/json" \
  -H "Origin: https://atomchat.io" \
  -d '{"name":"Test","email":"t@example.com","company":"ATOM","role":"QA","phone":"+52 5512345678"}'
# Esperado: {"ok":true}
```

## Contrato

`POST /api/waitlist` · body JSON: `name, email, company, role, phone` (+ `company_url`
honeypot oculto). Respuesta: `{ "ok": true }` o `{ "ok": false, "error": "<código>" }`
(`validation`, `forbidden`, `forward_failed`, …).
