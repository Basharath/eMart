import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartItemCard from '../common/CartItemCard';
import { getCart, updateCart } from '../actions/cart';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const handleRemoveItem = (id) => {
    const productData = { product: id, quantity: 0 };
    dispatch(updateCart(productData));
  };

  const handleQuantity = (id, quantity) => {
    const productData = { product: id, quantity };
    dispatch(updateCart(productData));
  };

  return (
    <Row className="mt-2 d-flex justify-content-center align-items-start px-5 py-2 cart-row">
      <Col xl={8}>
        {cart.length < 1 && <p>Your cart is empty, try adding products.</p>}
        {cart &&
          cart.map((i) => (
            <CartItemCard
              key={i.product._id}
              p={i}
              onRemove={handleRemoveItem}
              onSelection={handleQuantity}
            />
          ))}
      </Col>
      <Col className="border my-2 cart-col">Total Calculation</Col>
    </Row>
  );
}
