import React from "react";
import "./MarkerCurrentLocation.css";
import { Marker } from "react-map-gl";

const MarkerCurrentLocation = ({ latitude, longitude }) => {
  return (
    <Marker key="currentLocation" latitude={latitude} longitude={longitude}>
      <div className="current-location-wrapper">
        <div className="current-location">
          <div></div>
          <div></div>
        </div>
      </div>
    </Marker>
  );
};

export default MarkerCurrentLocation;
