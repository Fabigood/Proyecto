import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import CustomerProfile from "../views/CustomerProfile";
import CustomerUpdate from "../views/CustomerUpdate";
import ProductList from "../views/ProductList";
import ProductDetail from "../views/ProductDetail";
import OrderList from "../views/OrderList";
import OrderDetail from "../views/OrderDetail"; 
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />

    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />

    <Route
      path="/customers"
      element={
        <PrivateRoute>
          <CustomerProfile />
        </PrivateRoute>
      }
    />
    <Route
      path="/customers/update"
      element={
        <PrivateRoute>
          <CustomerUpdate />
        </PrivateRoute>
      }
    />

    <Route
      path="/products"
      element={
        <PrivateRoute>
          <ProductList />
        </PrivateRoute>
      }
    />
    <Route
      path="/products/:id"
      element={
        <PrivateRoute>
          <ProductDetail />
        </PrivateRoute>
      }
    />

    <Route
      path="/orders"
      element={
        <PrivateRoute>
          <OrderList />
        </PrivateRoute>
      }
    />
    <Route
      path="/orders/:id"
      element={
        <PrivateRoute>
          <OrderDetail />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRouter;