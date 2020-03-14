import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import SearchPage from "./components/SearchPage/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/search" component={SearchPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
