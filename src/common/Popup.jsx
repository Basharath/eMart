import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Popup({
  show,
  handleClose,
  handleConfirm,
  order = false,
}) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" className="popup">
      <Modal.Body className="d-flex flex-column align-items-center text-center p-4">
        <p className="fs-5">
          Do you really want to
          {order ? ' cancel the order?' : ' delete the product?'}
        </p>
        <div className="mt-2">
          <Button variant="success" onClick={handleClose} className="mx-3 px-4">
            No
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            className="mx-3 px-4"
          >
            Yes
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
