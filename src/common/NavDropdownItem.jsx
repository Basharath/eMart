// import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function NavItem({ url, text }) {
  return (
    <Link
      to={url}
      className="text-primary mx-auto p-1 text-decoration-none d-block dropdown-item"
    >
      <span className="p-2">{text}</span>
    </Link>
  );
}
