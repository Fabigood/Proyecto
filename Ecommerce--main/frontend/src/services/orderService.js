import api from "./api";

export const getOrders = async () => {
  const res = await api.get("/api/v1/orders");
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await api.get(`/api/v1/orders/${id}`);
  return res.data;
};
