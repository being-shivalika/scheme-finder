/** Same-origin API helper — sends httpOnly auth cookie. */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(path, {
    ...options,
    credentials: 'include',
    headers,
  });
}
