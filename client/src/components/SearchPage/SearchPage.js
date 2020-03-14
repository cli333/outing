import React, { useEffect } from "react";
import "./SearchPage.css";
import mapboxgl from "mapbox-gl";

const sf = [-122.4194, 37.7749]; // W, N => default to SF
const zoom = 12.5;

const SearchPage = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FwZWNpMTYyMyIsImEiOiJjazdyMDA2cXAwMG43M25wdXc1bG11bGl1In0.QLZpEwrRByw94O_uv4z8DA";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: sf,
      zoom: zoom
    });
  }, []);
  return (
    <div className="search">
      <div className="search-content">
        <div className="search-content-left" id="map"></div>
        <div className="search-content-right">
          <div>The Current Location</div>
          <div>
            <div>destination </div>
            <div>destination </div>
            <div>destination </div>
            <div>destination </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
