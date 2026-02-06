import { api } from "./http";

export const ProductsAPI = {
  list: () => api("/products", { auth: false }),

  bySlug: (slug) =>
    api(`/products/${encodeURIComponent(slug)}`, { auth: false }),

  create: (payload) => api("/products", { method: "POST", body: payload }),
  update: (id, payload) =>
    api(`/products/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: payload,
    }),
  remove: (id) =>
    api(`/products/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
