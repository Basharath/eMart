import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUser());
    setUser(authData);
  }, [authData]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <TopBar user={user} />
        <Container>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/orders" component={Orders} />
            <Route path="/cart" component={Cart} />
            <Route path="/" component={Products} />
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
