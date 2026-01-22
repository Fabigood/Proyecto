import React from "react";
import { useCustomer } from "../hooks/useCustomer";
import "../styles/Tables.css";

const CustomerProfile = () => {
  const { customers, error } = useCustomer();

  if (error) return <div className="alert-error">⚠️ {error}</div>;
  if (!customers || customers.length === 0) return <div className="alert-empty">No hay clientes registrados.</div>;

  return (
    <div className="customer-page">
      <div className="page-header">
        <div>
          <h1>Clientes</h1>
          <p className="subtitle">Gestiona y visualiza la información de tus compradores</p>
        </div>
        <div className="stats-pill">Total: {customers.length}</div>
      </div>

      <div className="table-card">
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Ubicación</th>
                <th>Tipo</th>
                <th className="text-center">Estado</th>
                <th className="text-right">Dto.</th>
                <th>Registro</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td className="col-code"><span>{c.customerCode}</span></td>
                  <td className="col-main">
                    <div className="name">{c.name}</div>
                    <div className="sub">{c.email}</div>
                  </td>
                  <td className="col-contact">{c.phone}</td>
                  <td className="col-address">{c.address}</td>
                  <td><span className={`tag-type ${c.customerType.toLowerCase()}`}>{c.customerType}</span></td>
                  <td className="text-center">
                    <span className={`status-indicator ${c.active ? "is-active" : "is-inactive"}`}>
                      {c.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="text-right font-bold text-blue">{(c.discount * 100).toFixed(0)}%</td>
                  <td className="col-date">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;