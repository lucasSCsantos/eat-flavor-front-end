import { Container, Row } from 'react-bootstrap';

function OrderTrack() {
  return (
    <Container fluid="lg" className="d-grid" style={{ height: '866px' }}>
      <Row className="w-100 pt-5 mt-5" style={{ height: '50vh' }}>
        <Row className="m-auto">
          <h1 className="fw-bold mb-4">Menu do dia</h1>
        </Row>
        <Row
          className="m-auto d-flex justify-content-between"
          style={{ height: '90%' }}
        />
      </Row>
    </Container>
  );
}

export default OrderTrack;
