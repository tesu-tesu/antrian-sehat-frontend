import React from "react";
import QrReader from "react-qr-reader";
import { Row, Col, Container } from "react-bootstrap";

const ScanQR = () => {
  const [delay, setDelay] = React.useState(100);
  const [result, setResult] = React.useState("No Result");
  const [error, setError] = React.useState([]);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col lg="12">
            <QrReader
              delay={delay}
              onError={(err) => {
                handleError(err);
              }}
              onScan={(res) => {
                handleScan(res);
              }}
              style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mx-auto text-center" lg="12">
            <h5>{result}</h5>
            <span className="text-danger ml-2">
              Kurang validasi apakah QR Sudah terdaftar ? Jika iya, akan muncul
              pesan ini
            </span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ScanQR;
