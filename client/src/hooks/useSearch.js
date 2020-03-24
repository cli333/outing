import { useState, useContext } from "react";
import { ctx } from "../context/Provider";
import axios from "axios";

const useSearch = (query, setQuery, destinationQuery, setDestionationQuery) => {
  const { currentLocation, setCurrentLocation, setDestinations } = useContext(
    ctx
  );
  const [loading, setLoading] = useState(false);
  const [destinationsLoading, setDestinationsLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [myDestination, setMyDestination] = useState(null);

  const handleChange = (e, setQuery) => {
    setQuery(e.target.value);
    axios.post("/api", { query }).then(res => {
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
      .post("/api", { query })
      .then(res => {
        const { currentLocation, destinations } = res.data;
        setCurrentLocation(currentLocation);
        setDestinations(destinations);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
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
        let newDestinations = res.data;
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
    handleDestinationsSubmit,
    display,
    setDisplay,
    recommendations,
    handleChange,
    myDestination,
    setMyDestination
  };
};

export default useSearch;
