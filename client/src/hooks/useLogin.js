import { useState, useContext } from "react";
import axios from "axios";
import { authCtx } from "../context/AuthProvider";
import { ctx } from "../context/Provider";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setDisplayLogin } = useContext(ctx);
  const { setCurrentUser } = useContext(authCtx);

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/auth/login", { email })
      .then(res => {
        localStorage.setItem(
          "outingData",
          JSON.stringify({ ...res.data, email })
        );
        setCurrentUser({ email });
      })
      .finally(() => {
        setLoading(false);
        setEmail("");
        setDisplayLogin(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("outingData");
    setCurrentUser(null);
  };

  return {
    email,
    setEmail,
    handleLogin,
    handleLogout,
    loading
  };
};

export default useLogin;
