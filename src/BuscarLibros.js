import React, { useState } from "react";

function BuscarLibros({ searchQuery, setSearchQuery, handleSearch, loading }) {
  const [searchType, setSearchType] = useState("titulo"); // Estado para el tipo de búsqueda

  return (
    <div className="buscar-libros">
      <h2>Buscar Libros</h2>
      <form onSubmit={handleSearch}>
        <div className="search-container">
          <input
            type="text"
            placeholder={`Buscar por ${searchType === "titulo" ? "título" : "autor"}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-type-dropdown"
          >
            <option value="titulo">Título</option>
            <option value="autor">Autor</option>
          </select>
        </div>
        <button type="submit" className={loading ? "loading" : ""}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
    </div>
  );
}

export default BuscarLibros;