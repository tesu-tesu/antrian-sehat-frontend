import React from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { GET_WAITING_LIST, JWT_HEADER } from "constants/urls";
import { Link } from "react-router-dom";

const HistoryWaitingList = () => {
  const [currentWaitingLists, setCurrentWaitingLists] = React.useState([]);
  const [futureWaitingLists, setFutureWaitingLists] = React.useState([]);
  const [historyWaitingLists, setHistoryWaitingLists] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(GET_WAITING_LIST(), {
          headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .then((res) => {
          setCurrentWaitingLists(res.data.currentWaitingList);
          setFutureWaitingLists(res.data.futureWaitingList);
          setHistoryWaitingLists(res.data.historyWaitingList);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-4 mt-3">
      <Card
        className="mx-lg-4 border-light p-3"
        style={{
          borderRadius: "15px",
        }}
      >
        {/* CurrentWaitingList */}
        <Card.Title>Antrian Sekarang</Card.Title>
        <Card.Body>
          {isLoading ? (
            <Spinner animation="grow" variant="info" className="mx-auto">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Row>
              {currentWaitingLists.map((currentWaitingList, key) => {
                return (
                  <Col lg="4" md="4" sm="4" className="mb-3" key={key}>
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Card
                        className="mx-3"
                        style={{
                          backgroundColor: "#F0F5FE",
                          borderRadius: "15px",
                        }}
                      >
                        <Card.Body>
                          <Row>
                            <Col>
                              <b>{currentWaitingList.residence_number}</b>
                            </Col>
                            {console.log(currentWaitingList)}
                            <Col>
                              <p>
                                No Antrian : {currentWaitingList.order_number}
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b>{currentWaitingList.health_agency}</b>
                            </Col>
                            <Col>
                              <p>
                                Saat ini : {currentWaitingList.current_number} /{" "}
                                {currentWaitingList.latest_number}
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b>{currentWaitingList.polyclinic}</b>
                            </Col>
                            <Col>
                              <p>{currentWaitingList.registered_date}</p>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          )}
        </Card.Body>

        {/* FutureWaitingList */}
        <Card.Title>Antrian Kedepan</Card.Title>
        <Card.Body>
          {isLoading ? (
            <Spinner animation="grow" variant="info" className="mx-auto">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Row>
              {futureWaitingLists.map((futureWaitingList, key) => {
                return (
                  <Col lg="4" md="4" sm="4" className="mb-3" key={key}>
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Card
                        className="mx-3"
                        style={{
                          backgroundColor: "#F0F5FE",
                          borderRadius: "15px",
                        }}
                      >
                        <Card.Body>
                          <Row>
                            <Col>
                              <b>{futureWaitingList.residence_number}</b>
                            </Col>
                            <Col>
                              <p>
                                No Antrian : {futureWaitingList.order_number}
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b>{futureWaitingList.health_agency}</b>
                            </Col>
                            <Col>
                              <p>
                                Saat ini : - / {futureWaitingList.latest_number}
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b>{futureWaitingList.polyclinic}</b>
                            </Col>
                            <Col>
                              <p>{futureWaitingList.registered_date}</p>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          )}
        </Card.Body>

        {/* HistoryWaitingList */}
        <Card.Title>Riwayat Antrian</Card.Title>
        <Card.Body>
          {isLoading ? (
            <Spinner animation="grow" variant="info" className="mx-auto">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Row>
              {historyWaitingLists.map((historyWaitingList, key) => {
                return (
                  <Col lg="4" md="4" sm="4" className="mb-3" key={key}>
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Card
                        className="mx-3"
                        style={{
                          backgroundColor: "#F0F5FE",
                          borderRadius: "15px",
                        }}
                      >
                        <Card.Body>
                          <Row>
                            <Col>
                              <b>{historyWaitingList.residence_number}</b>
                            </Col>
                            <Col>
                              <p>
                                No Antrian : {historyWaitingList.order_number}
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b>{historyWaitingList.health_agency}</b>
                            </Col>
                            <Col>
                              <span className="text-primary">
                                Sudah Diperiksa
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b>{historyWaitingList.polyclinic}</b>
                            </Col>
                            <Col>
                              <p>{historyWaitingList.registered_date}</p>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default HistoryWaitingList;
