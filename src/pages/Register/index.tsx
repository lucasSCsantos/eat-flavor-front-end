import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
  Image
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import image from '../../images/lily-banse--YHSwy6uqvk-unsplash.jpg';
import logo from '../../images/eat_Flavor-black.png';

function Register() {
  const navigate = useNavigate();
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
                    <Card.Title className="mt-4 mb-1 mx-5 col-10">
                      <h1 className="fw-bold">Faça Login!</h1>
                    </Card.Title>
                  </Row>
                  <Row>
                    <Form>
                      <Form.Group
                        className="my-4 mx-2 col-12"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="seu@email.com"
                        />
                      </Form.Group>

                      <Form.Group
                        className="my-4 mx-2 col-12"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="********" />
                      </Form.Group>

                      <Button
                        variant="success"
                        type="submit"
                        className="my-3 mx-2 col-12"
                      >
                        Login
                      </Button>
                    </Form>
                  </Row>
                </Card.Body>
              </Col>
              <Col className="p-0">
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

export default Register;
