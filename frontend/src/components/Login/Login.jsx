import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ 
  onLogin,
  showNotification
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
       showNotification("No existe un usuario registrado", "error");
      return;
    }

    if (storedUser.email !== email || storedUser.password !== password) {
       showNotification("Correo o contraseña incorrectos", "error");
      return;
    }

    // Login exitoso
    localStorage.setItem("loggedIn", "true");
    onLogin?.(); 
    navigate("/"); 
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
