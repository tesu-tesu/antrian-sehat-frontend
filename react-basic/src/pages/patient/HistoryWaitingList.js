import React from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { GET_WAITING_LIST, JWT_HEADER } from "constants/urls";

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
                  <Card
                    key={key}
                    className="text-center mx-3"
                    style={{
                      backgroundColor: "#F0F5FE",
                      width: "180px",
                    }}
                  >
                    <Card.Body>
                      <Card.Text>
                        <QRCode value={currentWaitingList.barcode} />
                        <br />
                        {currentWaitingList.registered_date}
                        <br />
                        No. Antrian : {currentWaitingList.order_number}/
                        {currentWaitingList.latest_number}
                        <br />
                        {currentWaitingList.health_agency}
                        <br />
                        {currentWaitingList.polyclinic}
                      </Card.Text>
                    </Card.Body>
                  </Card>
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
                  <Card
                    key={key}
                    className="text-center mx-3"
                    style={{
                      backgroundColor: "#F0F5FE",
                      width: "180px",
                      borderRadius: "15px",
                    }}
                  >
                    <Card.Body>
                      <Card.Text>
                        <QRCode value={futureWaitingList.barcode} />
                        <br />
                        {futureWaitingList.registered_date}
                        <br />
                        No. Antrian : {futureWaitingList.order_number}/
                        {futureWaitingList.latest_number}
                        <br />
                        {futureWaitingList.health_agency}
                        <br />
                        {futureWaitingList.polyclinic}
                      </Card.Text>
                    </Card.Body>
                  </Card>
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
                  <Card
                    key={key}
                    className="text-center mx-3"
                    style={{
                      backgroundColor: "#F0F5FE",
                      width: "180px",
                    }}
                  >
                    <Card.Body>
                      <Card.Text>
                        <QRCode value={historyWaitingList.barcode} />
                        <br />
                        {historyWaitingList.registered_date}
                        <br />
                        No. Antrian : {historyWaitingList.order_number}/
                        {historyWaitingList.latest_number}
                        <br />
                        {historyWaitingList.health_agency}
                        <br />
                        {historyWaitingList.polyclinic}
                      </Card.Text>
                    </Card.Body>
                  </Card>
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
