import { useState } from "react";
import axios from "axios";

const useAuth = history => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/auth/login", { email })
      .then(res => {
        console.log(res.data);
        localStorage.setItem("authData", JSON.stringify(res.data));
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("authData");
    history.push("/");
  };

  return { email, setEmail, handleLogin, handleLogout, loading };
};

export default useAuth;
