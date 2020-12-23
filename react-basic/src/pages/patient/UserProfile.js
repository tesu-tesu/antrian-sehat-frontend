import React from 'react';
import axios from "axios";
import {GET_SELF, JWT_HEADER} from "../../constants/urls";
import {Card, Spinner} from "react-bootstrap";


const UserProfile = (props) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userID, setUserID] = React.useState(null);
    const [userResidentialRegistered, setUserResidentialRegistered] = React.useState(null);
    const [userImage, setUserImage] = React.useState(null);
    const [userEmail, setUserEmail] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(GET_SELF(), {
                    headers: {Authorization: `Bearer ${JWT_HEADER}`},
                })
                .then((res) => {
                    setUserID(res.data.data.id);
                })
                .catch((err) => {
                    console.log(err);
                });
            setIsLoading(false)
        };
        fetchData()
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

                    </Card.Body>
                )
                }
            </Card>
        </div>
    );
}

export default UserProfile;