import React, { useState } from "react";
import MovieCardList from "../MovieCardList/MovieCardList";
import SearchForm from "../SearchForm/SearchForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Content.css";
import "../Main/Main.css";

export default function Movies({
  movies,
  onViewMore,
  setIsLoading,
  setIsSearching,
  onAddToMyWatchList
}) {
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (data) => {
    const onlyMovies = data.filter(i => i.type === "movies");
    setSearchResults(onlyMovies);
  };

  return (
    <section className="content content--with-header">
      <h1 className="content__title">Películas</h1>

      {/* Buscador */}
      <SearchForm
        setIsLoading={setIsLoading}
        setError={setError}
        onResults={handleSearchResults}
        setIsSearching={setIsSearching}
        error={error}

      />
      <ErrorMessage message={error} />

      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <section className="content-result">
          <h2 className="main-section-movies__title">Resultados de la búsqueda</h2>
          <MovieCardList
            items={searchResults}
            onViewMore={onViewMore}
            onAddToMyWatchList={onAddToMyWatchList}
          />
        </section>
      )}

      {/* Lista principal de películas */}
      {movies.length > 0 ? (
        <section className="content main-section-movies">
          <h2 className="main-section-movies__title">Películas populares</h2>
          <MovieCardList
            items={movies}
            onViewMore={onViewMore}
            onAddToMyWatchList={onAddToMyWatchList}
          />
        </section>
      ) : (
        <p>No hay películas disponibles.</p>
      )}
    </section>
  );
}
