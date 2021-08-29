import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Joi from 'joi-browser';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormGroup from '../common/FormGroup';
import { changePassword } from '../actions/auth';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
export default function Account() {
  const [form, setForm] = useState(initialState);
  const [options, setOptions] = useState({
    changePass: false,
    message: false,
    show: true,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = ({ currentTarget: input }) => {
    setForm((prev) => ({ ...prev, [input.name]: input.value }));
    if (Object.keys(errors).length > 0) setErrors({});
  };

  const formSchema = {
    oldPassword: Joi.label('Old password'),
    newPassword: Joi.string().min(8).required().label('New password'),
    confirmNewPassword: Joi.any()
      .equal(Joi.ref('newPassword'))
      .label('Confirm password')
      .options({ language: { any: { allowOnly: 'must match new password' } } }),
  };

  const validateForm = (data) => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(data, formSchema, option);
    if (!error) return null;

    const errs = {};
    error.details.forEach((item) => {
      errs[item.path[0]] = item.message;
      return 0;
    });

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validateForm(form);
    setErrors({ ...(errs || {}) });
    if (errs) return;

    const { oldPassword, newPassword } = form;
    dispatch({ type: 'START_LOADING' });
    const result = await changePassword({ oldPassword, newPassword });
    dispatch({ type: 'STOP_LOADING' });
    if (result) setOptions({ changePass: false, message: true, show: false });
  };

  const handleChangePass = () =>
    setOptions({ changePass: true, message: false, show: false });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      {options.show && (
        <div>
          <Card onClick={handleChangePass} style={{ cursor: 'pointer' }}>
            <Card.Body>Change your password</Card.Body>
          </Card>
        </div>
      )}
      {options.message && (
        <div>
          <p className="fs-4 mt-4">Your password is successfully changed!</p>
        </div>
      )}
      {options.changePass && (
        <>
          <p className="h4 mb-4">Change your password</p>
          <Form className="shadow rounded p-4 login-form">
            <FormGroup
              name="oldPassword"
              label="Enter old password"
              type="password"
              error={errors.oldPassword}
              onChange={handleChange}
              value={form.oldPassword}
              placeholder="Old password"
            />
            <FormGroup
              name="newPassword"
              label="Enter new password"
              type="password"
              error={errors.newPassword}
              onChange={handleChange}
              value={form.newPassword}
              placeholder="New password"
            />
            <FormGroup
              name="confirmNewPassword"
              label="Confirm new password"
              type="password"
              error={errors.confirmNewPassword}
              onChange={handleChange}
              value={form.confirmNewPassword}
              placeholder="Confirm new password"
            />
            <Button className="w-100" onClick={handleSubmit}>
              Change password
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}
