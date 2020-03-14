import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <h1 className="landing-header">Time for a new adventure</h1>
      <h3>Discover your next hike.</h3>
      <form className="landing-form">
        <input type="search" placeholder="Where are you located?" />
      </form>
    </div>
  );
};

export default LandingPage;
