import React from "react";
import MovieCardList from "../MovieCardList/MovieCardList";
import "../MovieCardList/MovieCardList.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import "../Pages/Content.css";
import "./Main.css";

export default function Main({
  movies,
  series,
  searchResults,
  onResults,
  onViewMore,
  setIsLoading,
  setIsSearching,
  onAddToMyWatchList
}) {

  const trending = [
  ...movies,
  ...series
];

  const [error, setError] = React.useState("");

  return (
    <main className="main">

      <section className="main-banner">
        <div className="main-banner__content">
          <h1 className="main-banner__title">Descubre tu próxima película favorita.</h1>
          <p className="main-banner__description">
            Encuentra en qué plataforma ver tus películas y series favoritas,
            conoce su sinopsis y agrégala a tu lista.
          </p>
        </div>
      </section>

      {/* Buscador */}
      <section className="main-search">
        <SearchForm
          setIsLoading={setIsLoading}
          setError={setError}
          onResults={onResults}
          setIsSearching={setIsSearching} 
          error={error}
          
        />

        {/* Resultados de búsqueda */}
        {searchResults.length > 0 && (
          <section className="results-section content">
            <h2 className="main-section-movies__title">Resultados de la búsqueda</h2>

            <MovieCardList
              items={searchResults}
              onViewMore={onViewMore}
              onAddToMyWatchList={onAddToMyWatchList}
            />
          </section>
        )}
      </section>

      {/* Tendencias */}
      <section className="content main-section-movies">
        <h2 className="main-section-movies__title">Tendencias</h2>

        <MovieCardList
          items={trending}
          onViewMore={onViewMore}
          onAddToMyWatchList={onAddToMyWatchList}
        />
      </section>

    </main>
  );
}
