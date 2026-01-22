import { useState } from "react";
import { login } from "../services/authService";

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const authenticate = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(username, password); // devuelve tokens y más info
      setLoading(false);
      return data; // devolvemos el objeto con access_token
    } catch (err) {
      console.error("AUTH ERROR:", err);
      setError("Credenciales inválidas o error de conexión");
      setLoading(false);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  };

  return { authenticate, logout, error, loading };
};
