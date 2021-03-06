import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import StarRating from 'react-star-ratings';
import { Link, useHistory } from 'react-router-dom';
import { updateCart } from '../actions/cart';
import { getRandomRating, getRandomCount, convertAmount } from '../utils';

export default function ProductCard({
  product,
  classes,
  width,
  height,
  myproduct,
  display,
  onEdit,
  onDelete,
  noLink,
}) {
  const { _id: id, name, price, offer, count = 0, images } = product;
  const img = product.img || (images && images[0]?.url);
  const rating = Array.isArray(product.rating) ? 0 : product.rating;

  const [ratingData, setRatingData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setRatingData({
      rating: getRandomRating(),
      count: getRandomCount(),
    });
  }, []);

  const handleAddToCart = () => {
    const productData = { product: id, quantity: 1 };
    dispatch(updateCart(productData));
    history.push('/cart');
  };

  return (
    <Card
      style={{
        width: width || '240px',
        height: height || '320px',
        overflow: 'hidden',
        margin: 'auto',
      }}
      className={`rounded-3 ${classes} product-card`}
    >
      {noLink ? (
        <>
          <Card.Img
            variant="top"
            src={
              img ||
              'https://i.postimg.cc/TPcWd5hH/placeholder-images-image-large.png'
            }
            style={{
              width: '100%',
              height: '170px',
              objectFit: 'contain',
            }}
            className="p-2"
          />
          <Card.Body style={{ marginTop: '-10px' }}>
            <p className="text-truncate text-truncate--2">{name}</p>
          </Card.Body>
        </>
      ) : (
        <Link
          to={`/${name.replaceAll('/', '-').split(' ').join('-')}/p/${id}`}
          className="product-card-clickable"
        >
          <Card.Img
            variant="top"
            src={
              img ||
              'https://i.postimg.cc/TPcWd5hH/placeholder-images-image-large.png'
            }
            style={{
              width: '100%',
              height: '170px',
              objectFit: 'contain',
            }}
            className="p-2"
          />
          <Card.Body style={{ marginTop: '-10px' }}>
            <p className="text-truncate text-truncate--2">{name}</p>
          </Card.Body>
        </Link>
      )}
      <Card.Body style={{ marginTop: '-30px' }}>
        <div style={{ height: '20px', marginTop: '-5px' }}>
          <span className="me-1 fw-bold">
            {noLink ? `$${offer}` : convertAmount(offer)}
          </span>
          {price && (
            <span
              className="fw-lighter text-decoration-line-through"
              style={{ fontSize: '15px' }}
            >
              {noLink ? `$${price}` : convertAmount(price)}
            </span>
          )}
          {price && offer && (
            <span className="ms-2 text-success">
              {Math.round((100 * (price - +offer)) / price)}% off
            </span>
          )}
        </div>
        <div>
          <StarRating
            rating={rating || ratingData.rating}
            starDimension="18px"
            starSpacing="1px"
            starRatedColor="#ffc107"
          />
          <span className="starCount">({count || ratingData.count})</span>
        </div>
        {myproduct && (
          <div className="mt-3">
            <Link className="btn btn-primary btn-sm product-edit" to={onEdit}>
              <i className="fas fa-pen" style={{ fontSize: '11px' }} /> Edit
            </Link>
            <Button
              size="sm"
              variant="danger"
              className="product-edit float-end"
              onClick={() => onDelete(true, id)}
            >
              <i className="fas fa-trash" style={{ fontSize: '11px' }} /> Delete
            </Button>
          </div>
        )}
        {display && (
          <Button
            onClick={handleAddToCart}
            variant="warning"
            size="sm"
            className="mt-3 d-block w-100"
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
