import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
// import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import { getVendorProducts } from '../actions/products';
import { getUser } from '../actions/auth';

export default function MyProducts() {
  const { vendorProds: products = [] } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { isAdmin, id } = getUser();

  useEffect(() => {
    dispatch(getVendorProducts(isAdmin ? '' : id));
  }, []);

  return (
    <Container className="py-3">
      <Link to="/add-product" className="btn btn-warning d-block mx-auto w-25">
        Add product
      </Link>
      <div>
        <h3>Products</h3>
        {products?.map((p) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <NavLink
            to={`update-product/${p._id}`}
            key={p._id}
            className="d-block w-25 bg-warning my-1 text-dark"
          >
            {p.name}
          </NavLink>
        ))}
      </div>
    </Container>
  );
}
