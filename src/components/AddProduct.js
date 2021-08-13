import FormData from 'form-data';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from '../common/FormGroup';
import FormSelect from '../common/FormSelect';
// import { getCategories } from '../actions/categories';
import { addProduct } from '../actions/products';

const initialState = {
  name: '',
  description: '',
  price: '',
  offer: '',
  stock: '',
  seller: '',
  categoryId: '',
  images: '',
};
export default function AddProduct() {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const history = useHistory();

  const formData = new FormData();
  useEffect(() => {
    // dispatch(getCategories());
  }, []);

  const handleChange = ({ currentTarget }) => {
    setForm((prev) => ({ ...prev, [currentTarget.name]: currentTarget.value }));
  };

  const handleImage = ({ currentTarget }) => {
    // const src = URL.createObjectURL(currentTarget.files[0]);
    setForm((prev) => ({
      ...prev,
      images: currentTarget.files,
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
    for (let i = 0; i < form.images.length; i++) {
      formData.append('product', form.images[i]);
    }
    dispatch(addProduct(formData, history));
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
              // value={form.images}
              type="file"
              multiple
              placeholder="Upload product images"
            />
            <Button type="submit" onClick={handleSubmit} className="w-100">
              Add product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
