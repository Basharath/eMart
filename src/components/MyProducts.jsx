import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function MyProducts() {
  return (
    <Container className="py-3">
      <Link to="/add-product" className="btn btn-warning d-block mx-auto w-25">
        Add product
      </Link>
      <div>Products</div>
    </Container>
  );
}
