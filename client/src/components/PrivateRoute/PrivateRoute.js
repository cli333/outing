import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authCtx } from "../../context/AuthProvider";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(authCtx);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
