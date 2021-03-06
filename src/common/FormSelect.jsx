import Form from 'react-bootstrap/Form';

export default function FormSelect({ label, name, arr, error, ...rest }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        aria-label="Select category"
        name={name}
        className="no-focus"
        {...rest}
      >
        <option>Select {label.toString().toLowerCase()}</option>
        {arr.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name[0].toString().toUpperCase() + c.name.slice(1)}
          </option>
        ))}
      </Form.Select>
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
}
