import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { OrderType } from '../OrderTrack';
import SaleCard from '../Orders/SaleCard';

function AdminOrders() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const { token } = JSON.parse(localStorage.user);
      setLoading(true);
      axios
        .get('https://eatflavor-bd.herokuapp.com/sales', {
          headers: { authorization: token }
        })
        .then(r => {
          setLoading(false);
          setSales(r.data.sales);
        })
        .catch(() => setLoading(false));
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <Container fluid="lg" className="d-grid" style={{ height: '866px' }}>
      <Row className="w-100 mt-5" style={{ height: '50vh' }}>
        <Row
          className="m-auto d-flex justify-content-between"
          style={{ height: '90%' }}
        >
          {!loading ? (
            sales.map((sale: OrderType) => (
              <SaleCard sale={sale} key={sale._id} />
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

export default AdminOrders;
