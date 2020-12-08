import React from "react";
import QRCodes from "./QRCodes";

const ShowQRCode = (props) => {
  console.log(props);
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
      <QRCodes value={props.waitingList.barcode} />
      <div className="my-3">
        <h5>{formattedDate}</h5>
      </div>
      <p className="my-0">
        No. Antrian : <span>{props.waitingList.order_number}</span>
      </p>
      <p className="my-0">
        Saat ini :{" "}
        <span>
          {dateString > today ? " - " : props.waitingList.current_number}/
          {props.waitingList.latest_number}
        </span>
      </p>
      <b className="my-0">{props.waitingList.residence_number}</b>
      <p className="my-0">{props.waitingList.health_agency}</p>
      <p className="my-0">{props.waitingList.polyclinic}</p>
    </div>
  );
};

export default ShowQRCode;
