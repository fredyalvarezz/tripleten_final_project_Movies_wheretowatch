import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

export default function Header({isLoggedIn, onProfileClick, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu en movil
   const navigate = useNavigate();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleAccountClick(e) {
    e.preventDefault();
    if (isLoggedIn) {
      // Si ya inició sesión, abre el modal de perfil
      onProfileClick();
    } else {
      // Si no ha iniciado sesión, lo mandamos al login
      navigate("/login");
    }
  }

   function handleLogoutClick() {
    onLogout(); // actualiza el estado global a no logueado
    navigate("/"); // redirige a la página principal
  }

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo" onClick={() => navigate("/")}>StreamWhere</h1>

        <nav className="header__nav-desktop">
          <Navigation isLoggedIn={isLoggedIn} />
        </nav>

        <div className="header__right">
          {isLoggedIn ? (
            <>
              <button
                className="header__signup"
                onClick={handleAccountClick}
              >
                Perfil
              </button>
              <button
                className="header__signup header__logout"
                onClick={handleLogoutClick}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            // Si no ha iniciado sesión, solo mostramos Mi cuenta
            <button
              className="header__signup"
              onClick={handleAccountClick}
            >
              Mi cuenta
            </button>
          )}

          <button className="header__menu-button" onClick={toggleMenu}>
            {/* ícono menu desplegable hecho con spans */}
            <span className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="header__nav-mobile">
          <Navigation isLoggedIn={isLoggedIn} />
        </nav>
      )}
    </header>
  );
}
