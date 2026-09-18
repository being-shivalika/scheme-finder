/** Same-origin API helper — sends httpOnly auth cookie. */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(path, {
    ...options,
    credentials: "include",
    headers,
  });
}

/** Parse JSON safely when proxies/backends return plain text errors. */
export async function readApiJson<T = Record<string, unknown>>(
  response: Response
): Promise<T> {
  const raw = await response.text();
  if (!raw) return {} as T;
  try {
    return JSON.parse(raw) as T;
  } catch {
    const snippet = raw.replace(/\s+/g, " ").trim().slice(0, 120);
    if (!response.ok) {
      throw new Error(
        snippet.startsWith("<!") || snippet.startsWith("<html")
          ? "Server unavailable. Run npm run dev and try again."
          : snippet || `Request failed (${response.status})`
      );
    }
    throw new Error("Unexpected server response");
  }
}
