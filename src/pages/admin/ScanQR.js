import React from "react";
import QrReader from "react-qr-reader";
import { Row, Col, Container } from "react-bootstrap";
import {
  POST_CHANGE_STATUS,
  POST_CHECK_QRCODE,
  JWT_HEADER,
} from "constants/urls";
import axios from "axios";

const ScanQR = () => {
  const [delay, setDelay] = React.useState(100);
  const [result, setResult] = React.useState("No Result");
  const [error, setError] = React.useState([]);
  const [isQRCodeRead, setIsQRCodeRead] = React.useState(0);

  //After Post Button
  const [isSuccess, setIsSuccess] = React.useState(0);
  const [message, setMessage] = React.useState("");

  const handleScan = (qrcode) => {
    if (qrcode && !isQRCodeRead) {
      setIsQRCodeRead(1);
      setResult(qrcode);
      checkUserQRCode(qrcode);
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  // Post Function
  const checkUserQRCode = (qrcode) => {
    axios
      .post(
        POST_CHECK_QRCODE(qrcode),
        {},
        { headers: { Authorization: `Bearer ${JWT_HEADER}` } }
      )
      .then((res) => {
        setIsSuccess(res.data.success);
        setMessage(res.data.message);
        if (res.data.success) 
          proccess(res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancel = (id) => {
    validation(id, 4);
  };

  const proccess = (id) => {
    validation(id, 2);
  };

  const done = (id) => {
    validation(id, 3);
  };

  const validation = (id, status) => {
    axios
      .post(
        POST_CHANGE_STATUS(id, status),
        {},
        { headers: { Authorization: `Bearer ${JWT_HEADER}` } }
      )
      .then((res) => {
        setIsSuccess(res.data.success);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <span className="text-danger ml-2">{message}</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ScanQR;
