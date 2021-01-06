import React from "react";
import axios from "axios";
import {
  GET_RESIDENCE_NUMBER,
  CHANGE_IMAGE,
  READ_IMAGE,
  SERVER_NAME,
  GET_SELF,
  JWT_HEADER,
} from "../../constants/urls";
import { Card, Row, Spinner, Col, Toast } from "react-bootstrap";
import logoUser from "../../images/user-avatar.jpg";
import { useHistory } from "react-router-dom";
import { Tooltip } from "reactstrap";
import { FaDoorOpen, FaRegSun } from "react-icons/fa";
import EditProfile from "../../components/EditProfile";

const UserProfile = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [residences, setResidences] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const [userImage, setUserImage] = React.useState(null);
  const [fileName, setFileName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [errorResidenceNumber, setErrorResidenceNumber] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggleToast = () => setShowToast(!showToast);

  let history = useHistory();

  const getResidenceNumber = () => {
    axios
      .get(GET_RESIDENCE_NUMBER(), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setResidences(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = () => {
    axios
      .get(GET_SELF(), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setUserId(res.data.data.id);
        setUserEmail(res.data.data.email);
        setUserName(res.data.data.name);
        setUserImage(res.data.data.profile_img);
        setFileName(SERVER_NAME + res.data.data.imagePath);

        getResidenceNumber();

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const onEditProfile = () => {
    setModalShow(true);
  };

  const handleChange = (e) => {
    if (e.target.files.length) {
      console.log(e.target.files[0]);

      const formData = new FormData();
      formData.append("image", e.target.files[0], e.target.files[0].name);

      axios
        .post(CHANGE_IMAGE(userId), formData, {
          headers: {
            Authorization: `Bearer ${JWT_HEADER}`,
          },
        })
        .then((res) => {
          fetchData();
          toggleToast();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  return (
    <div className="mx-4 mt-3">
      <Toast
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={4000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Edit successfully</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Your profile data updated successfully!</Toast.Body>
      </Toast>
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
            <Row>
              <Col md={4} lg={3} xl={3}>
                <div className="pb-2 d-flex justify-content-center">
                  <label htmlFor="upload-button" id="labelImage">
                    {userImage == null ? (
                      <img
                        src={logoUser}
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        style={{
                          width: "180px",
                          cursor: "pointer",
                        }}
                        alt={logoUser.alt}
                      />
                    ) : (
                      <>
                        <img
                          src={fileName}
                          className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                          style={{
                            width: "180px",
                            cursor: "pointer",
                          }}
                          alt={fileName}
                        />
                      </>
                    )}
                  </label>
                  <Tooltip
                    placement="top"
                    isOpen={tooltipOpen}
                    target="labelImage"
                    toggle={toggle}
                  >
                    Change your profil image
                  </Tooltip>
                  <input
                    type="file"
                    id="upload-button"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                </div>

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
                    onClick={onEditProfile}
                    className="btn btn-info btn-lg btn-block"
                  >
                    <i className="fab fa-cog" />
                    <FaRegSun /> Edit
                  </button>
                </div>
              </Col>
              <Col md={6} lg={6} xl={6}>
                <h4 className="display-6 ml-4 mb-3">
                  Kerabat yang pernah Anda Daftarkan
                </h4>
                <Row className="list-group">
                  <ul>
                    {residences &&
                      residences.map((residence, key) => {
                        return (
                          <li className="list-group-item">
                            <h5>{residence}</h5>
                          </li>
                        );
                      })}
                  </ul>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>
      {modalShow && (
        <EditProfile
          centered
          show={modalShow}
          closable={true}
          message="Edit Profile"
          setShowToast={setShowToast}
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;
