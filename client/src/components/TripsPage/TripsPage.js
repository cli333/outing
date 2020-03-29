import React, { useContext, useEffect, useState } from "react";
import "./TripsPage.css";
import axios from "axios";
import TripsItem from "../TripsItem/TripsItem";

import { authCtx } from "../../context/AuthProvider";

const TripsPage = () => {
  const { currentUser } = useContext(authCtx);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    (() => {
      axios
        .get("/api/trips", {
          headers: {
            authorization: `Bearer ${currentUser.token}`
          }
        })
        .then(res => setTrips(res.data));
    })();
  }, [currentUser.token]);

  return (
    <div className="trips">
      <ul className="trips-table">
        <li className="trips-table-header">
          <div className="column-1">Date</div>
          <div className="column-2">Starting Point</div>
          <div className="column-2">Destination</div>
        </li>
        {trips.length > 0 &&
          trips.map(trip => <TripsItem {...trip} key={trip.id} />)}
      </ul>
    </div>
  );
};

export default TripsPage;
