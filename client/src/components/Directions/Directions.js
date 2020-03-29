import React from "react";
import "./Directions.css";

const Directions = ({ directions }) => {
  return (
    <div className={`directions ${directions.length === 0 ? "hide" : ""}`}>
      <h2>Directions</h2>
      <ul>
        {directions.map(d => (
          <li key={d.index}>
            <img alt="direction" src={d.iconUrl} />
            {d.narrative}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Directions;
