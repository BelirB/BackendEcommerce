import { createHashRouter } from 'react-router-dom';

import Layout from './pages/Layout.jsx';

import LogIn from './pages/LogIn.jsx';
import Recovery from './pages/Recovery.jsx';
import RecoveryPassword from './pages/RecoveryPass.jsx';
import Register from './pages/Register.jsx';
import LogOut from './pages/LogOut.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import AddProducts from './pages/AddProducts.jsx';
import Chat from './pages/Chat.jsx';
import Cart from './pages/Cart.jsx';
import Order from './pages/Order.jsx';
import User from './pages/User.jsx';
import Colores from './pages/temporal/Colores.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LogIn /> },
      { path: 'login/', element: <LogIn /> },
      { path: 'recovery/', element: <Recovery /> },
      { path: 'recoverypassword/', element: <RecoveryPassword /> },
      { path: 'register/', element: <Register /> },
      { path: 'products/', element: <Products /> },
      { path: 'product/:pid', element: <Product /> },
      { path: 'addproducts/', element: <AddProducts />},
      { path: 'chat/', element: <Chat /> },
      { path: 'cart/', element: <Cart /> },
      { path: 'order/', element: <Order /> },
      { path: 'user/', element: <User /> },
      { path: 'refcolores/', element: <Colores /> },
      { path: 'logout/', element: <LogOut />},
    ],
  },
]);

export default router;