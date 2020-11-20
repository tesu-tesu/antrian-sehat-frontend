import React from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  NavDropdown,
  Nav,
  Navbar,
  Form,
  Image,
  Row,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import logoNavbar from "../images/navbar logo.png";
import logoUser from "../images/user icon.png";
import bell from "../images/bell.png";
import { logout } from "utils/auth";

const NavBar = () => {
  const history = useHistory();

  const _onLogout = () => {
    logout();
    history.replace("/");
  };

  return (
    <>
      <Navbar className="navbar-user" expand="lg">
        <Navbar.Brand href="/pasien" className="mr-auto">
          <img
            alt=""
            src={logoNavbar}
            width="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-navbar" />
        <Navbar.Collapse id="menu-navbar" className="ml-5">
          <Nav className="ml-auto">
            <Link
              className="text-light nav-link font-weight-bold mr-5"
              to="/pasien/puskesmas"
            >
              Puskesmas
            </Link>
            <Link
              className="text-light nav-link font-weight-bold mr-5"
              to="/pasien/polimaster"
            >
              List Poly
            </Link>
            <Link
              className="text-light nav-link font-weight-bold mr-5"
              to="/pasien/riwayat-antrian"
            >
              History
            </Link>
            <Link
              className="text-light nav-link font-weight-bold mr-5"
              to="/pasien/artikel"
            >
              Artikel
            </Link>
          </Nav>
          <Nav className="mx-auto">
            <Form inline className="text-light font-weight-bold">
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
        <NavDropdown
          title={<Image src={logoUser} width="20%" fluid />}
          id="collasible-nav-dropdown"
        >
          <NavDropdown.Item className="font-weight-bold" href="#action/3.1">
            {Cookies.getJSON("USER")?.email}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={_onLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </>
  );
};

export default NavBar;
