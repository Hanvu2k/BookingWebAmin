import React, { useContext, useEffect } from "react";

import SideBar from "./SideBar";
import "./ClientLayout.css";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import Login from "../../Page/Login/Login";
import { UserContext } from "../../store/UserContext";
import Register from "../../Page/Register/Register";

function ClientLayout() {
  const login = useMatch("/login");
  const register = useMatch("/register");
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      if (login) navigate("/login");
      if (register) navigate("/register");
      if (!register && !login) navigate("/login");
    }
  }, [token, navigate, login, register]);

  if (login) {
    return <Login />;
  }

  if (register) {
    return <Register />;
  }

  return (
    <div className="client-layout">
      <SideBar />
      <div>
        <div className="head-line"></div>
        <Outlet />
      </div>
    </div>
  );
}

export default ClientLayout;
