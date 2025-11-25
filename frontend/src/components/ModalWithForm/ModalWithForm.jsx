import React, { useEffect } from "react";
import "./ModalWithForm.css";

export default function ModalWithForm({ isOpen, onClose, title, children }) {
  
  // Cierra con tecla Escape
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  // Cierra con clic fuera
  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal")) onClose();
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container-all">
        <button
          aria-label="Cerrar ventana modal"
          className="modal__close-button"
          type="button"
          onClick={onClose}
        >
          X
        </button>

        <div className="modal__container">
          {title && <h3 className="modal__container-text">{title}</h3>}
          {children}
        </div>
      </div>
    </div>
  );
}
