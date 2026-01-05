import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCartStore } from "../stores/cartStore";

export default function HomePage() {
  const add = useCartStore((s) => s.add);

  // Prochain thème = change le produit vedette
  const featuredList = useMemo(() => PRODUCTS.filter((p) => p.inStock), []);
  const [idx, setIdx] = useState(0);
  const featured = featuredList[idx % featuredList.length];

  return (
    <div className="hub-shell">
      <div className="hub-frame">
        <div className="hub-grid">
          <div className="info-box">
            <h3 className="info-title">Nom</h3>
            <div style={{ fontWeight: 900, marginTop: 8 }}>{featured.name}</div>
            <div className="info-price">{featured.price} €</div>
            <div className="small" style={{ marginTop: 10 }}>
              Texte minimal, lisible. (V1)
            </div>
          </div>

          <div className="hub-product">
            <img src={featured.images[0]} alt={featured.name} />
            <div className="hub-actions">
              <button className="btn primary" onClick={() => add(featured.id, 1)}>
                Ajouter au panier
              </button>

              <button className="btn" onClick={() => setIdx((v) => (v + 1) % featuredList.length)}>
                Prochain thème
              </button>

              <Link className="btn" to={`/theme/${featured.category}`}>
                Voir plus sur ce thème
              </Link>

              <Link className="btn" to={`/product/${featured.slug}`}>
                Voir le produit
              </Link>
            </div>
          </div>

          <div className="info-box">
            <h3 className="info-title">Qualité</h3>
            <div className="small" style={{ marginTop: 8 }}>
              {featured.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
