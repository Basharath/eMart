import Form from 'react-bootstrap/Form';

export default function FormGroup({
  label,
  name,
  error,
  type = 'text',
  classes = 'mb-3',
  ...rest
}) {
  return (
    <Form.Group className={classes}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder="Enter your name"
        className="no-focus"
        name={name}
        {...rest}
      />
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
}
