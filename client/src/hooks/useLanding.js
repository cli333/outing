import { useState, useContext } from "react";
import axios from "axios";
import { ctx } from "../context/Provider";

const useLanding = (query, history) => {
  const [display, setDisplay] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const { setCurrentLocation, setDestinations } = useContext(ctx);
  const [loading, setLoading] = useState(false);

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

  return {
    loading,
    handleSubmit,
    display,
    setDisplay,
    recommendations,
    handleChange
  };
};

export default useLanding;
