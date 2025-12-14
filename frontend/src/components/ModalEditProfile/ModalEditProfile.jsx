import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ModalEditProfile.css";

export default function ModalEditProfile({
  isOpen,
  onClose,
  userData,
  onUpdateUserInfo
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  // Inicializa el formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen && userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setAvatar(userData.avatar || "https://i.pravatar.cc/150");
      setPassword("");
    }
  }, [userData, isOpen]);

  // Maneja el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();

    const updatedData = {
      name,
      email,
      avatar   
    };

    if (password.trim()) {
      updatedData.password = password;
    }

    onUpdateUserInfo(updatedData);
    onClose();
  }

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <div className="edit-profile">
        <img
          src={avatar || "https://i.pravatar.cc/150"}
          alt="Profile"
          className="edit-profile__avatar"
        />

        <form className="edit-profile__form" onSubmit={handleSubmit}>
          <h2 className="edit-profile__title">Editar perfil</h2>

          <label className="edit-profile__label">URL de la foto de perfil</label>
          <input
            type="url"
            className="edit-profile__input"
            placeholder="Pega aquí una URL de imagen válida"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <label className="edit-profile__label">Nombre de usuario</label>
          <input
            type="text"
            className="edit-profile__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="edit-profile__label">Correo electrónico</label>
          <input
            type="email"
            className="edit-profile__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="edit-profile__label">Contraseña</label>
          <input
            type="password"
            className="edit-profile__input"
            placeholder="(opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="edit-profile__button">
            Guardar cambios
          </button>
        </form>
      </div>
    </ModalWithForm>
  );
}
