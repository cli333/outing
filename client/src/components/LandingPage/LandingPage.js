import React, { useState, useRef, useEffect, useContext } from "react";
import "./LandingPage.css";
import useLanding from "../../hooks/useLanding";
import Loader from "../Loader/Loader";
import { authCtx } from "../../context/AuthProvider";

const LandingPage = ({ history }) => {
  const [query, setQuery] = useState("");
  const { currentUser } = useContext(authCtx);
  const {
    loading,
    handleSubmit,
    display,
    setDisplay,
    recommendations,
    handleChange
  } = useLanding(query, history);
  const wrapperRef = useRef(null);

  const handleClickRecommendation = recommendation => {
    setQuery(recommendation);
    setDisplay(false);
    document.getElementById("landing-input").focus();
  };

  useEffect(() => {
    const handleClickOutside = e => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(e.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setDisplay]);

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
          id="landing-input"
          type="search"
          placeholder={!currentUser ? "Please login" : "Where are you located?"}
          onChange={e => handleChange(e, setQuery)}
          value={query}
          disabled={loading || !currentUser}
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
