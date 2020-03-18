import React from "react";
import "./ItineraryItem.css";

const ItineraryItem = ({ destination, index }) => {
  const {
    name,
    location: { address, crossStreet },
    categories: [category]
  } = destination.destinationDetails;
  return (
    <div className="itinerary-item">
      <div>
        <span>#{index + 1}</span> <span>{name}</span>
      </div>
      <div>
        <span>{`${address ? address : ""}${
          crossStreet ? " " + crossStreet : ""
        }`}</span>
        <span>{category.name}</span>
      </div>
      <button>X</button>
    </div>
  );
};

export default ItineraryItem;
