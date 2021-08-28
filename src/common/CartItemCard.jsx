import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { convertAmount } from '../utils';

export default function CartItemCard({ p, onRemove, onSelection }) {
  const { price, quantity, product } = p;
  const { name, images, seller, _id } = product;
  const img = images[0].url;

  const [qty, setQty] = useState(() => quantity);

  useEffect(() => {
    setQty(() => quantity);
  }, [quantity]);

  const handleChange = ({ currentTarget }) => {
    const amount = currentTarget.value;
    onSelection(_id, amount);
    setQty(() => amount);
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center border me-4 my-2 cart-col">
      <div className="inline-block ps-3 py-2 cart-image-container">
        <img src={img} className="rounded cart-image" alt={name} />
      </div>
      <div className="px-3 pt-2 cart-block">
        <p className="truncate--2 cart-product">{name}</p>
        <p className="text-secondary">
          <span>Seller:</span>
          {seller}
        </p>
        <p className="me-1 fw-bold" style={{ fontSize: '18px' }}>
          {convertAmount(price)}
        </p>
        <p className="d-flex align-items-center">
          <span className="">Qty:</span>
          <select
            className="no-border border px-1 my-1 ms-2 me-3"
            id="qty-select"
            value={qty}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            {qty > 9 && <option value={qty}>{qty}</option>}
          </select>
          <Button
            onClick={() => onRemove(_id)}
            size="sm"
            className="my-1"
            variant="danger"
          >
            <i className="fas fa-trash" /> Remove item
          </Button>
        </p>
      </div>
    </div>
  );
}
