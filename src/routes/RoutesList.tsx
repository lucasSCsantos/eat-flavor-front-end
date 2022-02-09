import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import User from '../pages/User';
import Register from '../pages/Register';
import Products from '../pages/Products';
import OrderTrack from '../pages/OrderTrack';
import Orders from '../pages/Orders';
import AdminOrders from '../pages/AdminOrders';
import Admin from '../pages/Admin';
import AdminOrderTrack from '../pages/AdminOrderTrack';

function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<User />}>
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path=":order/track" element={<OrderTrack />} />
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="orders" element={<AdminOrders />} />
        <Route path=":order/track" element={<AdminOrderTrack />} />
      </Route>
    </Routes>
  );
}

export default RoutesList;
