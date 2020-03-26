import React from "react";
import "./Login.css";
import Loader from "../Loader/Loader";
import useAuth from "../../hooks/useAuth";

const Login = ({ history }) => {
  const { email, setEmail, handleLogin, loading } = useAuth(history);

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={e => handleLogin(e)}>
        <input
          type="email"
          placeholder="Your email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          disabled={loading}
        />
        <Loader loading={loading} />
        <div className="login-close">✖</div>
      </form>
    </div>
  );
};

export default Login;
