// import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function NavItem({ url, text, icon }) {
  return (
    <Link to={url} className="text-light m-auto px-1 text-decoration-none">
      <i className={`fas fs-5 fa-${icon}`} />
      <span className="p-2">{text}</span>
    </Link>
  );
}
