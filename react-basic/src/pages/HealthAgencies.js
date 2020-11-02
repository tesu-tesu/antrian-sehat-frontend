import React from "react";
import { GET_ALL_HEALTH_AGENCIES, JWT_HEADER } from "constants/urls";
import axios from "axios";
import { Row, Card } from "react-bootstrap";
import { FaReact } from "react-icons/fa";
import { useParams } from "react-router";
import MasterLayout from "components/pasien/PasienContainer"

const HealthAgencies = () => {
  const [healthAgencies, setHealthAgencies] = React.useState([]);

  React.useEffect(() => {    
    axios
      .get(GET_ALL_HEALTH_AGENCIES(),  { 
        headers: {"Authorization" : `Bearer ${JWT_HEADER}`} 
      })
      .then((res) => {
          console.log(res)
        setHealthAgencies(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const props = {
    title: 'Health Agencies', 
    breadcrumb: 'Health Agencies',
    content: 
    <Row>
    {healthAgencies.map((healthAgency,key) => {
      return (
        <Card 
          key={key} 
          className="text-center mx-auto"
          style={{
            backgroundColor : "#F0F5FE",
            width:"180px"
          }}
        >
          <Card.Body>
            <FaReact
              style={{
                fontSize : "30px"
              }}
            />
            <p className="mt-3">{healthAgency.name}</p>
          </Card.Body>
        </Card>
      );
    })}
  </Row>
  };
  return <MasterLayout {...props} />;

};

export default HealthAgencies;
