import { useState } from "react";
import useProducts from "../hooks/useProducts";
import "../styles/ProductCreate.css"; 

export default function ProductEdit({ product, onClose }) {
  const { updateProduct, updateProductStock, fetchProducts } = useProducts();
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(formData.id, formData);
      await fetchProducts(); 
      alert("Producto actualizado con éxito");
      if (onClose) onClose();
    } catch (err) { alert("Error: " + err.message); }
  };

  const handleStockChange = async (operation) => {
    try {
      const updated = await updateProductStock(formData.id, 1, operation);
      setFormData(prev => ({ ...prev, stock: updated.stock }));
      await fetchProducts();
    } catch (err) { alert("Error de stock: " + err.message); }
  };

  return (
    <div className="form-card edit-mode">
      <h3>Editar Producto: {product.sku}</h3>
      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Nombre</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="ELECTRONICS">Electrónica</option>
              <option value="BOOKS">Libros</option>
              <option value="CLOTHING">Ropa</option>
            </select>
          </div>
          <div className="form-group">
            <label>Estado</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="AVAILABLE">Disponible</option>
              <option value="UNAVAILABLE">No disponible</option>
            </select>
          </div>
        </div>
        
        <div className="stock-quick-actions">
            <p>Stock actual: <strong>{formData.stock}</strong> uds.</p>
            <button type="button" className="btn-stock-add" onClick={() => handleStockChange("ADD")}>
                +
            </button>
            <button type="button" className="btn-stock-rem" onClick={() => handleStockChange("REMOVE")}>
                -
            </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">Guardar Cambios</button>
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
}