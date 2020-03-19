import React, { useContext } from "react";
import "./ItineraryItem.css";
import { ctx } from "../../context/Provider";

const ItineraryItem = ({ destination, index }) => {
  const {
    name,
    location: { address, crossStreet }
  } = destination;
  const { handleItinerarySubmit, handleItineraryMove } = useContext(ctx);
  return (
    <div className="itinerary-item">
      <div className="itinerary-item-left">
        <span>#{index + 1}</span> <span>{name}</span>
        <div>
          <span>{`${address ? address : ""}${
            crossStreet ? " " + crossStreet : ""
          }`}</span>
        </div>
      </div>

      <div className="itinerary-item-right">
        <div
          className="itinerary-item-control"
          onClick={() => handleItineraryMove(destination, "up")}
        >
          ⬆
        </div>
        <div
          className="itinerary-item-control"
          onClick={() => handleItinerarySubmit(destination)}
        >
          ✖
        </div>
        <div
          className="itinerary-item-control"
          onClick={() => handleItineraryMove(destination, "down")}
        >
          ⬇
        </div>
      </div>
    </div>
  );
};

export default ItineraryItem;
