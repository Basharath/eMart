import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login, signup } from '../actions/auth';

const initialState = { name: '', email: '', password: '', confirmPassword: '' };
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const switchMode = () => {
    setForm(() => initialState);
    setIsLogin((prevState) => !prevState);
  };

  const formSchema = {
    name: Joi.string().min(4),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(8).required().label('Password'),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .label('Confirm password')
      .options({ language: { any: { allowOnly: 'must match Password' } } }),
  };

  const validateProperty = ({ name, value }) => {
    if (name === 'confirmPassword') {
      return value !== form.password
        ? '"Confirm password" must match Password'
        : null;
    }

    const obj = { [name]: value };
    const schema = { [name]: formSchema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const errs = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errs[input.name] = errorMessage;
    else delete errs[input.name];

    setErrors(errs);
    setForm({ ...form, [input.name]: input.value });
  };

  const validateForm = (data) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, formSchema, options);
    if (!error) return null;

    const errs = {};
    error.details.forEach((item) => {
      errs[item.path[0]] = item.message;
      return 0;
    });

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = form;
    const loginData = { email, password };
    const signupData = { name, email, password };

    const data = isLogin ? loginData : form;
    const errs = validateForm(data);
    setErrors({ ...(errs || {}) });
    if (errs) return 0;

    if (isLogin) dispatch(login(loginData, history));
    else dispatch(signup(signupData, history));
    return 0;
  };

  return (
    <div
      className="mt-5 d-flex justify-content-center align-items-center"
      style={{}}
    >
      <Form className="shadow rounded p-4" style={{ width: '350px' }}>
        {/* <p className="text-center mb-2 h5">
          Login to access your orders and cart
        </p> */}
        {!isLogin && (
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              className="no-focus"
              name="name"
              onChange={handleChange}
              value={form.name}
            />
            <Form.Text className="text-muted">
              {errors.name && errors.name}
            </Form.Text>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="no-focus"
            name="email"
            onChange={handleChange}
            required
            value={form.email}
          />
          <Form.Text className="text-muted">
            {errors.email && errors.email}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 no-focus" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="no-focus"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
          <Form.Text className="text-muted">
            {errors.password && errors.password}
          </Form.Text>
        </Form.Group>
        {!isLogin && (
          <Form.Group className="mb-3 no-focus" controlId="formConfirmPass">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Retype password"
              className="no-focus"
              onChange={handleChange}
              name="confirmPassword"
              value={form.confirmPassword}
            />
            <Form.Text className="text-muted">
              {errors.confirmPassword && errors.confirmPassword}
            </Form.Text>
          </Form.Group>
        )}
        <Button
          variant="primary"
          type="submit"
          className="w-100 no-focus"
          onClick={handleSubmit}
          disabled={Object.keys(errors).length > 0}
        >
          {isLogin ? 'Login' : 'Sign up'}
        </Button>
        <Button
          onClick={switchMode}
          className="mt-3 w-100 no-focus"
          variant="secondary"
        >
          {isLogin
            ? 'Do not have an account? Signup'
            : 'Already have an account? Login'}
        </Button>
      </Form>
    </div>
  );
}
