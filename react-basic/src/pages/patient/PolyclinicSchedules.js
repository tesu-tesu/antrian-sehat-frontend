import React from "react";
import {
  GET_POLYCLINIC_OF_HA,
  JWT_HEADER,
  GET_ONE_HEALTH_AGENCY,
} from "constants/urls";
import axios from "axios";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { FaReact } from "react-icons/fa";
import { useParams } from "react-router";

const PolyclinicSchedules = () => {
  const [polyclinics, setPolyclinics] = React.useState([]);
  const [healthAgency, setHealthAgency] = React.useState([]);
  const [schedule, setSchedule] = React.useState();
  const [days, setDays] = React.useState([
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ]);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  let { id_health_agency } = useParams();

  React.useEffect(() => {
    axios
      .get(GET_ONE_HEALTH_AGENCY(id_health_agency), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setHealthAgency(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(GET_POLYCLINIC_OF_HA(id_health_agency), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        console.log(res.data);
        setPolyclinics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setSchedule();
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
      console.log(formattedDate);
      return (
        <th className="text-center">
          {day}
          <div>{formattedDate}</div>
        </th>
      );
    });
  };

  return (
    <div className="mx-4 mt-3">
      <Card
        className="mx-lg-4 border-light"
        style={{
          borderRadius: "15px",
        }}
      >
        <Card.Body>
          <Row className="">
            <Col className="mt-2" lg="3">
              Address: {healthAgency.address}
            </Col>
            <Col lg="9">
              <Card
                body
                style={{
                  borderRadius: "12px",
                }}
              >
                <h4>
                  {healthAgency.name}: Pilih Jadwal dan Lakukan Pendaftaran
                </h4>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Nama Poliklinik</th>
                      {currentDate && printDays()}
                    </tr>
                  </thead>
                  <tbody>
                    {polyclinics.map((polyclinic, key) => {
                      if (polyclinic) {
                        return (
                          <tr>
                            <td className="font-weight-600">
                              {polyclinic.poly_master.name}
                            </td>
                            {days.map((day, index) => {
                              polyclinic.sorted.map((schedule, idx) => {
                                if (schedule.day == index) {
                                  // console.log(index);
                                  return (
                                    <td className="text-center">
                                      <div>
                                        <Button size="sm" variant="primary">
                                          Daftar
                                        </Button>
                                      </div>
                                      <div>{schedule.time_open}</div>
                                    </td>
                                  );
                                } else {
                                  return <td>-</td>;
                                }
                              });
                            })}
                          </tr>
                        );
                      } else {
                        return <td></td>;
                      }
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PolyclinicSchedules;
