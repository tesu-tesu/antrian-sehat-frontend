import React from "react";
import { Button, Row, Col, Form, InputGroup, Image } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { setUserLogin } from "utils/auth";
import headerImage from "../images/pasien/REGISTER.png";
import logo from "../images/pasien/logo.png";
import axios from "axios";
import { REGISTER_API } from "constants/urls";
import Loader from "react-loader-spinner";
import { FaEnvelope, FaKey, FaPhone, FaUser } from "react-icons/fa";

const Register = () => {
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [errorName, setErrorName] = React.useState("");
  const [errorPhone, setErrorPhone] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [
    errorPasswordConfirmation,
    setErrorPasswordConfirmation,
  ] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (name) {
      setErrorName("");
    }
    if (phone) {
      setErrorPhone("");
    }
    if (email) {
      setErrorEmail("");
    }
    if (password) {
      setErrorPassword("");
    }
    if (passwordConfirmation) {
      setErrorPasswordConfirmation("");
    }
    return () => {};
  }, [name, phone, email, password, passwordConfirmation]);

  const _onSubmit = () => {
    setLoading(true);
    axios
      .post(REGISTER_API, {
        name: name,
        phone: phone,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        role: "Pasien",
      })
      .then((res) => {
        setUserLogin({
          token: res.data.access_token,
          email: res.data.user.email,
          role: res.data.user.role,
        });
        setIsLoggedIn(true);
        setLoading(false);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data) {
          setErrorName(err.response.data?.name ? err.response.data.name : "");
          setErrorEmail(
            err.response.data?.email ? err.response.data.email : ""
          );
          setErrorPassword(
            err.response.data?.password ? err.response.data.password : ""
          );
          setErrorPhone(
            err.response.data?.phone ? err.response.data.phone : ""
          );
          setErrorPassword(
            err.response.data?.password ? err.response.data.password : ""
          );
          setErrorPasswordConfirmation(
            err.response.data?.password_confirmation
              ? err.response.data.password_confirmation
              : ""
          );
        }
        setLoading(false);
      });
  };

  return (
    <div className="bg-app pr-3">
      <Row xs="auto" className="d-flex align-items-center">
        <Col xl={9} lg={9} className="px-0 d-none d-sm-block">
          <Image
            src={headerImage}
            style={{
              width: "100%",
              height: "100vh",
              objectPosition: "cover",
            }}
          />
        </Col>
        <Col xl={3} lg={3} className="pl-4" fluid>
          <div className="mt-5 mb-5 text-center">
            <Image src={logo} width="50%" />
          </div>
          <Form>
            <Row className="d-flex justify-content-center">
              <Col xl={12} lg={12} md={8} sm={8} xs={10}>
                <Form.Group controlId="formBasicName">
                  <InputGroup
                    className="align-items-center"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 10,
                    }}
                  >
                    <span className="px-2">
                      <FaUser />
                    </span>
                    <Form.Control
                      style={{
                        borderColor: "#fff",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        paddingLeft: 4,
                      }}
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrorName("");
                      }}
                    />
                  </InputGroup>

                  {errorName !== "" ? (
                    <span className="text-danger ml-2">{errorName}</span>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Col>

              <Col xl={12} lg={12} md={8} sm={8} xs={10}>
                <Form.Group controlId="formBasicPhone">
                  <InputGroup
                    className="align-items-center"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 10,
                    }}
                  >
                    <span className="px-2">
                      <FaPhone />
                    </span>
                    <Form.Control
                      style={{
                        borderColor: "#fff",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        paddingLeft: 4,
                      }}
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setErrorPhone("");
                      }}
                    />
                  </InputGroup>

                  {errorPhone !== "" ? (
                    <span className="text-danger ml-2">{errorPhone}</span>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Col>
              <Col xl={12} lg={12} md={8} sm={8} xs={10}>
                <Form.Group controlId="formBasicEmail">
                  <InputGroup
                    className="align-items-center"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 10,
                    }}
                  >
                    <span className="px-2">
                      <FaEnvelope />
                    </span>
                    <Form.Control
                      style={{
                        borderColor: "#fff",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        paddingLeft: 4,
                      }}
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorEmail("");
                      }}
                    />
                  </InputGroup>

                  {errorEmail !== "" ? (
                    <span className="text-danger ml-2">{errorEmail}</span>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Col>
              <Col xl={12} lg={12} md={8} sm={8} xs={10}>
                <Form.Group controlId="formBasicPassword">
                  <InputGroup
                    className="align-items-center"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 10,
                    }}
                  >
                    <span className="px-2">
                      <FaKey />
                    </span>
                    <Form.Control
                      style={{
                        borderColor: "#fff",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        paddingLeft: 4,
                      }}
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorPassword("");
                      }}
                    />
                  </InputGroup>

                  {errorPassword !== "" ? (
                    <span className="text-danger ml-2">{errorPassword}</span>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Col>
              <Col xl={12} lg={12} md={8} sm={8} xs={10}>
                <Form.Group controlId="formBasicPasswordConfirmation">
                  <InputGroup
                    className="align-items-center"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 10,
                    }}
                  >
                    <span className="px-2">
                      <FaKey />
                    </span>
                    <Form.Control
                      style={{
                        borderColor: "#fff",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        paddingLeft: 4,
                      }}
                      type="password"
                      placeholder="Password Confirmation"
                      value={passwordConfirmation}
                      onChange={(e) => {
                        setPasswordConfirmation(e.target.value);
                        setErrorPasswordConfirmation("");
                      }}
                    />
                  </InputGroup>

                  {errorPasswordConfirmation !== "" ? (
                    <span className="text-danger ml-2">
                      {errorPasswordConfirmation}
                    </span>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Col>

              <Col xl={12} lg={12} md={6} sm={8} xs={10}>
                <Button
                  disabled={loading}
                  className="rounded-pill"
                  variant="primary"
                  block
                  onClick={_onSubmit}
                >
                  {loading ? (
                    <Loader type="Oval" color="#FFF" height={20} width={20} />
                  ) : (
                    <span>Register</span>
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
          <Col
            xl={12}
            lg={12}
            md={8}
            sm={8}
            xs={10}
            className="mt-3 text-center"
          >
            Sudah punya akun?
            <span className="font-weight-bold">
              <Link to="/login"> Sign In</Link>
            </span>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
