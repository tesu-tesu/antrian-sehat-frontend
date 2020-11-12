import React from "react";
import {Modal, Button, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import ShowQRCode from "./ShowQRCode";

const ModalShow = (props) => {
    const [show, setShow] = React.useState(true);
    const handleClose = () => setShow(false);
  
    return (
      <>
      <style type="text/css">
        {`
        .bold {
          font-weight: bold;
        }
        `}
      </style>
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header>
          <Modal.Title className="text-center">{props.message}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex align-items-center justify-content-center text-center">
            <ShowQRCode 
            residenceNumber={props.residenceNumber}
            registeredDate={props.registeredDate}
            qr={props.qr}
            ordNumber={props.ordNumber}
            total={props.total}
            ha={props.ha}
            poly={props.poly} />
          </Modal.Body>
          <Modal.Footer className="d-flex align-items-center">
            <Link to={`/pasien`} >
              <Button variant="primary" onClick={handleClose}>
                Kembali ke Halaman Utama
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ModalShow;