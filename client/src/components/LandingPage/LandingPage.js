import React, { useState, useContext } from "react";
import "./LandingPage.css";
import axios from "axios";
import { ctx } from "../../context/Provider";

const LandingPage = ({ history }) => {
  const { setCurrentLocation } = useContext(ctx);
  const [query, setQuery] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    axios.post("/api/search", { query }).then(res => {
      const {
        features: [{ center }]
      } = res.data;
      setCurrentLocation(center);
      history.push("/search");
    });
  };
  return (
    <div className="landing">
      <h1 className="landing-header">Time for a new adventure</h1>
      <h3>Discover your next hike.</h3>
      <form className="landing-form" onSubmit={e => handleSubmit(e)}>
        <input
          type="search"
          placeholder="Where are you located?"
          onChange={e => setQuery(e.target.value)}
          value={query}
        />
      </form>
    </div>
  );
};

export default LandingPage;
