/*
  Ini halaman home, gak ada yg istimewa disini
*/

import React from "react";
import { FaHome, IconName } from "react-icons/fa";
import { Card, Container, Row, Col, Breadcrumb } from "react-bootstrap";
import NavBar from "components/NavBar";
import FooterBar from "../FooterBar";

const PasienContainer = (props) => {
  return (
    <>
        <div className="header">
        <NavBar/>
        </div>
        <div className="pasien-body">
            <Breadcrumb bsPrefix className="mx-3 mt-2" style={{
                borderRadius: "30px",
                paddingTop: "15px",
                paddingBottom: "20px",
                backgroundColor: "#EBF5F7"
            }}>
                <Breadcrumb.Item href="/" style={{
                    float: "left",
                }}>
                    <span>
                        <FaHome></FaHome>
                        <i className="mr-2" />
                        Home
                    </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item active style={{
                    float: "left",
                }}>
                    {props.breadcrumb}
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="body-title ml-5 mt-2">
                {props.title}
            </div>
            <div className="mx-4 mt-3">
                <Card className="mx-lg-4 border-light" style={{
                        borderRadius: "15px"
                    }}>
                        <Card.Body>
                            {props.content}
                        </Card.Body>
                </Card>
            </div>
        </div>
        <div className="footer">
            <FooterBar/>
        </div>
    </>
  );
};

export default PasienContainer;

