import React, { useContext } from "react";
import "./ItineraryItem.css";
import { ctx } from "../../context/Provider";

const ItineraryItem = ({ destination }) => {
  const {
    name,
    location: { address, crossStreet }
  } = destination;
  const { handleItinerarySubmit } = useContext(ctx);
  return (
    <div className="itinerary-item">
      <div className="itinerary-item-left">
        <div className="itinerary-item-left-name">{name}</div>

        <div className="itinerary-item-left-address">{`${
          address ? address : ""
        }${crossStreet ? " " + crossStreet : ""}`}</div>
      </div>

      <div className="itinerary-item-right">
        <div
          className="itinerary-item-control"
          onClick={() => handleItinerarySubmit(destination)}
        >
          ✖
        </div>
      </div>
    </div>
  );
};

export default ItineraryItem;
