import { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import { getProducts } from './actions/products';
import { getUser, getAuth, logout } from './actions/auth';
import { getCategories } from './actions/categories';
import { getCart } from './actions/cart';

import TopBar from './components/TopBar';
import Login from './components/Login';
import Orders from './components/Orders';
import Cart from './components/Cart';
// import Home from './components/Home';
import Products from './components/Products';
import ProtectedRoute from './common/ProtectedRoute';
import VendorRoute from './common/ProtectedRouteVendor';
import 'react-toastify/dist/ReactToastify.css';
import MyProducts from './components/MyProducts';
import AddProduct from './components/AddProduct';
import Loader from './common/Loader';
import ProductDetails from './components/ProductDetails';

const App = () => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.products);
  const [user, setUser] = useState(() => getUser());

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
      <BrowserRouter>
        <ToastContainer />
        <TopBar user={user} cart={cart} />
        {isLoading && <Loader />}
        <Container>
          <Switch>
            <Route
              path="/login"
              render={() => (!user ? <Login /> : <Redirect to="/" />)}
            />
            <Route path="/:slug/p/:id" component={ProductDetails} />
            <ProtectedRoute path="/orders" component={Orders} user={user} />
            <ProtectedRoute path="/cart" component={Cart} user={user} />
            <VendorRoute path="/add-product" component={AddProduct} />
            <VendorRoute path="/update-product/:id" component={AddProduct} />
            <VendorRoute path="/products" component={MyProducts} />
            <Route path="/" exact component={Products} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
