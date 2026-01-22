import { useState, useEffect } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/v1/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (!res.ok) throw new Error("Error al crear producto");
      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (!res.ok) throw new Error("Error al actualizar producto");

      let updatedProduct = null;
      try {
        updatedProduct = await res.json();
      } catch {
        await fetchProducts(); 
        return null;
      }

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );

      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProductStock = async (id, quantity, operation = "ADD") => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/products/${id}/stock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity, operation })
      });
      if (!res.ok) throw new Error("Error al actualizar stock");

      const updatedProduct = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );

      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    updateProductStock
  };
}
