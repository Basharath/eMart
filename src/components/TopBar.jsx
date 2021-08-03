import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import logo from '../images/Logo.png';
import NavItem from '../common/NavItem';

export default function TopBar() {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="fs-2">
          <img src={logo} style={{ height: '50px' }} alt="emart-log" />
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
            <NavItem url="#action1" icon="receipt" text="Orders" />
            <NavItem url="#action2" icon="shopping-cart" text="Cart" />
            <NavItem url="#action3" icon="user" text="Login" />
            {/* <NavItem url="#action3" icon="sign-out-alt" text="Basharath" /> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
