import React from "react";
import "./Itinerary.css";
import ItineraryItem from "../ItineraryItem/ItineraryItem";

const Itinerary = ({ itinerary }) => {
  return (
    <div className="itinerary">
      {itinerary.map((i, index) => (
        <ItineraryItem key={i.id} destination={i} index={index} />
      ))}
    </div>
  );
};

export default Itinerary;
