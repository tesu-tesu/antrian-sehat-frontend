import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import axios from "axios";
import { CHANGE_PASSWORD, JWT_HEADER, GET_SELF } from "constants/urls";

const ModalChangePassword = (props) => {
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorCurrentPassword, setErrorCurrentPassword] = React.useState("");
  const [errorNewPassword, setErrorNewPassword] = React.useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = React.useState("");

  const submitPassword = async () => {
    setBtnDisabled(true);
    await axios
      .get(GET_SELF(), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        storeNewPassword(res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const storeNewPassword = (userId) => {
    axios
      .post(
        CHANGE_PASSWORD(userId),
        {
          current: currentPassword,
          new: newPassword,
          confirm: confirmPassword,
        },
        { headers: { Authorization: `Bearer ${JWT_HEADER}` } }
      )
      .then((res) => {
        props.onHide(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data?.current) {
          setErrorCurrentPassword(err.response.data?.current[0]);
        }
        if (err.response.data?.new) {
          setErrorNewPassword("Field password baru harus diisi");
        }
        if (err.response.data?.confirm) {
          setErrorConfirmPassword(
            "Konfirmasi password harus sama dengan field password baru"
          );
        }
      });
    setBtnDisabled(false);
  };

  return (
    <>
      <Modal {...props} backdrop={props.closable ? true : "static"}>
        <Modal.Header closeButton={props.closable}>
          <Modal.Title centered="true">{props.message}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex align-items-center">
          <Form.Group>
            <Form.Row>
              <Form.Label column lg={4}>
                Password sekarang
              </Form.Label>
              <Col className="mt-3">
                <Form.Control
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setErrorCurrentPassword("");
                  }}
                  type="text"
                />
                {errorCurrentPassword !== "" ? (
                  <span className="text-danger font-smaller">
                    {errorCurrentPassword}
                  </span>
                ) : (
                  ""
                )}
              </Col>
            </Form.Row>
            <Form.Row className="mt-1">
              <Form.Label column lg={4}>
                Password baru
              </Form.Label>
              <Col className="mt-2">
                <Form.Control
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrorNewPassword("");
                  }}
                  type="text"
                />
                {errorNewPassword !== "" ? (
                  <span className="text-danger font-smaller">
                    {errorNewPassword}
                  </span>
                ) : (
                  ""
                )}
              </Col>
            </Form.Row>
            <Form.Row className="mt-3">
              <Form.Label column lg={4}>
                Konfirmasi Password
              </Form.Label>
              <Col className="mt-3">
                <Form.Control
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorConfirmPassword("");
                  }}
                  type="text"
                />
                {errorConfirmPassword !== "" ? (
                  <span className="text-danger font-smaller">
                    {errorConfirmPassword}
                  </span>
                ) : (
                  ""
                )}
              </Col>
            </Form.Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center">
          <Button
            disabled={btnDisabled}
            variant="primary"
            onClick={() => submitPassword()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalChangePassword;
