import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MovieCard from "../MovieCard/MovieCard";
import "../MovieCard/MovieCard.css";
import "../MovieCardList/MovieCardList.css";
import "./Content.css";

export default function MyWatchList({
  items,
  onToggleSeen,
  onDelete,
  setIsLoading
}) {

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  // Busqueda Local
 function localSearch(q) {
    const qLower = q.toLowerCase();
    return items.filter(item =>
      item.title.toLowerCase().includes(qLower)
    );
  }

  // Función reutilizable para renderizar una sección
  function renderSection(title, list) {
    return (
      <>
        <h2 className="section-title">{title}</h2>
        <div className="movie-card-list">
          {list.length === 0 ? (
            <p>No hay elementos aquí.</p>
          ) : (
            list.map(item => (
              <MovieCard
                key={item.id}
                movie={item}
                showActions={true}
                onToggleWatched={onToggleSeen}
                onDelete={() => onDelete(item.id)}
              />
            ))
          )}
          
        </div>
            <p className="content-separation">=</p>
      </>
    );
  }

  // Clasificación por tipo
  const movies = items.filter(i => i.type === "movies");
  const series = items.filter(i => i.type === "series");

  // Películas
  const pendingMovies = movies.filter(i => i.status === "pendiente");
  const watchingMovies = movies.filter(i => i.status === "viendo");
  const finishedMovies = movies.filter(i => i.status === "vista");

  // Series
  const pendingSeries = series.filter(i => i.status === "pendiente");
  const watchingSeries = series.filter(i => i.status === "viendo");
  const finishedSeries = series.filter(i => i.status === "vista");

  return (
    <section className="content content--with-header">
      <h1 className="content__title">Mi Lista</h1>

      <SearchForm 
        setIsLoading={setIsLoading} 
        setError={setError}
        onResults={setSearchResults}
        error={error}
        localSearch={localSearch}
        /> 

        {/* Resultados de busqueda*/}
        {searchResults.length > 0 && (
          <section className="content-result">
          <h2 className="section-title">Resultados encontrados</h2>

          <div className="movie-card-list">
            {searchResults.map(item => (
              <MovieCard
                key={item.id}
                movie={item}
                showActions={true}
                onToggleWatched={onToggleSeen}
                onDelete={() => onDelete(item.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Si no hay búsqueda se muestra la lista normal */}
      {searchResults.length === 0 && (
        <>
      {/* Películas */}
      {renderSection("Películas no vistas", pendingMovies)}
      {renderSection("Películas viendo", watchingMovies)}
      {renderSection("Películas vistas", finishedMovies)}

      {/* Series */}
      {renderSection("Series no vistas", pendingSeries)}
      {renderSection("Series viendo", watchingSeries)}
      {renderSection("Series vistas", finishedSeries)}
      </>
      )}
    </section>
  );
}