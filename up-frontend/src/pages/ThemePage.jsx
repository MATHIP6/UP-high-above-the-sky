import { Link, useParams } from "react-router-dom";
import { getProductsByCategory } from "../data/products";
import { useCartStore } from "../stores/cartStore";
import { useMemo, useState } from "react";

const labelMap = { caps: "Casquettes", vetements: "Vêtements" };

export default function ThemePage() {
  const { category } = useParams();
  const add = useCartStore((s) => s.add);
  const [inStockOnly, setInStockOnly] = useState(false);

  const products = useMemo(() => {
    const all = getProductsByCategory(category) || [];
    return inStockOnly ? all.filter((p) => p.inStock) : all;
  }, [category, inStockOnly]);

  const featured = products[0] || null;

  return (
    <div className="col">
      <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>{labelMap[category] || category}</h1>
        <Link className="btn" to="/">Retour</Link>
      </div>

      <div className="two-col">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Article vedette (dock)</h2>

          {featured ? (
            <>
              <img
                src={featured.images[0]}
                alt={featured.name}
                style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 12, border: "1px solid var(--border)" }}
              />
              <div style={{ marginTop: 10, fontWeight: 900 }}>{featured.name}</div>
              <div className="muted">{featured.price} €</div>

              <div className="row wrap" style={{ marginTop: 10 }}>
                <button className="btn primary" disabled={!featured.inStock} onClick={() => add(featured.id, 1)}>
                  Ajouter au panier
                </button>
                <Link className="btn" to={`/product/${featured.slug}`}>Voir fiche</Link>
              </div>
            </>
          ) : (
            <div className="muted">Aucun produit (mock).</div>
          )}

          <hr />
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
            En stock seulement
          </label>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Articles liés (scroll)</h2>
          <div className="col">
            {products.map((p) => (
              <div key={p.id} className="card" style={{ borderRadius: 12 }}>
                <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "center" }}>
                  <div className="row" style={{ alignItems: "center" }}>
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      style={{ width: 86, height: 66, objectFit: "cover", borderRadius: 10, border: "1px solid var(--border)" }}
                    />
                    <div>
                      <div style={{ fontWeight: 900 }}>{p.name}</div>
                      <div className="small">
                        {p.price} € {p.inStock ? "" : "• Rupture"}
                      </div>
                    </div>
                  </div>

                  <div className="row wrap" style={{ justifyContent: "flex-end" }}>
                    <Link className="btn" to={`/product/${p.slug}`}>Voir</Link>
                    <button className="btn primary" disabled={!p.inStock} onClick={() => add(p.id, 1)}>
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && <div className="muted">Aucun article.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
