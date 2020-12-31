import React from "react";
import axios from "axios";
import {
  GET_RESIDENCE_NUMBER,
  GET_SELF,
  JWT_HEADER,
} from "../../constants/urls";
import { Card, Row, Spinner, Col } from "react-bootstrap";
import logoUser from "../../images/user-avatar.jpg";
import { useHistory } from "react-router-dom";
import { FaDoorOpen, FaRegSun } from "react-icons/fa";
import EditProfile from "../../components/EditProfile";

const UserProfile = (props) => {
  const [isLoading, setIsLoading] = React.useState(0);
  const [residences, setResidences] = React.useState([]);
  const [userImage, setUserImage] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [errorResidenceNumber, setErrorResidenceNumber] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);

  let history = useHistory();

  const getResidenceNumber = async () => {
    await axios
      .get(GET_RESIDENCE_NUMBER(), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        setResidences(res.data.data);
      })
      .catch((err) => {
        /*setErrorResidenceNumber(
                            err.response.data.data?.message ? err.response.data.data.message : ""
                        );*/
        console.log(err);
      });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(GET_SELF(), {
          headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .then((res) => {
          setUserImage(res.data.data.image);
          setUserEmail(res.data.data.email);
          setUserName(res.data.data.name);
        })
        .catch((err) => {
          setUserImage(logoUser);
          console.log(err);
        });
      setIsLoading(false);
    };
    fetchData();
    getResidenceNumber();
  }, [userImage]);

  const onEditProfile = () => {
    setModalShow(true);
  };

  const handleChange = (e) => {
    if (e.target.files.length) {
      console.log(e.target?.files);
      setUserImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", userImage.raw);

    // await fetch("YOUR_URL", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: formData,
    // });
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
                  <label htmlFor="upload-button">
                    {userImage === undefined ||
                    userImage === "" ||
                    userImage.length === 0 ? (
                      <img
                        src={logoUser}
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        style={{
                          width: "180px",
                        }}
                        alt={logoUser.alt}
                      />
                    ) : (
                      <>
                        <img
                          src={userImage}
                          className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                          style={{
                            width: "180px",
                          }}
                          alt={userImage.alt}
                        />
                      </>
                    )}
                  </label>
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
                    {residences.map((residence, key) => {
                      return (
                        <>
                          <li className="list-group-item">
                            <h5>{residence}</h5>
                          </li>
                        </>
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
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;
