import { useState, useEffect } from "react";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import "./styles.css";

export default function BookViewer() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState({});

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (query = "") => {
    setLoading(true);
    const url = query
      ? `https://bibliotecav2.onrender.com/api/buscar_libros?query=${query}`
      : "https://bibliotecav2.onrender.com/api/libros";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.resultados || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery);
  };

  const toggleDescription = (index) => {
    setShowDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Biblioteca</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Buscar libros..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <Card key={index} className="p-2">
            <img
              src={book.imagen}
              alt={book.titulo}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <CardContent>
              <h2 className="text-lg font-semibold">{book.titulo}</h2>
              {Array.isArray(book.autores) ? (
                <p className="text-sm">{book.autores.join(", ")}</p>
              ) : (
                <p className="text-sm">{book.autores}</p>
              )}
              <button
                className="text-blue-500 text-sm mt-2"
                onClick={() => toggleDescription(index)}
              >
                {showDescriptions[index] ? "Ocultar descripción" : "Ver descripción"}
              </button>
              {showDescriptions[index] && (
                <p className="text-xs text-gray-600 mt-2">{book.descripcion}</p>
              )}
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm mt-2 block"
              >
                Ver más
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
