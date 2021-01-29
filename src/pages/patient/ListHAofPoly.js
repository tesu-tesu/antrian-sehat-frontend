import React from "react";
import { GET_HA_OF_POLYCLINIC, JWT_HEADER, SERVER_NAME } from "constants/urls";
import axios from "axios";
import { Row, Col, Card, Spinner, Modal, Button, Image } from "react-bootstrap";
import { FaHospital } from "react-icons/fa";
import { useParams } from "react-router";
import ScheduleModal from "components/pasien/ScheduleModal";

const ListHAofPoly = () => {
  const [healthAgencies, setHealthAgencies] = React.useState([]);
  const [HA, setHA] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(0);
  const [modalShow, setModalShow] = React.useState(false);

  let { id_polymaster } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(GET_HA_OF_POLYCLINIC(id_polymaster), {
          headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .then((res) => {
          console.log(res.data);
          setHealthAgencies(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const displayModal = (healthAgency) => {
    console.log(healthAgency);
    setHA(healthAgency);
    setModalShow(true);
  };

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
                  <>
                    <Card
                      className="text-center mx-auto my-auto"
                      style={{
                        backgroundColor: "#F0F5FE",
                        width: "180px",
                        borderRadius: "15px",
                      }}
                    >
                      <Card.Body>
                        {healthAgency.image == null ? (
                          <FaHospital
                            style={{
                              fontSize: "30px",
                            }}
                          />
                        ) : (
                          <Image
                            src={
                              SERVER_NAME +
                              "/storage/img/health_agencies/" +
                              healthAgency.image
                            }
                            className="rounded-sm img-center img-fluid shadow shadow-lg--hover"
                            style={{
                              width: "75px",
                              cursor: "pointer",
                            }}
                            alt={healthAgency.image}
                          />
                        )}
                        <p className="mt-3">{healthAgency.name}</p>
                        <Button
                          variant="light"
                          onClick={() => displayModal(healthAgency)}
                        >
                          Jadwal
                        </Button>
                      </Card.Body>
                    </Card>
                  </>
                );
              })}
            </Row>
            {modalShow && (
              <ScheduleModal
                show={modalShow}
                poly_id={id_polymaster}
                healthAgency={HA}
                onHide={() => setModalShow(false)}
              />
            )}
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default ListHAofPoly;
