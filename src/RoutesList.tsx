import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" />
      <Route path="/orders" />
      <Route path="/admin/orders" />
      <Route path="/admin/:order/track" />
      <Route path="/orders" />
    </Routes>
  );
}

export default RoutesList;
