// import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function NavItem({ url, text, icon, onClick }) {
  return (
    <Link
      to={url}
      className="text-light my-2 mx-auto p-1 text-decoration-none"
      onClick={onClick}
    >
      <i className={`fas fs-5 fa-${icon}`} />
      <span className="p-2">{text}</span>
    </Link>
  );
}
