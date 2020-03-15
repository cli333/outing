import React, { useState, useEffect, useContext } from "react";
import "./SearchPage.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { ctx } from "../../context/Provider";
import axios from "axios";

const SearchPage = () => {
  const { currentLocation } = useContext(ctx);
  const { place_name, center } = currentLocation;

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center[1],
    longitude: center[0],
    zoom: 12.5
  });

  axios
    .get(
      `https://api.foursquare.com/v2/venues/explore?client_id=${
        process.env.REACT_APP_FOURSQUARE_CLIENT_ID
      }&client_secret=${
        process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
      }&ll=${center[1].toFixed(2)},${center[0].toFixed(
        2
      )}&v=20200101&openNow=1&sortyByPopularity=1`
    )
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedDestination(null);
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  return (
    <div className="search">
      <div className="search-content">
        <div className="search-content-left">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/outdoors-v11"
            onViewportChange={setViewport}
          >
            <Marker
              key="currentLocation"
              latitude={center[1]}
              longitude={center[0]}
            >
              <button className="search-marker">
                <img src="/marker.svg" alt="Current Location" />
              </button>
            </Marker>

            <Marker key="test" latitude={37.7749} longitude={-122.4194}>
              <button
                className="search-marker"
                onClick={() =>
                  setSelectedDestination({
                    latitude: 37.7749,
                    longitude: -122.4194
                  })
                }
              >
                <img src="/marker.svg" alt="Destination" />
              </button>
            </Marker>
            {selectedDestination && (
              <Popup
                latitude={selectedDestination.latitude}
                longitude={selectedDestination.longitude}
                onClose={() => setSelectedDestination(null)}
              >
                <div>
                  <img alt="The Destination" />
                  <h2>Destination name</h2>
                  <p>description</p>
                </div>
              </Popup>
            )}
          </ReactMapGL>
        </div>

        <div className="search-content-right">
          <div>{place_name}</div>
          <div>
            <div>destination </div>
            <div>destination </div>
            <div>destination </div>
            <div>destination </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
