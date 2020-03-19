import { useState, useContext } from "react";
import { ctx } from "../context/Provider";
import axios from "axios";

const useSearch = (query, setQuery, destinationQuery, setDestionationQuery) => {
  const {
    currentLocation,
    setCurrentLocation,
    setDestinations,
    setItinerary
  } = useContext(ctx);
  const [loading, setLoading] = useState(false);
  const [destinationsLoading, setDestinationsLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (loading || currentLocation.place_name === query) return;
    setLoading(true);
    axios
      .post("/api", { query })
      .then(res => {
        const { currentLocation, destinations } = res.data;
        setCurrentLocation(currentLocation);
        setDestinations(destinations);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
        setQuery("");
        setItinerary([]);
      });
  };

  const handleDestinationsSubmit = e => {
    e.preventDefault();
    if (destinationsLoading) return;
    setDestinationsLoading(true);
    axios
      .post("/api/destinations", {
        query: destinationQuery,
        currentLocation
      })
      .then(res => {
        let newDestinations = res.data.response.venues;
        setDestinations(newDestinations);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setDestinationsLoading(false);
        setDestionationQuery("");
      });
  };

  return {
    loading,
    handleSubmit,
    destinationsLoading,
    handleDestinationsSubmit
  };
};

export default useSearch;
