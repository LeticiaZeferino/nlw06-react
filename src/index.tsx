import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./services/firebase.ts";
import "./styles/global.scss";

//exibe algo dentro do html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById("root")
);
