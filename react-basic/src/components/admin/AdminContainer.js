
import React from "react";

// reactstrap components
import {
    Container, Row, Col,
    Card, CardBody, CardHeader
  } from "reactstrap";
  
import Header from "components/admin/Header.js";
import Sidebar from "components/admin/Sidebar.js";
import { Link } from "react-router-dom";

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
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <Header></Header>
        
          <Container className="mt--8" fluid>
            <Row>
              <Col className="ml-3 mb-2 bg-transparent font-weight-bold text-white" xl="12">
                <Link className="text-white" to="/admin/dashboard">
                  <span>
                    <i className="ni ni-shop mr-2" />
                    Home 
                  </span>
                </Link>
                <span className="mx-1">
                  {">"}
                </span>
              </Col>
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="bg-gradient-white shadow">
                  <CardHeader className="bg-transparent mx-1">
                    <Row className="align-items-center">
                      Title
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    Card body
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
