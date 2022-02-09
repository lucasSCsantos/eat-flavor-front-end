import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router';
import {
  BsFillHouseFill,
  BsReceipt,
  BsBagFill,
  BsBoxArrowRight
} from 'react-icons/bs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../images/eat_Flavor-black.png';
import Checkout from './Checkout';

function User() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const validateToken = async (token: string) => {
      const isValid = await axios
        .post('https://eatflavor-bd.herokuapp.com/validate', { token })
        .then(r => r.data.validUser);
      return isValid;
    };

    const getUser = async () => {
      try {
        const loggedUser = JSON.parse(localStorage.user);
        const isValid = await validateToken(loggedUser.token);
        if (!isValid) {
          navigate('/login');
        }
      } catch (err) {
        navigate('/login');
      }
    };

    getUser();
  }, [navigate]);
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

export default User;
