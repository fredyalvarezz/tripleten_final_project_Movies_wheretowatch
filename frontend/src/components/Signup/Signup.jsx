import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup({ 
  onSignup,
  showNotification
 }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    // Guardar usuario
    localStorage.setItem("user", JSON.stringify(user));

    showNotification("Usuario registrado correctamente", "success");

    navigate("/login");
  }

  function handleGoToLogin() {
    navigate("/login");
  }

  return (
    <div className="signup">
      <div className="signup__background"></div>

      <form className="signup__form" onSubmit={handleSubmit}>
        <h1 className="signup__title">StreamWhere</h1>
        <p className="signup__subtitle">Crea tu cuenta y prepara tu lista de peliculas.</p>

        <input
          type="email"
          className="signup__input"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="signup__input"
          placeholder="Crea una contraseña segura"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="signup__button">Crear cuenta</button>

        <p className="signup__footer">
          ¿Ya tienes una cuenta?{" "}
          <button type="button" className="signup__link" onClick={handleGoToLogin}>
            Inicia sesión
          </button>
        </p>
      </form>
    </div>
  );
}
