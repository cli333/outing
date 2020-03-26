import React, { useContext } from "react";
import "./Login.css";
import Loader from "../Loader/Loader";
import useLogin from "../../hooks/useLogin";
import { ctx } from "../../context/Provider";

const Login = ({ history }) => {
  const { email, setEmail, handleLogin, loading } = useLogin(history);
  const { displayLogin, setDisplayLogin } = useContext(ctx);

  return (
    <div className={`login-wrapper ${!displayLogin ? "hide" : ""}`}>
      <form className="login-form" onSubmit={e => handleLogin(e)}>
        <input
          type="email"
          placeholder="Your email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          disabled={loading}
        />
        <Loader loading={loading} />
        <div className="login-close" onClick={() => setDisplayLogin(false)}>
          ✖
        </div>
      </form>
    </div>
  );
};

export default Login;
