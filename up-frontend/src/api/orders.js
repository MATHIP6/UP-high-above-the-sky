import { api } from "./http";

export const OrdersAPI = {
  // Client
  create: (payload) => api("/orders", { method: "POST", body: payload }),
  mine: () => api("/orders/me"),

  // Admin
  list: () => api("/orders"),
  setStatus: (id, status) =>
    api(`/orders/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: { status },
    }),
};
