import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button, Card, Table, Spinner, Row, Col } from "react-bootstrap";
import {
  GET_POLYMASTER_OF_POLYCLINIC,
  GET_POLYCLINIC_OF_HA,
  JWT_HEADER,
} from "constants/urls";
import defaultHA from "../../images/health-agency/default.png";

const ScheduleModal = (props) => {
  const [polyclinics, setPolyclinics] = React.useState([]);
  const [polymaster, setPolymaster] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [days, setDays] = React.useState([
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ]);

  React.useEffect(() => {
    const fetchDataModal = () => {
      setIsLoading(true);

      axios
        .get(GET_POLYCLINIC_OF_HA(props?.healthAgency?.id), {
          headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .then((res) => {
          console.log(res.data.data);
          setPolyclinics(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(GET_POLYMASTER_OF_POLYCLINIC(props.poly_id), {
          headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .then((res) => {
          console.log(res.data.data);
          setPolymaster(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchDataModal();
  }, []);

  const printDays = () => {
    return days.map((day, key) => {
      let dayCode = key - currentDate.getDay();
      if (dayCode < 0) {
        dayCode += 7;
      }
      let dateString = new Date(); //get next day
      dateString.setDate(dateString.getDate() + dayCode);

      let formattedDate = dateString
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, " ");

      return (
        <th className="text-center">
          {day}
          <div>{formattedDate}</div>
        </th>
      );
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Jadwal {props?.healthAgency?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mt-2">
          <Col md="6">
            <div className="d-flex justify-content-center">
              <Card.Img
                style={{ width: "200px" }}
                src={
                  props?.healthAgency?.image
                    ? props?.healthAgency?.image
                    : defaultHA
                }
              />
            </div>
          </Col>
          <Col md="6">
            <div className="text-center my-4">
              <div className="mb-2">
                <h5>Address</h5>
              </div>
              <div>{props?.healthAgency?.address}</div>
            </div>
          </Col>
        </Row>

        <Card
          body
          style={{
            borderRadius: "12px",
          }}
        >
          {isLoading ? (
            <>
              <Spinner animation="grow" variant="info" className="mx-auto" />
              <span className="sr-only">Loading...</span>
            </>
          ) : (
            <>
              <h5>{polymaster.name}</h5>
              <Table striped hover responsive>
                <thead>
                  <tr>{currentDate && printDays()}</tr>
                </thead>
                <tbody>
                  {polyclinics.map((polyclinic, key) => {
                    if (polyclinic.poly_master_id == props.poly_id) {
                      return (
                        <tr>
                          {days.map((day, index) => {
                            var sign = 0;
                            return polyclinic.sorted.map((schedule, idx) => {
                              if (schedule.day === index) {
                                sign = 1;
                                return (
                                  <td className="text-center">
                                    <div>
                                      <Link
                                        to={`/pasien/regis-antrian/${schedule.id}/${schedule.date}`}
                                      >
                                        <Button size="sm" variant="primary">
                                          Daftar
                                        </Button>
                                      </Link>
                                    </div>
                                    <div>{schedule.time_open}</div>
                                  </td>
                                );
                              }

                              if (
                                //match value with last item of polyclinic.sorted in index 'day'
                                schedule.day ==
                                polyclinic.sorted[polyclinic.sorted.length - 1]
                                  .day
                              ) {
                                if (sign == 0) {
                                  return <td className="text-center">-</td>;
                                }
                              }
                            });
                          })}
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </Table>
            </>
          )}
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleModal;
