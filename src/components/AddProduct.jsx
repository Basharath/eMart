import FormData from 'form-data';
import Joi from 'joi-browser';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProductCard from '../common/ProductCard';
import FormGroup from '../common/FormGroup';
import FormSelect from '../common/FormSelect';
import {
  addProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} from '../actions/products';
import Popup from '../common/Popup';
import { getUser } from '../actions/auth';

export default function AddProduct({ history, match }) {
  const user = getUser();
  const initialState = {
    name: '',
    description: '',
    price: '',
    offer: '',
    stock: '',
    seller: user?.name,
    categoryId: '',
    images: '',
    formDataImages: '',
  };

  const { product: p, error: productError } = useSelector(
    (state) => state.products
  );
  const [form, setForm] = useState(() => initialState);
  const [prevImages, setPrevImages] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = match.params;
  const formData = new FormData();

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, []);

  useEffect(() => {
    if (id) {
      setForm((prev) => ({
        ...prev,
        ...p,
        categoryId: p?.category._id,
        formDataImages: [],
      }));
      setPrevImages(() => p?.images.map((i) => i.url));
      if (user.id !== p?.userId && !user.isAdmin) history.push('/');
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
    setPrevImages((prev) => [...prev, filesArray]);
    Array.from(currentTarget.files).map(
      (file) => URL.revokeObjectURL(file) // to avoid memory leak
    );
    // const src = URL.createObjectURL(currentTarget.files[0]);

    setForm((prev) => ({
      ...prev,
      formDataImages: [...prev.formDataImages, ...currentTarget.files],
    }));
  };

  const productSchema = {
    name: Joi.string().min(5).max(255).required().label('Name'),
    description: Joi.string().min(20).required().label('Description'),
    offer: Joi.number().required().label('Discounted price'),
    price: Joi.number().required().label('Original price'),
    seller: Joi.string().required(),
    categoryId: Joi.string().required().label('Category'),
    stock: Joi.number().required().label('Stock'),
    formDataImages: Joi.array()
      .required()
      .label('At least one image has to be selected'),
  };

  const validateProduct = (data) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, productSchema, options);
    if (!error) return null;

    const errs = {};

    error.details.forEach((e) => {
      if (e.path[0] === 'formDataImages') errs[e.path[0]] = e.context.label;
      else errs[e.path[0]] = e.message;
    });
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { images, rating, _id, category, userId, ...data } = form;
    const errs = validateProduct(data);
    setErrors({ ...(errs || {}) });

    if (errs) return;

    const {
      name,
      description,
      offer,
      price,
      seller,
      stock,
      categoryId,
      formDataImages,
    } = form;

    formData.append('name', name);
    formData.append('description', description);
    formData.append('offer', +offer);
    formData.append('price', +price);
    formData.append('seller', seller);
    formData.append('stock', +stock);
    formData.append('categoryId', categoryId);

    // eslint-disable-next-line no-plusplus
    if (formDataImages.length > 0) {
      Array.from(formDataImages).map((i) => formData.append('product', i));
    }

    if (id) {
      dispatch(updateProduct(form._id, formData, history));
    } else dispatch(addProduct(formData, history));
  };

  const handlePreview = (index) => {
    const images = [...prevImages].filter((i, idx) => idx !== index);
    const formDataImages = [...form.formDataImages].filter(
      (i, idx) => idx !== index
    );
    setPrevImages(() => images);
    setForm((prev) => ({ ...prev, formDataImages }));
  };

  const handleClose = () => setShow(false);

  const handleDelete = () => {
    handleClose();
    dispatch(deleteProduct(id, history));
  };

  return (
    <>
      <Popup
        show={show}
        handleClose={handleClose}
        handleConfirm={handleDelete}
      />

      <Row className="py-4">
        <Col className="d-flex justify-content-center my-5 fixed">
          <ProductCard
            name={form.name}
            offer={form.offer}
            price={form.price}
            img={prevImages?.length > 0 ? prevImages[0] : form.images[0]?.url}
            rating={2.5}
          />
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <Form className="shadow rounded p-4 product-form">
            <p className="h3 text-center">Add product</p>
            <FormGroup
              name="name"
              label="Product name"
              onChange={handleChange}
              value={form.name}
              placeholder="Enter product name"
              error={errors.name}
            />
            <FormGroup
              name="description"
              label="Product description"
              onChange={handleChange}
              value={form.description}
              as="textarea"
              style={{ height: '10px' }}
              placeholder="Enter product description"
              error={errors.description}
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
                  error={errors.price}
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
                  error={errors.offer}
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
                  error={errors.stock}
                />
              </Col>
              <Col>
                <FormSelect
                  name="categoryId"
                  label="Category"
                  arr={categories}
                  onChange={handleChange}
                  value={form.categoryId}
                  error={errors.categoryId}
                />
              </Col>
            </Row>
            <FormGroup
              name="seller"
              label="Seller name"
              // onChange={handleChange}
              readOnly
              value={form.seller}
              placeholder="Enter seller name"
              error={errors.seller}
            />
            <FormGroup
              name="images"
              label="Product images"
              onChange={handleImage}
              type="file"
              id="upload"
              style={{ display: 'none' }}
              placeholder="Upload product images"
              classes="m-0"
            />
            {prevImages?.length > 0 &&
              prevImages.map((i, idx) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  className="preview-container"
                  key={idx}
                  onClick={() => handlePreview(idx)}
                >
                  <img src={i} alt={i} className="preview-image" />
                  <div className="preview-text">&times;</div>
                </div>
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
            {errors.formDataImages && (
              <Form.Text className="text-danger d-block mb-1">
                {errors.formDataImages}
              </Form.Text>
            )}
            {productError && (
              <Form.Text
                className="text-danger d-block mb-1 text-center"
                style={{ fontSize: '16px' }}
              >
                {productError}
              </Form.Text>
            )}
            <Button type="submit" onClick={handleSubmit} className="w-100">
              {id ? 'Update product' : 'Add product'}
            </Button>

            {id && (
              <Button
                variant="danger"
                // onClick={() => dispatch(deleteProduct(id, history))}
                onClick={() => setShow(true)}
                className="w-100 mt-1"
              >
                Delete product
              </Button>
            )}
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
    </>
  );
}
