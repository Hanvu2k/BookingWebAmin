import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import { UserContext } from "../../store/UserContext";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { tokenHandler } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailRef?.current?.value || !passwordRef?.current?.value) {
      alert("Please enter invalid input!");
      return;
    }

    if (!emailRef?.current?.value.includes("@")) {
      alert("Invalid email!");
      return;
    }

    if (passwordRef?.current?.value.length < 8) {
      alert("Passwords must be at least 8 characters");
      return;
    }

    const data = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    };

    try {
      const res = await fetch(`https://bookingweb-server.onrender.com/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const login = await res.json();

      tokenHandler(login.user.token);
      alert(login.message);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h2>Admin Login </h2>
      <form onSubmit={handleLogin} className="d-flex flex-column">
        <div className="input-form">
          <input type="text" placeholder="Email" ref={emailRef} value={email} />
        </div>
        <div className="input-form">
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            value={password}
          />
        </div>
        <Link to="register">Register account?</Link>

        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
