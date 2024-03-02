import { Children } from "react";
import { Col, Container, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <section>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            {children}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FormContainer;
