import React, { useState, useEffect, useContext } from "react";
import "./SearchPage.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { ctx } from "../../context/Provider";
import useSearch from "../../hooks/useSearch";
import Loader from "../Loader/Loader";
import Itinerary from "../Itinerary/Itinerary";

const SearchPage = () => {
  const { currentLocation, destinations } = useContext(ctx);
  const { center, place_name } = currentLocation;
  const [query, setQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const {
    loading,
    handleSubmit,
    destinationsLoading,
    handleDestinationsSubmit
  } = useSearch(query, setQuery, destinationQuery, setDestinationQuery);
  const [itinerary, setItinerary] = useState([]);

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
            onClick={() => setSelectedDestination(d)}
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
        onClose={() => setSelectedDestination(null)}
      >
        <div>
          <h2>{selectedDestination.name}</h2>
          <p>{selectedDestination.location.address}</p>
        </div>
        <div>
          {selectedDestination.categories
            .map(category => category.name)
            .join(", ")}
        </div>
        <button
          onClick={() => setItinerary([...itinerary, selectedDestination])}
        >
          Add to itinerary
        </button>
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
            <h4 className="search-content-right-name">{place_name}</h4>
          </div>
          <form onSubmit={e => handleSubmit(e)} className="search-form">
            <input
              type="search"
              placeholder="Change your location"
              value={query}
              onChange={e => setQuery(e.target.value)}
              disabled={loading}
            />
            <Loader loading={loading} />
          </form>

          <form
            onSubmit={e => handleDestinationsSubmit(e)}
            className="search-form"
          >
            <label htmlFor="destination query">
              Don't like your recommendations?
            </label>
            <input
              name="destination query"
              type="search"
              placeholder="Search nearby locations"
              value={destinationQuery}
              onChange={e => setDestinationQuery(e.target.value)}
            />
            <Loader loading={destinationsLoading} />
          </form>

          <div>
            <h2>Itinerary</h2>
            <Itinerary
              destinations={[
                { id: 0, name: "one" },
                { id: 1, name: "two" },
                { id: 2, name: "three" }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
