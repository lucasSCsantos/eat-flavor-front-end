import { Button, Card, Col, Row } from 'react-bootstrap';
import removeOfCart from '../../helpers/removeOfCart';
import { ProductType } from '../Products/ProductCard';

interface ProductCardProps {
  product: ProductType;
}

function CheckoutCard({ product }: ProductCardProps) {
  return (
    <Card style={{ width: '30rem', height: '6.375rem' }} className="p-0 shadow">
      <Card.Body>
        <Row className="h-50">
          <Card.Title>
            <h4 className="fw-bold">
              {product.cont}x {product.name}
            </h4>
          </Card.Title>
        </Row>
        <Row className="h-50">
          <Col className="align-self-end">
            <h5 className="fw-light fs-32 text-success">
              € {product.price.toFixed(2)}
            </h5>
          </Col>
          <Col className="align-self-center">
            <Row className="mx-2">
              <Button
                variant="success"
                style={{ height: '30px', textAlign: 'center' }}
                className="p-0"
                onClick={() => {
                  removeOfCart(product);
                  window.location.reload();
                }}
              >
                Remover
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CheckoutCard;
