import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registrarse() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bibliotecav2.onrender.com/api/registrarse",
        { email, password }
      );

      if (response.status === 201) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        navigate("/iniciar-sesion"); // Redirige a la página de inicio de sesión
      }
    } catch (error) {
      setError("Error al registrarse. Intenta nuevamente.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="registrarse">
      <h2>Registrarse</h2>
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
        <button type="submit">Registrarse</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Registrarse;