import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
  Image,
  Modal
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import image from '../../images/lily-banse--YHSwy6uqvk-unsplash.jpg';
import logo from '../../images/eat_Flavor-black.png';

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState(false);

  const checkNavigation = (data: { email: string }) => {
    if (data.email === 'admin@admin.com') navigate('/admin/orders');
    navigate('/products');
  };

  useEffect(() => {
    const validateToken = async (token: string) => {
      const isValid = await axios
        .post('http://localhost:3001/token', { token })
        .then(r => r.data.validUser);
      return isValid;
    };

    const getUser = async () => {
      const loggedUser = JSON.parse(localStorage.user);
      const isValid = await validateToken(loggedUser.token);
      if (loggedUser && isValid) {
        checkNavigation(loggedUser.email);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoginError(false), 2000);
  }, [loginError]);

  const logIn = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post('https://eatflavor-bd.herokuapp.com/login', {
        email,
        password
      })
      .then(r => {
        localStorage.setItem('user', r.data);
        checkNavigation(r.data);
      })
      .catch(() => setLoginError(true));
  };

  return (
    <Container
      fluid
      style={{ width: '100vw', height: '100vh' }}
      className="d-flex justify-content-center"
    >
      <Modal show={loginError}>
        <Modal.Body>Email ou senha inválidos</Modal.Body>
      </Modal>

      <Image
        src={logo}
        style={{ width: '138px', height: '138px', left: '80px', top: '50px' }}
        className="w-5 h-5 position-absolute"
      />
      <Row className="w-100">
        <Col className="w-50 d-flex justify-content-center">
          <Card className="h-50 w-50 align-self-center text-center overflow-hidden shadow border-none">
            <Row className="h-100">
              <Col className="">
                <Card.Body className="h-100">
                  <Row>
                    <Card.Title className="mt-4 mb-1 mx-5 col-10">
                      <h1 className="fw-bold">Faça Login!</h1>
                    </Card.Title>
                  </Row>
                  <Row>
                    <Form onSubmit={e => logIn(e)}>
                      <Form.Group
                        className="my-4 mx-2 col-12"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          value={email}
                          onChange={({ target }) => setEmail(target.value)}
                          type="email"
                          placeholder="seu@email.com"
                        />
                      </Form.Group>

                      <Form.Group
                        className="my-4 mx-2 col-12"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          value={password}
                          onChange={({ target }) => setPassword(target.value)}
                          type="password"
                          placeholder="********"
                        />
                      </Form.Group>

                      <Button
                        variant="success"
                        type="submit"
                        className="my-3 mx-2 col-12"
                      >
                        Login
                      </Button>

                      <Button
                        variant="outline-success"
                        type="submit"
                        className="my-3 mx-2 col-12"
                        onClick={() => navigate('/register')}
                      >
                        Ainda não tenho uma conta!
                      </Button>
                    </Form>
                  </Row>
                </Card.Body>
              </Col>
              <Col>
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover'
                  }}
                  className="w-100 h-100"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
