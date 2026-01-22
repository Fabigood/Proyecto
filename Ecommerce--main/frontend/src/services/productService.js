import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/api/v1/products");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/api/v1/products/${id}`);
  return res.data;
};
