import React from 'react';
import dayjs from 'dayjs';
import Card from 'react-bootstrap/Card';
import { convertAmount } from '../utils';

export default function OrderCard({ order }) {
  const { date, products, _id } = order || {};
  const getDate = (d) => dayjs(d).format('DD MMMM YYYY');
  const getTotal = products.reduce((t, c) => t + c.quantity * c.price, 0);

  return (
    <div className="">
      <Card className="rounded-3 order-card">
        <Card.Header className="fz-2 d-flex justify-content-between flex-column flex-md-row">
          <div className="d-flex justify-content-between justify-content-md-start">
            <div className="me-5 order-date">
              ORDER PLACED <br />
              {getDate(date)}
            </div>
            <div className="">
              TOTAL
              <br />
              {convertAmount(getTotal)}
            </div>
          </div>
          <div>
            ORDER <br />#{_id}
          </div>
        </Card.Header>
        <Card.Body className="order-card-body">
          {products.map((p) => (
            <OrderItemCard p={p} key={p.product._id} />
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

const OrderItemCard = ({ p }) => {
  const { price, quantity, product } = p;
  const { name } = product;
  const img = product.images[0].url;

  return (
    <div className="d-flex flex-column flex-md-row align-items-md-start order-item-card border-bottom mb-2 pb-2 pt-2 fz-3">
      <div className="inline-block ps-3 align-self-center">
        <img
          src={img}
          className="rounded"
          alt={name}
          style={{ width: '100px', height: '70px' }}
        />
      </div>
      <div className="px-3 pt-1 order-block">
        <p className="truncate--2 mb-0">{name}</p>
        <span className="me-2">{convertAmount(price)}</span>
        <span className="">Qty: {quantity}</span>
      </div>
    </div>
  );
};
