/*
  Ini halaman login, sebenernya gak sehat cara setstate kayak gini, harusnya pake useReducer
  karena tiap setState itu komponennya rerender (ngefek ke performa nanti). 
  Cuman karena biar simpel ya gini dulu aja gpp (useReducer agak mbingungi)
*/

import React from "react";
import { Button, Row, Container, Navbar, Form, Alert, Image, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { login } from "utils/auth";
import headerImage from '../images/pasien/LOGIN 4.png';
import logo from '../images/pasien/logo.png';

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (email || password) {
      setError(false);
    }
    return () => {};
  }, [email, password]);

  const _onSubmit = () => {
    if (email === "pasien" && password === "123") {
      login({
        email: email,
      });
      setIsLoggedIn(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-app pr-3">
      {isLoggedIn && <Redirect to="/dashboard" />}
      {/* <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand color="white">Login</Navbar.Brand>
          </Link>
        </Container>
      </Navbar> */}
      <Row xs="auto">
        <div className="col-lg-9 pr-0">
          <Image src={headerImage} fluid/>
        </div>
        <div className="col-lg-3 pl-4" fluid >
          <div className="mt-5 mb-5 text-center">
            <Image src={logo} width="50%"/>
          </div>
          <Form>
            <Alert variant="primary">
              <span style={{ fontWeight: "bold" }}>Email: </span>
              pasien,
              <span style={{ fontWeight: "bold" }}> Password: </span>
              123
            </Alert>
            {error && <Alert variant="danger">Salah bos</Alert>}

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="rounded-pill"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="rounded-pill"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="row justify-content-center mb-5 mt-4">
              <div className="col-md-12">
                <Button className="rounded-pill" variant="primary" block
                onClick={_onSubmit}>
                  Login
                </Button>
              </div>
            </div>
          </Form>
          <div className="row justify-content-center">
            <div className="col-md-12 text-secondary text-center">
              Belum punya akun?  
              <span className="font-weight-bold">
                <Link to="/register"> daftar</Link>
              </span>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Login;
