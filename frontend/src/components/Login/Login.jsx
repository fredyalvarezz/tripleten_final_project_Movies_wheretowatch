import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import MainApi from "../../utils/MainApi";

export default function Login({ onLogin, showNotification }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error);
    const hasEmptyFields = !email || !password;
    setIsValid(!hasErrors && !hasEmptyFields);
  }, [email, password, errors]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await MainApi.login({ email, password });

      // Guardar token en localStorage
      localStorage.setItem("jwt", data.token);

  
      onLogin();

      navigate("/");
    } catch (err) {
      showNotification(err.message || "Credenciales incorrectas", "error");
    }
  }

  return (
    <div className="login">
      <div className="login__background"></div>

      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">StreamWhere</h1>
        <p className="login__subtitle">¡Bienvenido de nuevo! Inicia sesión en tu cuenta.</p>

        <input
          type="email"
          className="login__input"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({
              ...prev,
              email: e.target.validity.valid ? "" : "Correo inválido",
            }));
          }}
        />
        {errors.email && <span className="login__error">{errors.email}</span>}

        <input
          type="password"
          className="login__input"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({
              ...prev,
              password:
                e.target.value.length >= 6
                  ? ""
                  : "La contraseña debe tener al menos 6 caracteres",
            }));
          }}
        />
        {errors.password && <span className="login__error">{errors.password}</span>}

        <button
          type="submit"
          className={`login__button ${!isValid ? "login__button_disabled" : ""}`}
          disabled={!isValid}
        >
          Iniciar sesión
        </button>

        <p className="login__footer">
          ¿No tienes una cuenta?{" "}
          <button type="button" className="login__link" onClick={() => navigate("/signup")}>
            Regístrate
          </button>
        </p>
      </form>
    </div>
  );
}
