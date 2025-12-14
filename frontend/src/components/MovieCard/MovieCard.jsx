import React from "react";
import "./MovieCard.css";

export default function MovieCard({
  movie,
  onViewMore,
  onDelete,
  onToggleWatched,
  showActions = false,
}) {

  return (

    <div className={`movie-card movie-card--${movie.status}`}>
      <div className="movie-card__image-container">
        <img
          src={movie.image}
          alt={movie.title}
          className="movie-card__image"
        />
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">
          {movie.type === "movies"
            ? movie.releaseYear
            : movie.endYear && movie.endYear !== "En emisión"
              ? `${movie.releaseYear} - ${movie.endYear}`
              : `${movie.releaseYear} - presente`}
        </p>
        <p className="movie-card__platform">
          Disponible en <strong>{movie.platform}</strong>
        </p>
        

        <div className="movie-card__genres">
          {Array.isArray(movie.genres)
            ? movie.genres.map((genre) => (
              <span key={genre} className="movie-card__genre-tag">
                {genre}
              </span>
            ))
            : <span className="movie-card__genre-tag">{movie.genre}</span>}
        </div>

        <p className="movie-card__type">
          {movie.type === "movies" ? "Película" : "Serie"}
        </p>

      </div>
      {onViewMore && (
        <button className="movie-card__button" onClick={() => onViewMore(movie)}>
          Ver más
        </button>
      )}

      {showActions && (
        <>
          <div className="movie-card__actions">
            <button
              className="movie-card__action-btn"
              onClick={() => onToggleWatched(movie.externalId)}
            >
              {movie.status === "pendiente" && "Marcar como viendo"}
              {movie.status === "viendo" && "Marcar como vista"}
              {movie.status === "vista" && "Restablecer"}
            </button>

            <button
              className="movie-card__action-btn movie-card__action-btn--delete"
              onClick={() => onDelete(movie.externalId)}
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
