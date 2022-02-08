import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import UserRoutes from './routes/UserRoutes';

function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user">
        <Route path="products" element={<Login />} />
        <Route path="orders" />
        <Route path=":order/track" />
      </Route>
      <Route path="/admin/orders" />
      <Route path="/admin/:order/track" />
    </Routes>
  );
}

export default RoutesList;
