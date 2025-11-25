import "./Preloader.css";

export default function Preloader({ hidden = false }) {
  return (
    <div className={`preloader ${hidden ? "preloader--hidden" : ""}`}>
      <div className="preloader__spinner"></div>
      <p className="preloader__text">Cargando...</p>
    </div>
  );
}