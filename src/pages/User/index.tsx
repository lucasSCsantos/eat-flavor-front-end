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
  const [total, setTotal] = useState(0);
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

  useEffect(() => {
    try {
      const loggedUser = JSON.parse(localStorage.user);
      const checkout = JSON.parse(localStorage[`checkout_${loggedUser.email}`]);
      const quant = checkout.products.reduce(
        (acc: number, curr: { cont: number }) => acc + curr.cont,
        0
      );
      if (checkout) setTotal(quant);
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/users/products">
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
            <Nav.Link className="position-relative">
              <div
                className="bg-success rounded-circle text-center"
                style={{
                  width: '30px',
                  height: '30px',
                  position: 'absolute',
                  top: '30px',
                  left: '-5px'
                }}
              >
                <h4>{total}</h4>
              </div>
              <BsBagFill
                size={40}
                className="text-dark"
                onClick={() => setShow(!show)}
              />
            </Nav.Link>
            <Nav.Link>
              <BsBoxArrowRight
                size={40}
                className="text-dark"
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.reload();
                }}
              />
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
