import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import "../styles/OrderDetail.css";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getOrderById(id)
        .then(setOrder)
        .catch(() => setError("Error al obtener la orden"));
    }
  }, [id]);

  if (error) return <div className="order-alert error">⚠️ {error}</div>;
  if (!order) return <div className="loading-state">Cargando detalles del pedido...</div>;

  return (
    <div className="order-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Volver a Órdenes</button>

      <div className="order-grid">
        {/* Lado Izquierdo: Información General e Items */}
        <div className="order-main-info">
          <div className="detail-card">
            <header className="card-header">
              <span className="order-number-badge">Orden #{order.orderNumber}</span>
              <span className={`status-pill ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {order.status}
              </span>
            </header>
            
            <div className="customer-info">
              <h3>Cliente</h3>
              <p className="customer-name">{order.customerName}</p>
              <p className="order-date">Realizada el {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="order-items-section">
              <h3>Resumen de Productos</h3>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cant.</th>
                    <th className="text-right">Unitario</th>
                    <th className="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="text-right font-semibold">${item.lineTotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="detail-card mt-4">
            <h3>Historial de Pagos</h3>
            {order.payments.length > 0 ? (
              <div className="payments-list">
                {order.payments.map((p) => (
                  <div key={p.id} className="payment-row">
                    <div className="payment-meta">
                      <span className="method">{p.paymentMethod}</span>
                      <span className="date">{new Date(p.paymentDate).toLocaleDateString()}</span>
                    </div>
                    <span className="amount">${p.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-msg">No se han registrado pagos para esta orden.</p>
            )}
          </div>
        </div>

        {/* Lado Derecho: Resumen de Totales */}
        <aside className="order-summary">
          <div className="detail-card summary-card">
            <h3>Resumen Financiero</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row discount">
              <span>Descuento</span>
              <span>-${order.discount.toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            
            <div className="payment-status-box">
              <div className="summary-row paid">
                <span>Pagado</span>
                <span>${order.totalPaid.toFixed(2)}</span>
              </div>
              <div className={`summary-row pending ${order.pendingAmount > 0 ? 'has-debt' : ''}`}>
                <span>Pendiente</span>
                <span>${order.pendingAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="notes-box">
              <h4>Notas</h4>
              <p>{order.notes || "Sin observaciones adicionales."}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderDetail;