import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import checkStatus, { StatusDataType } from '../../helpers/checkStatus';
import orderMock from '../../mocks/orderMock';
import { ProductType } from '../Products/ProductCard';

export type OrderType = {
  address: string;
  total_price: number;
  sale_date: Date;
  status: string;
  products: ProductType[];
  user_id: string;
  _id: string;
};

function OrderTrack() {
  const [order, setOrder] = useState<OrderType>(orderMock);
  const { order: id } = useParams();
  const [statusData, setStatusData] = useState<StatusDataType>({
    name: '',
    color: ''
  });
  const [disabled, setDisabled] = useState(true);
  const [reload, setReload] = useState(false);
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    try {
      const { token } = JSON.parse(localStorage.user);

      axios
        .get(`https://eatflavor-bd.herokuapp.com/sales/${id}`, {
          headers: { authorization: token }
        })
        .then(r => {
          setOrder(r.data);
        })
        .catch(() => console.log('erro'));
    } catch (err) {
      console.error(err);
    }
  }, [reload]);

  useEffect(() => {
    const data = checkStatus(order.status);
    setStatusData(data);
  }, [order]);

  useEffect(() => {
    if (statusData.name === 'Enviado') setDisabled(false);
  }, [statusData]);

  const confirm = async () => {
    try {
      const { token } = JSON.parse(localStorage.user);
      axios
        .put(
          `https://eatflavor-bd.herokuapp.com/sales/${id}`,
          {
            status: 'delivered'
          },
          { headers: { authorization: token } }
        )
        .then(() => {
          setDelivered(true);
          setReload(!reload);
        })
        .catch(() => console.log('erro'));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid="lg" className="d-grid" style={{ height: '866px' }}>
      {order.address && (
        <Row className="w-100 mt-5 m-auto" style={{ height: '50vh' }}>
          <Row className="m-auto h-25">
            <h1 className="fw-bold mb-4">Pedido #{id && id.slice(0, 8)}</h1>
            <h3 className="fw-regular mb-4 text-secondary">{order.address}</h3>
          </Row>
          <Row className="m-auto h-50">
            <Col className="w-100">
              <h2>Status:</h2>
              <Badge
                pill
                bg={statusData.color}
                className="px-5 my-3"
                style={{ width: 'fit-content', height: '40px' }}
              >
                <h4>{statusData.name}</h4>
              </Badge>
            </Col>
          </Row>
          <Row className="w-100 justify-content-end m-auto">
            <Row className="w-100 justify-content-end">
              <h1 className="fw-bold w-25">Total: € {order.total_price}</h1>
            </Row>
            <Row className="w-100 justify-content-end">
              {delivered ? (
                <h2 className="fw-regular w-25 text-center">Pedido entregue</h2>
              ) : (
                <Button
                  variant="success"
                  className="w-25"
                  disabled={disabled}
                  onClick={() => confirm()}
                >
                  Confirmar Entrega
                </Button>
              )}
            </Row>
          </Row>
        </Row>
      )}
    </Container>
  );
}

export default OrderTrack;
