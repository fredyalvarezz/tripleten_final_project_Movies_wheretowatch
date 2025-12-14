import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard.jsx";
import "./MovieCardList.css"; 

export default function MovieCardList({
  items = [],
  onViewMore,
  onDelete,
  onToggleWatched,
  showActions 
}) {
  // Mostrar solo 3 al inicio
  const [visible, setVisible] = useState(3);

  // Cuando cambien los items (por ejemplo una nueva búsqueda)
  useEffect(() => {
    setVisible(3); // Resetear a 3 resultados al cambiar los items
  }, [items]);

  // Items que se muestran actualmente
  const visibleItems = items.slice(0, visible);

  return (
    <>
      <div className="movie-card-list">
        {visibleItems.map((item) => (
          <MovieCard
            key={item.id}
            movie={item}
            onViewMore={onViewMore}
            onDelete={onDelete}
            onToggleWatched={onToggleWatched}
            showActions={showActions}
          />
        ))}
      </div>

      {visible < items.length && (
        <div className="movie-card-list-show-more">
          <button
            className="movie-card-list-show-more-button"
            onClick={() => setVisible((prev) => prev + 3)}
          >
            Mostrar más
          </button>
        </div>
      )}
    </>
  );
}
