import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { getProductById } from "../data/products";

export default function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const lines = items
    .map((it) => {
      const product = getProductById(it.productId);
      if (!product) return null;
      return { ...it, product, lineTotal: product.price * it.qty };
    })
    .filter(Boolean);

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const total = subtotal;

  return (
    <div className="col">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Panier (page)</h1>
        <div className="small">Tu peux aussi utiliser l'icône panier (drawer).</div>
      </div>

      {lines.length === 0 ? (
        <div className="card">
          <div className="muted">Ton panier est vide.</div>
          <div style={{ marginTop: 10 }}>
            <Link className="btn" to="/">Retour accueil</Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="col">
            {lines.map((l) => (
              <div key={l.productId} className="row wrap" style={{ alignItems: "center", justifyContent: "space-between" }}>
                <div className="row" style={{ alignItems: "center" }}>
                  <img
                    src={l.product.images[0]}
                    alt={l.product.name}
                    style={{ width: 90, height: 70, objectFit: "cover", borderRadius: 10, border: "1px solid var(--border)" }}
                  />
                  <div>
                    <div style={{ fontWeight: 900 }}>{l.product.name}</div>
                    <div className="small">{l.product.price} €</div>
                  </div>
                </div>

                <div className="row wrap" style={{ alignItems: "center" }}>
                  <input
                    className="input"
                    type="number"
                    min="1"
                    value={l.qty}
                    onChange={(e) => setQty(l.productId, e.target.value)}
                    style={{ width: 90 }}
                  />
                  <div style={{ minWidth: 110, textAlign: "right" }}>{l.lineTotal} €</div>
                  <button className="btn danger" onClick={() => remove(l.productId)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>

          <hr />

          <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div className="col" style={{ minWidth: 240 }}>
              <div className="kpi"><span className="muted">Sous-total</span><strong>{subtotal} €</strong></div>
              <div className="kpi"><span className="muted">Total</span><strong>{total} €</strong></div>
            </div>

            <div className="row wrap" style={{ justifyContent: "flex-end" }}>
              <button className="btn" onClick={() => { clear(); navigate("/"); }}>Vider</button>
              <Link className="btn" to="/">Continuer</Link>
              <button className="btn primary" onClick={() => navigate("/checkout")}>Aller au paiement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
