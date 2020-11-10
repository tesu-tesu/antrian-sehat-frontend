import React from "react";
import { GET_WAITING_LIST_BY_SCHEDULE, BOOK_WAITING_LIST, JWT_HEADER, GET_RESIDENCE_NUMBER } from "constants/urls";
import axios from "axios";
import { Button, Container, Card, Col, Row, Image, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PlusImage from "../../images/pasien/plus.png";
import {useParams} from "react-router";


const BookWaitingList = () => {

  React.useEffect(() => {
    fetchData();
  }, []);

  let { schedule_id } = useParams();
  let { date } = useParams();

  const [healthAgency, setHealthAgency] = React.useState("");
  const [polyclinic, setPolyclinic] = React.useState("");
  const [regDate, setRegDate] = React.useState("");
  const [currentWaitingList, setCurrentWaitingList] = React.useState("");
  const [totalWaitingList, setTotalWaitingList] = React.useState("");
  const [residenceNumber, setResidenceNumber] = React.useState("");
  
  const getResidenceNumber = async () => {
    await axios
    .get(GET_RESIDENCE_NUMBER(), {
      headers: { Authorization: `Bearer ${JWT_HEADER}` },
    })
    .then((res) => {
      setResidenceNumber(res.data.residence_number);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  const onChooseSelf = ((event) => {
    if(event.target.value == "1") {
      getResidenceNumber();
    } else {
      setResidenceNumber("");
    }
  });
  
  const fetchData = async () => {
    await axios
      .get(GET_WAITING_LIST_BY_SCHEDULE(schedule_id, date), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-4 mt-3">
      <Container className="pasien-body py-2">
            <Card
              className="mx-lg-4 border border-0"
              style={{
                borderRadius: "20px",
              }}
            >
              <Card.Body className="justify-content-between text-capitalize bg-white rounded">
                <Row>
                  <Col lg="6">
                    <div className="card-body">
                      <div>
                        <h3>Puskesmas Klampis</h3>
                        <h4>Poli Umum</h4>
                        <p>Date</p>
                      </div>
                      <br></br>
                      <div>
                        <p>Antrian Saat Ini</p>
                        <p style={{marginTop: "0px"}}>Sedang Diperiksa/Antrian Terakhir</p>
                        <h3>02/06</h3>
                      </div>
                    </div>
                  </Col>

                  <Col lg="6" className="d-flex align-items-center">
                  <Form style={{
                    padding: "20px"
                  }}>
                    <Form.Group controlId="exampleForm.ControlSelect1" >
                      <Form.Label>Pilih Pendaftar</Form.Label>
                      <Form.Control as="select" onChange={onChooseSelf.bind(this)}>
                        <option>Pilih Pendaftar</option>
                        <option value="1">Diri Sendiri</option>
                        <option value="2">Orang Lain</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Masukkan NIK</Form.Label>
                      <Form.Control type="text" disabled={residenceNumber? true : false} placeholder="Masukkan NIK" value={residenceNumber? residenceNumber : ""} />
                    </Form.Group>
                    <div className="row justify-content-center mb-5 mt-4">
                      <div className="col-md-12">
                        <Button
                          className="rounded"
                          variant="light"
                          block
                          // onClick={_onSubmit}
                        >
                          <Image
                              width="80px"
                              src={PlusImage}
                          />
                          <span style={{paddingLeft:"20px"}}>Daftar Antrian</span>
                        </Button>
                      </div>
                    </div>
                  </Form>
                    {/* <div>
                      <Link to="/show-tickets">
                        <Image
                          className="float-left"
                          style={{ marginTop: "-30%", marginLeft: "30%" }}
                          width="180px"
                          src={ListTiket}
                        />
                      </Link>
                    </div> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
      </Container>
    </div>
  );
};

export default BookWaitingList;
