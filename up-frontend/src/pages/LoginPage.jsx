import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit() {
    setError("");
    const fn = mode === "login" ? login : register;
    const res = fn(email.trim(), password);
    if (!res.ok) return setError(res.error || "Erreur.");
    navigate("/account");
  }

  return (
    <div className="col" style={{ maxWidth: 520 }}>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>{mode === "login" ? "Connexion" : "Inscription"}</h1>
        <div className="row wrap">
          <button className={"btn " + (mode === "login" ? "primary" : "")} onClick={() => setMode("login")}>
            Connexion
          </button>
          <button className={"btn " + (mode === "register" ? "primary" : "")} onClick={() => setMode("register")}>
            Inscription
          </button>
        </div>
      </div>

      <div className="card">
        <div className="col">
          <div>
            <label>Email</label>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Mot de passe</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <div className="card" style={{ borderColor: "#fecaca", color: "#991b1b" }}>{error}</div>}

          <button className="btn primary" onClick={submit}>
            {mode === "login" ? "Se connecter" : "Créer un compte"}
          </button>
        </div>
      </div>
    </div>
  );
}
