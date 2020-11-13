import React from "react";
import QRCodes from "./QRCodes";

const ShowQRCode = (props) => {
  let dateString = new Date(props.waitingList.registered_date); //get next day
  let today = new Date();
  let formattedDate = dateString
    .toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/ /g, " ");

  return (
    <div>
        <QRCodes value={props.waitingList.barcode}/>
        <div>
          <h6>{formattedDate}</h6>
        </div>
        <p className="my-0">No. Antrian :{" "}<b>{props.waitingList.order_number}</b></p>
        <p>Saat ini :{" "}<b>{dateString > today ? " - " : props.waitingList.current_number}/{props.waitingList.latest_number}</b></p>
        <p className="bold my-0">{props.waitingList.residence_number}</p>
        <p className="my-0">{props.waitingList.health_agency}</p>
        <p className="my-0">{props.waitingList.polyclinic}</p>
    </div>
  );
};

export default ShowQRCode;
