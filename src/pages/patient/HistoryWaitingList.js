import React from "react";
import axios from "axios";
import { Card, Col, Row, Spinner, Container } from "react-bootstrap";
import {
  GET_TODAY_WAITING_LIST,
  GET_PAST_WAITING_LIST,
  GET_FUTURE_WAITING_LIST,
  JWT_HEADER,
} from "constants/urls";
import { Link } from "react-router-dom";
import ModalShowQR from "../../components/pasien/ModalShowQR";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { FaBell, FaCalendar, FaHistory } from "react-icons/all";

const HistoryWaitingList = () => {
  const [currentWaitingLists, setCurrentWaitingLists] = React.useState([]);
  const [futureWaitingLists, setFutureWaitingLists] = React.useState([]);
  const [pastWaitingLists, setPastWaitingLists] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(0);
  const [waitingList, setWaitingList] = React.useState();
  const [modalShow, setModalShow] = React.useState();
  const [showHistory, setShowHistory] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [hTabsAntrian, setHTabsAntrian] = React.useState("hTabsToday");
  const [selected, setSelected] = React.useState("selected1");

  React.useEffect(() => {
    fetchDataToday();
  }, []);

  const fetchDataToday = async () => {
    setIsLoading(true);
    await axios
      .get(GET_TODAY_WAITING_LIST(), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        console.log(res.data);
        setCurrentWaitingLists(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const fetchDataPast = async () => {
    setIsLoading(true);
    await axios
      .get(GET_PAST_WAITING_LIST(), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        console.log(res.data);
        setPastWaitingLists(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const fetchDataFuture = async () => {
    setIsLoading(true);
    await axios
      .get(GET_FUTURE_WAITING_LIST(), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        console.log(res.data);
        setFutureWaitingLists(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const showModal = (waitingList) => (event) => {
    setWaitingList(waitingList);
    setModalShow(true);
  };

  const getTodayHistory = () => {
    setHTabsAntrian("hTabsToday");
    fetchDataToday();
  };
  const getPastHistory = () => {
    setHTabsAntrian("hTabsPast");
    fetchDataPast();
  };
  const getFutureHistory = () => {
    setHTabsAntrian("hTabsFuture");
    fetchDataFuture();
  };

  return (
    <div className="mx-4 mt-3">
      <Card
        className="mx-lg-4 border-light p-3"
        style={{
          borderRadius: "15px",
        }}
      >
        <Container>
          <Nav
            className="nav-fill flex-column flex-sm-row"
            id="tabs-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                className={
                  "mb-sm-3 mb-md-0 " +
                  (hTabsAntrian === "hTabsToday" ? "active" : "")
                }
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  getTodayHistory();
                }}
              >
                <FaBell className="mr-2" />
                Hari ini
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{
                  cursor: "pointer",
                }}
                className={
                  "mb-sm-3 mb-md-0 " +
                  (hTabsAntrian === "hTabsFuture" ? "active" : "")
                }
                onClick={(e) => {
                  e.preventDefault();
                  getFutureHistory();
                }}
              >
                <FaCalendar className="mr-2" />
                Akan Datang
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{
                  cursor: "pointer",
                }}
                className={
                  "mb-sm-3 mb-md-0 " +
                  (hTabsAntrian === "hTabsPast" ? "active" : "")
                }
                onClick={(e) => {
                  e.preventDefault();
                  getPastHistory();
                }}
              >
                <FaHistory className="mr-2" />
                Yang Lalu
              </NavLink>
            </NavItem>
          </Nav>
          <Row className="d-flex justify-content-center mt-2">
            <Col xl={6} lg={6} md={8} sm={12}>
              <Card.Body>
                <Container>
                  <TabContent activeTab={hTabsAntrian}>
                    <TabPane tabId="hTabsToday" role="tabpanel">
                      <Card.Title className="text-center">
                        <b>Antrian Anda pada hari ini</b>
                      </Card.Title>
                      {/*****  Current Day ******/}
                      {isLoading ? (
                        <Spinner
                          animation="grow"
                          variant="info"
                          className="mx-auto"
                        >
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      ) : (
                        <div>
                          {currentWaitingLists.map(
                            (currentWaitingList, key) => {
                              let dateString = new Date(
                                currentWaitingList.registered_date
                              );
                              let formattedDate = dateString
                                .toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                                .replace(/ /g, " ");
                              return (
                                <Row key={key} className="mb-3">
                                  <Col>
                                    <Link
                                      to="#"
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                    >
                                      <Card
                                        style={{
                                          backgroundColor: "#F0F5FE",
                                          borderRadius: "15px",
                                        }}
                                        onClick={showModal(currentWaitingList)}
                                      >
                                        <Card.Body>
                                          <Row>
                                            <Col>
                                              <b>
                                                {
                                                  currentWaitingList.residence_number
                                                }
                                              </b>
                                            </Col>
                                            <Col>
                                              <p>
                                                No Antrian :{" "}
                                                {
                                                  currentWaitingList.order_number
                                                }
                                              </p>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <b>
                                                {
                                                  currentWaitingList.health_agency
                                                }
                                              </b>
                                            </Col>
                                            <Col>
                                              <p>
                                                Saat ini :{" "}
                                                {
                                                  currentWaitingList.current_number
                                                }{" "}
                                                /{" "}
                                                {
                                                  currentWaitingList.latest_number
                                                }
                                              </p>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <b>
                                                {currentWaitingList.polyclinic}
                                              </b>
                                            </Col>
                                            <Col>
                                              <p>{formattedDate}</p>
                                            </Col>
                                          </Row>
                                        </Card.Body>
                                      </Card>
                                    </Link>
                                  </Col>
                                </Row>
                              );
                            }
                          )}
                        </div>
                      )}
                    </TabPane>
                    <TabPane tabId="hTabsFuture" role="tabpanel">
                      {/*--------Next Day--------*/}
                      <Card.Title>
                        <b>Antrian anda yang akan datang</b>
                      </Card.Title>
                      {isLoading ? (
                        <Spinner
                          animation="grow"
                          variant="info"
                          className="mx-auto"
                        >
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      ) : (
                        <div>
                          {futureWaitingLists.map((futureWaitingList, key) => {
                            let dateString = new Date(
                              futureWaitingList.registered_date
                            );
                            let formattedDate = dateString
                              .toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                              .replace(/ /g, " ");
                            return (
                              <Row key={key} className="mb-3">
                                <Col>
                                  <Link
                                    to="#"
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                    }}
                                  >
                                    <Card
                                      style={{
                                        backgroundColor: "#F0F5FE",
                                        borderRadius: "15px",
                                      }}
                                      onClick={showModal(futureWaitingList)}
                                    >
                                      <Card.Body>
                                        <Row>
                                          <Col>
                                            <b>
                                              {
                                                futureWaitingList.residence_number
                                              }
                                            </b>
                                          </Col>
                                          <Col>
                                            <p>
                                              No Antrian :{" "}
                                              {futureWaitingList.order_number}
                                            </p>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <b>
                                              {futureWaitingList.health_agency}
                                            </b>
                                          </Col>
                                          <Col>
                                            <p>
                                              Saat ini : - /{" "}
                                              {futureWaitingList.latest_number}
                                            </p>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <b>
                                              {futureWaitingList.polyclinic}
                                            </b>
                                          </Col>
                                          <Col>
                                            <p>{formattedDate}</p>
                                          </Col>
                                        </Row>
                                      </Card.Body>
                                    </Card>
                                  </Link>
                                </Col>
                              </Row>
                            );
                          })}
                        </div>
                      )}
                    </TabPane>
                    <TabPane tabId="hTabsPast" role="tabpanel">
                      <Card.Title>
                        <b>Riwayat antrian anda yang lalu</b>
                      </Card.Title>
                      {isLoading ? (
                        <Spinner
                          animation="grow"
                          variant="info"
                          className="mx-auto"
                        >
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      ) : (
                        <div>
                          {pastWaitingLists.map((pastWaitingList, key) => {
                            let dateString = new Date(
                              pastWaitingList.registered_date
                            );
                            let formattedDate = dateString
                              .toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                              .replace(/ /g, " ");
                            return (
                              <Row key={key} className="mb-3">
                                <Col>
                                  <Link
                                    to="#"
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                    }}
                                  >
                                    <Card
                                      style={{
                                        backgroundColor: "#F0F5FE",
                                        borderRadius: "15px",
                                      }}
                                    >
                                      <Card.Body>
                                        <Row>
                                          <Col>
                                            <b>
                                              {pastWaitingList.residence_number}
                                            </b>
                                          </Col>
                                          <Col>
                                            <p>
                                              No Antrian :{" "}
                                              {pastWaitingList.order_number}
                                            </p>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <b>
                                              {pastWaitingList.health_agency}
                                            </b>
                                          </Col>
                                          <Col>
                                            <span className="text-primary">
                                              {pastWaitingList.status}
                                            </span>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <b>{pastWaitingList.polyclinic}</b>
                                          </Col>
                                          <Col>
                                            <p>{formattedDate}</p>
                                          </Col>
                                        </Row>
                                      </Card.Body>
                                    </Card>
                                  </Link>
                                </Col>
                              </Row>
                            );
                          })}
                        </div>
                      )}
                    </TabPane>
                  </TabContent>
                </Container>
              </Card.Body>
            </Col>
          </Row>
        </Container>
        {modalShow && (
          <ModalShowQR
            waitingList={waitingList}
            show={modalShow}
            closable={true}
            message="Antrian Anda"
            onHide={() => setModalShow(false)}
          />
        )}
      </Card>
    </div>
  );
};

export default HistoryWaitingList;
