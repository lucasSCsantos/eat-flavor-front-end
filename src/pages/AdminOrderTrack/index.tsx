import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Badge, Button, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import checkStatus, { StatusDataType } from '../../helpers/checkStatus';
import orderMock from '../../mocks/orderMock';
import { OrderType } from '../OrderTrack';

function AdminOrderTrack() {
  const [order, setOrder] = useState<OrderType>(orderMock);
  const { order: id } = useParams();
  const [statusData, setStatusData] = useState<StatusDataType>({
    name: '',
    color: ''
  });
  const [reload, setReload] = useState(false);

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

  const confirmOrSend = async (status: string) => {
    try {
      const { token } = JSON.parse(localStorage.user);
      axios
        .put(
          `https://eatflavor-bd.herokuapp.com/sales/${id}`,
          {
            status
          },
          { headers: { authorization: token } }
        )
        .then(() => {
          setReload(!reload);
          window.location.reload();
        })
        .catch(() => console.log('erro'));
    } catch (err) {
      console.error(err);
    }
  };

  const confirmButton = (
    <Button
      variant="success"
      className="w-25"
      onClick={() => confirmOrSend('preparing')}
    >
      Confirmar Pedido
    </Button>
  );

  const sendButton = (
    <Button
      variant="success"
      className="w-25"
      onClick={() => confirmOrSend('sent')}
    >
      Notificar Envio
    </Button>
  );

  const concludedText = (
    <h2 className="fw-regular w-25 text-center">Pedido Concluído</h2>
  );

  const awaitingText = (
    <h2 className="fw-regular w-50 text-center">
      Esperando confirmação de entrega...
    </h2>
  );

  const renderSwitch = () => {
    switch (order.status) {
      case 'preparing':
        return sendButton;
      case 'sent':
        return awaitingText;
      case 'delivered':
        return concludedText;
      default:
        return confirmButton;
    }
  };

  return (
    <Container fluid="lg" className="d-grid" style={{ height: '866px' }}>
      {order.address && (
        <Row className="w-100 mt-5 m-auto" style={{ height: '80vh' }}>
          <Row className="m-auto h-25">
            <h1 className="fw-bold mb-4">
              Pedido #{id && id.slice(0, 8)} - Feito{' '}
              {moment(order.sale_date).format('DD/MM/YYYY')} ás{' '}
              {moment(order.sale_date).format('HH:MM:SS')}
            </h1>
            <h3 className="fw-regular mb-4 text-secondary">{order.address}</h3>
            <h2>Status:</h2>
            <Badge
              pill
              bg={statusData.color}
              className="px-5 my-3"
              style={{ width: 'fit-content', height: '40px' }}
            >
              <h4>{statusData.name}</h4>
            </Badge>
          </Row>
          <Row className="m-auto my-5 h-25">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Quantidade</th>
                  <th>Produto</th>
                  <th>Valor Unitário</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map(product => (
                  <tr key={product._id}>
                    <td>{product.cont}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.cont && product.cont * product.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row className="w-100 justify-content-end m-auto">
            <Row className="w-100 justify-content-end">
              <h1 className="fw-bold w-25">Total: € {order.total_price}</h1>
            </Row>
            <Row className="w-100 justify-content-end">{renderSwitch()}</Row>
          </Row>
        </Row>
      )}
    </Container>
  );
}

export default AdminOrderTrack;
