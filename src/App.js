import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Libros from "./Libros";
import BuscarLibros from "./BuscarLibros";
import IniciarSesion from "./IniciarSesion";
import Registrarse from "./Registro";
import "./styles.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState({});
  const [user, setUser] = useState(null);
  const [searchType, setSearchType] = useState("titulo"); // Estado para el tipo de búsqueda

  // Recuperar la sesión del usuario al cargar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Cargar libros al montar el componente
  useEffect(() => {
    fetchBooks();
  }, []);

  // Función para obtener libros
  const fetchBooks = async (query = "", type = "titulo") => {
    setLoading(true);
    const url = query
      ? `https://bibliotecav2.onrender.com/api/buscar_libros?query=${query}&type=${type}`
      : "https://bibliotecav2.onrender.com/api/libros";
    try {
      const response = await axios.get(url);
      setBooks(response.data.resultados || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  // Manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery, searchType);
  };

  // Función para manejar el inicio de sesión
  const handleLogin = (email) => {
    const userData = { email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BuscarLibros
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                  loading={loading}
                  searchType={searchType}
                  setSearchType={setSearchType}
                />
                <Libros
                  books={books}
                  showDescriptions={showDescriptions}
                  setShowDescriptions={setShowDescriptions}
                  user={user}
                />
              </>
            }
          />
          <Route
            path="/iniciar-sesion"
            element={<IniciarSesion onLogin={handleLogin} />}
          />
          <Route path="/registrarse" element={<Registrarse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;