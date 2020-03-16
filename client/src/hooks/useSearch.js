import { useState, useContext } from "react";
import { ctx } from "../context/Provider";
import axios from "axios";

const useSearch = query => {
  const { currentLocation, setCurrentLocation, setDestinations } = useContext(
    ctx
  );
  const [loading, setLoading] = useState(false);

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
      .finally(() => setLoading(false));
  };

  return { loading, handleSubmit };
};

export default useSearch;
