import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrdersAPI } from "../api/orders";

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      error: "",

      // Local fallback (works without backend)
      createOrderLocal(payload){
        const id = "ORD-" + Math.random().toString(16).slice(2, 10).toUpperCase();
        const createdAt = new Date().toISOString();
        const status = "EN_PREPARATION";
        const order = { id, createdAt, status, ...payload };
        set((s) => ({ orders: [order, ...s.orders] }));
        return order;
      },

      // Preferred: create on server, fallback to local if missing
      async createOrder(payload){
        set({ loading: true, error: "" });
        try {
          const created = await OrdersAPI.create(payload);
          const order = created?.content || created;
          if (order) set((s) => ({ orders: [order, ...s.orders], loading: false }));
          else set({ loading: false });
          return order;
        } catch (e) {
          // backend not ready -> local simulation
          const order = get().createOrderLocal(payload);
          set({ loading: false, error: e.message || "Erreur" });
          return order;
        }
      },

      async fetchMyOrders(){
        set({ loading: true, error: "" });
        try {
          const raw = await OrdersAPI.mine();
          const list = Array.isArray(raw) ? raw : raw?.content || raw?.items || [];
          set({ orders: list, loading: false });
          return { ok: true };
        } catch (e) {
          set({ loading: false, error: e.message || "Erreur" });
          return { ok: false, error: e.message };
        }
      },

      async fetchAllOrders(){
        set({ loading: true, error: "" });
        try {
          const raw = await OrdersAPI.list();
          const list = Array.isArray(raw) ? raw : raw?.content || raw?.items || [];
          set({ orders: list, loading: false });
          return { ok: true };
        } catch (e) {
          set({ loading: false, error: e.message || "Erreur" });
          return { ok: false, error: e.message };
        }
      },

      listForEmail(email){
        const e = String(email || "").trim().toLowerCase();
        return get().orders.filter(o => String(o.email || "").toLowerCase() === e);
      },

      adminList(){
        return get().orders;
      },

      setStatus(id, status){
        set((s) => ({ orders: s.orders.map(o => o.id === id ? { ...o, status } : o) }));
      },

      async setStatusRemote(id, status){
        set({ loading: true, error: "" });
        try {
          await OrdersAPI.setStatus(id, status);
          set({ loading: false });
          // optimistic local update
          get().setStatus(id, status);
          return { ok: true };
        } catch (e) {
          set({ loading: false, error: e.message || "Erreur" });
          return { ok: false, error: e.message };
        }
      },
    }),
    { name: "up_orders_full" }
  )
);
