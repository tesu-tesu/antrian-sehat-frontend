import React from "react";

const FooterBar = () => {
  return (
    <footer className="card-footer bg-white">
      <div className="row align-items-center justify-content-lg-between">
        <div className="col-lg-6">
          <div className="copyright text-center text-lg-left text-muted">
            <a>
              &copy;{new Date().getFullYear()} Antrian sehat alright reserved
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
