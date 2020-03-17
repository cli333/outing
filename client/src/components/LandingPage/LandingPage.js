import React, { useState } from "react";
import "./LandingPage.css";
import useLanding from "../../hooks/useLanding";

const LandingPage = ({ history }) => {
  const [query, setQuery] = useState("");
  const { loading, handleSubmit } = useLanding(query, history);

  return (
    <div className="landing">
      <h1 className="landing-header">Discover what's out there</h1>
      <h3>Plan your next outing.</h3>
      <form className="landing-form" onSubmit={e => handleSubmit(e)}>
        <input
          type="search"
          placeholder="Where are you located?"
          onChange={e => setQuery(e.target.value)}
          value={query}
          disabled={loading}
        />
        <div class="loader-container">
          <i class={loading ? "loader" : ""}></i>
        </div>
      </form>
    </div>
  );
};

export default LandingPage;
