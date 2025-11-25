import React, { useEffect } from "react";
import "./ModalNotification.css";

export default function ModalNotification({ isOpen, message, type, onClose }) {
  
  // Auto cierre después de 2.5s
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => onClose(), 1000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modalNotification__content">

        {/* Icono según el tipo */}
        <div className={`modalNotification__icon ${type}`}>
          {type === "success" && "✔"}
          {type === "error" && "✖"}
          {type === "warning" && "!"}
        </div>

        <p className="modalNotification__message">{message}</p>
      </div>
    </div>
  );
}
