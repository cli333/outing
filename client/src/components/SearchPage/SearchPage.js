import React, { useState, useEffect, useContext, useRef } from "react";
import "./SearchPage.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { ctx } from "../../context/Provider";
import useSearch from "../../hooks/useSearch";
import Loader from "../Loader/Loader";

const SearchPage = () => {
  const { currentLocation, destinations } = useContext(ctx);
  const { center, place_name } = currentLocation;
  const [query, setQuery] = useState(place_name);
  const [destinationQuery, setDestinationQuery] = useState("");
  const {
    loading,
    handleSubmit,
    destinationsLoading,
    handleDestinationsSubmit,
    display,
    setDisplay,
    recommendations,
    handleChange,
    myDestination,
    setMyDestination
  } = useSearch(query, setQuery, destinationQuery, setDestinationQuery);
  const wrapperRef = useRef(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center[1],
    longitude: center[0],
    zoom: 16
  });

  useEffect(() => {
    setViewport({
      width: "100%",
      height: "100%",
      latitude: currentLocation.center[1],
      longitude: currentLocation.center[0],
      zoom: 14
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

  useEffect(() => {
    if (myDestination)
      setDestinationQuery(
        `${myDestination.location.address}${
          myDestination.location.crossStreet
            ? " " +
              (/^at\s/.test(myDestination.location.crossStreet)
                ? myDestination.location.crossStreet
                : "& " + myDestination.location.crossStreet)
            : ""
        }`
      );
  }, [myDestination]);

  const displayDestinations = () => {
    if (destinations.length > 0) {
      return destinations.map(d => (
        <Marker key={d.id} latitude={d.location.lat} longitude={d.location.lng}>
          <button
            className="search-marker"
            onMouseEnter={() => setSelectedDestination(d)}
            onMouseLeave={() => setSelectedDestination(null)}
            onClick={() => setMyDestination(d)}
          >
            {d.categories.length > 0 && d.categories[0].icon ? (
              <img
                src={`${d.categories[0].icon.prefix}32${d.categories[0].icon.suffix}`}
                alt={d.name}
                className="marker-icon"
              />
            ) : (
              <img
                src="https://ss3.4sqi.net/img/categories_v2/shops/default_32.png"
                alt={d.name}
                className="marker-icon"
              />
            )}
          </button>
        </Marker>
      ));
    }
  };

  const displayPopup = () => {
    return (
      <Popup
        latitude={selectedDestination.location.lat}
        longitude={selectedDestination.location.lng}
        closeButton={false}
        altitude={10}
        offsetLeft={20}
      >
        <div className="popup-container">
          <h3>{selectedDestination.name}</h3>
          <em>
            {selectedDestination.categories[0] &&
              selectedDestination.categories[0].name}
          </em>
        </div>
      </Popup>
    );
  };

  const handleClickRecommendation = recommendation => {
    setQuery(recommendation);
    setDisplay(false);
    document.getElementById("current-location-input").focus();
  };

  useEffect(() => {
    const handleClickOutside = e => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(e.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setDisplay]);

  return (
    <div className="search">
      <div className="search-content">
        <div className="search-content-left">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/dark-v10"
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
            {displayDestinations()}
            {selectedDestination && displayPopup()}
          </ReactMapGL>
        </div>

        <div className="search-content-right">
          <div className="search-content-right-current">
            <h2>Your Location</h2>
            <form
              ref={wrapperRef}
              onSubmit={e => handleSubmit(e)}
              className="search-form"
            >
              <input
                id="current-location-input"
                type="search"
                placeholder="Change your location"
                value={query}
                onChange={e => handleChange(e, setQuery)}
                disabled={loading}
              />
              <Loader loading={loading} />
              {display && query.length > 0 && (
                <div className="autocomplete">
                  {recommendations.map((rec, i) => (
                    <div
                      onClick={() => handleClickRecommendation(rec)}
                      className="recommendation"
                      key={i}
                    >
                      {rec}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
          <div className="search-content-right-directions">
            <h2>Your directions</h2>
            <li>the route</li>
            <li>the route</li>
            <li>the route</li>
            <li>the route</li>
            <li>the route</li>
            <li>the route</li>
            <li>the route</li>
          </div>
          <div className="search-content-right-destination">
            <h2>Your Destination</h2>
            <form
              onSubmit={e => handleDestinationsSubmit(e)}
              className="search-form"
            >
              <input
                type="search"
                placeholder="Search destinations"
                value={destinationQuery}
                onChange={e => setDestinationQuery(e.target.value)}
              />
              <Loader loading={destinationsLoading} />
            </form>
          </div>
          <div className="search-content-right-buttons">
            <button className="button submit">Submit</button>
            <button className="button recommend">Get Recommendations</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
