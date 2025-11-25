import React, { useState } from "react";
import apiMovies from "../../utils/StreamWhereApi";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./SearchForm.css";

export default function SearchForm({
  setIsLoading,
  setError,
  onResults,
  setIsSearching,
  error,
  localSearch
}) {

  const [query, setQuery] = useState("");

  // Función principal de búsqueda
  async function handleSearch(q) {
    if (!q.trim()) {
      onResults([]);
      return;
    }
    setError?.(null);
    setIsSearching?.(true);
    setIsLoading?.(true);

    try {
      // Busqueda local para mywatchlist
      if (localSearch) {
        const results = localSearch(q);
        onResults(results);
        return;
      }

      // Revisar cache localStorage
      const cached = localStorage.getItem(`search_${q}`);
      if (cached) {
        const data = JSON.parse(cached);
        onResults(data);
        return;
      }

      // Si no hay cache, llamar a la API
      const data = await apiMovies.search(q);

      // Guardar en cache localStorage
      localStorage.setItem(`search_${q}`, JSON.stringify(data));

      onResults(data);
    } catch (err) {
      console.error(err);
      setError?.("Lo sentimos, algo salió mal durante la búsqueda.");
      onResults([]);
    } finally {
      setIsSearching?.(false);
      setIsLoading?.(false);
    }
  }

  // Maneja envío del formulario al presionar Enter o el botón
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Por favor escribe un título");
      return;
    }

    await handleSearch(query.trim());
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);

            // Si el usuario elimina se limpian resultados
            if (value.trim() === "") {
              onResults([]);        // eliminar resultados
              setError?.(null);     // eliminar error
            }
          }}
          className="search__input"
          placeholder="Buscar películas o series..."
        />
        <button type="submit" className="search__button">
          Buscar
        </button>
      </form>

      <ErrorMessage message={error} />
    </section>
  );
}
