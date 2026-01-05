import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>404</h1>
      <div className="muted">Page introuvable.</div>
      <div style={{ marginTop: 10 }}>
        <Link className="btn" to="/">Retour accueil</Link>
      </div>
    </div>
  );
}
