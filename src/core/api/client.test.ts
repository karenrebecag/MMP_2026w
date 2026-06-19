// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { createApiClient, ApiError } from './client';

const ENDPOINT = 'https://api.example.com/v1/leads';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

// Mock de fetch tipado: captura el último (url, init) para inspección.
function stubFetch(impl: (url: string, init: RequestInit) => Promise<Response>) {
  const mock = vi.fn(impl);
  vi.stubGlobal('fetch', mock);
  return mock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('api client — request shaping', () => {
  it('POST envía JSON con headers, mode cors y credentials omit', async () => {
    const fetchMock = stubFetch(async () => jsonResponse({ ok: true }));

    const api = createApiClient();
    const res = await api.post<{ ok: boolean }>(ENDPOINT, { email: 'a@b.com' });

    expect(res).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(init.method).toBe('POST');
    expect(init.mode).toBe('cors');
    expect(init.credentials).toBe('omit');
    expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/json');
    expect(JSON.parse(init.body as string)).toEqual({ email: 'a@b.com' });
  });

  it('añade query params y omite undefined/null', async () => {
    const fetchMock = stubFetch(async () => jsonResponse({ ok: true }));

    const api = createApiClient();
    await api.get(ENDPOINT, { query: { page: 2, q: 'x', skip: undefined, none: null } });

    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain('page=2');
    expect(url).toContain('q=x');
    expect(url).not.toContain('skip');
    expect(url).not.toContain('none');
  });

  it('resuelve paths relativos contra baseUrl', async () => {
    const fetchMock = stubFetch(async () => jsonResponse({ ok: true }));

    const api = createApiClient({ baseUrl: 'https://api.example.com' });
    await api.post('/v1/leads', { a: 1 });

    expect(String(fetchMock.mock.calls[0][0])).toBe('https://api.example.com/v1/leads');
  });
});

describe('api client — errores', () => {
  it('lanza ApiError con status y data en respuestas no-2xx', async () => {
    stubFetch(async () => jsonResponse({ ok: false, error: 'validation' }, 422));

    const api = createApiClient();
    await expect(api.post(ENDPOINT, {})).rejects.toMatchObject({
      name: 'ApiError',
      status: 422,
      data: { ok: false, error: 'validation' },
    });
  });

  it('mapea fallo de red a ApiError status 0 (no aborted)', async () => {
    stubFetch(async () => {
      throw new TypeError('Failed to fetch');
    });

    const api = createApiClient();
    const err = await api.post(ENDPOINT, {}).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).status).toBe(0);
    expect((err as ApiError).aborted).toBe(false);
  });

  it('timeout aborta y devuelve ApiError aborted', async () => {
    // fetch que solo rechaza cuando su signal se aborta (como el fetch real).
    stubFetch(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener('abort', () =>
            reject(new DOMException('aborted', 'AbortError')),
          );
        }),
    );

    const api = createApiClient({ timeoutMs: 20 });
    await expect(api.post(ENDPOINT, {})).rejects.toMatchObject({ status: 0, aborted: true });
  });
});
