/*
  Ini halaman login, sebenernya gak sehat cara setstate kayak gini, harusnya pake useReducer
  karena tiap setState itu komponennya rerender (ngefek ke performa nanti). 
  Cuman karena biar simpel ya gini dulu aja gpp (useReducer agak mbingungi)
*/

import React from "react";
import { Button, Row, Form, InputGroup, Image } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { setUserLogin } from "utils/auth";
import headerImage from '../images/pasien/REGISTER.png';
import logo from '../images/pasien/logo.png';
import axios from "axios";
import { REGISTER_API } from "constants/urls";
import Loader from 'react-loader-spinner';
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
  const [errorPasswordConfirmation, setErrorPasswordConfirmation] = React.useState("");
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
    if(password){
      setErrorPassword("");
    }
    if(passwordConfirmation){
      setErrorPasswordConfirmation("");
    }
    return () => {};
  }, [name, phone, email, password, passwordConfirmation]);

  const _onSubmit = () => {
    setLoading(true)
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
      <Row xs="auto">
        <div className="col-lg-9 px-0 d-none d-sm-block">
          <Image src={headerImage} style={{
            width:"100%",
            height:"100vh",
            objectPosition:"cover",
          }}/>
        </div>
        <div className="col-lg-3 pl-4" fluid >
          <div className="mt-5 mb-5 text-center">
            <Image src={logo} width="50%"/>
          </div>
          <Form>
          <Form.Group controlId="formBasicName">
            <InputGroup className="align-items-center"
                style={{
                  backgroundColor:"#fff",
                  borderRadius:10,
                  }}>
                  <span className="px-2">
                    <FaUser/>
                  </span>
                  <Form.Control style={{
                    borderColor:"#fff",
                    borderTopRightRadius:10,
                    borderBottomRightRadius:10,
                    paddingLeft:4
                  }}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setErrorName("")
                    }}
                  />
              </InputGroup>
              
            {errorName !== "" ? <span className="text-danger ml-2">{errorName}</span> : ""}
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
            <InputGroup className="align-items-center"
                style={{
                  backgroundColor:"#fff",
                  borderRadius:10,
                  }}>
                  <span className="px-2">
                    <FaPhone/>
                  </span>
                  <Form.Control style={{
                    borderColor:"#fff",
                    borderTopRightRadius:10,
                    borderBottomRightRadius:10,
                    paddingLeft:4
                  }}
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      setErrorPhone("")
                    }}
                  />
              </InputGroup>
              
            {errorPhone !== "" ? <span className="text-danger ml-2">{errorPhone}</span> : ""}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
            <InputGroup className="align-items-center"
                style={{
                  backgroundColor:"#fff",
                  borderRadius:10,
                  }}>
                  <span className="px-2">
                    <FaEnvelope/>
                  </span>
                  <Form.Control style={{
                    borderColor:"#fff",
                    borderTopRightRadius:10,
                    borderBottomRightRadius:10,
                    paddingLeft:4
                  }}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setErrorEmail("")
                    }}
                  />
              </InputGroup>
              
            {errorEmail !== "" ? <span className="text-danger ml-2">{errorEmail}</span> : ""}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <InputGroup className="align-items-center"
                style={{
                  backgroundColor:"#fff",
                  borderRadius:10,
                  }}>
                  <span className="px-2">
                    <FaKey/>
                  </span>
                  <Form.Control style={{
                    borderColor:"#fff",
                    borderTopRightRadius:10,
                    borderBottomRightRadius:10,
                    paddingLeft:4
                  }}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setErrorPassword("")
                    }}
                  />
              </InputGroup>
              
              {errorPassword !== "" ? <span className="text-danger ml-2">{errorPassword}</span> : ""}
            </Form.Group>

            <Form.Group controlId="formBasicPasswordConfirmation">
              <InputGroup className="align-items-center"
                style={{
                  backgroundColor:"#fff",
                  borderRadius:10,
                  }}>
                  <span className="px-2">
                    <FaKey/>
                  </span>
                  <Form.Control style={{
                    borderColor:"#fff",
                    borderTopRightRadius:10,
                    borderBottomRightRadius:10,
                    paddingLeft:4
                  }}
                    type="password"
                    placeholder="Password Confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => {
                      setPasswordConfirmation(e.target.value)
                      setErrorPasswordConfirmation("")
                    }}
                  />
              </InputGroup>
              
              {errorPasswordConfirmation !== "" ? <span className="text-danger ml-2">{errorPasswordConfirmation}</span> : ""}
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
                  <span>Register</span>
                  }
                </Button>
              </div>
            </div>
          </Form>
          <div className="row justify-content-center">
            <div className="col-md-12 text-secondary text-center">
              Sudah punya akun? 
              <span className="font-weight-bold">
                <Link to="/login"> Sign In</Link>
              </span>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Register;
