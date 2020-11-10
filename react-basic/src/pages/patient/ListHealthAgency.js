import React, { useEffect, useState } from "react";
import { Card, Row, Spinner } from "react-bootstrap";
import Axios from "axios";
import { GET_ONE_HEALTH_AGENCY, JWT_HEADER } from "../../constants/urls";
import { useParams } from "react-router";
import { FaHospital } from "react-icons/fa";

const ListHealthAgency = () => {
  const [healthAgencies, setHealthAgencies] = useState([]);
  let { id_health_agency } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Axios.get(GET_ONE_HEALTH_AGENCY(id_health_agency), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
        .then((r) => {
          setHealthAgencies(r.data);
        })
        .catch((e) => console.log(e));
      setIsLoading(false);
    };
    fetchData();
    //setIsLoading(false);
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
          <Row>
            {isLoading ? (
              <Spinner animation="grow" variant="info" className="mx-auto">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <Card
                className="mx-3 text-center mx-auto"
                style={{
                  backgroundColor: "#F0F5FE",
                }}
              >
                {/*                                    <Card.Header>
                    <img src={healthAgency.image} className="card-img" alt="image"/>
                </Card.Header>*/}
                <Card.Body>
                  <FaHospital
                    style={{
                      fontSize: "30px",
                    }}
                  />
                  <p className="mt-3">{healthAgencies.name}</p>
                </Card.Body>
              </Card>
            )}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ListHealthAgency;
