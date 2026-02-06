import { api } from "./http";

// Your friend's backend may use one of these patterns:
// - GET /code/check/{code}
// - GET /promos/validate?code=...
// We'll support both; choose via VITE_PROMO_VALIDATE_PATH.

const DEFAULT_VALIDATE = "/code/check";
const VALIDATE_BASE = import.meta.env.VITE_PROMO_VALIDATE_PATH || DEFAULT_VALIDATE;

export const PromosAPI = {
  validate(code) {
    const c = String(code || "").trim();
    if (!c) return Promise.resolve({ success: false, content: null });

    if (VALIDATE_BASE.startsWith("/code/check")) {
      return api(`${VALIDATE_BASE}/${encodeURIComponent(c)}`, { auth: false });
    }

    // Fallback: /promos/validate?code=...
    return api(`${VALIDATE_BASE}?code=${encodeURIComponent(c)}`, { auth: false });
  },

  // Admin (for later)
  list: () => api("/promos"),
  create: (payload) => api("/promos", { method: "POST", body: payload }),
  update: (id, payload) =>
    api(`/promos/${encodeURIComponent(id)}`, { method: "PATCH", body: payload }),
  remove: (id) => api(`/promos/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
