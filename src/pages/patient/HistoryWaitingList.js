import React from "react";
import axios from "axios";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { GET_WAITING_LIST, JWT_HEADER } from "constants/urls";
import { Link } from "react-router-dom";
import ModalShowQR from "../../components/pasien/ModalShowQR";

const HistoryWaitingList = () => {
  const [currentWaitingLists, setCurrentWaitingLists] = React.useState([]);
  const [futureWaitingLists, setFutureWaitingLists] = React.useState([]);
  const [historyWaitingLists, setHistoryWaitingLists] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(0);
  const [waitingList, setWaitingList] = React.useState();
  const [modalShow, setModalShow] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(GET_WAITING_LIST(), {
          headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .then((res) => {
          console.log(res.data);
          setCurrentWaitingLists(res.data.waitingList.currentWaitingList);
          setFutureWaitingLists(res.data.waitingList.futureWaitingList);
          setHistoryWaitingLists(res.data.waitingList.historyWaitingList);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const showModal = (waitingList) => (event) => {
    setWaitingList(waitingList);
    setModalShow(true);
  };

  return (
    <div className="mx-4 mt-3">
      <Card
        className="mx-lg-4 border-light p-3"
        style={{
          borderRadius: "15px",
        }}
      >
        <Row>
          <Col lg="4" md="4" sm="4">
            {/* CurrentWaitingList */}
            <Card.Body>
              <Card.Title>
                <b>Hari Ini</b>
              </Card.Title>
              {isLoading ? (
                <Spinner animation="grow" variant="info" className="mx-auto">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <div>
                  {currentWaitingLists.map((currentWaitingList, key) => {
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
                            style={{ textDecoration: "none", color: "black" }}
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
                                    <b>{currentWaitingList.residence_number}</b>
                                  </Col>
                                  {console.log(currentWaitingList)}
                                  <Col>
                                    <p>
                                      No Antrian :{" "}
                                      {currentWaitingList.order_number}
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <b>{currentWaitingList.health_agency}</b>
                                  </Col>
                                  <Col>
                                    <p>
                                      Saat ini :{" "}
                                      {currentWaitingList.current_number} /{" "}
                                      {currentWaitingList.latest_number}
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <b>{currentWaitingList.polyclinic}</b>
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
            </Card.Body>
          </Col>
          <Col lg="4" md="4" sm="4">
            {/* FutureWaitingList */}
            <Card.Body>
              <Card.Title>
                <b>Akan Datang</b>
              </Card.Title>
              {isLoading ? (
                <Spinner animation="grow" variant="info" className="mx-auto">
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
                            style={{ textDecoration: "none", color: "black" }}
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
                                    <b>{futureWaitingList.residence_number}</b>
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
                                    <b>{futureWaitingList.health_agency}</b>
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
                                    <b>{futureWaitingList.polyclinic}</b>
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
            </Card.Body>
          </Col>
          <Col lg="4" md="4" sm="4">
            {/* HistoryWaitingList */}
            <Card.Body>
              <Card.Title>
                <b>Selesai</b>
              </Card.Title>
              {isLoading ? (
                <Spinner animation="grow" variant="info" className="mx-auto">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <div>
                  {historyWaitingLists.map((historyWaitingList, key) => {
                    let dateString = new Date(
                      historyWaitingList.registered_date
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
                            style={{ textDecoration: "none", color: "black" }}
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
                                    <b>{historyWaitingList.residence_number}</b>
                                  </Col>
                                  <Col>
                                    <p>
                                      No Antrian :{" "}
                                      {historyWaitingList.order_number}
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <b>{historyWaitingList.health_agency}</b>
                                  </Col>
                                  <Col>
                                    <span className="text-primary">
                                      {historyWaitingList.status}
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <b>{historyWaitingList.polyclinic}</b>
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
            </Card.Body>
          </Col>
        </Row>
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
