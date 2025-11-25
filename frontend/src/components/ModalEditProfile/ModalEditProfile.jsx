import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ModalEditProfile.css";

export default function ModalEditProfile({
  isOpen,
  onClose,
  userData,
  onUpdateUserInfo,
  onChangeAvatar
}) {

  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(userData.avatar);

  // Actualizar y guardar la foto de perfil
  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Aquí podrías usar alguna librería para subir la imagen o convertirla en base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);  // Actualiza la foto de perfil con la imagen cargada
        onChangeAvatar(reader.result);  // Llama a la función para cambiarla en el estado global
      };
      reader.readAsDataURL(file);
    }
  }

  // Maneja el envío del formulario
  function handleSubmit(e) {
    e.preventDefault();
    const updatedUser = {
      email,
      password,
      avatar
    };
    onUpdateUserInfo(updatedUser);  // Llama a la función para actualizar la información del usuario
    onClose();  // Cierra el modal
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


          {/* <label className="edit-profile__label">Nombre de usuario</label>
          <input type="text" className="edit-profile__input" placeholder="Nombre" /> */}

          <label className="edit-profile__label">Correo electrónico</label>
          <input type="email" className="edit-profile__input" placeholder="tucorreo@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className="edit-profile__label">Contraseña</label>
          <input type="password" className="edit-profile__input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="edit-profile__button">
            Guardar cambios
          </button>
        </form>
      </div>
    </ModalWithForm>
  );
}
