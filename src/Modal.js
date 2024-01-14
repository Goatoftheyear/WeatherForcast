import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ anchorEl, name, forecast }) => {
  var visible;
  if (!anchorEl) {
    return;
  }
  console.log(anchorEl);
  return ReactDOM.createPortal(
    <span className="visible">
      {name}
      {forecast}
    </span>,
    document.querySelector("#modal")
  );
};

export default Modal;
