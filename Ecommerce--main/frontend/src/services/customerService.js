import api from "./api";

export const getCustomers = async () => {
  const res = await api.get("/api/v1/customers"); 
  return res.data;
};
