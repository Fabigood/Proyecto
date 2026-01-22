import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Error al obtener productos"));
  }, []);

  if (error) return <div className="alert-error">⚠️ {error}</div>;
  if (!products.length) return <div className="alert-empty">No hay productos registrados.</div>;

  return (
    <div className="product-page">
      <div className="page-header">
        <div>
          <h1>Inventario de Productos</h1>
          <p className="subtitle">Control de existencias y catálogo</p>
        </div>
        <div className="stats-pill">Total: {products.length} Items</div>
      </div>

      <div className="table-card">
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th className="text-right">Precio</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="col-code"><span>{p.sku}</span></td>
                  <td className="col-main"><div className="name">{p.name}</div></td>
                  <td className="text-right font-bold">${p.price.toFixed(2)}</td>
                  <td className="text-center">
                    <span className={`stock-badge ${p.stock < 10 ? "low" : ""}`}>
                      {p.stock} uds.
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`status-indicator ${p.status === "AVAILABLE" ? "is-active" : "is-inactive"}`}>
                      {p.status === "AVAILABLE" ? "Disponible" : "No disponible"}
                    </span>
                  </td>
                  <td className="text-right actions-cell">
                    <button onClick={() => onEdit && onEdit(p)} className="btn-edit-inline">Editar</button>
                    <Link to={`/products/${p.id}`} className="btn-detail-inline">Ver detalle</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;