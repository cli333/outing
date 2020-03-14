import React, { createContext, useState } from "react";
export const ctx = createContext();

const Provider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  return (
    <ctx.Provider
      value={{
        currentLocation,
        setCurrentLocation
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export default Provider;
