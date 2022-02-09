import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { BsReceipt, BsBoxArrowRight } from 'react-icons/bs';
import logo from '../../images/eat_Flavor-black.png';

function Admin() {
  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="Eat Flavor logo"
            />
          </Navbar.Brand>
          <Nav className="ml-auto d-flex w-25 justify-content-end">
            <Nav.Link href="/admin/orders">
              <BsReceipt size={40} className="text-dark" />
            </Nav.Link>
            <Nav.Link style={{ marginLeft: '33.3px' }}>
              <BsBoxArrowRight size={40} className="text-dark" />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Admin;
