import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TopBar from './components/TopBar';
import { getProducts } from './actions/products';
import Login from './components/Login';
import Orders from './components/Orders';
import Cart from './components/Cart';
// import Home from './components/Home';
import Products from './components/Products';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <BrowserRouter>
        <TopBar />
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
