import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form, Modal, Offcanvas, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
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
  const [checkoutError, setCheckoutError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      let email = '';
      if (localStorage && localStorage.user) {
        email = JSON.parse(localStorage.user).email;
      }

      if (localStorage && localStorage[`checkout_${email}`]) {
        const {
          products: productsList,
          total: totalPrice,
          user
        } = JSON.parse(localStorage[`checkout_${email}`]);
        if (user === email) {
          setProducts(productsList);
          setTotal(totalPrice);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [show]);

  const checkOut = () => {
    try {
      const { _id: id, token, email } = JSON.parse(localStorage.user);

      if (address && products) {
        setLoading(true);
        axios
          .post(
            'https://eatflavor-bd.herokuapp.com/sales',
            {
              address,
              total_price: total,
              sale_date: new Date(),
              status: 'pending',
              products,
              user_id: id
            },
            { headers: { authorization: token } }
          )
          .then(r => {
            localStorage.removeItem(`checkout_${email}`);
            onHide(false);
            navigate(`/user/${r.data._id}/track`);
            window.location.reload();
            setLoading(false);
            setAddress('');
          })
          .catch(() => console.log('erro'));
      } else {
        setCheckoutError(true);
        setTimeout(() => setCheckoutError(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Modal show={checkoutError}>
        <Modal.Body>
          N??o foi poss??vel concluir a compra, confira sua morada e produtos
        </Modal.Body>
      </Modal>
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
                  <Form.Label>Morada</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={({ target }) => setAddress(target.value)}
                    type="text"
                    placeholder="Bairro, Rua e N??mero"
                  />
                </Form.Group>
              </Form>
            </Row>
            <Row className="h-50 m-auto">
              <h2 className="fw-bold">Total: ??? {+total.toFixed(2)}</h2>
              <Button variant="success" onClick={() => checkOut()}>
                Finalizar compra
              </Button>
              {loading && (
                <Spinner
                  animation="border"
                  role="status"
                  className="m-auto mt-5"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Row>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Checkout;
