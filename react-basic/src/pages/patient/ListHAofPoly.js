import React from "react";
import { GET_HA_OF_POLYCLINIC, JWT_HEADER } from "constants/urls";
import axios from "axios";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { FaHospital } from "react-icons/fa";
import { useParams } from "react-router";

const ListHAofPoly = () => {
  const [healthAgencies, setHealthAgencies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(0);
  //Static Health Agency ID
  //const [, setHealthAgencyId] = React.useState(8);

  let { id_polyclinic } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
      .get(GET_HA_OF_POLYCLINIC(id_polyclinic), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setHealthAgencies(res.data);
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
        className="border-light"
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
            <Row className="d-flex align-items-center justify-content-around">
              {healthAgencies.map((healthAgency, key) => {
                return (
                  <Card
                    key={key}
                    className="text-center mx-auto"
                    style={{
                      backgroundColor: "#F0F5FE",
                      width: "180px",
                      borderRadius: "15px",
                    }}
                  >
                    <Card.Body>
                      <FaHospital
                        style={{
                          fontSize: "30px",
                        }}
                      />
                      <p className="mt-3">{healthAgency.name}</p>
                    </Card.Body>
                  </Card>
                );
              })}
            </Row>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default ListHAofPoly;
