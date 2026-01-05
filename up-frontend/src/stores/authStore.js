import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,

      login(email, password) {
        if (!email || !password) return { ok: false, error: "Email et mot de passe requis." };
        set({ user: { email } });
        return { ok: true };
      },

      register(email, password) {
        if (!email || !password) return { ok: false, error: "Email et mot de passe requis." };
        set({ user: { email } });
        return { ok: true };
      },

      logout() {
        set({ user: null });
      },

      isAuthed() {
        return Boolean(get().user);
      },
    }),
    { name: "up_auth_v1" }
  )
);
