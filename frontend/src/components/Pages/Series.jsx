import React, { useState } from "react";
import MovieCardList from "../MovieCardList/MovieCardList";
import SearchForm from "../SearchForm/SearchForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Content.css";
import "../Main/Main.css";

export default function Series({
  series,
  onViewMore,
  setIsLoading,
  setIsSearching,
  onAddToMyWatchList
}) {
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (data) => {
    const onlySeries =  data.filter(i => i.type === "series");
    setSearchResults(onlySeries);
  };

  return (
    <section className="content content--with-header">
      <h1 className="content__title">Series</h1>

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

      {/* Lista principal de series */}
      {series.length > 0 ? (
        <section className="content main-section-movies">
          <h2 className="main-section-movies__title">Series populares</h2>
          <MovieCardList
            items={series}
            onViewMore={onViewMore}
            onAddToMyWatchList={onAddToMyWatchList}
          />
        </section>
      ) : (
        <p>No hay series disponibles.</p>
      )}
    </section>
  );
}
