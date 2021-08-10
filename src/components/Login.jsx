import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login, signup } from '../actions/auth';
import FormGroup from '../common/FormGroup';

const initialState = { name: '', email: '', password: '', confirmPassword: '' };
export default function Login() {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem('login'))
  );
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const { error: authError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const errs = { ...errors, auth: authError };
    setErrors(errs);
  }, [authError]);

  const switchMode = () => {
    setForm(() => initialState);
    localStorage.setItem('login', JSON.stringify(!isLogin));
    setIsLogin((prevState) => !prevState);
    dispatch({ type: 'AUTH_ERROR', payload: null });
  };

  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const formSchema = {
    name: Joi.string().min(4).label('Name'),
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
    delete errors.auth;
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

  // eslint-disable-next-line consistent-return
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = form;
    const loginData = { email, password };
    const signupData = { name, email, password };

    const data = isLogin ? loginData : form;
    const errs = validateForm(data);
    setErrors({ ...(errs || {}) });
    if (errs) return;

    if (isLogin) dispatch(login(loginData, location, history));
    else dispatch(signup(signupData, location, history));
  };

  return (
    <div
      className="mt-5 d-flex justify-content-center align-items-center"
      style={{}}
    >
      <Form className="shadow rounded p-4" style={{ width: '350px' }}>
        {!isLogin && (
          <FormGroup
            name="name"
            label="Name"
            error={errors.name}
            onChange={handleChange}
            value={form.name}
            placeholder="Enter your name"
          />
        )}
        <FormGroup
          name="email"
          label="Email address"
          type="email"
          error={errors.email}
          onChange={handleChange}
          value={form.email}
          placeholder="Enter your email"
        />
        <FormGroup
          name="password"
          label="Password"
          type="password"
          error={errors.password}
          onChange={handleChange}
          value={form.password}
          placeholder="Password"
        />
        {!isLogin && (
          <FormGroup
            name="confirmPassword"
            label="Password"
            type="password"
            error={errors.confirmPassword}
            onChange={handleChange}
            value={form.confirmPassword}
            placeholder="Retype password"
          />
        )}
        {errors.auth && <div className="text-danger mb-2">{errors.auth}</div>}
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
