import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/Login.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");
      } else {
        setError("No se recibió token");
      }
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
  <div className="login-container">
    <div className="login-box">
      <h1>Iniciar Sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  </div>
  );
};

export default Login;
