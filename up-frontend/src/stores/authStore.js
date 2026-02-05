import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, setToken, clearToken, getToken } from "../api/http";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // on ne peut pas récupérer le user sans /me
      token: getToken() || null,

      async login(username, password) {
        try {
          const data = await api("/login", {
            method: "POST",
            body: { username, password },
          });
          setToken(data.access_token);
          set({ token: data.access_token, user: { username } });
          return { ok: true };
        } catch (e) {
          return { ok: false, error: e.message };
        }
      },

      async register(username, email, password) {
        try {
          const data = await api("/register", {
            method: "POST",
            body: { username, email, password },
          });
          setToken(data.access_token);
          set({ token: data.access_token, user: { username, email } });
          return { ok: true };
        } catch (e) {
          return { ok: false, error: e.message };
        }
      },

      logout() {
        clearToken();
        set({ user: null, token: null });
      },
    }),
    { name: "up-auth" },
  ),
);
