import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create(
  persist(
    (set) => ({
      orders: [],

      createOrder({ items, total }) {
        const id = "ORD-" + Math.random().toString(16).slice(2, 8).toUpperCase();
        const createdAt = new Date().toISOString();
        const order = { id, createdAt, status: "En cours", total, items };
        set((s) => ({ orders: [order, ...s.orders] }));
        return order;
      },
    }),
    { name: "up_orders_v1" }
  )
);
