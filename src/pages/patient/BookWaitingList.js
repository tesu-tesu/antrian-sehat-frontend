import React from "react";
import {
  GET_WAITING_LIST_BY_SCHEDULE,
  BOOK_WAITING_LIST,
  JWT_HEADER,
  GET_SELF,
} from "constants/urls";
import axios from "axios";
import {
  Button,
  Container,
  Card,
  Col,
  Row,
  Image,
  Form,
  Spinner,
} from "react-bootstrap";
import PlusImage from "../../images/pasien/plus.png";
import { useParams } from "react-router";
import InvalidScheduleDate from "./InvalidScheduleDate";
import ModalShowQR from "../../components/pasien/ModalShowQR";

const BookWaitingList = () => {
  React.useEffect(() => {
    fetchData();
  }, []);

  let { schedule_id } = useParams();
  let { date } = useParams();

  let dateString = new Date(date); //get next day

  let formattedDate = dateString
    .toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/ /g, " ");

  const [day, setDay] = React.useState("");
  const [polyclinic, setPolyclinic] = React.useState("");
  const [waitingList, setWaitingList] = React.useState();
  const [healthAgency, setHealthAgency] = React.useState("");
  const [invalidMessage, setInvalidMessage] = React.useState("");
  const [residenceNumber, setResidenceNumber] = React.useState("");
  const [totalWaitingList, setTotalWaitingList] = React.useState("");
  const [currentWaitingList, setCurrentWaitingList] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorDate, setErrorDate] = React.useState("");
  const [errorSchedule, setErrorSchedule] = React.useState("");
  const [errorResidenceNumber, setErrorResidenceNumber] = React.useState("");
  const [isSelf, setIsSelf] = React.useState(false);
  const [isButtonDisable, setIsButtonDisable] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(0);

  const getResidenceNumber = async () => {
    await axios
      .get(GET_SELF(), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setResidenceNumber(res.data.data.residence_number);
      })
      .catch((err) => {
        setErrorResidenceNumber(
          err.response.data.data?.message ? err.response.data.data.message : ""
        );
      });
  };

  const onChooseSelf = (event) => {
    if (event.target.value == "1") {
      getResidenceNumber();
      setIsSelf(true);
    } else {
      setResidenceNumber("");
      setIsSelf(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get(GET_WAITING_LIST_BY_SCHEDULE(schedule_id, date), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setHealthAgency(res.data.data.health_agency);
        setPolyclinic(res.data.data.polyclinic);
        setDay(res.data.data.day);
        setCurrentWaitingList(res.data.data.current_number);
        setTotalWaitingList(res.data.data.latest_number);
        setErrorResidenceNumber("");
        setSuccessMessage("");
        setInvalidMessage("");
      })
      .catch((err) => {
        console.log(err.response);
        setInvalidMessage(err.response.data.message);
      });
    setIsLoading(false);
  };

  const _onBook = () => {
    setIsButtonDisable(true);
    axios
      .post(
        BOOK_WAITING_LIST(),
        {
          schedule: schedule_id,
          registered_date: date,
          residence_number: residenceNumber,
        },
        { headers: { Authorization: `Bearer ${JWT_HEADER}` } }
      )
      .then((res) => {
        setWaitingList(res.data.data);
        setSuccessMessage(res.data.message);
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsSuccess(false);
        if (err.response) {
          if (
            err.response.data?.residence_number ||
            err.response.data?.date ||
            err.response.data?.schedule
          ) {
            if (isSelf)
              setErrorResidenceNumber(
                err.response.data?.residence_number
                  ? "NIK is empty, please fill NIK in profile setting"
                  : ""
              );
            else
              setErrorResidenceNumber(
                err.response.data?.residence_number
                  ? err.response.data.residence_number
                  : ""
              );
            setErrorDate(err.response.data?.date ? err.response.data.date : "");
            setErrorSchedule(
              err.response.data?.schedule ? err.response.data.schedule : ""
            );
          } else {
            setErrorResidenceNumber(
              errorResidenceNumber == "" ? err.response.data.message : ""
            );
          }
        }
      });
    setIsButtonDisable(false);
  };

  const toRender = () => {
    if (isLoading)
      return (
        <Spinner animation="grow" variant="info" className="mx-auto">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    else if (invalidMessage)
      return <InvalidScheduleDate message={invalidMessage} />;

    return (
      <Card.Body className="justify-content-between text-capitalize bg-white rounded">
        <Row>
          <Col lg="6">
            <div className="card-body">
              <div>
                <h3>{healthAgency}</h3>
                <h4>{polyclinic}</h4>
                <p>
                  {day}, {formattedDate}
                </p>
              </div>
              <br></br>
              <div>
                <p>Antrian Saat Ini</p>
                <p style={{ marginTop: "0px" }}>
                  Sedang Diperiksa/
                  <span className="text-success">Antrian Terakhir</span>
                </p>
                <h3>
                  {currentWaitingList}/
                  <span className="text-success">{totalWaitingList}</span>
                </h3>
              </div>
            </div>
          </Col>
          <Col lg="6" className="d-flex align-items-center">
            <br></br>
            <Form
              style={{
                padding: "20px",
              }}
            >
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Pilih Pendaftar</Form.Label>
                <Form.Control as="select" onChange={onChooseSelf.bind(this)}>
                  <option value="2">Orang Lain</option>
                  <option value="1">Diri Sendiri</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Masukkan NIK</Form.Label>
                <Form.Control
                  type="text"
                  disabled={isSelf ? true : false}
                  placeholder="Masukkan NIK"
                  value={residenceNumber ? residenceNumber : ""}
                  onChange={(e) => {
                    setResidenceNumber(e.target.value);
                    setErrorResidenceNumber("");
                  }}
                />
                {errorResidenceNumber}
              </Form.Group>

              <div className="row justify-content-center mb-5 mt-4">
                <div className="col-md-12">
                  <Button
                    disabled={isButtonDisable ? true : false}
                    className="rounded"
                    variant="light"
                    block
                    onClick={_onBook}
                  >
                    <Image width="80px" src={PlusImage} />
                    <span style={{ paddingLeft: "20px" }}>Daftar Antrian</span>
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    );
  };

  return (
    <div className="mx-4 mt-3">
      <Container className="pasien-body py-2">
        <Card
          className="mx-lg-4 border border-0"
          style={{
            backgroundColor: "#F0F5FE",
            borderRadius: "25px",
          }}
        >
          {toRender()}
        </Card>
      </Container>
      {isSuccess ? (
        <ModalShowQR
          waitingList={waitingList}
          show={isSuccess}
          closable={false}
          message={successMessage}
          linkto={`/pasien`}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default BookWaitingList;
