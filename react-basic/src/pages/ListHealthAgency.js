import React, {useEffect, useState} from 'react';
import {Card, Row} from "react-bootstrap";
import Axios from "axios";
import {GET_ONE_HEALTH_AGENCY, JWT_HEADER} from "../constants/urls";
import {useParams} from "react-router";
import {FaHospital} from "react-icons/fa";
import MasterLayout from "../components/pasien/PasienContainer";

const ListHealthAgency = () => {
    const [healthAgencies, setHealthAgencies] = useState([]);
    let {id_health_agency} = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log(JWT_HEADER)
            setIsLoading(true);
            await Axios
                .get(GET_ONE_HEALTH_AGENCY(id_health_agency), {
                    headers: {"Authorization": `Bearer ${JWT_HEADER}`}
                }).then(r => {
                    setHealthAgencies(r.data);
                }).catch(e => console.log(e))
            setIsLoading(false);
        };
        fetchData()
        //setIsLoading(false);
    }, []);


    const props = {
        title: 'Daftar Puskesmas',
        breadcrumb: 'daftar puskesmas',
        content:
            <Row>
                {
                    isLoading ? (
                        <div>..is loading</div>
                    ) : (
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
                                        {/*                                    <Card.Header>
                                        <img src={healthAgency.image} className="card-img" alt="image"/>
                                    </Card.Header>*/}
                                        <Card.Body>
                                            <FaHospital
                                                style={{
                                                    fontSize: "30px"
                                                }}
                                            />
                                            <p className="mt-3">{healthAgency.name}</p>
                                        </Card.Body>
                                    </Card>
                                );
                            }
                        )
                    )
                }
            </Row>
    };
    return <MasterLayout {...props} />;
};

export default ListHealthAgency;
