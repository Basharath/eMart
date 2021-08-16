import Card from 'react-bootstrap/Card';
import StarRating from 'react-star-ratings';

export default function ProductCard({ name, price, offer, rating = 0, img }) {
  return (
    <Card
      style={{ width: '300px', height: '350px' }}
      className="overflow-hidden"
    >
      <Card.Img
        variant="top"
        src={img}
        style={{
          width: '300px',
          height: '200px',
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
