/*
  Ini halaman home, gak ada yg istimewa disini
*/

import React from "react";
import { FaHome, IconName } from "react-icons/fa";
import { Card, Container, Row, Col, Breadcrumb } from "react-bootstrap";
import NavBar from "components/NavBar";
import FooterBar from "../FooterBar";
import PasienRoute from "components/PasienRoute";
import { APP_PATIENT_ROUTE } from "routes/patient_routes";
import { Switch, useLocation, Redirect } from "react-router-dom";

const PasienContainer = (props) => {
  const location = useLocation();

  return (
    <>
      <div className="header">
        <NavBar />
      </div>
      <div className="pasien-body">
        {location.pathname !== "/" && (
          <>
            <Breadcrumb
              bsPrefix
              className="mx-3 mt-2"
              style={{
                borderRadius: "30px",
                paddingTop: "15px",
                paddingBottom: "20px",
                backgroundColor: "#EBF5F7",
              }}
            >
              <Breadcrumb.Item
                href="/"
                style={{
                  float: "left",
                }}
              >
                <span>
                  <FaHome></FaHome>
                  <i className="mr-2" />
                  Home
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                active
                style={{
                  float: "left",
                }}
              >
                {props.breadcrumb}
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="body-title ml-5 mt-2">{props.title}</div>
          </>
        )}

        <Switch>
          {APP_PATIENT_ROUTE.map((value, index) => {
            return (
              <PasienRoute
                key={value.name}
                component={value.component}
                path={value.path}
                exact={value.exact}
                isPasien={value.isPasien}
              />
            );
          })}
        </Switch>
      </div>
      <div className="footer">
        <FooterBar />
      </div>
    </>
  );
};

export default PasienContainer;
