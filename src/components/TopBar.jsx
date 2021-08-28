import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavDropdownItem from '../common/NavDropdownItem';
import logo from '../images/Logo.png';
import NavItem from '../common/NavItem';
import { logout } from '../actions/auth';
import { CLEAR_CART, RESET_ORDERS } from '../actionTypes/index';

export default function TopBar({ user, cart }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch({ type: CLEAR_CART });
    dispatch({ type: RESET_ORDERS });
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark" sticky="top">
      <Container>
        <Link to="/" className="fs-2 d-flex align-items-center">
          <img src={logo} style={{ height: '40px' }} alt="emart-log" />
          {/* eMart */}
        </Link>
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
            <NavItem url="/cart" icon="shopping-cart" text="Cart" cart={cart} />
            {user ? (
              <NavDropdown
                title={<span className="text-light">{user.name}</span>}
                className="p-1"
                renderMenuOnMount
                id="nav-dropdown"
              >
                {/* <NavDropdown.Item>Account</NavDropdown.Item> */}
                <NavDropdownItem url="/account" text="Account" />
                {user.isVendor && (
                  <>
                    <NavDropdownItem url="/add-product" text="Add product" />
                    <NavDropdownItem url="/products" text="My Products" />
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavItem url="/login" icon="user" text="Login" />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
