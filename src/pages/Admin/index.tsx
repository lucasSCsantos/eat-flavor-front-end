import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router';
import { BsReceipt, BsBoxArrowRight } from 'react-icons/bs';
import { useEffect } from 'react';
import axios from 'axios';
import logo from '../../images/eat_Flavor-black.png';

function Admin() {
  const navigate = useNavigate();

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
        if (!isValid || loggedUser.email !== 'admin@admin.com') {
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
          <Nav className="ml-auto d-flex w-25 justify-content-end">
            <Nav.Link href="/admin/orders">
              <BsReceipt size={40} className="text-dark" />
            </Nav.Link>
            <Nav.Link style={{ marginLeft: '33.3px' }}>
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
      <Outlet />
    </>
  );
}

export default Admin;
