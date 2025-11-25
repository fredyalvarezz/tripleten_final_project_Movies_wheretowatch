import React from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p className="error-message">
      {message}
    </p>
  );
}