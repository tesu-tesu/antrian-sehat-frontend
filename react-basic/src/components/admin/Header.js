
import React from "react";

// reactstrap components
import {
  Container,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  Navbar,
  Nav,
  Media
} from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logout } from "utils/auth";

const Header = () => {

  const history = useHistory();

  const onLogout = () => {
    logout();
    history.replace("/");
  }

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div className="text-white font-weight-bold mr-2">
                Nama Puskesmas - Role
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
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      Jessica Jones
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
      <div className="header navbar-admin pb-8 pt-8 pt-lg-8" style={{
      }}>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;
