import React from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import { Button, NavDropdown, Nav, Navbar, Form, Image } from "react-bootstrap";
import { MdHttps } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import logoNavbar from "../../images/navbar logo.png";
import logoUser from "../../images/user icon.png";
import { logout } from "utils/auth";
import ModalShowChangePassword from "../ModalChangePassword";

const NavBar = (props) => {
  let history = useHistory();
  const [modalShow, setModalShow] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState("");

  const changePassword = () => {
    setModalShow(true);
  };
  const _onLogout = () => {
    logout();
    history.replace("/");
  };

  const _enterPressed = (event) => {
    if (event.key === "Enter") {
      _onEnterSearch();
    }
  };

  const _onEnterSearch = () => {
    history.push({
      pathname: "/pasien/search/puskesmas/",
      search: searchWord,
      // state: { detail: 'some_value' }
    });
  };

  const toProfile = () => {
    history.push({
      pathname: "/pasien/profile",
    });
  };

  return (
    <>
      <Navbar collapseOnSelect sticky="top" className="navbar-user" expand="xl">
        <Navbar.Brand href="/pasien">
          <img
            alt=""
            src={logoNavbar}
            width="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          className="d-lg-none"
          aria-controls="pasien-navbar"
          style={{
            zIndex: "9999",
          }}
        />
        <Navbar.Collapse id="pasien-navbar">
          <Nav className="ml-5">
            <Link
              className="text-light nav-link font-weight-bold mr-5"
              to="/pasien/puskesmas"
            >
              Puskesmas
            </Link>
            <Link
              className="text-light nav-link font-weight-bold mr-5"
              to="/pasien/poliklinik"
            >
              Poliklinik
            </Link>
            <Link
              className="text-light nav-link font-weight-bold mr-5"
              to="/pasien/riwayat-antrian"
            >
              Riwayat
            </Link>
            <Link
              className="text-light nav-link font-weight-bold mr-5"
              to="/pasien/about-us"
            >
              Tentang Kami
            </Link>
          </Nav>
          <Nav className="mx-auto">
            <Form
              inline
              className="text-light font-weight-bold"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Control
                type="text"
                placeholder="Cari puskesmas..."
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
                onKeyPress={(e) => {
                  _enterPressed(e);
                }}
                className="mr-sm-2"
              />
              <Button onClick={_onEnterSearch} variant="outline-light">
                Cari
              </Button>
            </Form>
          </Nav>
          <NavDropdown
            title={<Image src={logoUser} width="20%" fluid />}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item className="font-weight-bold" href="#">
              {Cookies.getJSON("USER")?.email}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={toProfile}>
              <FaUserCircle /> Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={changePassword}>
              <MdHttps /> Ganti Password
            </NavDropdown.Item>
            <NavDropdown.Item onClick={_onLogout}>
              <IoMdExit /> Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      {modalShow && (
        <ModalShowChangePassword
          centered
          show={modalShow}
          closable={true}
          message="Ganti Password"
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
};

export default NavBar;
