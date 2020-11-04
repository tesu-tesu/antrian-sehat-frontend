import React from "react";
import { GET_ALL_HEALTH_AGENCIES, JWT_HEADER } from "constants/urls";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import { FaReact } from "react-icons/fa";
import Pagination from "react-js-pagination";

const HealthAgencies = () => {
  const [healthAgencies, setHealthAgencies] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState("");
  const [perPage, setPerPage] = React.useState("");
  const [total, setTotal] = React.useState("");

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page_number = 1) => {
    await axios
      .get(GET_ALL_HEALTH_AGENCIES(page_number), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setCurrentPage(res.data.current_page);
        setPerPage(res.data.per_page);
        setTotal(res.data.total);
        setHealthAgencies(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderData = () => {
    // var { data, current_page, per_page, total } = healthAgencies;

    return healthAgencies.map((healthAgency, key) => {
      // console.log("key: ", healthAgency.id); //use id to send selected HA card
      return (
        <Col md="3" className="mb-3">
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
              <FaReact
                style={{
                  fontSize: "30px",
                }}
              />
              <p className="mt-3">{healthAgency.name}</p>
            </Card.Body>
          </Card>
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
        <Card.Body>
          <Row className="d-flex align-items-center justify-content-around">
            {healthAgencies && renderData()}
          </Row>
          <Row className="float-right mt-4">
            <Pagination
              activePage={currentPage}
              onChange={(e) => fetchData(e)}
              totalItemsCount={total}
              itemsCountPerPage={perPage}
              itemClass="page-item"
              linkClass="page-link"
              firstPageText="<<"
              lastPageText=">>"
            />
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HealthAgencies;
