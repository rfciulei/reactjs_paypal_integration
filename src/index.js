import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import PayTotalAmount from "./components/Paypal/PayTotalAmount";

ReactDOM.render(
  <React.StrictMode>
    <PayTotalAmount />
  </React.StrictMode>,
  document.getElementById("PayTotalAmount")
);
