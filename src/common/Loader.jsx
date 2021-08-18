import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
  return (
    <div className="loader">
      <Spinner variant="primary" animation="grow" />
    </div>
  );
}
