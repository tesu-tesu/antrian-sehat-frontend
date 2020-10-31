/*
  Ini halaman home, gak ada yg istimewa disini
*/

import React from "react";
import { Card, Container, Row, Col, Breadcrumb } from "react-bootstrap";
import NavBar from "components/NavBar";

const PasienContainer = (props) => {
  return (
    <>
        <div className="header">
        <NavBar></NavBar>
        </div>
        <div className="pasien-body">
            <Breadcrumb className="mx-3 mt-2" style={{
                borderRadius: "20px",
                backgroundColor: "#fff"
            }}>
                <Breadcrumb.Item href="/">
                    <span>
                        <i className="ni ni-shop mr-2" />
                        Home
                    </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    {props.breadcrumb}
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="body-title mx-4">
                {props.title}
            </div>
            <div className="mx-4 mt-3">
                <Card className="mx-lg-4" style={{
                        borderRadius: "15px"
                    }}>
                        <Card.Body>
                            {props.content}
                        </Card.Body>
                </Card>
            </div>
        </div>
    </>
  );
};

export default PasienContainer;
