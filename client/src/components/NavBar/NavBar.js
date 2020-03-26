import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink, withRouter } from "react-router-dom";
import Login from "../Login/Login";
import { authCtx } from "../../context/AuthProvider";
import useLogin from "../../hooks/useLogin";
import { ctx } from "../../context/Provider";

const NavBar = ({ history }) => {
  const { displayLogin, setDisplayLogin } = useContext(ctx);
  const { currentUser } = useContext(authCtx);
  const { handleLogout } = useLogin();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink
          to="/"
          activeStyle={{ color: "white" }}
          style={{ textDecoration: "none" }}
        >
          Outing
        </NavLink>
      </div>
      <div className="navbar-right">
        {!currentUser ? (
          <div
            className="navbar-link"
            onClick={() => setDisplayLogin(!displayLogin)}
          >
            Log In
          </div>
        ) : (
          <div className="navbar-link" onClick={() => handleLogout()}>
            Log Out
          </div>
        )}
        <Login />
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
