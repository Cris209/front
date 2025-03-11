import React from "react";

function Libros({ books, showDescriptions, setShowDescriptions, user }) {
  if (!books || !Array.isArray(books)) {
    return <p>No hay libros disponibles.</p>;
  }

  // Función para alternar la visibilidad de la descripción de un libro específico
  const toggleDescription = (id) => {
    setShowDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id], // Cambia el estado solo para el libro con el ID correspondiente
    }));
  };

  return (
    <div>
      <h2>Libros Disponibles</h2>
      <div className="libros-container">
        {books.map((libro) => (
          <div key={libro.id} className="libro-card">
            <img src={libro.imagen} alt={libro.titulo} />
            <h3>{libro.titulo}</h3>
            <p><strong>Autores:</strong> {libro.autores.join(", ")}</p>
            {showDescriptions[libro.id] ? ( // Verifica si la descripción de este libro está visible
              <>
                <p className="descripcion visible">
                  <strong>Descripción:</strong> {libro.descripcion}
                </p>
                <button
                  onClick={() => toggleDescription(libro.id)} // Alternar la descripción de este libro
                  className="ver-descripcion-btn"
                >
                  Ocultar descripción
                </button>
              </>
            ) : (
              <button
                onClick={() => toggleDescription(libro.id)} // Alternar la descripción de este libro
                className="ver-descripcion-btn"
              >
                Ver descripción
              </button>
            )}
            {user && ( // Solo muestra el enlace "Ver más" si el usuario ha iniciado sesión
              <a href={libro.link} target="_blank" rel="noopener noreferrer">
                Ver más
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Libros;