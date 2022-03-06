import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import NavigationBar from "./components/NavigationBar";
import Home from "./routes/Home";
import PreflopCharts from "./routes/PreflopCharts";
import EquityCalculator from "./routes/EquityCalculator";
import Settings from "./routes/Settings";

function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
