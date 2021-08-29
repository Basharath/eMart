import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Joi from 'joi-browser';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from '../common/FormGroup';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
export default function Account() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = ({ currentTarget: input }) => {
    setForm((prev) => ({ ...prev, [input.name]: input.value }));
    setErrors({});
  };

  const formSchema = {
    oldPassword: Joi.label('Old password'),
    newPassword: Joi.string().min(8).required().label('New password'),
    confirmNewPassword: Joi.any()
      .equal(Joi.ref('newPassword'))
      .label('Confirm new password')
      .options({ language: { any: { allowOnly: 'must match Password' } } }),
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

    const errs = validateForm(form);
    setErrors({ ...(errs || {}) });
    if (errs) return;

    dispatch({});
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
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
    </div>
  );
}
