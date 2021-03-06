import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import StarRating from 'react-star-ratings';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, resetProdError } from '../actions/products';
import { updateCart } from '../actions/cart';
import { capitalizeFirst, convertAmount } from '../utils';

export default function ProductDetails({ history, match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(+1);
  const {
    product: p = {},
    products,
    error,
  } = useSelector((state) => state.products);
  const prod = products.filter((i) => i._id === id);

  useEffect(() => {
    if (!prod[0]) dispatch(getProduct(id));
  }, [id]);

  useEffect(() => {
    if (error) {
      dispatch(resetProdError());
      history.push('/');
    }
  }, [error]);

  const handleQuantity = (q) => {
    if ((+quantity <= 1 && q === -1) || (+quantity >= 20 && q === 1)) return;
    setQuantity((prev) => +prev + q);
  };
  const handleChange = ({ currentTarget }) => {
    setQuantity(+currentTarget.value);
  };
  // useEffect(() => {
  //   const data = prod[0];
  //   setSelectedImage(() => data?.images && data.images[0]?.url);
  // }, []);

  const { name, description, images, category, price, offer, seller, stock } =
    prod[0] || p;

  const handleHover = (index) => {
    const data = prod[0];
    const image = data?.images.filter((i, idx) => idx === +index);
    const imageUrl = image[0]?.url;
    setSelectedImage(() => imageUrl);
  };

  const handleAddToCart = () => {
    const productData = { product: id, quantity };
    dispatch(updateCart(productData));
    history.push('/cart');
  };

  const src = selectedImage || (images && images[0].url);

  return (
    <div>
      <Row className="py-5 d-flex flex-xl-row flex-column align-items-xs-center">
        <Col lg={6} className="d-flex flex-column align-items-center">
          <Card
            // style={{ width: '550px', height: '300px' }}
            className="p-2 img-wrapper"
          >
            <Card.Img
              variant="top"
              src={src}
              className="w-100 h-100 hover-zoom"
              style={{ objectFit: 'contain' }}
            />
          </Card>
          <div>
            {images?.map((i, idx) => (
              <div
                key={i.cloudId}
                onMouseEnter={() => handleHover(idx)}
                className={`product-detail-mini ${
                  src === i.url ? 'active' : ''
                }`}
              >
                <img className="product-detail-image" src={i.url} alt={name} />
              </div>
            ))}
          </div>
        </Col>
        <Col lg={6} className="px-4">
          <h5 style={{ fontSize: '22px' }}>{name}</h5>
          <div className="my-2">
            <StarRating
              rating={4.3}
              starDimension="18px"
              starSpacing="1px"
              starRatedColor="#ffc107"
            />
            <span className="starCount">(32)</span>
          </div>
          <div className="my-2">
            <span className="me-2 fw-bold fs-4 align-middle">
              {convertAmount(offer)}
            </span>
            {price && (
              <span
                className="text-decoration-line-through text-secondary fs-5 align-middle"
                // style={{ fontSize: '15px' }}
              >
                {convertAmount(price)}
              </span>
            )}
            {price && offer && (
              <span className="ms-2 text-success fw-bold align-middle">
                {Math.round((100 * (price - +offer)) / price)}% off
              </span>
            )}
          </div>

          <div className="my-3 d-flex align-items-center">
            <span
              className="me-1 border px-2 py-1"
              role="button"
              bg="primary"
              onClick={() => handleQuantity(-1)}
            >
              <i className="fas fa-minus" />
            </span>
            <input
              type="number"
              min="1"
              max="20"
              onChange={handleChange}
              className="fs-5 no-border quantity"
              value={quantity}
            />
            <span
              className="ms-1 border px-2 py-1"
              role="button"
              bg="primary"
              onClick={() => handleQuantity(1)}
            >
              <i className="fas fa-plus" />
            </span>
            <Button
              onClick={handleAddToCart}
              className="ms-4 p-1 px-3"
              variant="warning"
            >
              Add to cart
            </Button>
          </div>

          <h5 className="mb-2 mt-4 text-secondary" style={{ fontSize: '21px' }}>
            Product details & specifications
          </h5>
          <div className="list-item mb-4" style={{ whiteSpace: 'pre-wrap' }}>
            {description?.split('\n').map((l, idx) => (
              <li key={idx}>{l}</li>
            ))}
          </div>
          <List name="Category" value={category?.name} />
          <List name="Available" value={stock ? 'In stock' : 'Out of stock'} />
          <List name="Seller" value={seller} />
        </Col>
      </Row>
    </div>
  );
}

const List = ({ name, value }) => (
  <div className="my-1">
    <span
      className="text-secondary fw-bold"
      style={{
        padding: '2px 3px',
        width: '150px',
        display: 'inline-block',
      }}
    >
      {name}
    </span>
    <span>{value && capitalizeFirst(value)}</span>
  </div>
);
