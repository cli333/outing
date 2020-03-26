import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";

const NavBar = () => {
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
        <div className="navbar-link">Login</div>
        <Login />
      </div>
    </nav>
  );
};

export default NavBar;
