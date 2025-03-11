import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ user, onLogout }) {
  const location = useLocation();

  return (
    <>
      <header>
        <h1>Biblioteca Online</h1>
        <nav>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Inicio
          </Link>
          {user ? (
            <button onClick={onLogout} className="logout-btn">
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link
                to="/iniciar-sesion"
                className={location.pathname === "/iniciar-sesion" ? "active" : ""}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/registrarse"
                className={location.pathname === "/registrarse" ? "active" : ""}
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </header>
      {user && (
        <div className="user-info">
          <span className="user-email">{user.email}</span>
        </div>
      )}
    </>
  );
}

export default Header;