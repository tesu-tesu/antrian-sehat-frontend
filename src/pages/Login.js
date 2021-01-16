import React from "react";
import { Button, Row, InputGroup, Form, Image, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { setUserLogin } from "utils/auth";
import headerImage from "../images/pasien/LOGIN.png";
import desktopDownload from "../images/download/desktop.png";
import playstoreDownload from "../images/download/playstore.png";
import logo from "../images/pasien/logo.png";
import axios from "axios";
import { LOGIN_API } from "constants/urls";
import Loader from "react-loader-spinner";
import { FaEnvelope, FaKey } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (email) {
      setErrorEmail("");
    }
    if (password) {
      setErrorPassword("");
    }
    return () => {};
  }, [email, password]);

  const _enterPressed = (event) => {
    if (event.key === "Enter") {
      _onSubmit();
    }
  };

  const _onSubmit = () => {
    setLoading(true);
    axios
      .post(LOGIN_API, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.user.role == "Pasien" || res.data.user.role == "Admin") {
          setUserLogin({
            token: res.data.access_token,
            email: res.data.user.email,
            role: res.data.user.role,
          });
          setIsLoggedIn(true);

          window.location = "/";
        } else {
          setErrorEmail("You're not and Admin or Pasien");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          if (err.response.data?.error) {
            setErrorEmail(
              err.response.data?.error ? err.response.data.error : ""
            );
          } else if (err.response.data?.email || err.response.data?.password) {
            setErrorEmail(
              err.response.data?.email ? err.response.data.email : ""
            );
            setErrorPassword(
              err.response.data?.password ? err.response.data.password : ""
            );
          }
        } else {
          setErrorEmail(JSON.stringify(err));
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
            <Image className="img-circle" src={logo} width="170" height="80" />
          </div>
          <Form>
            <Row className="d-flex justify-content-center">
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
                      onKeyPress={(e) => {
                        _enterPressed(e);
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
                      onKeyPress={(e) => {
                        _enterPressed(e);
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
                    <span>Login</span>
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="mt-3 text-center"
          >
            Belum punya akun?
            <span className="font-weight-bold text-center">
              <Link to="/register"> daftar</Link>
            </span>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className="d-flex justify-content-center mt-6"
          >
            <a target="_blank" href="https://rebrand.ly/4pz2f">
              <Image rounded src={desktopDownload} width="85%" />
            </a>

            {/* </Link> */}
            <a target="_blank" href="https://rebrand.ly/5g7he">
              <Image rounded src={playstoreDownload} width="80%" />
            </a>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
