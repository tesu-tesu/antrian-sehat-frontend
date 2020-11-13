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

  const getPathName = (path) => {
    let lastPart = path.split("/");
    let pathName = lastPart.reduce(function (a, b) {
      //get longest string in element of path
      return a.length > b.length ? a : b;
    });
    pathName = pathName.split("-");

    for (let i = 0; i < pathName.length; i++) {
      pathName[i] = pathName[i].charAt(0).toUpperCase() + pathName[i].slice(1);
    }

    return pathName.join(" ");
  };

  return (
    <>
      <div className="header">
        <NavBar />
      </div>
      <div className="pasien-body">
        {location.pathname !== "/pasien" && (
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
                  <FaHome/>
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
                {getPathName(location.pathname)}
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="body-title ml-5 mt-2">
              {getPathName(location.pathname)}
            </div>
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
                isNotFound={value.isNotFound}
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
