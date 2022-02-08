import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router';

function Products() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>dd</Nav.Link>
            <Nav.Link>d</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Products;
