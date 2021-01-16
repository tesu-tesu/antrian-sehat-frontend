import React from "react";
import {
  GET_POLYCLINIC_OF_HA,
  JWT_HEADER,
  GET_ONE_HEALTH_AGENCY,
  SERVER_NAME,
} from "constants/urls";
import axios from "axios";
import { Row, Col, Card, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import defaultHA from "../../images/health-agency/default.png";

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
  const [isLoading, setIsLoading] = React.useState(0);

  let { id_health_agency } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(GET_ONE_HEALTH_AGENCY(id_health_agency), {
          headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .then((res) => {
          setHealthAgency(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(GET_POLYCLINIC_OF_HA(id_health_agency), {
          headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .then((res) => {
          setPolyclinics(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    };
    fetchData();

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

      return (
        <th className="text-center">
          {day}
          <div>{formattedDate}</div>
        </th>
      );
    });
  };

  const printPolyclinics = () => {
    return polyclinics.map((polyclinic, key) => {
      if (polyclinic) {
        return (
          <tr key={key}>
            <td className="font-weight-600">{polyclinic.poly_master.name}</td>
            {days.map((day, index) => {
              var sign = 0;
              return polyclinic.sorted.map((schedule, idx) => {
                if (schedule.day === index) {
                  sign = 1;
                  return (
                    <td className="text-center" key={idx}>
                      <div>
                        <Link
                          to={`/pasien/regis-antrian/${schedule.id}/${schedule.date}`}
                        >
                          <Button size="sm" variant="primary">
                            Daftar
                          </Button>
                        </Link>
                      </div>
                      <span>
                        {schedule.time_open} - {schedule.time_close}
                      </span>
                    </td>
                  );
                }

                if (
                  //match value with last item of polyclinic.sorted in index 'day'
                  schedule.day ==
                  polyclinic.sorted[polyclinic.sorted.length - 1].day
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
        {isLoading ? (
          <Spinner animation="grow" variant="info" className="mx-auto">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Card.Body>
            <Row className=" d-flex justify-content-center">
              <Col className="mt-2 text-center" lg={3} md={3} sm={8} xs={8}>
                <div>
                  <Card.Img
                    thumbnail
                    variant="top"
                    width="200"
                    src={
                      healthAgency.image
                        ? SERVER_NAME +
                          "/storage/img/health_agencies/" +
                          healthAgency.image
                        : defaultHA
                    }
                  />
                </div>
                <div className="text-center">
                  Address: {healthAgency.address}
                </div>
              </Col>
              <Col lg={9} md={9} sm={12} xs={12} className="mt-2">
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
                    <tbody>{polyclinics && printPolyclinics()}</tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default PolyclinicSchedules;
