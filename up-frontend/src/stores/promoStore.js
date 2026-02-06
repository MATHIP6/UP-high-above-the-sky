import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_PROMOS } from "../data/seed";
import { PromosAPI } from "../api/promos";

function seed(){ return SEED_PROMOS.map(p => ({ ...p, code: String(p.code).toUpperCase() })); }

export const usePromoStore = create(
  persist(
    (set, get) => ({
      promos: seed(),
      lastValidate: null,
      validateError: "",

      findActive(code){
        const c = String(code || "").trim().toUpperCase();
        if (!c) return null;
        const p = get().promos.find(x => x.code === c);
        if (!p || !p.active) return null;
        return p;
      },

      // Remote validation for checkout. If backend doesn't have it yet,
      // it will fail and UI can fallback to local promos.
      async validateRemote(code) {
        set({ validateError: "" });
        try {
          const res = await PromosAPI.validate(code);
          set({ lastValidate: res });
          return { ok: true, res };
        } catch (e) {
          set({ validateError: e.message || "Erreur" });
          return { ok: false, error: e.message };
        }
      },

      upsert(promo){
        set((state) => {
          const incoming = { ...promo };
          if (!incoming.id) incoming.id = "promo_" + Math.random().toString(16).slice(2, 10);
          incoming.code = String(incoming.code || "").trim().toUpperCase();
          const idx = state.promos.findIndex(p => p.id === incoming.id);
          if (idx >= 0){
            const next = [...state.promos];
            next[idx] = { ...next[idx], ...incoming };
            return { promos: next };
          }
          return { promos: [incoming, ...state.promos] };
        });
      },

      toggleActive(id){
        set((state) => ({ promos: state.promos.map(p => p.id === id ? { ...p, active: !p.active } : p) }));
      },

      remove(id){
        set((state) => ({ promos: state.promos.filter(p => p.id !== id) }));
      },
    }),
    { name: "up_promos_full" }
  )
);
