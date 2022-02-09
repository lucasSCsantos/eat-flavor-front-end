import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import ProductCard, { ProductType } from './ProductCard';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      let token = '';
      if (localStorage && localStorage.user) {
        token = JSON.parse(localStorage.user).token;
      }

      axios
        .get('https://eatflavor-bd.herokuapp.com/products', {
          headers: { authorization: token }
        })
        .then(r => {
          setProducts(r.data.products);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return (
    <Container fluid="lg" className="d-grid" style={{ height: '866px' }}>
      <Row className="w-100 pt-5 mt-5" style={{ height: '50vh' }}>
        <Row className="m-auto">
          <h1 className="fw-bold mb-4">Menu do dia</h1>
        </Row>
        <Row
          className="m-auto d-flex justify-content-between"
          style={{ height: '90%' }}
        >
          {!loading ? (
            products.map((product: ProductType) => (
              <ProductCard product={product} key={product.name} />
            ))
          ) : (
            <Spinner
              animation="border"
              role="status"
              className="m-auto"
              style={{ width: '10rem', height: '10rem' }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Row>
      </Row>
    </Container>
  );
}

export default Products;
