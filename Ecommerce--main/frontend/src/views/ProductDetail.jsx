import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(id).then(setProduct).catch(() => setError("No se encontró el producto"));
  }, [id]);

  if (error) return <div className="product-alert error">{error}</div>;
  if (!product) return <div className="loading-state">Cargando...</div>;

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>
      <div className="product-card">
        <header className="product-header">
          <span className="sku-badge">{product.sku}</span>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price-tag">${product.price.toFixed(2)}</div>
        </header>
        <div className="product-grid">
          <section className="info-main">
            <h3>Descripción</h3>
            <p>{product.description}</p>
          </section>
          <section className="info-stats">
            <div className="stat-item">
              <label>Stock</label>
              <span className={`stat-value ${product.stock < 10 ? "low-stock" : ""}`}>{product.stock}</span>
            </div>
            <div className="stat-item">
              <label>Estado</label>
              <span className={`status-pill ${product.status.toLowerCase()}`}>{product.status}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;