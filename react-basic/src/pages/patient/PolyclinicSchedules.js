import React from "react";
import {
  GET_POLYCLINIC_OF_HA,
  JWT_HEADER,
  GET_ONE_HEALTH_AGENCY,
} from "constants/urls";
import axios from "axios";
import { Row, Col, Card, Table } from "react-bootstrap";
import { FaReact } from "react-icons/fa";
import { useParams } from "react-router";

const PolyclinicSchedules = () => {
  const [polyclinics, setPolyclinics] = React.useState([]);
  const [healthAgency, setHealthAgency] = React.useState([]);

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
        setPolyclinics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                <Table striped hover responsive="md">
                  <thead>
                    <tr>
                      <th>Nama Poli</th>
                      <th>Senin</th>
                      <th>Selasa</th>
                      <th>Rabu</th>
                      <th>Kamis</th>
                      <th>Jumat</th>
                      <th>Sabtu</th>
                      <th>Minggu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {polyclinics.map((polyclinic, key) => {
                      return (
                        <tr>
                          <td className="font-weight-600">
                            {polyclinic.poly_master.name}
                          </td>
                        </tr>
                      );
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
