import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function IniciarSesion({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bibliotecav2.onrender.com/api/iniciar_sesion",
        { email, password }
      );

      if (response.status === 200) {
        onLogin(email); // Pasar el correo del usuario al componente App
        navigate("/"); // Redirigir al inicio
      }
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="iniciar-sesion">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default IniciarSesion;