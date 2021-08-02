import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

export default function TopBar() {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="fs-2">
          eMart
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
            <Nav.Link href="#action2" className="text-light m-auto">
              <i className="fas fa-receipt fs-5" />
              <span className="p-2">Orders</span>
            </Nav.Link>
            <Nav.Link href="#action3" className="m-auto text-light">
              <i className="fas fa-shopping-cart fs-5 " />
              <span className="p-2">Cart</span>
            </Nav.Link>
            {/* <Nav.Link href="#action1" className="text-light m-auto">
              <i className="fas fa-sign-out-alt fs-5" />
              <span className="p-2">Basharath</span>
            </Nav.Link> */}
            <Nav.Link href="#action1" className="text-light m-auto">
              <i className="fas fa-user fs-5" />
              <span className="p-2">Login</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
