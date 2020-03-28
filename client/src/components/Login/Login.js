import React, { useContext } from "react";
import "./Login.css";
import useLogin from "../../hooks/useLogin";
import { ctx } from "../../context/Provider";
import Loader from "../Loader/Loader";

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

        <div className="login-close" onClick={() => setDisplayLogin(false)}>
          ✖
        </div>
        <Loader loading={loading} />
      </form>
    </div>
  );
};

export default Login;
