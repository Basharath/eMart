import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Card from 'react-bootstrap/Card';
import { getOrders, getOrder } from '../actions/orders';
import { convertAmount } from '../utils';
import NotFound from './NotFound';

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orders);
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(getOrder(id));
    else dispatch(getOrders());
  }, [id]);

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
  const { products, _id: id, date } = o;
  const { product } = o.products[0];
  const { name } = product;
  const total = products.reduce((t, c) => t + c.quantity * c.price, 0);
  const images = products.map((p) => p.product.images[0].url);
  images.length = images.length > 4 ? 4 : images.length;
  const n = images.length;
  const count = products.length;

  return (
    <>
      <p className="p-2 bg-light">
        Order placed on 🠮 {dayjs(date).format('DD MMMM YYYY')}
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
          <span className="me-2 d-block">Total: {convertAmount(total)}</span>
        </div>
      </div>
    </>
  );
};
