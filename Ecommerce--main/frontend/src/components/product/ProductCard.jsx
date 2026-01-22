export default function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>
    </div>
  );
}
