/*
  Ini halaman home, gak ada yg istimewa disini
*/

import React from "react";
import { Button, Container, Nav, Navbar, Jumbotron } from "react-bootstrap";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Jumbotron>
        <Container>
          <h1>Hello, world!</h1>
          <p>Jadi ini ceritanya contoh sederhana implementasi React</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Home;
