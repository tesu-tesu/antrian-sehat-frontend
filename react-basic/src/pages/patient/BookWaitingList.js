import React from "react";
import { GET_WAITING_LIST_BY_SCHEDULE, BOOK_WAITING_LIST, JWT_HEADER, GET_RESIDENCE_NUMBER} from "constants/urls";
import axios from "axios";
import {Button, Container, Card, Col, Row, Image, Form, Spinner } from "react-bootstrap";
import PlusImage from "../../images/pasien/plus.png";
import {useParams} from "react-router";
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
  const [isSelf, setIsSelf] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(0);
  const [isSuccess, setIsSuccess] = React.useState(0);

  const getResidenceNumber = async () => {
    await axios
    .get(GET_RESIDENCE_NUMBER(), {
      headers: { Authorization: `Bearer ${JWT_HEADER}` },
    })
    .then((res) => {
      setResidenceNumber(res.data.residence_number);
    })
    .catch((err) => {
      setErrorResidenceNumber(err.response.data?.message ? err.response.data.message : "");
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
        setHealthAgency(res.data.waiting_list.health_agency);
        setPolyclinic(res.data.waiting_list.polyclinic);
        setDay(res.data.waiting_list.day);
        setCurrentWaitingList(res.data.waiting_list.current_number);
        setTotalWaitingList(res.data.waiting_list.latest_number);
        setErrorResidenceNumber("");
        setSuccessMessage("");
        setInvalidMessage("");
      })
      .catch((err) => {
        setInvalidMessage(err.response.data.message);
      });
      setIsLoading(false);
  };

  const _onBook = () => {
    axios
      .post(BOOK_WAITING_LIST(), {
        schedule: schedule_id,
        registered_date: date,
        residence_number: residenceNumber,
      }, {headers: { Authorization: `Bearer ${JWT_HEADER}` }})
      .then((res) => {
        setWaitingList(res.data.waiting_list);
        setSuccessMessage(res.data.message);
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsSuccess(false);
        if (err.response) {
          if (err.response.data?.residence_number || err.response.data?.date || err.response.data?.schedule) {
            setErrorResidenceNumber(
              err.response.data?.residence_number ? err.response.data.residence_number : ""
            );
            setErrorDate(
              err.response.data?.date ? err.response.data.date : ""
            );
            setErrorSchedule(
              err.response.data?.schedule ? err.response.data.schedule : ""
            );
          }
        }
      });
  };


  const toRender = () => {
    if(isLoading)
      return (
        <Spinner animation="grow" variant="info" className="mx-auto">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    else if(invalidMessage)
      return (<InvalidScheduleDate message={invalidMessage}/>);

    return(
      <Card.Body className="justify-content-between text-capitalize bg-white rounded">
        <Row>
          <Col lg="6">
            <div className="card-body">
              <div>
                <h3>{healthAgency}</h3>
                <h4>{polyclinic}</h4>
                <p>{day}, {formattedDate}</p>
              </div>
              <br></br>
              <div>
                <p>Antrian Saat Ini</p>
                <p style={{marginTop: "0px"}}>Sedang Diperiksa/Antrian Terakhir</p>
                <h3>{currentWaitingList}/{totalWaitingList}</h3>
              </div>
            </div>
          </Col>
          <Col lg="6" className="d-flex align-items-center">
            <br></br>
            <Form style={{
              padding: "20px"
            }}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Pilih Pendaftar</Form.Label>
                <Form.Control
                  as="select"
                  onChange={onChooseSelf.bind(this)}
                >
                  <option>Pilih Pendaftar</option>
                  <option value="1">Diri Sendiri</option>
                  <option value="2">Orang Lain</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Masukkan NIK</Form.Label>
                <Form.Control 
                  type="text" 
                  disabled={isSelf? true : false} 
                  placeholder="Masukkan NIK" 
                  value={residenceNumber? residenceNumber : ""}
                  onChange={(e) => {
                    setResidenceNumber(e.target.value);
                    setErrorResidenceNumber("");
                  }} />
                  {errorResidenceNumber}
              </Form.Group>

              <div className="row justify-content-center mb-5 mt-4">
                <div className="col-md-12">
                  <Button
                    className="rounded"
                    variant="light"
                    block
                    onClick={_onBook}
                  >
                    <Image width="80px" src={PlusImage} />
                    <span style={{ paddingLeft: "20px" }}>
                      Daftar Antrian
                    </span>
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
      {isSuccess? (
      <ModalShowQR
      waitingList={waitingList}
      show={isSuccess}
      closable={false}
      message={successMessage}
      linkto={`/pasien`}
    />) : ('')}
      <Container className="pasien-body py-2">
        <Card
          className="mx-lg-4 border border-0"
          style={{
            borderRadius: "20px",
          }}>
            {toRender()
            }
        </Card>
      </Container>
    </div>
  );
};

export default BookWaitingList;
