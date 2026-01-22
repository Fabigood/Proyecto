// src/hooks/useCustomer.js
import { useState, useEffect } from "react";
import { getCustomers } from "../services/customerService";

export const useCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch(() => setError("Error al obtener clientes"));
  }, []);

  return { customers, error };
};
