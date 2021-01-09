import React from "react";
import axios from "axios";
import { useLocation } from "react-router";
import {
  SEARCH_HEALTH_AGENCY,
  JWT_HEADER,
  SERVER_NAME,
} from "../../constants/urls";
import {
  Container,
  Card,
  Col,
  Row,
  Spinner,
  ListGroup,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaHospital } from "react-icons/fa";
import queryString from "query-string";

const SearchPageResult = () => {
  const [healthAgenciesName, setHealthAgenciesName] = React.useState([]);
  const [healthAgenciesContains, setHealthAgenciesContains] = React.useState(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);

  let history = useHistory();
  const location = useLocation();

  const fetchData = async (searchKey) => {
    setIsLoading(true);
    await axios
      .post(
        SEARCH_HEALTH_AGENCY(),
        {
          search: searchKey,
        },
        { headers: { Authorization: `Bearer ${JWT_HEADER}` } }
      )
      .then((res) => {
        setHealthAgenciesName(res.data.name);
        setHealthAgenciesContains(res.data.contains);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    setIsLoading(false);
  };

  const toSchedule = (idHA) => {
    history.push({
      pathname: "/pasien/polyclinic-schedule/" + idHA,
    });
  };

  React.useEffect(() => {
    let queryObj = queryString.parse(location.search);
    let queryArray = Object.keys(queryObj);
    fetchData(queryArray[0]);
  }, [location]);

  const renderDataName = () => {
    return healthAgenciesName?.map((healthAgency, key) => {
      return (
        <Col md={8} key={key}>
          <ListGroup>
            <ListGroup.Item className="text-center px--2" action>
              <Button
                size="lg"
                block
                variant="outline-info"
                onClick={() => toSchedule(healthAgency.id)}
              >
                {healthAgency.name}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      );
    });
  };
  const renderDataContains = () => {
    return healthAgenciesContains?.map((healthAgency, key) => {
      return (
        <Col md={8} key={key}>
          <ListGroup>
            <ListGroup.Item className="text-center px--2" action>
              <Button
                size="lg"
                block
                variant="outline-info"
                onClick={() => toSchedule(healthAgency.id)}
              >
                {healthAgency.name}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
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
        {isLoading ? (
          <Spinner animation="grow" variant="info" className="mx-auto">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Row>
            <Col
              md={6}
              lg={6}
              style={{
                borderRight: "4px solid #2fb591",
              }}
            >
              <Card.Body>
                <Row className="d-flex align-items-center justify-content-center">
                  {healthAgenciesName == undefined ? (
                    <Col md={12} className="text-center">
                      <p>Tidak ada nama puskesmas seperti yang Anda cari</p>
                    </Col>
                  ) : (
                    <>
                      <Col md={12} className="text-center mb-3">
                        <h5>Puskesmas dengan nama seperti yang Anda cari</h5>
                      </Col>
                      {renderDataName()}
                    </>
                  )}
                </Row>
              </Card.Body>
            </Col>
            <Col
              md={6}
              lg={6}
              style={{
                borderLeft: "4px solid #2fb591",
              }}
            >
              <Card.Body>
                <Row className="d-flex align-items-center justify-content-center">
                  {healthAgenciesContains == undefined ? (
                    <Col md={12} className="text-center">
                      <p>
                        Tidak ada puskesmas dengan nama poliklinik seperti yang
                        Anda cari
                      </p>
                    </Col>
                  ) : (
                    <>
                      <Col md={12} className="text-center mb-3">
                        <h5>
                          Puskesmas dengan nama poliklinik seperti yang Anda
                          cari
                        </h5>
                      </Col>
                      {renderDataContains()}
                    </>
                  )}
                </Row>
              </Card.Body>
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
};

export default SearchPageResult;
