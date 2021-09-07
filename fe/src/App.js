import React from "react";
import "./App.css";
import "antd/dist/antd.css";

import SelectParking from "./components/SelectParking";
import VirtualPaking from "./components/VirtualPaking";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" children={<SelectParking />} />
      <Route exact path="/:id" children={<VirtualPaking />} />
    </Router>
  );
}

export default App;
