import React from "react";
import QRCode from "qrcode.react";
import logo from "../../images/logo.png";
import axios from "axios";

const QRCodes = (props) => {
return (
<QRCode
  value={props.value}
  size={240}
  bgColor={"#ffffff"}
  fgColor={"#000000"}
  level={"L"}
  includeMargin={false}
  renderAs={"svg"}
//   imageSettings={{
//     src: {logo},
//     x: null,
//     y: null,
//     height: 24,
//     width: 24,
//     excavate: true,
//   }}
/>);
}

export default QRCodes;