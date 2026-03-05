import { createHashRouter } from 'react-router';
import NotFound from '../views/NotFound';
import Home from '../views/frontend/Home';
import FrontendLayout from '../layouts/FrontendLayout';
import Login from '../views/frontend/Login';
import Product from '../views/frontend/Product';
import Detail from '../views/frontend/Detail';
import Cart from '../views/frontend/Cart';
import Checkout from '../views/frontend/Checkout';
import CheckoutSuccess from '../views/frontend/CheckoutSuccess';
import About from '../views/frontend/About';

import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../views/admin/Dashboard';
import AdminProduct from '../views/admin/Product';
import AdminCoupon from '../views/admin/Coupon';
import AdminOrder from '../views/admin/Order';

export const router = createHashRouter([
  {
    path: '/',
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'detail/:id',
        element: <Detail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'checkoutSuccess',
        element: <CheckoutSuccess />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'product',
        element: <AdminProduct />,
      },
      {
        path: 'order',
        element: <AdminOrder />,
      },
      {
        path: 'coupon',
        element: <AdminCoupon />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
