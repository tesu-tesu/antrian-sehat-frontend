import React from "react";
import axios from "axios";
import { useLocation } from "react-router";
import {
  SEARCH_HEALTH_AGENCY_NAME,
  SEARCH_HEALTH_AGENCY_CONTAINS_POLY,
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
import Pagination from "react-js-pagination";

const SearchPageResult = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPageName, setCurrentPageName] = React.useState(0);
  const [perPageName, setPerPageName] = React.useState(0);
  const [totalName, setTotalName] = React.useState(0);
  const [currentPageContains, setCurrentPageContains] = React.useState(0);
  const [perPageContains, setPerPageContains] = React.useState(0);
  const [totalContains, setTotalContains] = React.useState(0);
  const [healthAgenciesName, setHealthAgenciesName] = React.useState([]);
  const [healthAgenciesContains, setHealthAgenciesContains] = React.useState(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);

  let history = useHistory();
  const location = useLocation();

  const fetchData = (searchKey) => {
    setIsLoading(true);

    fetchNameData(searchKey);
    fetchContainsData(searchKey);

    setIsLoading(false);
  };

  const fetchNameData = async (page_number, searchString) => {
    await axios
      .post(
        SEARCH_HEALTH_AGENCY_NAME(page_number),
        {
          search: searchString,
        },
        { headers: { Authorization: `Bearer ${JWT_HEADER}` } }
      )
      .then((res) => {
        setCurrentPageName(res.data.current_page);
        setPerPageName(res.data.per_page);
        setTotalName(res.data.total);
        setHealthAgenciesName(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const fetchContainsData = async (page_number, searchString) => {
    await axios
      .post(
        SEARCH_HEALTH_AGENCY_CONTAINS_POLY(page_number),
        {
          search: searchString,
        },
        { headers: { Authorization: `Bearer ${JWT_HEADER}` } }
      )
      .then((res) => {
        setCurrentPageContains(res.data.current_page);
        setPerPageContains(res.data.per_page);
        setTotalContains(res.data.total);
        setHealthAgenciesContains(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const toSchedule = (idHA) => {
    history.push({
      pathname: "/pasien/jadwal-poliklinik/" + idHA,
    });
  };

  React.useEffect(() => {
    let queryObj = queryString.parse(location.search);
    let queryArray = Object.keys(queryObj);

    setSearchQuery(queryArray[0]);

    setIsLoading(true);
    fetchNameData(1, queryArray[0]);
    fetchContainsData(1, queryArray[0]);
    setIsLoading(false);
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
                <Row className="float-right mt-4">
                  <Pagination
                    activePage={currentPageName}
                    onChange={(e) => fetchNameData(e, searchQuery)}
                    totalItemsCount={totalName}
                    itemsCountPerPage={perPageName}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
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
                <Row className="float-right mt-4">
                  <Pagination
                    activePage={currentPageContains}
                    onChange={(e) => fetchContainsData(e, searchQuery)}
                    totalItemsCount={totalContains}
                    itemsCountPerPage={perPageContains}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
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
