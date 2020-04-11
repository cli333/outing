import React, { createContext, useState, useEffect } from "react";

export const authCtx = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem("outingData");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    return () => localStorage.removeItem("outingData");
  });

  return (
    <authCtx.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </authCtx.Provider>
  );
};

export default AuthProvider;
