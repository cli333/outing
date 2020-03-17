import React from "react";
import "./Loader.css";

const Loader = ({ loading }) => (
  <div className="loader-container">
    <i className={loading ? "loader" : ""}></i>
  </div>
);

export default Loader;
