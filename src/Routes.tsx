import { Navigate, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" />
      <Route path="/register" />
      <Route path="/products" />
      <Route path="/orders" />
      <Route path="/admin/orders" />
      <Route path="/admin/:order/track" />
      <Route path="/orders" />
    </Routes>
  );
}

export default Router;
