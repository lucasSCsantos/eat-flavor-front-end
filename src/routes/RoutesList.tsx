import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import User from '../pages/User';
import Register from '../pages/Register';
import Products from '../pages/Products';
import OrderTrack from '../pages/OrderTrack';

function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<User />}>
        <Route path="products" element={<Products />} />
        <Route path="orders" />
        <Route path=":order/track" element={<OrderTrack />} />
      </Route>
      <Route path="/admin/orders" />
      <Route path="/admin/:order/track" />
    </Routes>
  );
}

export default RoutesList;
