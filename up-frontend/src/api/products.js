import { api } from "./http";

// Public
export const ProductsAPI = {
  list: () => api("/products", { auth: false }),

  // Optional (recommended) endpoint; if missing, fallback to list()+find in store.
  bySlug: (slug) => api(`/products/${encodeURIComponent(slug)}`, { auth: false }),

  // Admin (for later)
  create: (payload) => api("/products", { method: "POST", body: payload }),
  update: (id, payload) =>
    api(`/products/${encodeURIComponent(id)}`, { method: "PATCH", body: payload }),
  remove: (id) => api(`/products/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
