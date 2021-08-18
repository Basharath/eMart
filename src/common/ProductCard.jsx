import Card from 'react-bootstrap/Card';
import StarRating from 'react-star-ratings';

export default function ProductCard({
  name,
  price,
  offer,
  rating = 0,
  img,
  classes,
}) {
  return (
    <Card
      style={{ width: '260px', height: '330px', overflow: 'hidden' }}
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
      />
      <Card.Body>
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
          rating={rating}
          starDimension="18px"
          starSpacing="1px"
          starRatedColor="#ffc107"
        />
      </Card.Body>
    </Card>
  );
}
