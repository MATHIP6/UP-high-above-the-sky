import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";
import { useOrderStore } from "../stores/orderStore";
import { getProductById } from "../data/products";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const createOrder = useOrderStore((s) => s.createOrder);

  const lines = items
    .map((it) => {
      const product = getProductById(it.productId);
      if (!product) return null;
      return { ...it, product, lineTotal: product.price * it.qty };
    })
    .filter(Boolean);

  const total = lines.reduce((s, l) => s + l.lineTotal, 0);

  const [form, setForm] = useState({
    fullName: "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
  });

  const canSubmit = useMemo(() => {
    if (lines.length === 0) return false;
    if (!form.fullName || !form.email) return false;
    return true;
  }, [lines.length, form.fullName, form.email]);

  if (lines.length === 0) {
    return (
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Paiement</h1>
        <div className="muted">Panier vide.</div>
        <div style={{ marginTop: 10 }}>
          <Link className="btn" to="/cart">Retour panier</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="col">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Paiement (V1)</h1>
        <div className="small">V1: pas de Stripe. On enregistre une commande “En cours”.</div>
      </div>

      <div className="row wrap">
        <div className="card" style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>Infos</h2>

          <div className="col">
            <div>
              <label>Nom complet</label>
              <input className="input" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </div>

            <div>
              <label>Email</label>
              <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            <div>
              <label>Adresse</label>
              <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>

            <div className="row wrap">
              <div style={{ flex: 1 }}>
                <label>Ville</label>
                <input className="input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div style={{ width: 140 }}>
                <label>Code postal</label>
                <input className="input" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
              </div>
            </div>

            {!user && (
              <div className="card" style={{ borderStyle: "dashed" }}>
                <div style={{ fontWeight: 900 }}>Astuce</div>
                <div className="small">Connecte-toi pour retrouver tes commandes dans Compte.</div>
                <div style={{ marginTop: 10 }}>
                  <Link className="btn" to="/login">Aller au login</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ width: 360 }}>
          <h2 style={{ marginTop: 0 }}>Récap</h2>
          <div className="col">
            {lines.map((l) => (
              <div key={l.productId} className="kpi">
                <span className="muted">{l.qty}× {l.product.name}</span>
                <strong>{l.lineTotal} €</strong>
              </div>
            ))}
            <hr />
            <div className="kpi">
              <span className="muted">Total</span>
              <strong>{total} €</strong>
            </div>

            <button
              className="btn primary"
              disabled={!canSubmit}
              onClick={() => {
                const order = createOrder({ items, total });
                clear();
                navigate("/account", { state: { createdOrderId: order.id } });
              }}
            >
              Valider la commande
            </button>

            <Link className="btn" to="/cart">Retour panier</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
