import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import logo from '../images/Logo.png';
import NavItem from '../common/NavItem';
import { logout } from '../actions/auth';

export default function TopBar() {
  const { authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="fs-2">
          <img src={logo} style={{ height: '40px' }} alt="emart-log" />
          {/* eMart */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="no-focus" />
        <Navbar.Collapse id="navbarScroll" className="">
          <Form className="mx-auto w-50 search-mobile">
            <InputGroup>
              <FormControl
                placeholder="Search"
                className="no-border"
                type="search"
                aria-label="Search"
              />
              <InputGroup.Text className="bg-white no-border">
                <i className="fas fa-search" />
              </InputGroup.Text>
            </InputGroup>
          </Form>
          <Nav className="mr-2" navbarScroll>
            <NavItem url="/orders" icon="receipt" text="Orders" />
            <NavItem url="/cart" icon="shopping-cart" text="Cart" />
            {authData ? (
              <NavItem
                url="/login"
                icon="sign-out-alt"
                text={authData.name}
                onClick={handleLogout}
              />
            ) : (
              <NavItem url="login" icon="user" text="Login" />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
