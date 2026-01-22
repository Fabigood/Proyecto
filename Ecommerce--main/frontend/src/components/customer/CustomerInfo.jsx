export default function CustomerInfo({ customer }) {
  return (
    <div>
      <h3>Perfil de Cliente</h3>
      <p>Nombre: {customer.name}</p>
      <p>Email: {customer.email}</p>
    </div>
  );
}
