import Card from 'react-bootstrap/Card';
import StarRating from 'react-star-ratings';
import { getRandomRating, getRandomCount } from '../utils';

export default function ProductCard({
  name,
  price,
  offer,
  rating = 0,
  img,
  classes,
  width,
  height,
}) {
  return (
    <Card
      style={{
        width: width || '240px',
        height: height || '320px',
        overflow: 'hidden',
        margin: 'auto',
      }}
      className={`rounded-3 ${classes}`}
    >
      <Card.Img
        variant="top"
        src={
          img ||
          'https://i.postimg.cc/TPcWd5hH/placeholder-images-image-large.png'
        }
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'contain',
        }}
        className="p-2"
      />
      <Card.Body style={{ marginTop: '-10px' }}>
        <p className="text-truncate text-truncate--2">{name}</p>
        <span className="me-1 fw-bold">${offer}</span>
        {price && (
          <span
            className="fw-lighter text-decoration-line-through"
            style={{ fontSize: '15px' }}
          >
            ${price}
          </span>
        )}
        {price && offer && (
          <span className="ms-2 text-success">
            {Math.round((100 * (price - +offer)) / price)}% off
          </span>
        )}
        <br />
        <StarRating
          rating={rating || getRandomRating()}
          starDimension="18px"
          starSpacing="1px"
          starRatedColor="#ffc107"
        />
        <span className="starCount">({getRandomCount()})</span>
      </Card.Body>
    </Card>
  );
}
