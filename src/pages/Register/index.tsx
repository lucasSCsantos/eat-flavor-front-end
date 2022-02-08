import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
  Image,
  Spinner
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import image from '../../images/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg';
import logo from '../../images/eat_Flavor-black.png';

function Register() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setRegisterError(false), 2000);
  }, [registerError]);

  const signOn = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('https://eatflavor-bd.herokuapp.com/register', {
        name,
        email,
        password
      })
      .then(r => {
        localStorage.setItem('user', JSON.stringify(r.data));
        navigate('/user/products');
      })
      .then(() => setLoading(false))
      .catch(() => setRegisterError(true));
  };

  return (
    <Container
      fluid
      style={{ width: '100vw', height: '100vh' }}
      className="d-flex justify-content-center"
    >
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
                    <Card.Title className="mt-4 mb-2 mx-5 col-10">
                      <h1 className="fw-bold">Registre-se!</h1>
                    </Card.Title>
                  </Row>
                  <Row>
                    <Form onSubmit={e => signOn(e)}>
                      <Form.Group
                        className="my-3 mx-2 col-12"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          value={name}
                          onChange={({ target }) => setName(target.value)}
                          type="text"
                          placeholder="Seu Nome"
                        />
                      </Form.Group>

                      <Form.Group
                        className="my-3 mx-2 col-12"
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
                        className="my-3 mx-2 col-12"
                        controlId="formBasicName"
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
                        Registrar
                      </Button>
                    </Form>
                  </Row>
                </Card.Body>
              </Col>
              <Col>
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  className="w-100 h-100"
                />
              </Col>
            </Row>
          </Card>
          {loading && (
            <Spinner
              animation="border"
              role="status"
              className="position-absolute"
              style={{ bottom: '150px' }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
