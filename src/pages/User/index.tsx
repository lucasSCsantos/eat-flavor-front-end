import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router';
import {
  BsFillHouseFill,
  BsReceipt,
  BsBagFill,
  BsBoxArrowRight
} from 'react-icons/bs';
import { useState } from 'react';
import logo from '../../images/eat_Flavor-black.png';
import Checkout from './Checkout';

function Products() {
  const [show, setShow] = useState(false);
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
          <Nav className="ml-auto d-flex w-25 justify-content-between">
            <Nav.Link href="/user/products">
              <BsFillHouseFill size={40} className="text-dark" />
            </Nav.Link>
            <Nav.Link href="/user/orders">
              <BsReceipt size={40} className="text-dark" />
            </Nav.Link>
            <Nav.Link>
              <BsBagFill
                size={40}
                className="text-dark"
                onClick={() => setShow(!show)}
              />
            </Nav.Link>
            <Nav.Link>
              <BsBoxArrowRight size={40} className="text-dark" />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Checkout show={show} onHide={() => setShow(false)} />
      <Outlet />
    </>
  );
}

export default Products;
