/* eslint-disable jsx-a11y/click-events-have-key-events */
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct';

export default function MyProducts() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);

  const handleClick = (p) => {
    setData(p);
    setIsEditMode(true);
  };

  return (
    <>
      {isEditMode ? (
        <AddProduct data={data} edit={isEditMode} handleEdit={setIsEditMode} />
      ) : (
        <Container className="py-3">
          <Link
            to="/add-product"
            className="btn btn-warning d-block mx-auto w-25"
          >
            Add product
          </Link>
          <div>
            <h3>Products</h3>
            {products
              // .filter((p) => p.price > 600)
              .map((p) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div key={p._id} onClick={() => handleClick(p)}>
                  {p.name}
                </div>
              ))}
          </div>
        </Container>
      )}
    </>
  );
}
