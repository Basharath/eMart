import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Popup from '../common/Popup';
import { getOrders, cancelOrder } from '../actions/orders';
import { convertAmount } from '../utils';
import NotFound from './NotFound';

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="orders-screen mx-auto">
      <p className="text-secondary fs-2 text-center mt-2">Your orders</p>
      <Card className="mt-4">
        {orders && orders?.map((o) => <OrderItemCard key={o._id} o={o} />)}
      </Card>
      {error && <NotFound type="order" />}
    </div>
  );
}

const OrderItemCard = ({ o }) => {
  const { products, _id: id, date, deliveryDate } = o;
  const { product } = o.products[0];
  const { name } = product;
  const total = products.reduce((t, c) => t + c.quantity * c.price, 0);
  const images = products.map((p) => p.product.images[0].url);
  images.length = images.length > 4 ? 4 : images.length;
  const n = images.length;
  const count = products.length;
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  const handleDelete = () => {
    dispatch(cancelOrder(id));
    handleClose();
  };

  return (
    <>
      <Popup
        show={show}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        order
      />
      <p className="p-2 bg-light d-flex justify-content-between">
        <span>Ordered on: {dayjs(date).format('DD MMM YYYY')}</span>
        <span>
          {dayjs(new Date()) < dayjs(deliveryDate)
            ? `Delivery on: ${dayjs(deliveryDate).format('DD MMM YYYY')}`
            : `Delivered on: ${dayjs(deliveryDate).format('DD MMM YYYY')}`}
        </span>
      </p>
      <div className="d-flex flex-column flex-md-row align-items-md-start order-item-card border-bottom pb-4 pt-2 fz-3">
        <div className="d-flex ps-3 align-self-center order-image-block">
          {images.map((i, idx) => (
            <img
              key={idx}
              src={i}
              className="rounded"
              alt={name}
              style={{
                maxWidth: `${100 / n}%`,
                height: `${100}%`,
                objectFit: 'contain',
                margin: 'auto',
              }}
            />
          ))}
        </div>
        <div className="px-3 pt-1 orders-block">
          <Link to={`/order/${id}`} className="product-card-clickable">
            <p className="truncate--2 mb-0">{name}</p>{' '}
            <span className="text-primary">
              {count > 1 ? `+${count - 1} item(s)` : ''}
            </span>
          </Link>
          <span className="me-5 d-block">Total: {convertAmount(total)}</span>
          <div className="align-middle mt-2">
            {dayjs(new Date()) < dayjs(deliveryDate) && (
              <Button variant="danger" size="sm" onClick={() => setShow(true)}>
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
