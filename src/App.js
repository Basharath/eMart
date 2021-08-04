import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import TopBar from './components/TopBar';
import { getProducts } from './actions/products';

const App = () => {
  // const [id, setId] = useState(0);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <TopBar />
      <Container>
        {products.map((p) => (
          <div key={p._id}>{p.name}</div>
        ))}
      </Container>
    </>
  );
};

export default App;
