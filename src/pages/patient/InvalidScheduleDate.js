import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaRegSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";

const InvalidScheduleDate = (props) => {
  return (
    <Card.Body className="d-flex align-items-center justify-content-center bg-white rounded">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h3 className="text-center">Sayang Sekali</h3>
          <div
            className="d-flex align-items-center"
            style={{
              margin: "48px",
            }}
          >
            <FaRegSadTear
              className="align-items-center"
              style={{
                alignItems: "center",
                fontSize: "120px",
                margin: "auto",
              }}
            />
          </div>
          <h5 className="text-center">{props.message}</h5>
          <div className="d-flex align-items-center">
            <Link to={`/`} style={{ margin: "auto" }}>
              <div>Kembali ke halaman awal</div>
            </Link>
            {/* <Button variant="primary" style={{margin: 'auto'}}>Kembali ke halaman sebelumnya</Button> */}
          </div>
        </Col>
      </Row>
    </Card.Body>
  );
};

export default InvalidScheduleDate;
