import React, { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";
import { Link } from "react-router-dom";
import "../styles/OrderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setError("Error al obtener órdenes"));
  }, []);

  if (error) return <div className="alert-error">⚠️ {error}</div>;
  if (!orders || orders.length === 0) return <div className="alert-empty">No hay órdenes registradas.</div>;

  return (
    <div className="order-page">
      <div className="page-header">
        <div>
          <h1>Gestión de Órdenes</h1>
          <p className="subtitle">Monitorea el estado de ventas y facturación</p>
        </div>
        <div className="stats-pill">Total: {orders.length} Pedidos</div>
      </div>

      <div className="table-card">
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Cliente</th>
                <th className="text-right">Subtotal</th>
                <th className="text-right">Descuento</th>
                <th className="text-right">Total</th>
                <th className="text-center">Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="col-code"><span>#{o.orderNumber}</span></td>
                  <td className="col-main">
                    <div className="name">{o.customerName}</div>
                  </td>
                  <td className="text-right text-slate-500">${o.subtotal.toFixed(2)}</td>
                  <td className="text-right text-red-500">-${o.discount.toFixed(2)}</td>
                  <td className="text-right font-bold text-slate-900">${o.total.toFixed(2)}</td>
                  <td className="text-center">
                    <span className={`status-badge ${o.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <Link to={`/orders/${o.id}`} className="btn-detail">
                      Ver detalle
                    </Link>
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

export default OrderList;