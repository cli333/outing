import React, { createContext, useState } from "react";
export const ctx = createContext();

const defaultLocation = {
  id: "place.7397503093427640",
  type: "Feature",
  place_type: ["place"],
  relevance: 1,
  properties: {
    wikidata: "Q65"
  },
  text: "Los Angeles",
  place_name: "Los Angeles, California, United States",
  bbox: [
    -118.521456965901,
    33.9018913203336,
    -118.121305008073,
    34.161440999758
  ],
  center: [-118.2439, 34.0544],
  geometry: {
    type: "Point",
    coordinates: [-118.2439, 34.0544]
  },
  context: [
    {
      id: "region.11319063928738010",
      short_code: "US-CA",
      wikidata: "Q99",
      text: "California"
    },
    {
      id: "country.9053006287256050",
      short_code: "us",
      wikidata: "Q30",
      text: "United States"
    }
  ]
};

const Provider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [destinations, setDestinations] = useState([]);

  return (
    <ctx.Provider
      value={{
        currentLocation,
        setCurrentLocation,
        destinations,
        setDestinations
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export default Provider;
