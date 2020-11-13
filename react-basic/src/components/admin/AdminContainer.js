import React from "react";

// reactstrap components
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";

import Header from "components/admin/Header.js";
import Sidebar from "components/admin/Sidebar.js";
import { Link, Switch, Redirect } from "react-router-dom";
import AdminRoute from "components/AdminRoute";
import { APP_ADMIN_ROUTE } from "routes/admin_routes";

import "admin-assets/css/argon-dashboard-react.css";
import "admin-assets/plugins/nucleo/css/nucleo.css";

class AdminContainer extends React.Component {
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          logo={{
            innerLink: "/",
            imgSrc: require("images/pasien/logo.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <Header></Header>

          <Container className="mt--8" fluid>
            <Row>
              <Col
                className="ml-3 mb-2 bg-transparent font-weight-bold text-white"
                xl="12"
              >
                <Link className="text-white" to="/admin">
                  <span>
                    <i className="ni ni-shop mr-2" />
                    Home
                  </span>
                </Link>
                <span className="mx-1">{">"}</span>
              </Col>
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="bg-gradient-white shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Title</h3>
                </CardHeader>
                  <CardBody>
                    <Switch>
                      {APP_ADMIN_ROUTE.map((value, index) => {
                        return (
                          <AdminRoute
                            key={value.name}
                            component={value.component}
                            path={value.path}
                            exact={value.exact}
                            isAdmin={value.isAdmin}
                            isNotFound={value.isNotFound}
                          />
                        );
                      })}
                    </Switch>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default AdminContainer;
