import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ModalEditProfile.css";
import mainApi from "../../utils/MainApi"; // Asegúrate de tener funciones para updateUser

export default function ModalEditProfile({
  isOpen,
  onClose,
  userData,
  onUpdateUserInfo,
  onChangeAvatar
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  // Inicializa el formulario cuando se abre el modal
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setAvatar(userData.avatar || "https://i.pravatar.cc/150");
      setPassword(""); // Nunca mostramos la contraseña
    }
  }, [userData, isOpen]);

  // Actualizar y guardar la foto de perfil
  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        onChangeAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Maneja el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Llamada al backend para actualizar usuario
      const updatedUser = await mainApi.updateUser({
        name,
        email,
        password: password || undefined, // si no cambió la contraseña, no se envía
        avatar
      });

      onUpdateUserInfo(updatedUser);
      onClose();
    } catch (err) {
      console.error("Error actualizando usuario:", err);
      alert("Error al actualizar perfil");
    }
  }

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <div className="edit-profile">
        <img
          src={avatar}
          alt="Profile"
          className="edit-profile__avatar"
        />
        <form className="edit-profile__form" onSubmit={handleSubmit}>
          <h2 className="edit-profile__title">Editar perfil</h2>

          <label className="edit-profile__label">Cambiar foto de perfil</label>
          <input type="file" className="edit-profile__input" onChange={handleAvatarChange} />

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
            placeholder="••••••••"
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
