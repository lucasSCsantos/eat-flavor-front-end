import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { OrderType } from '../OrderTrack';
import SaleCard from './SaleCard';

function Orders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const { token, _id: id } = JSON.parse(localStorage.user);
    const getUserSales = (array: Array<OrderType>) =>
      array.filter(arr => arr.user_id === id);

    axios
      .get('https://eatflavor-bd.herokuapp.com/sales', {
        headers: { authorization: token }
      })
      .then(r => {
        const salesList = getUserSales(r.data.sales);
        console.log(salesList);
        setSales(salesList as never[]);
      })
      .catch(() => console.log('erro'));
  }, []);

  useEffect(() => {}, []);

  return (
    <Container fluid="lg" className="d-grid" style={{ height: '866px' }}>
      <Row className="w-100 mt-5" style={{ height: '50vh' }}>
        <Row
          className="m-auto d-flex justify-content-between"
          style={{ height: '90%' }}
        >
          {sales.map((sale: OrderType) => (
            <SaleCard sale={sale} key={sale._id} />
          ))}
        </Row>
      </Row>
    </Container>
  );
}

export default Orders;
