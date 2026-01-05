import { Outlet, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";
import { useOverlayStore } from "../stores/overlayStore";
import CartOverlay from "./overlays/CartOverlay";
import LoginOverlay from "./overlays/LoginOverlay";

export default function RootLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const itemCount = useCartStore((s) => s.items.reduce((sum, it) => sum + it.qty, 0));

  const cartOpen = useOverlayStore((s) => s.cartOpen);
  const loginOpen = useOverlayStore((s) => s.loginOpen);
  const setCartOpen = useOverlayStore((s) => s.setCartOpen);
  const setLoginOpen = useOverlayStore((s) => s.setLoginOpen);
  const closeAll = useOverlayStore((s) => s.closeAll);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="brand" role="button" tabIndex={0} onClick={() => navigate("/")}>
            UP
          </div>

          <div className="icon-row" aria-label="Actions">
            <button className="icon-btn" onClick={() => setCartOpen(true)} title="Panier">
              🛒{itemCount > 0 ? <span className="badge">{itemCount}</span> : null}
            </button>

            <button
              className="icon-btn"
              onClick={() => {
                if (user) navigate("/account");
                else setLoginOpen(true);
              }}
              title={user ? "Compte" : "Login"}
            >
              👤
            </button>

            <button className="icon-btn" onClick={() => navigate("/contact")} title="Contact">
              ✉️
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      {(cartOpen || loginOpen) && <div className="overlay-backdrop" onClick={closeAll} />}

      {cartOpen && <CartOverlay onClose={() => setCartOpen(false)} />}
      {loginOpen && <LoginOverlay onClose={() => setLoginOpen(false)} />}
    </>
  );
}
