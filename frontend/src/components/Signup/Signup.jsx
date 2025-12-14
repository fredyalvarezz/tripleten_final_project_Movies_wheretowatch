import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import MainApi from "../../utils/MainApi";

export default function Signup({ onSignup, showNotification }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
  const hasErrors = Object.values(errors).some(error => error);
  const hasEmptyFields = !name || !email || !password;
  setIsValid(!hasErrors && !hasEmptyFields);
}, [name, email, password, errors]);


  function handleGoToLogin() {
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Registrar usuario
      await MainApi.register({ name, email, password });

      // login automático después de registro
      const loginData = await MainApi.login({ email, password });
      localStorage.setItem("jwt", loginData.token);

    
      showNotification("Usuario registrado correctamente", "success");
      onSignup();

      navigate("/"); // Redirigir al inicio
    } catch (err) {
      showNotification(err.message || "Error al registrar usuario", "error");
    }
  }

  return (
    <div className="signup">
      <div className="signup__background"></div>

      <form className="signup__form" onSubmit={handleSubmit}>
        <h1 className="signup__title">StreamWhere</h1>
        <p className="signup__subtitle">Crea tu cuenta y prepara tu lista de películas.</p>

        <input
          type="text"
          className="signup__input"
          placeholder="Nombre de usuario"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({
              ...prev,
              name: e.target.value.length >= 2 ? "" : "El nombre debe tener al menos 2 caracteres",
            }));
          }}
        />
        {errors.name && <span className="signup__error">{errors.name}</span>}

        <input
          type="email"
          className="signup__input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({
              ...prev,
              email: e.target.validity.valid ? "" : "Correo inválido",
            }));
          }}
        />
        {errors.email && <span className="signup__error">{errors.email}</span>}

        <input
          type="password"
          className="signup__input"
          placeholder="Crea una contraseña segura"
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
        {errors.password && <span className="signup__error">{errors.password}</span>}

        <button
          type="submit"
          className={`signup__button ${!isValid ? "signup__button_disabled" : ""}`}
          disabled={!isValid}
        >
          Crear cuenta
        </button>


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
