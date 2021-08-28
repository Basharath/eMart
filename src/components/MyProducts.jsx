import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Popup from '../common/Popup';
import ProductCard from '../common/ProductCard';
import { getVendorProducts, deleteProduct } from '../actions/products';
import { getUser } from '../actions/auth';

export default function MyProducts() {
  const { vendorProds: products = [] } = useSelector((state) => state.products);
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState(1);
  const dispatch = useDispatch();
  const { isAdmin, id } = getUser() || {};
  const LIMIT = process.env.REACT_APP_PRODUCT_LIMIT || 4;
  const productLimit = products.length >= LIMIT;

  useEffect(() => {
    if (!products.length) dispatch(getVendorProducts(isAdmin ? '' : id));
  }, []);

  const handleSetData = (status, prodId) => {
    setShow(status);
    setProductId(prodId);
  };

  const handleClose = () => setShow(false);

  const handleDelete = () => {
    handleClose();
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="py-3">
      <Popup
        show={show}
        handleClose={handleClose}
        handleConfirm={handleDelete}
      />
      {!isAdmin && !productLimit && (
        <Alert variant="info" className="p-1 text-center">
          <i className="fas fa-info-circle" /> You can add upto {LIMIT} products
          only
        </Alert>
      )}
      {!isAdmin && productLimit ? (
        <Button
          className="btn btn-warning mx-auto d-block btn-sm btn-product-limit"
          disabled
        >
          Your product limit of {LIMIT} reached!
        </Button>
      ) : (
        <Link
          to="/add-product"
          className="btn btn-warning mx-auto d-block btn-sm btn-product-limit"
        >
          Add product
        </Link>
      )}
      <h3 className="text-center my-3">My Products</h3>
      <div className="d-flex flex-wrap justify-content-center justify-content-lg-start pb-4">
        {products?.map((p) => (
          <ProductCard
            product={p}
            key={p._id}
            height="345px"
            classes="m-2"
            myproduct
            onEdit={`/update-product/${p._id}`}
            onDelete={handleSetData}
          />
        ))}
      </div>
    </div>
  );
}
