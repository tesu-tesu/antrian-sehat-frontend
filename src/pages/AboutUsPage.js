import React from "react";
import {
  Row,
  Col,
  Card,
  Spinner,
  Modal,
  Button,
  Image,
  Container,
} from "react-bootstrap";
import { FaHospital } from "react-icons/fa";
import fotoUser03 from "../images/dev-team/03.png";
import fotoUser04 from "../images/dev-team/04.png";
import fotoUser15 from "../images/dev-team/15.jpg";
import fotoUser21 from "../images/dev-team/21.png";
import fotoUser22 from "../images/dev-team/22.png";
import fotoUser27 from "../images/dev-team/27.png";

import alterra from "../images/sponsor/alterra.png";
import maulidangames from "../images/sponsor/maulidangames.png";
import profilku from "../images/sponsor/profilku.png";
import PTI from "../images/sponsor/PTI.png";
import rasyidinstitute from "../images/sponsor/rasyidinstitute.png";
import rasyidtechnologies from "../images/sponsor/rasyidtechnologies.png";
import sindika from "../images/sponsor/sindika.png";
import trustmedis from "../images/sponsor/trustmedis.png";
import virtuahive from "../images/sponsor/virtuahive.png";

import Mentors from "../components/Mentors";

const AboutUsPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [profiles, setProfiles] = React.useState([
    {
      img: fotoUser03,
      name: "Refano Pradana",
    },
    {
      img: fotoUser04,
      name: "Yanu Adi Nugraha",
    },
    {
      img: fotoUser15,
      name: "Rochimatus Sa'diyah",
    },
    {
      img: fotoUser21,
      name: "Sabillah Ferdiana",
    },
    {
      img: fotoUser22,
      name: "Muhammad Ghozy",
    },
    {
      img: fotoUser27,
      name: "Muhammad Satriyo Aji",
    },
  ]);

  React.useEffect(() => {}, [profiles]);

  return (
    <div className="mx-4 px-4 mt-3">
      <Card
        className="mx-lg-4 border-light"
        style={{
          borderRadius: "15px",
        }}
      >
        <Card.Title className="mt-4 mb-3 ml-3 text-center">
          <h4>
            <b>Developer Team</b>
          </h4>
        </Card.Title>
        <Card.Body>
          <div className="dev-team mb-6">
            <Row>
              {profiles.map((profile, key) => {
                return (
                  <Col
                    md={6}
                    lg={4}
                    xl={4}
                    key={key}
                    className="text-center mb-3"
                  >
                    <div className="mb-3">
                      <Image
                        roundedCircle
                        src={profile.img}
                        className="img-center img-fluid shadow shadow-lg--hover"
                        style={{
                          width: "180px",
                        }}
                        alt={profile.name.alt}
                      />
                    </div>
                    <div>
                      <h5>{profile.name}</h5>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
          <div className="sponsors mb-6">
            <Row>
              <Col lg={6} xl={6} className="mb-3 text-center">
                <div className="mb-3">
                  <h5>
                    <b>Disponsori oleh</b>
                  </h5>
                </div>
                <div>
                  <Row className="d-flex justify-content-around">
                    <Col lg={6} md={6} className=" mb-3">
                      <Image
                        src={virtuahive}
                        className="img-center img-fluid shadow-lg--hover"
                        style={{
                          height: "56px",
                        }}
                        alt={virtuahive.alt}
                      />
                    </Col>
                    <Col lg={6} md={6} className=" mb-3">
                      <Image
                        src={maulidangames}
                        className="img-center img-fluid shadow-lg--hover"
                        style={{
                          height: "58px",
                        }}
                        alt={maulidangames.alt}
                      />
                    </Col>
                    <Col lg={6} md={6} className=" mb-3">
                      <Image
                        src={PTI}
                        className="img-center img-fluid shadow-lg--hover"
                        style={{
                          height: "46px",
                        }}
                        alt={PTI.alt}
                      />
                    </Col>
                    <Col lg={6} md={6} className=" mb-3">
                      <Image
                        src={rasyidtechnologies}
                        className="img-center img-fluid shadow-lg--hover"
                        style={{
                          height: "54px",
                        }}
                        alt={rasyidtechnologies.alt}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={6} xl={6} className="mb-3 text-center">
                <div className="mb-3">
                  <h5>
                    <b>Didukung oleh</b>
                  </h5>
                </div>
                <div className="d-flex justify-content-around">
                  <Row>
                    <Col lg={4} md={4} className="text-center mb-3">
                      <Image
                        src={sindika}
                        className="img-center img-fluid shadow-lg--hover"
                        style={{
                          height: "35px",
                        }}
                        alt={sindika.alt}
                      />
                    </Col>
                    <Col lg={4} md={4} className="text-center mb-3">
                      <Image
                        src={rasyidinstitute}
                        className="img-center img-fluid shadow-lg--hover"
                        style={{
                          height: "33px",
                        }}
                        alt={rasyidinstitute.alt}
                      />
                    </Col>
                    <Col lg={4} md={4} className="text-center mb-3">
                      <Image
                        src={alterra}
                        className="img-center img-fluid shadow-lg--hover"
                        style={{
                          width: "65px",
                        }}
                        alt={alterra.alt}
                      />
                    </Col>
                    <Col lg={4} md={4} className="text-center mb-3">
                      <Image
                        src={profilku}
                        className="img-center img-fluid shadow-lg--hover"
                        style={{
                          height: "33px",
                        }}
                        alt={profilku.alt}
                      />
                    </Col>
                    <Col lg={4} md={4} className="text-center mb-3">
                      <Image
                        src={trustmedis}
                        className="img-center img-fluid shadow-lg--hover"
                        style={{
                          height: "33px",
                        }}
                        alt={trustmedis.alt}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          <div className="sponsors mb-4">
            <Row className="d-flex justify-content-center">
              <Col lg={12} xl={12} className="mb-4">
                <div className="text-center">
                  <h5>
                    <b>Sponsor & Mentor</b>
                  </h5>
                </div>
              </Col>
              {Mentors.map((mentor, key) => {
                return (
                  <>
                    <Col
                      key={key}
                      lg={{ span: 3, offset: 1 }}
                      xl={{ span: 3, offset: 1 }}
                      className="mb-3"
                    >
                      {mentor.name}
                    </Col>
                    <Col lg={7} xl={7} className="mb-3">
                      {mentor.job}
                    </Col>
                  </>
                );
              })}
            </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AboutUsPage;
