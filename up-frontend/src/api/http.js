const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function setToken(t) {
  localStorage.setItem("up_token", t);
}
export function getToken() {
  return localStorage.getItem("up_token");
}
export function clearToken() {
  localStorage.removeItem("up_token");
}

export async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.detail || `HTTP ${res.status}`);
  return data;
}
