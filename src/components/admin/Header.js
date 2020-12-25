import React from "react";
import Cookies from "js-cookie";
// reactstrap components
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Media,
  Nav,
  Navbar,
  UncontrolledDropdown,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { logout } from "utils/auth";
import { GET_SELF, JWT_HEADER } from "constants/urls";
import axios from "axios";

const Header = () => {
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [healthAgency, setHealthAgency] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    axios
      .get(GET_SELF(), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setRole(res.data.data.role);
        setName(res.data.data.name);
        setHealthAgency(res.data.data.health_agency.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onLogout = () => {
    logout();
    history.replace("/");
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/pasien"
          />
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div className="text-white font-weight-bold mr-2">
              {role} at {healthAgency}
            </div>
            <FormGroup className="mb-0">
              {/* <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup> */}
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {/* <img alt="..." /> */}
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={onLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
      <div className="header navbar-admin pb-8 pt-8 pt-lg-8" style={{}}>
        <Container fluid>
          <div className="header-body">{/* Card stats */}</div>
        </Container>
      </div>
    </>
  );
};

export default Header;
