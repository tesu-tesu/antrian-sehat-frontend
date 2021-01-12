import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Card, Row, Spinner, Col } from "react-bootstrap";
import { Tooltip } from "reactstrap";
import logoUser from "../../images/user-avatar.jpg";
import { FaDoorOpen, FaRegSun } from "react-icons/fa";
import {
  CHANGE_IMAGE,
  SERVER_NAME,
  JWT_HEADER,
  GET_SELF,
} from "../../constants/urls";
import EditProfile from "../../components/EditProfile";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AdminProfile = (props) => {
  const [isLoading, setIsLoading] = React.useState(0);
  const [userId, setUserId] = React.useState("");
  const [userImage, setUserImage] = React.useState(null);
  const [fileName, setFileName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [healthAgency, setHealthAgency] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const editSwal = withReactContent(Swal);

  let history = useHistory();

  React.useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

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

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          editSwal.fire({
            title: "Edit success",
            text: "Your profile image updated successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        })
        .catch((err) => {
          console.log(err.response);
          let errString = "";
          err.response.data.image.map((error, key) => {
            errString += error + " ";
          });
          editSwal.fire({
            title: "Edit failed",
            text: errString,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
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
                <div className="text-center m-2">
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
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title display-6">
                      Selamat Datang, di <span>antrian sehat</span>
                    </h4>
                    <h1>Admin {healthAgency}</h1>
                  </div>
                </div>
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
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
};

export default AdminProfile;
