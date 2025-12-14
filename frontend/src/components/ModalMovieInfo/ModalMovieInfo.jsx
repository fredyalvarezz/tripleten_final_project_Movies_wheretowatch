import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ModalNotification from "../ModalNotification/ModalNotification";
import "./ModalMovieInfo.css";
import { useNavigate } from "react-router-dom";

export default function ModalMovieInfo({
  movie,
  isOpen,
  onClose,
  onAddToMyWatchList,
  isLoggedIn,
  showNotification,
  setPendingMovie
}) {

  const navigate = useNavigate();

  if (!movie) return null;

  const handleAddToWatchList = () => {
    if (!isLoggedIn) {
      onClose();
      setPendingMovie(movie);
      navigate("/login");
      return;
    }

    onAddToMyWatchList(movie);
    onClose();
  };

  return (
    <ModalWithForm isOpen={isOpen} onClose={onClose}>
      <div className="modal-info__container-all">
        <img src={movie.image} alt={movie.title} className="modal-info__image" />

        <div className="modal-info__container">
          <h2 className="modal-info__title">{movie.title}</h2>

          <div className="Modal-info-type-genre">
            <span className="modal-info-type">
              {movie.type === "movies" ? "Película" : "Serie"}
            </span>

            {Array.isArray(movie.genres)
              ? movie.genres.map(g => (
                <span key={g} className="modal-info-tag">{g}</span>
              ))
              : movie.genre && (
                <span className="modal-info-tag">{movie.genre}</span>
              )
            }
          </div>

          <h3 className="modal-info__subtitle">Sinopsis</h3>
          <p className="modal-info__description">{movie.description}</p>

          <div className="modal-info__buttons">
            <button
              className="modal-info__button"
              onClick={handleAddToWatchList}
            >
              {isLoggedIn ? "Agregar a mi lista" : "Iniciar sesión para agregar"}
            </button>
          </div>
        </div>
      </div>
    </ModalWithForm >
  );
}
