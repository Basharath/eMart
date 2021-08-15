import FormData from 'form-data';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from '../common/FormGroup';
import FormSelect from '../common/FormSelect';
// import { getCategories } from '../actions/categories';
import { addProduct, updateProduct, getProduct } from '../actions/products';

const initialState = {
  name: '',
  description: '',
  price: '',
  offer: '',
  stock: '',
  seller: '',
  categoryId: '',
  images: '',
  formDataImages: '',
};
export default function AddProduct({ history, match }) {
  const { product: p } = useSelector((state) => state.products);
  const [form, setForm] = useState(() => initialState);
  const [prevImages, setPrevImages] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  // const history = useHistory();
  // const { id } = useParams();
  const { id } = match.params;

  const formData = new FormData();

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, []);

  useEffect(() => {
    if (id) {
      setForm((prev) => ({ ...prev, ...p, categoryId: p?.category._id }));
      setPrevImages(() => p?.images.map((i) => i.url));
    } else {
      setForm(initialState);
      setPrevImages([]);
    }
  }, [p, id]);

  const handleChange = ({ currentTarget }) => {
    setForm((prev) => ({ ...prev, [currentTarget.name]: currentTarget.value }));
  };

  const handleImage = ({ currentTarget }) => {
    const filesArray = Array.from(currentTarget.files).map((file) =>
      URL.createObjectURL(file)
    );
    setPrevImages(filesArray);
    Array.from(currentTarget.files).map(
      (file) => URL.revokeObjectURL(file) // to avoid memory leak
    );
    // const src = URL.createObjectURL(currentTarget.files[0]);
    setForm((prev) => ({
      ...prev,
      formDataImages: currentTarget.files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('offer', +form.offer);
    formData.append('price', +form.price);
    formData.append('seller', form.seller);
    formData.append('stock', +form.stock);
    formData.append('categoryId', form.categoryId);

    // eslint-disable-next-line no-plusplus
    if (form.formDataImages.length > 0) {
      Array.from(form.formDataImages).map((i) => formData.append('product', i));
    }

    if (id) {
      dispatch(updateProduct(form._id, formData, history));
    } else dispatch(addProduct(formData, history));
  };
  return (
    <Container className="py-2">
      <Row>
        <Col className="border-end">Col 1 - Product preview</Col>
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <Form className="shadow rounded p-4 product-form">
            <p className="h3 text-center">Add product</p>
            <FormGroup
              name="name"
              label="Product name"
              onChange={handleChange}
              value={form.name}
              placeholder="Enter product name"
            />
            <FormGroup
              name="description"
              label="Product description"
              onChange={handleChange}
              value={form.description}
              as="textarea"
              style={{ height: '10px' }}
              placeholder="Enter product description"
            />
            <Row>
              <Col>
                <FormGroup
                  name="price"
                  label="Original price"
                  onChange={handleChange}
                  type="number"
                  min="1"
                  value={form.price}
                  placeholder="Original price"
                />
              </Col>
              <Col>
                <FormGroup
                  name="offer"
                  label="Discounted price"
                  onChange={handleChange}
                  value={form.offer}
                  type="number"
                  min="1"
                  placeholder="Discounted price"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup
                  name="stock"
                  label="Available stock"
                  onChange={handleChange}
                  value={form.stock}
                  type="number"
                  step="1"
                  min="1"
                  placeholder="Enter available stock number"
                />
              </Col>
              <Col>
                <FormSelect
                  name="categoryId"
                  label="Category"
                  arr={categories}
                  onChange={handleChange}
                  value={form.categoryId}
                />
              </Col>
            </Row>
            <FormGroup
              name="seller"
              label="Seller name"
              onChange={handleChange}
              value={form.seller}
              placeholder="Enter seller name"
            />
            <FormGroup
              name="images"
              label="Product images"
              onChange={handleImage}
              type="file"
              id="upload"
              style={{ display: 'none' }}
              multiple
              placeholder="Upload product images"
              classes="m-0"
            />
            {prevImages?.length > 0 &&
              prevImages.map((i, idx) => (
                <img
                  src={i}
                  alt={i}
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="mb-3 me-2"
                  style={{ width: '66px', height: '66px' }}
                />
              ))}
            {
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label
                htmlFor="upload"
                className="camera mb-2 p-3 border"
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="button"
              >
                <i className="fas fa-camera fa-2x" />
              </label>
            }
            <Button type="submit" onClick={handleSubmit} className="w-100">
              {id ? 'Update product' : 'Add product'}
            </Button>

            <Button
              variant="secondary"
              onClick={() => history.goBack()}
              className="w-100 mt-1"
            >
              {id ? 'Cancel updating' : 'Go back'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
