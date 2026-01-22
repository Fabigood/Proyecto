import { useState } from "react";
import useProducts from "../hooks/useProducts";
import "../styles/ProductCreate.css";

export default function ProductCreate({ onCancel }) {
  const { createProduct, fetchProducts } = useProducts();
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "ELECTRONICS",
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      if (fetchProducts) await fetchProducts();
      
      alert(`Producto "${formData.name}" creado con éxito`);
      
      // Cerramos el formulario y volvemos a la lista
      if (onCancel) onCancel();
    } catch (err) {
      alert("❌ Error al crear producto: " + err.message);
    }
  };

  return (
    <div className="create-product-container animate-fade-in">
      <div className="form-card">
        <form onSubmit={handleSubmit} className="modern-form">
          <div className="form-grid">
            {/* Sección: Identificación básica */}
            <div className="form-group">
              <label>SKU (Código de Referencia)</label>
              <input 
                name="sku" 
                placeholder="Ej: LAP-DELL-01" 
                value={formData.sku} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Nombre Comercial</label>
              <input 
                name="name" 
                placeholder="Ej: Laptop Dell Inspiron" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Sección: Valores numéricos */}
            <div className="form-group">
              <label>Precio de Venta ($)</label>
              <input 
                name="price" 
                type="number" 
                step="0.01" 
                min="0"
                value={formData.price} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Stock Inicial</label>
              <input 
                name="stock" 
                type="number" 
                min="0"
                value={formData.stock} 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Sección: Clasificación */}
            <div className="form-group">
              <label>Categoría</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="ELECTRONICS">Electrónica</option>
                <option value="BOOKS">Libros</option>
                <option value="CLOTHING">Ropa</option>
                <option value="HOME">Hogar</option>
              </select>
            </div>

            <div className="form-group">
              <label>URL de la Imagen</label>
              <input 
                name="imageUrl" 
                placeholder="https://link-a-tu-imagen.jpg" 
                value={formData.imageUrl} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Descripción del Producto</label>
            <textarea 
              name="description" 
              rows="4" 
              placeholder="Escribe aquí las especificaciones técnicas o detalles del producto..." 
              value={formData.description} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={onCancel}
            >
              Cancelar y Volver
            </button>
            <button type="submit" className="btn-submit">
              Registrar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}