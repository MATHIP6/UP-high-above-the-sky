import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";
import { getProductById } from "../../data/products";

export default function CartOverlay({ onClose }) {
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
    <aside className="drawer" role="dialog" aria-label="Panier">
      <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Panier</h2>
        <button className="btn" onClick={onClose}>Fermer</button>
      </div>

      <hr />

      {lines.length === 0 ? (
        <div className="muted">Panier vide.</div>
      ) : (
        <div className="col">
          {lines.map((l) => (
            <div key={l.productId} className="card" style={{ borderRadius: 10 }}>
              <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <div className="row" style={{ alignItems: "center" }}>
                  <img
                    src={l.product.images[0]}
                    alt={l.product.name}
                    style={{ width: 70, height: 54, objectFit: "cover", borderRadius: 10, border: "1px solid var(--border)" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700 }}>{l.product.name}</div>
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
                    style={{ width: 86 }}
                  />
                  <div style={{ minWidth: 90, textAlign: "right" }}>{l.lineTotal} €</div>
                  <button className="btn danger" onClick={() => remove(l.productId)}>✕</button>
                </div>
              </div>
            </div>
          ))}

          <div className="kpi"><span className="muted">Sous-total</span><strong>{subtotal} €</strong></div>
          <div className="kpi"><span className="muted">Total</span><strong>{total} €</strong></div>

          <div className="row wrap" style={{ justifyContent: "flex-end" }}>
            <button className="btn" onClick={clear}>Vider</button>
            <button className="btn" onClick={() => { onClose(); navigate("/cart"); }}>Page panier</button>
            <button className="btn primary" onClick={() => { onClose(); navigate("/checkout"); }}>Paiement</button>
          </div>
        </div>
      )}
    </aside>
  );
}
