import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
  return (
    <div className="d-flex justify-content-center w-100 footer pb-3">
      <Container>
        <Row className="text-light mt-4 px-2">
          <Col sm={6} md={3} className="footer-col">
            <p>ABOUT</p>
            <p>Contact us</p>
            <p>About us</p>
            <p>Press</p>
            <p>Corporate Information</p>
            <p>eMart stories</p>
          </Col>
          <Col sm={6} md={3} className="footer-col">
            <p>POLICY</p>
            <p>Return Policy</p>
            <p>Terms of use</p>
            <p>Security</p>
            <p>Privacy</p>
            <p>Sitemap</p>
          </Col>
          <Col sm={6} md={3} className="footer-col">
            <p>SOCIAL</p>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Youtube</p>
            <p>Instagram</p>
            <p>LinkedIn</p>
          </Col>
          <Col sm={6} md={3} className="footer-col">
            <p>Mail Us:</p>
            <p className="footer-address">
              eMart Inc. <br />
              1600 Amphitheatre <br />
              Parkway Mountain View <br />
              CA 94043
            </p>
            <img
              src="https://res.cloudinary.com/cdnupload/image/upload/v1630255742/cards_w8e8ks.svg"
              alt="cards"
              className="w-75"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
