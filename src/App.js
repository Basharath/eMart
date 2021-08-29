import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getProducts } from './actions/products';
import { getUser, getAuth, logout } from './actions/auth';
import { getCategories } from './actions/categories';
import { getCart } from './actions/cart';

import TopBar from './components/TopBar';
import Login from './components/Login';
import Orders from './components/Orders';
import Cart from './components/Cart';
import Home from './components/Home';
import ProtectedRoute from './common/ProtectedRoute';
import VendorRoute from './common/ProtectedRouteVendor';
import MyProducts from './components/MyProducts';
import AddProduct from './components/AddProduct';
import Loader from './common/Loader';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';
import OrderDetails from './components/OrderDetails';
import Banners from './components/Banners';
import 'react-toastify/dist/ReactToastify.css';
import Account from './components/Account';

const App = () => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.products);
  const [user, setUser] = useState(() => getUser());
  const location = useLocation();

  useEffect(() => {
    if (!getUser()) dispatch(logout());
    dispatch(getProducts());
    dispatch(getCategories());
    if (!authData) dispatch(getAuth());
  }, []);

  useEffect(() => {
    setUser(() => getUser());
    if (authData) dispatch(getCart());
  }, [authData]);

  return (
    <>
      <ToastContainer />
      <TopBar user={user} cart={cart} />
      {isLoading && <Loader />}
      {location.pathname === '/' && <Banners />}
      <Container>
        <Switch>
          <Route
            path="/login"
            render={() => (!user ? <Login /> : <Redirect to="/" />)}
          />
          <Route path="/:slug/p/:id" component={ProductDetails} />
          <ProtectedRoute path="/order/:id" component={OrderDetails} />
          <ProtectedRoute path="/orders" component={Orders} />
          <ProtectedRoute path="/account" component={Account} />
          <ProtectedRoute path="/cart" component={Cart} user={user} />
          <VendorRoute path="/add-product" component={AddProduct} />
          <VendorRoute path="/update-product/:id" component={AddProduct} />
          <VendorRoute path="/products" component={MyProducts} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/" exact component={Home} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Container>
    </>
  );
};

export default App;
