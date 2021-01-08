import React from "react";
import { GET_POLYCLINIC_OF_HA, JWT_HEADER, SERVER_NAME } from "constants/urls";
import axios from "axios";
import { Row, Col, Card, Spinner, Image } from "react-bootstrap";
import { FaReact } from "react-icons/fa";
import { useParams } from "react-router";

const ListPolyclinic = () => {
  const [polyclinics, setPolyclinics] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(0);
  //Static Health Agency ID
  //const [, setHealthAgencyId] = React.useState(8);

  let { id_health_agency } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
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
              {polyclinics.map((polyclinic, key) => {
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
                      <Image
                        src={
                          SERVER_NAME +
                          "/storage/img/polymasters/" +
                          polyclinic.polymaster.image
                        }
                        className="rounded-sm img-center img-fluid shadow shadow-lg--hover"
                        style={{
                          width: "50px",
                          cursor: "pointer",
                        }}
                        alt={polyclinic.polymaster.image}
                      />
                      <p className="mt-3">{polyclinic.poly_master.name}</p>
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

export default ListPolyclinic;
