import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      add(productId, qty = 1) {
        set((state) => {
          const found = state.items.find((it) => it.productId === productId);
          if (found) {
            return {
              items: state.items.map((it) =>
                it.productId === productId ? { ...it, qty: it.qty + qty } : it
              ),
            };
          }
          return { items: [...state.items, { productId, qty }] };
        });
      },

      setQty(productId, qty) {
        const q = Math.max(1, Number(qty || 1));
        set((state) => ({
          items: state.items.map((it) =>
            it.productId === productId ? { ...it, qty: q } : it
          ),
        }));
      },

      remove(productId) {
        set((state) => ({
          items: state.items.filter((it) => it.productId !== productId),
        }));
      },

      clear() {
        set({ items: [] });
      },
    }),
    { name: "up_cart_v1" }
  )
);
