import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    dispatch(getVendorProducts(isAdmin ? '' : id));
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
      <Link to="/add-product" className="btn btn-warning d-block mx-auto w-25">
        Add product
      </Link>
      <h3 className="text-center my-3">My Products</h3>
      <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
        {products?.map((p) => (
          <ProductCard
            id={p._id}
            name={p.name}
            offer={p.offer}
            price={p.price}
            img={p.images[0]?.url}
            key={p._id}
            height="360px"
            overflow="hidden"
            classes="m-1"
            myproduct
            onEdit={`/update-product/${p._id}`}
            onDelete={handleSetData}
          />
        ))}
      </div>
    </div>
  );
}
