import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import "../styles/Dashboard.css";

import CustomerProfile from "./CustomerProfile";
import ProductList from "./ProductList";
import OrderList from "./OrderList";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' o 'create'

  const titles = {
    customers: "Gestión de Clientes",
    products: editingProduct ? "Editando Producto" : viewMode === "create" ? "Nuevo Producto" : "Catálogo de Productos",
    orders: "Historial de Órdenes",
  };

  // Función para limpiar estados al cambiar de pestaña
  const changeTab = (tab) => {
    setActiveTab(tab);
    setEditingProduct(null);
    setViewMode("list");
  };

  return (
    <MainLayout>
      <div className="dashboard-container">
        <div className="dashboard-header-flex">
          <h2 className="dashboard-header">{titles[activeTab]}</h2>
          
          {/* Botón dinámico para Crear Producto */}
          {activeTab === "products" && viewMode === "list" && !editingProduct && (
            <button className="btn-primary" onClick={() => setViewMode("create")}>
              + Añadir Producto
            </button>
          )}
        </div>

        <div className="dashboard-tabs">
          <button className={`tab ${activeTab === "customers" ? "active" : ""}`} onClick={() => changeTab("customers")}>
            Clientes
          </button>
          <button className={`tab ${activeTab === "products" ? "active" : ""}`} onClick={() => changeTab("products")}>
            Productos
          </button>
          <button className={`tab ${activeTab === "orders" ? "active" : ""}`} onClick={() => changeTab("orders")}>
            Órdenes
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === "customers" && <CustomerProfile />}
          
          {activeTab === "products" && (
            <div className="animate-fade-in">
              {/* Lógica de vistas: Prioridad Editar > Crear > Lista */}
              {editingProduct ? (
                <ProductEdit 
                  product={editingProduct} 
                  onClose={() => setEditingProduct(null)} 
                />
              ) : viewMode === "create" ? (
                <ProductCreate onCancel={() => setViewMode("list")} />
              ) : (
                <ProductList onEdit={setEditingProduct} />
              )}
            </div>
          )}

          {activeTab === "orders" && <OrderList />}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;