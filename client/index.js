import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Main from "./Main.jsx";
//import "./styles.scss";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="main" element={<Main />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);