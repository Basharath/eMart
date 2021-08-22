/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login, signup } from '../actions/auth';
import FormGroup from '../common/FormGroup';
import { AUTH_ERROR } from '../actionTypes/index';

const initialState = { name: '', email: '', password: '', confirmPassword: '' };
export default function Login() {
  const localData = JSON.parse(localStorage.getItem('auth'));
  const [isLogin, setIsLogin] = useState(localData ? !localData.signup : true);
  const [form, setForm] = useState(initialState);
  const [isVendor, setIsVendor] = useState(
    localData ? localData.vendor : false
  );
  const [errors, setErrors] = useState({});

  const { error: authError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const errs = { ...errors, auth: authError };
    setErrors(errs);
  }, [authError]);

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
    const signupData = { name, email, password, ...(isVendor && { isVendor }) };

    const data = isLogin ? loginData : form;
    const errs = validateForm(data);
    setErrors({ ...(errs || {}) });
    if (errs) return;

    if (isLogin) dispatch(login(loginData, location, history));
    else dispatch(signup(signupData, location, history));
  };

  const switchMode = () => {
    setForm(() => initialState);
    localStorage.setItem(
      'auth',
      JSON.stringify({ signup: isLogin, vendor: false })
    );
    setIsLogin((prevState) => !prevState);
    setIsVendor(false);
    dispatch({ type: AUTH_ERROR, payload: null });
  };

  const handleVendorSignup = () => {
    setIsVendor(true);
    setIsLogin(false);
    localStorage.setItem(
      'auth',
      JSON.stringify({ signup: true, vendor: true })
    );
  };

  const handleVendorWarning = () => {
    setIsVendor(false);
    localStorage.setItem(
      'auth',
      JSON.stringify({ signup: true, vendor: false })
    );
  };

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center ${
        isLogin ? 'mt-5' : 'mt-4'
      }`}
      style={{}}
    >
      <Form className="shadow rounded p-4" style={{ width: '350px' }}>
        {isVendor && (
          <div className="text-center">
            <div className="text-danger text-center">
              Note: You are signing up as a seller
            </div>
            <button
              type="button"
              className="reset text-primary vendor-warning-btn mb-1"
              onClick={handleVendorWarning}
            >
              If not sure click this to sign up as a USER
            </button>
          </div>
        )}
        {!isLogin && (
          <FormGroup
            name="name"
            label="Name"
            autoFocus
            error={errors.name}
            onChange={handleChange}
            value={form.name}
            placeholder={
              isVendor ? 'Enter brand/company name' : 'Enter your name'
            }
            seller={isVendor}
          />
        )}
        <FormGroup
          name="email"
          label="Email address"
          type="email"
          autoFocus
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
          {
            // eslint-disable-next-line no-nested-ternary
            isVendor ? 'Sign up as a seller' : isLogin ? 'Login' : 'Sign up'
          }
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
      {!isLogin && (
        <div className="text-center mt-2">
          <div className="text-secondary">Want to be a seller?</div>
          <button
            type="button"
            className="reset text-dark vendor-btn"
            onClick={handleVendorSignup}
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
}
