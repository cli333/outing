import React, { useContext, useEffect, useState } from "react";
import "./TripsPage.css";
import axios from "axios";
import ReactMapGL, { Marker } from "react-map-gl";
import MapLine from "../MapLine/MapLine";
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
          trips.map(trip => (
            <div key={trip.id}>
              <li className="trips-table-row">
                <div className="column-1">
                  {new Date(trip.createdAt).toLocaleDateString()}
                </div>
                <div className="column-2">{trip.startingLocation}</div>
                <div className="column-2">{trip.destination}</div>
              </li>
              {
                <div>
                  <ReactMapGL
                    viewport={{
                      width: "100%",
                      height: "100%",
                      latitude: JSON.parse(trip.startingLocationCoordinates)[1],
                      longitude: JSON.parse(
                        trip.startingLocationCoordinates
                      )[0],
                      zoom: 16
                    }}
                    mapStyle="mapbox://styles/mapbox/dark-v10"
                  />
                </div>
              }
            </div>
          ))}
      </ul>
    </div>
  );
};

export default TripsPage;
