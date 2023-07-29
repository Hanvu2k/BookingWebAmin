import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserContext";

import "./Register.css";

function Register() {
  const nameRef = useRef();
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneNumberRef = useRef();

  const [name, setName] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const { tokenHandler } = useContext(UserContext);

  const navigate = useNavigate();

  const validated = () => {
    if (
      !emailRef?.current?.value ||
      !passwordRef?.current?.value ||
      !nameRef?.current?.value ||
      !fullNameRef?.current?.value ||
      !phoneNumberRef?.current?.value
    ) {
      alert("Please enter valid value");
      return false;
    }
    if (!emailRef?.current?.value.includes("@")) {
      alert("Invalid email!");
      return false;
    }
    if (passwordRef?.current?.value.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const useInfo = {
      name: nameRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      fullName: fullNameRef?.current?.value,
      phoneNumber: +phoneNumberRef?.current?.value,
    };

    if (validated()) {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/auth/registerAdmin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(useInfo),
          }
        );

        if (res.status === 400) {
          const error = await res.json();
          alert(error.message);
          return;
        }

        const data = await res.json();

        tokenHandler(data.user.token);
        alert(data.message);
        setName("");
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h1 className="my-4">Register</h1>
      <form className="form-input" onSubmit={handleRegister}>
        <div className="user-input d-flex flex-column">
          <input type="text" value={name} ref={nameRef} placeholder="Name" />
          <input
            type="text"
            value={fullName}
            ref={fullNameRef}
            placeholder="FullName"
          />
          <input type="text" value={email} ref={emailRef} placeholder="Email" />
          <input
            type="password"
            value={password}
            ref={passwordRef}
            placeholder="Password"
          />
          <input
            type="text"
            value={phoneNumber}
            ref={phoneNumberRef}
            placeholder="PhoneNumber"
          />

          <Link to="/login">Already have account?</Link>

          <button type="submit" className="btn-register">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
