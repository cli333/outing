import React, { useState, useEffect, useContext } from "react";
import "./SearchPage.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { ctx } from "../../context/Provider";
import useSearch from "../../hooks/useSearch";

const SearchPage = () => {
  const { currentLocation, destinations } = useContext(ctx);
  const { place_name, center } = currentLocation;
  const [query, setQuery] = useState(place_name);
  const { loading, handleSubmit } = useSearch(query);
  const [itinerary, setItinerary] = useState([]);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center[1],
    longitude: center[0],
    zoom: 13.5
  });

  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    setViewport({
      width: "100%",
      height: "100%",
      latitude: currentLocation.center[1],
      longitude: currentLocation.center[0],
      zoom: 13.5
    });
  }, [currentLocation]);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedDestination(null);
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  const displayDestinations = () => {
    return destinations.map(d => (
      <Marker
        key={d.venue.id}
        latitude={d.venue.location.lat}
        longitude={d.venue.location.lng}
      >
        <button
          className="search-marker"
          onClick={() => setSelectedDestination(d)}
        >
          <img src="/marker.svg" alt="Current Location" />
        </button>
      </Marker>
    ));
  };

  const displayPopup = () => {
    return (
      <Popup
        latitude={selectedDestination.venue.location.lat}
        longitude={selectedDestination.venue.location.lng}
        onClose={() => setSelectedDestination(null)}
      >
        <div>
          <h2>{selectedDestination.venue.name}</h2>
          <p>{selectedDestination.venue.location.address}</p>
        </div>
        <button>Add to itinerary</button>
      </Popup>
    );
  };

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
              <div className="current-location-wrapper">
                <div className="current-location">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </Marker>
            {destinations.length > 0 && displayDestinations()}
            {selectedDestination && displayPopup()}
          </ReactMapGL>
        </div>

        <div className="search-content-right">
          <form onSubmit={e => handleSubmit(e)}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              disabled={loading}
            />
            <input type="submit" value="Submit" />
          </form>
          <div>
            <h2>Itinerary</h2>
            {itinerary.length > 0 &&
              itinerary.map((i, idx) => (
                <div>
                  destination
                  <span>
                    <button>Remove</button>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
