import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useOrderStore } from "../stores/orderStore";

export default function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const orders = useOrderStore((s) => s.orders);

  const [tab, setTab] = useState("orders");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  const createdOrderId = location.state?.createdOrderId;

  const createdOrder = useMemo(() => {
    if (!createdOrderId) return null;
    return orders.find((o) => o.id === createdOrderId) || null;
  }, [createdOrderId, orders]);

  if (!user) return null;

  return (
    <div className="two-col">
      <aside className="card">
        <div style={{ fontWeight: 900, fontSize: 18 }}>Compte</div>
        <div className="small" style={{ marginTop: 6 }}>{user.email}</div>

        <div className="col" style={{ marginTop: 12 }}>
          <button className={"btn " + (tab === "orders" ? "primary" : "")} onClick={() => setTab("orders")}>
            Commandes
          </button>
          <button className={"btn " + (tab === "profile" ? "primary" : "")} onClick={() => setTab("profile")}>
            Profil
          </button>
          <button className="btn danger" onClick={() => { logout(); navigate("/"); }}>
            Déconnexion
          </button>
        </div>

        <hr />
        <div className="small">Retour : <Link to="/">Accueil</Link></div>
      </aside>

      <section className="card">
        {createdOrder && (
          <div className="card" style={{ borderStyle: "dashed", marginBottom: 12 }}>
            <div style={{ fontWeight: 900 }}>Commande enregistrée</div>
            <div className="small">ID : {createdOrder.id}</div>
          </div>
        )}

        {tab === "profile" ? (
          <>
            <h2 style={{ marginTop: 0 }}>Profil</h2>
            <div className="kpi"><span className="muted">Email</span><strong>{user.email}</strong></div>
          </>
        ) : (
          <>
            <h2 style={{ marginTop: 0 }}>Commandes</h2>
            {orders.length === 0 ? (
              <div className="muted">Aucune commande. <Link to="/">Retour boutique</Link></div>
            ) : (
              <div className="col">
                {orders.map((o) => (
                  <div key={o.id} className="card" style={{ borderRadius: 12 }}>
                    <div className="row wrap" style={{ justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 900 }}>{o.id}</div>
                        <div className="small">{new Date(o.createdAt).toLocaleString()}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div><strong>{o.total} €</strong></div>
                        <div className="small">{o.status}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
