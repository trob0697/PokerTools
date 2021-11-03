import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";

import NavigationBar from "./components/NavigationBar";
import Home from "./routes/Home";
import PreflopCharts from "./routes/PreflopCharts";
import EquityCalculator from "./routes/EquityCalculator";

function App() {
  return (
    <div>
      <NavigationBar />
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/preflop-charts">
            <PreflopCharts />
          </Route>
          <Route path="/equity-calculator">
            <EquityCalculator />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
