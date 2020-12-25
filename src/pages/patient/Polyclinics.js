import React from "react";
import { GET_ALL_POLYMASTERS, JWT_HEADER } from "constants/urls";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { FaReact } from "react-icons/fa";
import Pagination from "react-js-pagination";

const Polymasters = () => {
  const [polymasters, setPolymasters] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState("");
  const [perPage, setPerPage] = React.useState("");
  const [total, setTotal] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(0);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page_number = 1) => {
    setIsLoading(true);
    await axios
      .get(GET_ALL_POLYMASTERS(page_number), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setCurrentPage(res.data.data.current_page);
        setPerPage(res.data.data.per_page);
        setTotal(res.data.data.total);
        setPolymasters(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const renderData = () => {
    // var { data, current_page, per_page, total } = healthAgencies;

    return polymasters.map((polymaster, key) => {
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
            <Link to={`/pasien/puskesmas/${polymaster.id}`}>
              <Card.Body>
                <FaReact
                  style={{
                    fontSize: "30px",
                  }}
                />
                <p className="mt-3">{polymaster.name}</p>
              </Card.Body>
            </Link>
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
        {isLoading ? (
          <Spinner animation="grow" variant="info" className="mx-auto">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Card.Body>
            <Row className="d-flex align-items-center justify-content-around">
              {polymasters && renderData()}
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
        )}
      </Card>
    </div>
  );
};

export default Polymasters;
