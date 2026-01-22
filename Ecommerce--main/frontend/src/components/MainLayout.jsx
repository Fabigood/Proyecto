// src/components/MainLayout.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/MainLayout.css";

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="layout-wrapper">
      <header className="main-header">
        <div className="header-container">
          <h1 className="logo">E-commerce</h1>
          <nav className="main-nav">
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
            <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>Productos</Link>
            <Link to="/customers" className={location.pathname === "/customers" ? "active" : ""}>Clientes</Link>
            <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""}>Órdenes</Link>
            <Link to="/login" className="logout-link">Salir</Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="main-footer">
        <p>© 2026 E-commerce Project — Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default MainLayout;