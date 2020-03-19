import React, { useState, useRef, useEffect } from "react";
import "./LandingPage.css";
import useLanding from "../../hooks/useLanding";
import Loader from "../Loader/Loader";

const LandingPage = ({ history }) => {
  const [query, setQuery] = useState("");
  const {
    loading,
    handleSubmit,
    display,
    setDisplay,
    recommendations,
    handleChange
  } = useLanding(query, history);
  const wrapperRef = useRef(null);

  const handleClickOutside = e => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  const handleClickRecommendation = recommendation => {
    setQuery(recommendation);
    setDisplay(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="landing">
      <h1 className="landing-header">Discover what's out there</h1>
      <h3>Plan your next outing.</h3>
      <form
        ref={wrapperRef}
        className="landing-form"
        onSubmit={e => handleSubmit(e)}
        autoComplete="false"
      >
        <input
          type="search"
          placeholder="Where are you located?"
          onChange={e => handleChange(e, setQuery)}
          value={query}
          disabled={loading}
        />
        <Loader loading={loading} />
        {display && query.length > 0 && (
          <div className="autocomplete">
            {recommendations.map((rec, i) => (
              <div
                onClick={() => handleClickRecommendation(rec)}
                className="recommendation"
                key={i}
              >
                {rec}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default LandingPage;
