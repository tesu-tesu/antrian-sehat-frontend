import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShowQRCode from "./ShowQRCode";

const ModalShowQR = (props) => {
  return (
    <>
      <Modal {...props} backdrop={props.closable ? true : "static"}>
        <Modal.Header closeButton={props.closable}>
          <Modal.Title centered="true">{props.message}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex align-items-center justify-content-center text-center">
          <ShowQRCode waitingList={props.waitingList} />
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center">
          {props.closable ? (
            <Button variant="primary" onClick={props.onHide}>
              Close
            </Button>
          ) : (
            <Link to={props.linkto}>
              <Button variant="primary">Kembali ke Halaman Utama</Button>
            </Link>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalShowQR;
