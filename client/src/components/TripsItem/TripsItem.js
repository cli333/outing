import React, { useState } from "react";
import "./TripsItem.css";
import ReactMapGL, { Marker } from "react-map-gl";
import MapLine from "../MapLine/MapLine";
import MarkerCurrentLocation from "../MarkerCurrentLocation/MarkerCurrentLocation";

const TripsItem = ({
  id,
  createdAt,
  startingLocation,
  startingLocationCoordinates,
  directions,
  directionsCoordinates,
  directionsIcons,
  destination,
  destinationCoordinates,
  destinationIcon
}) => {
  const [longitude, latitude] = JSON.parse(startingLocationCoordinates);
  const [display, setDisplay] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude,
    longitude,
    zoom: 13
  });
  const directionsArray = directions.split(";");
  const parsedDirectionsIcons = JSON.parse(directionsIcons);
  const parsedDirectionsCoordinates = JSON.parse(directionsCoordinates);
  const parsedDestinationCoordinates = JSON.parse(destinationCoordinates).map(
    Number
  );

  return (
    <div>
      <li
        className={`trips-table-row ${display && "selected"}`}
        onClick={() => setDisplay(!display)}
      >
        <div className="column-1">
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className="column-2">{startingLocation}</div>
        <div className="column-2">{destination}</div>
      </li>
      {display && (
        <div className="map-directions-wrapper">
          <div className="map">
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              onViewportChange={setViewport}
            >
              <MarkerCurrentLocation
                latitude={latitude}
                longitude={longitude}
              />
              <MapLine directions={parsedDirectionsCoordinates} />
              <Marker
                latitude={parsedDestinationCoordinates[1]}
                longitude={parsedDestinationCoordinates[0]}
              >
                <button className="search-marker">
                  <img
                    alt="destination"
                    src={
                      destinationIcon ||
                      "https://ss3.4sqi.net/img/categories_v2/shops/default_32.png"
                    }
                  />
                </button>
              </Marker>
            </ReactMapGL>
          </div>
          <div className="directions-wrapper">
            <h2>Directions</h2>
            <div className="directions">
              {directionsArray.map((d, index) => (
                <li key={index}>
                  <img alt="direction" src={parsedDirectionsIcons[index]} />
                  {d}
                </li>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsItem;
