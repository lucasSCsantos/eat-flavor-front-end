import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import addToCart from '../../helpers/addToCart';

interface ProductCardProps {
  product: ProductType;
}

export type ProductType = {
  category: string;
  description: string;
  type: string;
  name: string;
  price: number;
  url_image: string;
  _id: string;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      style={{ width: '24rem', height: '32.086rem' }}
      className="p-0 shadow-lg"
    >
      <Card.Img
        variant="top"
        src={product.url_image}
        style={{ objectFit: 'cover' }}
        className="p-0"
        height="269"
      />
      <Card.Body>
        <Row className="h-75">
          <Card.Title>
            <h1 className="fw-bold">{product.name}</h1>
            <Badge pill bg="success" className="ml-1">
              {product.type}
            </Badge>
          </Card.Title>

          <Card.Text className="h-75">{product.description}</Card.Text>
        </Row>
        <Row className="h-25">
          <Col className="align-self-end">
            <h3 className="fw-light text-success">
              € {product.price.toFixed(2)}
            </h3>
          </Col>
          <Col>
            <Button
              variant="success"
              className="w-100 h-100"
              onClick={() => addToCart(product)}
            >
              Adicionar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
