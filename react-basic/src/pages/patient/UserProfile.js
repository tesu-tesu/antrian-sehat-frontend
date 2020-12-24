import React from 'react';
import axios from "axios";
import {GET_SELF, JWT_HEADER} from "../../constants/urls";
import {Card, Spinner} from "react-bootstrap";
import logoUser from "../../images/user-avatar.jpg"
import {logout} from "../../utils/auth";
import {useHistory} from "react-router-dom";
import {FaRegSun, FaDoorOpen} from "react-icons/fa";

const UserProfile = (props) => {
    const [isLoading, setIsLoading] = React.useState(0);
    const [userID, setUserID] = React.useState(null);
    const [userResidentialRegistered, setUserResidentialRegistered] = React.useState(null);
    const [userImage, setUserImage] = React.useState(null);
    const [userEmail, setUserEmail] = React.useState(null);
    const [userName, setUserName] = React.useState(null);

    let history = useHistory();

    React.useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(GET_SELF(), {
                    headers: {Authorization: `Bearer ${JWT_HEADER}`},
                })
                .then((res) => {
                    setUserID(res.data.data.id)
                    setUserImage(res.data.data.image)
                    setUserEmail(res.data.data.email)
                    setUserName(res.data.data.name)
                })
                .catch((err) => {
                    setUserImage(logoUser)
                    console.log(err);
                });
            setIsLoading(false)
        };

        fetchData()
    }, []);

    const onLogout = () => {
        logout();
        history.replace("/");
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
                        <div className="row row-example">
                            <div className="col">
                                <a href="#!">
                                    {logoUser === null || logoUser === "" ? (
                                        <img src={logoUser}
                                             className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                             style={{
                                                 width: "140px",
                                             }}>
                                        </img>
                                    ) : (
                                        <img src={logoUser}
                                             className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                             style={{
                                                 width: "140px",
                                             }}>
                                        </img>
                                    )}
                                </a>
                                <div className="pt-4 text-center">
                                    <h5 className="h3 title">
                                        <span className="d-block mb-1">{userEmail}</span>
                                        <small className="h4 font-weight-light text-muted">{userName}</small>
                                    </h5>
                                    <hr/>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary btn-lg">
                                        <i className="fab fa-cog"/>
                                        <FaRegSun/>  Pengaturan
                                    </button>
                                </div>
                                <div className="text-center m-1">
                                    <button type="button" onClick={onLogout} className="btn btn-secondary btn-lg">
                                        <FaDoorOpen/> Logout
                                    </button>
                                </div>
                            </div>
                            <div className="col-5 ml-3">
                                <h4 className="display-6 mb--3 p--3">Kerabat yang pernah Anda Daftarkan</h4>
                            </div>
                            <div className="col">
                                <span>

                                </span>
                            </div>
                        </div>
                    </Card.Body>
                )
                }
            </Card>
        </div>
    );
}

export default UserProfile;