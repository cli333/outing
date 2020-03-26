import React, { createContext, useState, useEffect } from "react";

export const authCtx = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let data = localStorage.getItem("outingData");
    if (data) {
      setCurrentUser({ email: JSON.parse(data).email });
    }
  }, []);

  return (
    <authCtx.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </authCtx.Provider>
  );
};

export default AuthProvider;
