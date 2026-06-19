// Cliente HTTP del frontend. El bundle es público y llama cross-origin al backend
// desacoplado (Vercel/Edge): por eso `mode: 'cors'` y `credentials: 'omit'` por defecto
// — sin cookies cross-origin (evita CSRF y la restricción de Access-Control-Allow-Origin
// con credenciales). Cero secretos aquí; el cliente solo consume endpoints públicos.
//
// Responsabilidades: construir URL + query, serializar JSON, timeout vía AbortController,
// parsear la respuesta y normalizar errores en ApiError. Genérico: devuelve T o lanza.

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type QueryValue = string | number | boolean | undefined | null;

export interface ApiClientOptions {
  // Prefijo para paths relativos. Los paths absolutos (http…) lo ignoran.
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  credentials?: RequestCredentials;
  // Timeout por defecto en ms (0 = sin timeout). Aplica a cada request salvo override.
  timeoutMs?: number;
}

export interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  query?: Record<string, QueryValue>;
  headers?: Record<string, string>;
  // Señal del llamador para cancelar (se combina con el timeout interno).
  signal?: AbortSignal;
  timeoutMs?: number;
  credentials?: RequestCredentials;
}

// Error normalizado de cualquier fallo de red/HTTP. `status` 0 = no hubo respuesta
// (red caída, CORS, timeout o cancelación). `data` es el cuerpo parseado si lo hubo.
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly data?: unknown,
    // true si el fallo fue por timeout o cancelación del llamador.
    readonly aborted = false,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const DEFAULT_TIMEOUT_MS = 10_000;

function isAbsolute(path: string): boolean {
  return /^https?:\/\//i.test(path);
}

function buildUrl(path: string, baseUrl: string | undefined, query?: RequestOptions['query']): string {
  const url = isAbsolute(path) ? new URL(path) : new URL(path, baseUrl ?? location.href);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function parseBody(res: Response): Promise<unknown> {
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return res.json().catch(() => null);
  }
  return res.text().catch(() => null);
}

export interface ApiClient {
  request<TResponse>(path: string, options?: RequestOptions): Promise<TResponse>;
  get<TResponse>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<TResponse>;
  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ): Promise<TResponse>;
}

export function createApiClient(clientOptions: ApiClientOptions = {}): ApiClient {
  const {
    baseUrl,
    defaultHeaders = {},
    credentials = 'omit',
    timeoutMs: defaultTimeoutMs = DEFAULT_TIMEOUT_MS,
  } = clientOptions;

  async function request<TResponse>(
    path: string,
    options: RequestOptions = {},
  ): Promise<TResponse> {
    const { method = 'GET', body, query, headers = {}, signal, timeoutMs, credentials: reqCredentials } = options;

    const finalHeaders: Record<string, string> = { ...defaultHeaders, ...headers };
    if (body !== undefined && finalHeaders['Content-Type'] === undefined) {
      finalHeaders['Content-Type'] = 'application/json';
    }

    // Timeout + cancelación del llamador en un solo AbortController. `AbortSignal.timeout`
    // no existe en webviews viejos (WP/mobile), así que lo hacemos a mano.
    const controller = new AbortController();
    const limit = timeoutMs ?? defaultTimeoutMs;
    let timedOut = false;
    const timer =
      limit > 0
        ? window.setTimeout(() => {
            timedOut = true;
            controller.abort();
          }, limit)
        : null;
    if (signal) {
      if (signal.aborted) controller.abort();
      else signal.addEventListener('abort', () => controller.abort(), { once: true });
    }

    let res: Response;
    try {
      res = await fetch(buildUrl(path, baseUrl, query), {
        method,
        headers: finalHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        mode: 'cors',
        credentials: reqCredentials ?? credentials,
        signal: controller.signal,
      });
    } catch (err) {
      if (timedOut) throw new ApiError('Request timed out', 0, undefined, true);
      if (controller.signal.aborted) throw new ApiError('Request aborted', 0, undefined, true);
      const message = err instanceof Error ? err.message : 'Network request failed';
      throw new ApiError(message, 0);
    } finally {
      if (timer !== null) window.clearTimeout(timer);
    }

    const data = await parseBody(res);
    if (!res.ok) {
      throw new ApiError(`Request failed with status ${res.status}`, res.status, data);
    }
    return data as TResponse;
  }

  return {
    request,
    get(path, options) {
      return request(path, { ...options, method: 'GET' });
    },
    post(path, body, options) {
      return request(path, { ...options, method: 'POST', body });
    },
  };
}

// Cliente por defecto sin baseUrl: acepta URLs absolutas (los endpoints viven en
// core/config/endpoints.ts como URLs completas). Para un backend con prefijo común,
// crear otra instancia con createApiClient({ baseUrl }).
export const api = createApiClient();
