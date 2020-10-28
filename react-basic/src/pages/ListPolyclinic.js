import React from "react";
import NavBar from "../components/NavBar";
import { GET_POLYCLINIC_OF_HA, JWT_HEADER } from "constants/urls";
import axios from "axios";
import { Row, Col, Card, Container, Breadcrumb } from "react-bootstrap";
import { FaReact } from "react-icons/fa";
import { useParams } from "react-router";

const ListPolyclinic = () => {
  const [polyclinics, setPolyclinics] = React.useState([]);
  //Static Health Agency ID
  //const [, setHealthAgencyId] = React.useState(8);

  let { id_health_agency } = useParams();

  React.useEffect(() => {
    axios
      .get(GET_POLYCLINIC_OF_HA(id_health_agency),  { 
        headers: {"Authorization" : `Bearer ${JWT_HEADER}`} 
      })
      .then((res) => {
        setPolyclinics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mx-5">
        <h2>Daftar Poli</h2>
      </div>
      <Container className="mt-4">
        <Card>
          <Card.Body>
            <Row>
              {polyclinics.map((polyclinic,key) => {
                return (
                  <Card 
                    key={key} 
                    className="mx-3 text-center mx-auto"
                    style={{
                      backgroundColor : "#F0F5FE"
                    }}
                  >
                    <Card.Body>
                      <FaReact
                        style={{
                          fontSize : "30px"
                        }}
                      />
                      <p className="mt-3">{polyclinic.poly_master.name}</p>
                    </Card.Body>
                  </Card>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ListPolyclinic;
