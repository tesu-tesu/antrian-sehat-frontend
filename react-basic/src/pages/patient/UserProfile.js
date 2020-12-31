import React from "react";
import { FaReact } from "react-icons/fa";
import { Row, Col, Card } from "react-bootstrap";
import { GET_USER_PROFLE, JWT_HEADER } from "constants/urls";
import axios from "axios";
  
const UserProfile = () => {
    const [isLoading, setIsLoading] = React.useState(0);
    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (id_user = 1) => {
        setIsLoading(true);
        await axios
          .get(GET_USER_PROFLE(id_user), {
            headers: { Authorization: `Bearer ${JWT_HEADER}` },
          })
          .then((res) => {
              console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        setIsLoading(false);
      };
    return (
        <div>
            <Col md="3" className="mb-3">
                <Card
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
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>This is some text within a card body.</Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default UserProfile;

