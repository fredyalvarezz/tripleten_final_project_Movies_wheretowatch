import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import MainApi from "../../utils/MainApi";

export default function Login({ 
  onLogin,
  showNotification
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();

    try {
    const res = await fetch("https://streamwhere.mooo.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Guardar token en localStorage
    localStorage.setItem("jwt", data.token);

    // Notificar App.jsx
    onLogin();

  } catch (err) {
    showNotification("Credenciales incorrectas", "error");
  }
}

  function handleGoToSignup() {
    navigate("/signup");
  }

  return (
    <div className="login">
      <div className="login__background"></div>

      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">StreamWhere</h1>
        <p className="login__subtitle">¡Bienvenido de nuevo! Inicia sesión en tu cuenta.</p>

        <input type="email" className="login__input" placeholder="Ingresa tu correo" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="login__input" placeholder="Ingresa tu contraseña" required value={password} onChange={(e)=> setPassword(e.target.value)} />

        <button type="submit" className="login__button">Iniciar sesión</button>

        <p className="login__footer">
          ¿No tienes una cuenta? {" "}
          <button type="button" className="login__link" onClick={handleGoToSignup}>
            Regístrate
          </button>
        </p>
      </form>
    </div>
  );
}
