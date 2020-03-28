import { useState, useContext } from "react";
import { ctx } from "../context/Provider";
import axios from "axios";
import { authCtx } from "../context/AuthProvider";

const useSearch = (query, setQuery, destinationQuery, setDestionationQuery) => {
  const { currentLocation, setCurrentLocation, setDestinations } = useContext(
    ctx
  );
  const { currentUser } = useContext(authCtx);
  const [loading, setLoading] = useState(false);
  const [destinationsLoading, setDestinationsLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [myDestination, setMyDestination] = useState(null);
  const [isGettingDirections, setIsGettingDirections] = useState(false);
  const [directions, setDirections] = useState([]);

  const handleChange = (e, setQuery) => {
    setQuery(e.target.value);
    axios
      .post(
        "/api",
        { query },
        { headers: { authorization: `Bearer ${currentUser.token}` } }
      )
      .then(res => {
        const newRecommendations = [
          res.data.currentLocation,
          ...res.data.otherLocations
        ].map(rec => rec.place_name);
        setRecommendations(newRecommendations);
      });
    setDisplay(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (loading || currentLocation.place_name === query) return;
    setLoading(true);
    axios
      .post(
        "/api",
        { query },
        { headers: { authorization: `Bearer ${currentUser.token}` } }
      )
      .then(res => {
        const { currentLocation, destinations } = res.data;
        setCurrentLocation(currentLocation);
        setDestinations(destinations);
        setQuery(currentLocation.place_name);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
        setDestionationQuery("");
        setMyDestination(null);
        setDisplay(false);
        setDirections([]);
      });
  };

  const handleDestinationsSubmit = e => {
    e.preventDefault();
    if (destinationsLoading) return;
    setDestinationsLoading(true);
    axios
      .post(
        "/api/destinations",
        {
          query: destinationQuery,
          currentLocation
        },
        { headers: { authorization: `Bearer ${currentUser.token}` } }
      )
      .then(res => {
        let newDestinations = res.data;
        setDestinations(newDestinations);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setDestinationsLoading(false);
        setDestionationQuery("");
        setDirections([]);
      });
  };

  const handleDirectionsSubmit = () => {
    if (currentLocation && myDestination && !isGettingDirections) {
      setIsGettingDirections(true);
      axios
        .post(
          "/api/directions",
          { currentLocation, myDestination },
          { headers: { authorization: `Bearer ${currentUser.token}` } }
        )
        .then(res => setDirections(res.data))
        .finally(() => setIsGettingDirections(false));
    }
  };

  return {
    loading,
    handleSubmit,
    destinationsLoading,
    handleDestinationsSubmit,
    display,
    setDisplay,
    recommendations,
    handleChange,
    myDestination,
    setMyDestination,
    handleDirectionsSubmit,
    isGettingDirections,
    directions
  };
};

export default useSearch;
