import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { postOrder } from '../actions/orders';

export default function Checkout() {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const status = params.get('status');
  const sessionId = params.get('session_id');

  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orders);
  const history = useHistory();

  useEffect(() => {
    if (status === 'true' && sessionId) {
      dispatch(postOrder(sessionId));
    }
  }, []);

  const handleGoToOrder = () => {
    history.push(`/orders/61267a8671c65261b46ed532`);
    // history.push(`/orders/${order._id}`);
  };

  console.log('order', order);
  return (
    <div
      className="fs-2 text-secondary d-flex flex-column align-items-center justify-content-center"
      style={{ height: '60vh' }}
    >
      {status === 'true' && order ? (
        <>
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
          <p>Your order is successful</p>
          <Button onClick={handleGoToOrder}>Go to order</Button>
        </>
      ) : (
        <p>
          Your order is <strong>not</strong> placed, please try again.
        </p>
      )}
    </div>
  );
}
