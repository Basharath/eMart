import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from '../common/FormGroup';
import FormSelect from '../common/FormSelect';
// import { getCategories } from '../actions/categories';

export default function AddProduct() {
  // const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    // dispatch(getCategories());
  }, []);

  const handleChange = () => {
    // console.log('cat', e.target.value);
  };

  const handleImage = () => {
    // const src = URL.createObjectURL(currentTarget.files[0]);
    // console.log(currentTarget.files);
  };
  return (
    <Container className="py-4">
      <Row>
        <Col className="border-end">Col 1 - Product preview</Col>
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <p className="h3">Add product</p>
          <Form className="shadow rounded p-4 product-form">
            <FormGroup
              name="name"
              label="Product name"
              onChange={handleChange}
              // value={}
              placeholder="Enter product name"
            />
            <FormGroup
              name="description"
              label="Product description"
              onChange={handleChange}
              // value={}
              as="textarea"
              placeholder="Enter product description"
            />
            <FormGroup
              name="price"
              label="Original price"
              onChange={handleChange}
              type="number"
              min="1"
              // value={}
              placeholder="Enter original price"
            />
            <FormGroup
              name="offer"
              label="Discounted price"
              onChange={handleChange}
              // value={}
              type="number"
              min="1"
              placeholder="Enter discounted price"
            />
            <FormGroup
              name="stock"
              label="Available stock"
              onChange={handleChange}
              // value={}
              type="number"
              step="1"
              min="1"
              placeholder="Enter available stock number"
            />
            <FormGroup
              name="seller"
              label="Seller name"
              onChange={handleChange}
              // value={}
              placeholder="Enter seller name"
            />
            <FormSelect
              label="Category"
              arr={categories}
              onChange={handleChange}
            />
            <FormGroup
              name="images"
              label="Product images"
              onChange={handleImage}
              // value={}
              type="file"
              multiple
              placeholder="Upload product images"
            />
            <Button>Add product</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
