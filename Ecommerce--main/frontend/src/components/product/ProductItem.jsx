import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div>
      <h4>{product.name}</h4>
      <Link to={`/products/${product.id}`}>Ver detalles</Link>
    </div>
  );
}
