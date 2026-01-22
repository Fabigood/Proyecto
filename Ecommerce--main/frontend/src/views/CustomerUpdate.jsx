import React from "react";
import MainLayout from "../components/MainLayout";

const CustomerUpdate = () => {
  return (
    <MainLayout>
      <h2>Actualizar Cliente</h2>
      <form>
        <input placeholder="Nombre" />
        <input placeholder="Email" />
        <button type="submit">Guardar</button>
      </form>
    </MainLayout>
  );
};

export default CustomerUpdate;
