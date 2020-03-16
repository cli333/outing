import { useState, useContext } from "react";
import axios from "axios";
import { ctx } from "../context/Provider";

const useLanding = (query, history) => {
  const { setCurrentLocation, setDestinations } = useContext(ctx);
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    axios
      .post("/api", { query })
      .then(res => {
        const { currentLocation, destinations } = res.data;
        setCurrentLocation(currentLocation);
        setDestinations(destinations);
        history.push("/search");
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  return { loading, handleSubmit };
};

export default useLanding;
