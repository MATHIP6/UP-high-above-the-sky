import { api, setToken, clearToken } from "./http";

// These functions are intentionally thin wrappers:
// pages/stores should not hardcode endpoints.

export const AuthAPI = {
  async login({ username, password }) {
    const data = await api("/login", {
      method: "POST",
      body: { username, password },
      auth: false,
    });

    // If backend returns a token, store it (bearer mode). If it uses cookies,
    // this field may be absent and it's still OK.
    if (data?.access_token) setToken(data.access_token);
    return data;
  },

  async register({ username, email, password }) {
    const data = await api("/register", {
      method: "POST",
      body: { username, email, password },
      auth: false,
    });
    if (data?.access_token) setToken(data.access_token);
    return data;
  },

  async me() {
    // If not implemented yet on backend, the store will handle the error.
    return api("/me");
  },

  logout() {
    // If backend has no logout route, we still clear client state.
    clearToken();
    return Promise.resolve();
  },
};
