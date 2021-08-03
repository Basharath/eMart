import Nav from 'react-bootstrap/Nav';

export default function NavItem({ url, text, icon }) {
  return (
    <Nav.Link href={url} className="text-light m-auto">
      <i className={`fas fs-5 fa-${icon}`} />
      <span className="p-2">{text}</span>
    </Nav.Link>
  );
}
