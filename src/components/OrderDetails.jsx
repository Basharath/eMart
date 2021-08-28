import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrder } from '../actions/orders';
import NotFound from './NotFound';

import OrderCard from '../common/OrderCard';

export default function OrderDetails() {
  const dispatch = useDispatch();
  const { order, orders, error } = useSelector((state) => state.orders);
  const { id } = useParams();
  const orderInStore = orders?.filter((o) => o._id === id);

  const [orderData, setOrderData] = useState(orderInStore[0] || order);

  useEffect(() => {
    setOrderData(orderInStore[0] || order);
  }, [order]);

  useEffect(() => {
    if (id && !orderInStore[0]) dispatch(getOrder(id));
  }, [id]);

  return (
    <div>
      <p className="text-secondary fs-2 text-center mt-3 mb-0">Order details</p>
      {id && !error && orderData && (
        <div className="mt-4 d-flex justify-content-center">
          <OrderCard order={orderData} />
        </div>
      )}
      {error && <NotFound type="order" />}
    </div>
  );
}
