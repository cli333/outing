import React, { createContext, useState } from "react";
import { defaultLocation } from "../utils/utils";

export const ctx = createContext();

const Provider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [destinations, setDestinations] = useState([]);
  const [displayLogin, setDisplayLogin] = useState(false);

  return (
    <ctx.Provider
      value={{
        currentLocation,
        setCurrentLocation,
        destinations,
        setDestinations,
        displayLogin,
        setDisplayLogin,
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export default Provider;
