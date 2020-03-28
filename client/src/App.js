import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Provider from "./context/Provider";
import LandingPage from "./components/LandingPage/LandingPage";
import SearchPage from "./components/SearchPage/SearchPage";
import NavBar from "./components/NavBar/NavBar";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute path="/search">
              <SearchPage />
            </PrivateRoute>
          </Switch>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
