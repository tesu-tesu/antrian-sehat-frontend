/*
  Ini halaman login, sebenernya gak sehat cara setstate kayak gini, harusnya pake useReducer
  karena tiap setState itu komponennya rerender (ngefek ke performa nanti). 
  Cuman karena biar simpel ya gini dulu aja gpp (useReducer agak mbingungi)
*/

import React from "react";
import { Button, Row, Container, Form, Image} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { setUserLogin } from "utils/auth";
import headerImage from '../images/pasien/LOGIN 4.png';
import logo from '../images/pasien/logo.png';
import axios from "axios";
import { LOGIN_API } from "constants/urls";
import Loader from 'react-loader-spinner'


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
    if(password){
      setErrorPassword("");
    }
    return () => {};
  }, [email, password]);

  const _onSubmit = () => {
    setLoading(true)
    axios
      .post(LOGIN_API, {
        email: email,
        password: password
      })
      .then((res) => {
        setUserLogin({
          token: res.data.access_token,
          email: res.data.user.email,
          role: res.data.user.role
        });
        setIsLoggedIn(true)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        if(err.response){
          if(err.response.data?.error){
            setErrorEmail(err.response.data?.error ? err.response.data.error : "");
          }else if(err.response.data?.email || err.response.data?.password){
            setErrorEmail(err.response.data?.email ? err.response.data.email : "");
            setErrorPassword(err.response.data?.password ? err.response.data.password : "");
          }
        } else{
          setErrorEmail(JSON.stringify(err))
        }
        setLoading(false)
      });
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
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="rounded-pill"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrorEmail("")
                }}
              />
            {errorEmail !== "" ? <span className="text-danger ml-2">{errorEmail}</span> : ""}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="rounded-pill"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrorPassword("")
                }}
              />
              {errorPassword !== "" ? <span className="text-danger ml-2">{errorPassword}</span> : ""}
            </Form.Group>
            <div className="row justify-content-center mb-5 mt-4">
              <div className="col-md-12">
                <Button disabled={loading} className="rounded-pill" variant="primary" block
                onClick={_onSubmit}>
                  {loading ? 
                  <Loader
                  type="Oval"
                  color="#FFF"
                  height={20}
                  width={20}
                  />
                  :
                  <span>Login</span>
                  }
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
