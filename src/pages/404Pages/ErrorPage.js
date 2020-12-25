import React from "react";
import NavBar from "../../components/pasien/NavBar";
import headerImage from "images/pasien/human sit.png";
import FooterBar from "../../components/FooterBar";
import Header from "../../components/admin/Header";
import { Link } from "react-router-dom";

ErrorPage.propTypes = {};

function ErrorPage(props) {
  return (
    <div>
      {/*            {!props.isAdmin ?  (
                    <Header/>
                ) : (
                    <NavBar/>
            )}*/}
      <div className="main-content">
        <div className="row row-grid justify-content-center">
          <div className="">
            <div className="container min-vh-100 d-flex justify-content-center align-items-center">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <h1 className="display-4">404 ERROR</h1>
                    <p className="lead">Laman Tidak Ditemukan :(</p>
                    <h4 className="description text-default">
                      Sepertinya Anda tersesat.
                    </h4>
                  </div>
                  <div className="btn-wrapper text-center px--3">
                    <Link to="/" className="btn btn-neutral mb-3 mb-sm-0">
                      <span className="btn-inner--text">Back To Home</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}

export default ErrorPage;
