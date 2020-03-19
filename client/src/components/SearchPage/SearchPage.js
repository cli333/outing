import React, { useState, useEffect, useContext, useRef } from "react";
import "./SearchPage.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { ctx } from "../../context/Provider";
import useSearch from "../../hooks/useSearch";
import Loader from "../Loader/Loader";
import Itinerary from "../Itinerary/Itinerary";

const SearchPage = () => {
  const {
    currentLocation,
    destinations,
    itinerary,
    handleItinerarySubmit
  } = useContext(ctx);
  const { center, place_name } = currentLocation;
  const [query, setQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const {
    loading,
    handleSubmit,
    destinationsLoading,
    handleDestinationsSubmit,
    display,
    setDisplay,
    recommendations,
    handleChange
  } = useSearch(query, setQuery, destinationQuery, setDestinationQuery);
  const wrapperRef = useRef(null);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center[1],
    longitude: center[0],
    zoom: 16
  });

  const [selectedDestination, setSelectedDestination] = useState(null);

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

  const displayDestinations = () => {
    if (destinations.length > 0) {
      return destinations.map(d => (
        <Marker key={d.id} latitude={d.location.lat} longitude={d.location.lng}>
          <button
            className="search-marker"
            onMouseEnter={() => setSelectedDestination(d)}
            onMouseLeave={() => setSelectedDestination(null)}
            onClick={() => handleItinerarySubmit(d)}
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

  const handleClickOutside = e => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  const handleClickRecommendation = recommendation => {
    setQuery(recommendation);
    setDisplay(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div>
            <h3 className="search-content-right-name">{place_name}</h3>
          </div>
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
          <form
            ref={wrapperRef}
            onSubmit={e => handleSubmit(e)}
            className="search-form"
          >
            <input
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

          <div className="itinerary-wrapper">
            <h3>Please Select at least 4 destinations</h3>
            <Itinerary itinerary={itinerary} />
            <button>Get Directions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
