import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CartItemCard from '../common/CartItemCard';
import { getCart, updateCart, checkoutCart } from '../actions/cart';
import { convertAmount } from '../utils';
import NotFound from './NotFound';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.length) dispatch(getCart());
  }, []);

  const handleRemoveItem = (id) => {
    const productData = { product: id, quantity: 0 };
    dispatch(updateCart(productData));
  };

  const handleQuantity = (id, quantity) => {
    const productData = { product: id, quantity };
    dispatch(updateCart(productData));
  };

  const handleCheckout = async () => {
    const products = cart?.map((i) => ({
      name: i.product.name,
      price: i.price,
      quantity: i.quantity,
    }));
    const url = await checkoutCart(products);
    window.location = url;
  };

  const fullPrice = cart.reduce((t, i) => t + i.product.price * i.quantity, 0);
  const offerPrice = cart.reduce((t, i) => t + i.price * i.quantity, 0);
  const discount = fullPrice - offerPrice;

  return cart.length > 0 ? (
    <Row className="mt-2 d-flex justify-content-center align-items-start px-5 py-2 cart-row">
      <Col xl={8}>
        <p className="p-1 ps-2 me-4 my-2 border cart-col fw-bold fz-1 text-center text-secondary">
          My Cart ({cart?.length})
        </p>
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
      <Col className="cart-col">
        <p className="p-1 ps-2 me-4 my-2 border cart-col fw-bold fz-1 text-center text-secondary">
          Price Details
        </p>
        <div className="p-2 px-3 border me-4 my-2 cart-col">
          <p className="d-flex justify-content-between">
            <span>
              Price ({cart?.length} {cart?.length > 1 ? 'items' : 'item'}){' '}
            </span>
            <span>{convertAmount(fullPrice)}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Discount</span>
            <span className="text-success">-{convertAmount(discount)}</span>
          </p>
          <p className="d-flex justify-content-between">
            <span>Delivery charges</span>
            <span className="text-success">FREE</span>
          </p>
          <p className="d-flex justify-content-between total-amount">
            <span>Total Amount</span>
            <span>{convertAmount(offerPrice)}</span>
          </p>
        </div>
        <div className="p-3 border me-4 my-2 cart-col">
          <Button
            className="btn-place-order btn w-100"
            onClick={handleCheckout}
          >
            Place order
          </Button>
        </div>
      </Col>
    </Row>
  ) : (
    // <p className="text-center mt-5 fs-2 text-secondary fw-light">
    //   Your cart is empty
    // </p>
    <NotFound text="Your cart is empty" />
  );
}
