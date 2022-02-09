import moment from 'moment';
import { useEffect, useState } from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import checkStatus, { StatusDataType } from '../../helpers/checkStatus';
import { OrderType } from '../OrderTrack';

interface SaleCardProps {
  sale: OrderType;
}

function SaleCard({ sale }: SaleCardProps) {
  const [statusData, setStatusData] = useState<StatusDataType>({
    name: '',
    color: ''
  });

  useEffect(() => {
    const data = checkStatus(sale.status);
    setStatusData(data);
  }, [sale]);

  return (
    <Card
      style={{ width: '38rem', height: '10rem' }}
      className="p-0 shadow-sm mb-4"
    >
      <Link to={`/user/${sale._id}/track`} style={{ textDecoration: 'none' }}>
        {sale && (
          <Card.Body>
            <Row className="h-50">
              <Col className="col-7">
                <Card.Title>
                  <h2 className="fw-bold text-dark">
                    Pedido #{sale._id.slice(0, 8)}
                  </h2>
                  <h5 className="fw-regular text-secondary">{sale.address}</h5>
                </Card.Title>
              </Col>
              <Col className="col-5 text-end">
                <h4 className="fw-regular text-dark">
                  {moment(sale.sale_date).format('YYYY/MM/DD')}
                </h4>
              </Col>

              {/* <Card.Text className="h-75">{product.description}</Card.Text> */}
            </Row>

            <Row className="h-50">
              <Col className="align-self-end col-5">
                <h3 className="fw-light text-success">
                  € {sale.total_price.toFixed(2)}
                </h3>
              </Col>
              <Col className="col-7">
                <Row className="h-100 justify-content-end">
                  <Badge
                    pill
                    bg={statusData.color}
                    className="px-3 align-self-end"
                    style={{
                      width: 'fit-content',
                      height: '40px',
                      marginRight: '10px',
                      marginBottom: '5px'
                    }}
                  >
                    <h4>{statusData.name}</h4>
                  </Badge>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Link>
    </Card>
  );
}

export default SaleCard;
