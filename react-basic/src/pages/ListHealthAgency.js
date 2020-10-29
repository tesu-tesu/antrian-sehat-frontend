import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {Breadcrumb, Card, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Axios from "axios";
import {GET_HEALTH_AGENCY, JWT_HEADER} from "../constants/urls";
import { useParams } from "react-router";

const ListHealthAgency = () => {
    const [healthAgencies, setHealthAgencies] = useState([]);
    let {id_health_agency} = useParams();

    useEffect(() => {
        console.log(JWT_HEADER)
        Axios
            .get(GET_HEALTH_AGENCY(id_health_agency), {
                headers: {"Authorization": `Bearer ${JWT_HEADER}`}
            }).then(r => {
            setHealthAgencies(r.data);
        }).catch(e => console.log(e))
    }, []);


    return (
        <div>
            <NavBar/>
            <section>
                <Breadcrumb>
                    <Breadcrumb.Item href="/"> <FontAwesomeIcon icon={["far", "home"]}/>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                        puskesmas
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="mx-5">
                    <h2 className="ui dividing header">Daftar Puskesmas</h2>
                </div>
            </section>
            <Container className="mt-4">
                <Card>
                    <Card.Body>
                        <Row>
                            {
                                healthAgencies.map((
                                    healthAgency, key) => {
                                        return (
                                            <Card
                                                key={key}
                                                className="mx-3 text-center mx-auto"
                                                style={{
                                                    backgroundColor: "#F0F5FE"
                                                }}
                                            >
                                                <Card.Header>
                                                    <img src={healthAgency.image} className="card-img" alt="image"/>
                                                </Card.Header>
                                                <Card.Body>
                                                    <p className="mt-3">{healthAgency.name}</p>
                                                </Card.Body>
                                            </Card>
                                        );
                                    }
                                )
                            }
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default ListHealthAgency;
