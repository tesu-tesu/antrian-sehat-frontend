import React from 'react';
import NavBar from "../../components/NavBar";
import headerImage from "images/pasien/human sit.png";
import FooterBar from "../../components/FooterBar";

ErrorPage.propTypes = {

};

function ErrorPage(props) {
    return (
        <div>
            <div className="header">
                <NavBar/>
            </div>
            <div className="main-content">
                <div className="row row-grid justify-content-center">
                    <div className="">
                        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                            <div className="row">
                                <div className="pr-md-12 text-center">
                                    <h1 className="display-4">404 ERROR</h1>
                                    <p className="lead">Laman Tidak Ditemukan :(</p>
                                    <h4 className="description text-default">Sepertinya Anda tersesat.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterBar/>
        </div>
    );
}

export default ErrorPage;