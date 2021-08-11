import { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import { getProducts } from './actions/products';
import { getUser } from './actions/auth';

import TopBar from './components/TopBar';
import Login from './components/Login';
import Orders from './components/Orders';
import Cart from './components/Cart';
// import Home from './components/Home';
import Products from './components/Products';
import ProtectedRoute from './common/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const { authData, userData } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, [authData]);

  useEffect(() => {
    setUser(() => userData);
  }, [userData]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <TopBar user={user} />
        <Container>
          <Switch>
            <Route
              path="/login"
              component={() => (!user ? <Login /> : <Redirect to="/" />)}
            />
            <ProtectedRoute path="/orders" component={Orders} />
            <ProtectedRoute path="/cart" component={Cart} />
            <Route path="/" exact component={Products} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
