const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Auth mode:
// - cookie: backend sets httpOnly cookies ("credentials: include" required)
// - bearer: backend returns a token we store and send via Authorization header
// If not set, we support BOTH (cookie + bearer) which keeps the front compatible.
const AUTH_MODE = (import.meta.env.VITE_AUTH_MODE || "both").toLowerCase();

export function setToken(t) {
  if (!t) return;
  localStorage.setItem("up_token", t);
}

export function getToken() {
  return localStorage.getItem("up_token");
}

export function clearToken() {
  localStorage.removeItem("up_token");
}

function buildHeaders(auth = true) {
  const headers = { "Content-Type": "application/json" };

  // Bearer token support
  if (auth && (AUTH_MODE === "bearer" || AUTH_MODE === "both")) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function api(path, { method = "GET", body, auth = true } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: buildHeaders(auth),

    // Cookie auth support
    credentials:
      AUTH_MODE === "cookie" || AUTH_MODE === "both" ? "include" : "same-origin",

    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    // FastAPI typically uses "detail".
    const msg = data?.detail || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export function apiUrl() {
  return API_URL;
}
