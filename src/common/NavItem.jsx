// import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

export default function NavItem({ url, text, icon, onClick, cart }) {
  return (
    <Link
      to={url}
      className="text-light my-2 mx-auto p-1 text-decoration-none"
      onClick={onClick}
    >
      <span className="cart-container">
        <i className={`fas fs-5 fa-${icon}`} />
        {cart && (
          <Badge bg="danger" pill className="cart-badge">
            {cart.length || null}
          </Badge>
        )}
      </span>
      <span className="p-2">{text}</span>
    </Link>
  );
}
