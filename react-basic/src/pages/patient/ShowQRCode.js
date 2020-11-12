import React from "react";
import QRCodes from "./QRCodes";

const ShowQRCode = (props) => {

  let dateString = new Date(props.registeredDate); //get next day

  let formattedDate = dateString
    .toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/ /g, " ");

  return (
    <div>
        <QRCodes value={props.qr}/>
        <div className="d-flex align-items-center">
          <h6>{formattedDate}</h6>
        </div>
        <p className="my-0">No. Antrian <span className="bold">{props.ordNumber}/{props.total}</span></p>
        <p className="bold my-0">{props.residenceNumber}</p>
        <p className="my-0">{props.ha}</p>
        <p className="my-0">{props.poly}</p>
    </div>
  );
};

export default ShowQRCode;
