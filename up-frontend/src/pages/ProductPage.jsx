import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductBySlug } from "../data/products";
import { useCartStore } from "../stores/cartStore";
import { useMemo, useState } from "react";

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const add = useCartStore((s) => s.add);

  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Produit introuvable</h1>
        <Link className="btn" to="/">Retour accueil</Link>
      </div>
    );
  }

  return (
    <div className="col">
      <div className="card">
        <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0 }}>{product.name}</h1>
          <div className="muted">{product.price} €</div>
        </div>
        <p className="muted">{product.description}</p>
      </div>

      <div className="card">
        <div className="row wrap">
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: 420, maxWidth: "100%", height: 320, objectFit: "cover", borderRadius: 10, border: "1px solid var(--border)" }}
          />
          <div className="col" style={{ flex: 1 }}>
            <label>
              Quantité
              <input
                className="input"
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                style={{ marginTop: 6 }}
              />
            </label>

            <div className="row wrap">
              <button
                className="btn primary"
                disabled={!product.inStock}
                onClick={() => {
                  add(product.id, qty);
                  navigate("/cart");
                }}
              >
                Ajouter au panier
              </button>
              <Link className="btn" to={`/theme/${product.category}`}>Retour thème</Link>
            </div>

            {!product.inStock && <div className="small">Rupture (V1).</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
