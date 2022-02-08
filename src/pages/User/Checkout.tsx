import { useEffect, useState } from 'react';
import { Button, Form, Offcanvas, Row } from 'react-bootstrap';
import { ProductType } from '../Products/ProductCard';
import CheckoutCard from './CheckoutCard';

interface CheckoutProps {
  show: boolean;
  onHide: (value: boolean) => void;
}

export type CheckoutProductType = {
  category: string;
  description: string;
  type: string;
  name: string;
  price: number;
  url_image: string;
  _id: string;
  cont: number;
};

function Checkout({ show, onHide }: CheckoutProps) {
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage && localStorage.checkout) {
        const { products: productsList, total: totalPrice } = JSON.parse(
          localStorage.checkout
        );
        setProducts(productsList);
        setTotal(totalPrice);
      }
    } catch (err) {
      console.error(err);
    }
  }, [show]);

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      style={{ width: '32rem' }}
    >
      <Offcanvas.Header>
        <Offcanvas.Title>
          <h1 className="fw-bold">Finalizar pedido</h1>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="h-50 m-auto">
          {products.length !== 0 &&
            products.map((product: ProductType) => (
              <CheckoutCard product={product} key={product.name} />
            ))}
        </Row>
        <Row className="m-auto mt-5" style={{ height: '200px' }}>
          <Row className="h-50 p-0 m-auto">
            <Form>
              <Form.Group>
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  value={address}
                  onChange={({ target }) => setAddress(target.value)}
                  type="text"
                  placeholder="Bairro, Rua e Número"
                />
              </Form.Group>
            </Form>
          </Row>
          <Row className="h-50 m-auto">
            <h2 className="fw-bold">Total: € {total.toFixed(2)}</h2>
            <Button variant="success">Finalizar compra</Button>
          </Row>
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Checkout;
