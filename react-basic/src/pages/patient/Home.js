import React from "react";
import { Button, Container, Card, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PlusImage from "../../images/pasien/plus.png";
import ListTiket from "../../images/pasien/list tiket.png";
import HumanSit from "../../images/pasien/human sit rev.png";
import Patient from "../../images/pasien/patient.png";
import Instancies from "../../images/pasien/instancies.png";
import RightArrow from "../../images/pasien/right arrow.png";

const Home = () => {
  return (
    <>
      <Container className="pasien-body py-2">
        <div className="mt-4 mb-3">
          <Container>
            <Card
              className="mx-lg-4"
              style={{
                borderRadius: "15px",
              }}
            >
              <Card.Body className="justify-content-between text-capitalize bg-white">
                <Row>
                  <Col lg="3">
                    <Card
                      body
                      style={{ fontSize: "29pt" }}
                      className="shadow text-center"
                    >
                      <div className="card-body">Daftar antrian</div>
                      <div>
                        <Link to="/daftar-antrian">
                          <Image width="85px" src={PlusImage} />
                        </Link>
                      </div>
                    </Card>
                  </Col>

                  <Col lg="5" className="pl-6 py-1">
                    <Col style={{ fontSize: "22pt" }}>
                      <Row className="ha-name">Puskesmas</Row>
                      <Row className="poli-name">Poliklinik</Row>
                      <Row className="ha-name">
                        02 / <span className="text-success">06</span>
                      </Row>
                    </Col>
                    <Card body>
                      <Row className="mt-4 pr-2 align-items-center">
                        <Col md="8" style={{ fontSize: "25pt" }}>
                          antrian anda
                        </Col>
                        <Col
                          md="4"
                          style={{ fontSize: "27pt" }}
                          className="text-primary"
                        >
                          01
                        </Col>
                      </Row>
                    </Card>
                    <div className="mt-1">(Antrian terbaru)</div>
                  </Col>

                  <Col lg="3" className="ml-2 d-flex align-items-center">
                    <div>
                      <span>
                        <Image
                          style={{ marginRight: "-25%" }}
                          className="float-right"
                          width="300px"
                          src={HumanSit}
                        />
                      </span>
                      <Link to="/show-tickets">
                        <Image
                          className="float-left"
                          style={{ marginTop: "-30%", marginLeft: "30%" }}
                          width="180px"
                          src={ListTiket}
                        />
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
        <div className="mt-3 mb-3">
          <Container>
            <Card className="mx-lg-4" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <div
                  className="d-flex justify-content-end mr-4 pr-4"
                  style={{ fontSize: "50px" }}
                >
                  Cari Jadwal?
                </div>
                <Row>
                  <Col md="8">
                    <Image
                      width="100%"
                      className="ml--7 mt--2 float-left"
                      src={Instancies}
                    />
                  </Col>
                  <Col md="4" className="d-flex align-items-end">
                    <Row>
                      <div
                        style={{ fontSize: "30px" }}
                        className="float-right mb-3"
                      >
                        Lihat daftar puskesmas
                      </div>
                      <div>
                        <Link to="/health-agencies">
                          <Image
                            roundedCircle
                            className="float-right"
                            width="100px"
                            src={RightArrow}
                          />
                        </Link>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
        <div className="mt-3 mb-4">
          <Container>
            <Card className="mx-lg-4" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <div
                  className="d-flex justify-content-end mr-4 pr-4"
                  style={{ fontSize: "40px" }}
                >
                  Cari Poli tersedia?
                </div>
                <Row>
                  <Col md="8">
                    <Image
                      width="100%"
                      className="ml--7 float-left"
                      src={Patient}
                    />
                  </Col>
                  <Col md="4" className="d-flex align-items-end">
                    <Row>
                      <div
                        style={{ fontSize: "30px" }}
                        className="float-right mb-3"
                      >
                        Lihat daftar poliklinik
                      </div>
                      <div>
                        <Link to="/list-polymaster">
                          <Image
                            roundedCircle
                            className="float-right"
                            width="100px"
                            src={RightArrow}
                          />
                        </Link>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Home;
