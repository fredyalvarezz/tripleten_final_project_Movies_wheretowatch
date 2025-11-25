import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({isLoggedIn }) {
  return (
    <nav className="navigation">
    <ul className="navigation__list">
      <li><Link to="/" className="navigation__link">Inicio</Link></li>
      <li><Link to="/peliculas" className="navigation__link">Películas</Link></li>
      <li><Link to="/series" className="navigation__link">Series</Link></li>

      {isLoggedIn && (
      <li><Link to="/mi-lista" className="navigation__link">Mi Lista</Link></li>
      )}
       <li><Link to="/acerca" className="navigation__link">Acerca de</Link></li>
    </ul>
    </nav>
  );
}
