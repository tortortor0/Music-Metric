import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App.jsx";
//import "./styles.scss";

render(
  <App />,
  document.getElementById('root')
);