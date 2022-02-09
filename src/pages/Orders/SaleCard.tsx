import moment from 'moment';
import { useEffect, useState } from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
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

  const { pathname } = useLocation();
  const role = pathname.includes('admin') ? 'admin' : 'user';

  useEffect(() => {
    const data = checkStatus(sale.status);
    setStatusData(data);
  }, [sale]);

  return (
    <Card
      style={{ width: '38rem', height: 'fit-content' }}
      className="p-0 shadow-sm mb-4"
    >
      <Link
        to={`/${role}/${sale._id}/track`}
        style={{ textDecoration: 'none' }}
      >
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
                  {moment(sale.sale_date).format('DD/MM/YYYY')}
                </h4>
              </Col>
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
