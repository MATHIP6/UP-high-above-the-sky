import { create } from "zustand";

export const useOverlayStore = create((set) => ({
  cartOpen: false,
  loginOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
  setLoginOpen: (v) => set({ loginOpen: v }),
  closeAll: () => set({ cartOpen: false, loginOpen: false }),
}));
