import { useState, useContext } from "react";
import axios from "axios";
import { ctx } from "../context/Provider";

const useLanding = (query, history) => {
  const { setCurrentLocation } = useContext(ctx);
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    axios
      .post("/api/search", { query })
      .then(res => {
        const { features } = res.data;
        setCurrentLocation(features[0]);
        history.push("/search");
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  return { loading, handleSubmit };
};

export default useLanding;
