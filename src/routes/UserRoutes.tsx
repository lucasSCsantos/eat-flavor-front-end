import { Route } from 'react-router';
import Login from '../pages/Login';

function UserRoutes() {
  return (
    <>
      <Route path="products" element={<Login />} />
      <Route path="orders" />
      <Route path=":order/track" />
    </>
  );
}

export default UserRoutes;
