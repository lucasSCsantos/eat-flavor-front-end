import { useState } from 'react';
import { Button, Form, Offcanvas, Row } from 'react-bootstrap';
import CheckoutCard from './CheckoutCard';

interface CheckoutProps {
  show: boolean;
  onHide: (value: boolean) => void;
}

function Checkout({ show, onHide }: CheckoutProps) {
  const [cep, setCep] = useState('');

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      backdrop={false}
      style={{ width: '32rem', marginTop: '108px' }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h1 className="fw-bold">Finalizar pedido</h1>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="h-50 m-auto">
          <CheckoutCard />
        </Row>
        <Row className="m-auto mt-5" style={{ height: '200px' }}>
          <Row className="h-50 p-0 m-auto">
            <Form>
              <Form.Group>
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  value={cep}
                  onChange={({ target }) => setCep(target.value)}
                  type="text"
                  placeholder="00000-000"
                />
              </Form.Group>
            </Form>
          </Row>
          <Row className="h-50 m-auto">
            <h2 className="fw-bold">Total: R$ 800,00</h2>
            <Button variant="success">Finalizar compra</Button>
          </Row>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Checkout;
