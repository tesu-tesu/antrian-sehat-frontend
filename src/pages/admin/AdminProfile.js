import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Card, Row, Spinner } from "react-bootstrap";
import logoUser from "../../images/user-avatar.jpg";
import { FaDoorOpen, FaRegSun } from "react-icons/fa";
import { GET_SELF, JWT_HEADER } from "../../constants/urls";
import { logout } from "../../utils/auth";

const AdminProfile = (props) => {
  const [isLoading, setIsLoading] = React.useState(0);
  const [userID, setUserID] = React.useState(null);
  const [userImage, setUserImage] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [healthAgency, setHealthAgency] = React.useState("");

  let history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(GET_SELF(), {
          headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .then((res) => {
          setUserName(res.data.data.name);
          setUserImage(res.data.data.image);
          setUserEmail(res.data.data.email);
          setHealthAgency(res.data.data.health_agency.name);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    };
    fetchData();
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
            <div className="row">
              <div className="col">
                <a href="#!">
                  {userImage === undefined ||
                  userImage === "" ||
                  userImage.length === 0 ? (
                    <img
                      src={logoUser}
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      style={{
                        width: "140px",
                      }}
                      alt={logoUser.alt}
                    />
                  ) : (
                    <img
                      src={userImage}
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      style={{
                        width: "140px",
                      }}
                      alt={userImage.alt}
                    />
                  )}
                </a>
                <div className="pt-4 text-center">
                  <h5 className="h3 title">
                    <span className="d-block mb-1">{userName}</span>
                    <small className="h4 font-weight-light text-muted">
                      {userEmail}
                    </small>
                  </h5>
                  <hr />
                </div>
                <div className="text-center m-5">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    <i className="fab fa-cog" />
                    <FaRegSun /> Edit
                  </button>
                </div>
                <div className="text-center m-5">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="btn btn-secondary btn-lg btn-block"
                  >
                    <FaDoorOpen /> Logout
                  </button>
                </div>
              </div>
              <div className="col-5">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title display-6">
                      Selamat Datang, di <span>antrian sehat</span>
                    </h4>
                    <h1>Admin {healthAgency}</h1>
                  </div>
                </div>
              </div>
              <div className="col">
                <span />
              </div>
            </div>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default AdminProfile;
