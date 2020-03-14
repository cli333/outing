import React, { useState, useEffect, useContext } from "react";
import "./SearchPage.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { ctx } from "../../context/Provider";

const SearchPage = ({ history }) => {
  const { currentLocation } = useContext(ctx);

  useEffect(() => {
    if (!currentLocation) history.push("/");
  }, [currentLocation, history]);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: currentLocation[1],
    longitude: currentLocation[0],
    zoom: 12.5
  });

  const [selectedTrail, setSelectedTrail] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedTrail(null);
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
            <Marker key="1" latitude={37.7749} longitude={-122.4194}>
              <button
                className="search-marker"
                onClick={() =>
                  setSelectedTrail({ latitude: 37.7749, longitude: -122.4194 })
                }
              >
                <img src="/marker.svg" alt="Trail" />
              </button>
            </Marker>
            {selectedTrail && (
              <Popup
                latitude={selectedTrail.latitude}
                longitude={selectedTrail.longitude}
                onClose={() => setSelectedTrail(null)}
              >
                <div>
                  <img alt="The trail" />
                  <h2>Trail Name</h2>
                  <p>trail description</p>
                </div>
              </Popup>
            )}
          </ReactMapGL>
        </div>

        <div className="search-content-right">
          <div>The Current Location</div>
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
