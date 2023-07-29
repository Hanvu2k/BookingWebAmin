import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserContext";

import { ReactComponent as DashBoard } from "../../assets/icons/table.svg";
import { ReactComponent as User } from "../../assets/icons/user-svgrepo-com.svg";
import { ReactComponent as Hotel } from "../../assets/icons/hotel-svgrepo-com.svg";
import { ReactComponent as Room } from "../../assets/icons/furniture-home-house-12-svgrepo-com.svg";
import { ReactComponent as Trans } from "../../assets/icons/car-640-svgrepo-com.svg";
import { ReactComponent as LogOut } from "../../assets/icons/logout-svgrepo-com.svg";

function SideBar() {
  const { logOutHandler } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Admin Page</h2>
      <div className="sidebar-content">
        <div className="sidebar-item">
          <h3 className="sidebar-item-title">Main</h3>
          <div
            className="sidebar-item-content"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="item-icon">
              <DashBoard />
            </div>
            <div className="item-content">Dashboard</div>
          </div>
        </div>

        <div className="sidebar-item">
          <h3 className="sidebar-item-title">List</h3>
          <div className="sidebar-item-content">
            <div className="item-icon">
              <User />
            </div>
            <div className="item-content">User</div>
          </div>
          <div
            className="sidebar-item-content"
            onClick={() => {
              navigate("/hotel");
            }}
          >
            <div className="item-icon">
              <Hotel />
            </div>
            <div className="item-content">Hotels</div>
          </div>
          <div
            className="sidebar-item-content"
            onClick={() => {
              navigate("/room");
            }}
          >
            <div className="item-icon">
              <Room />
            </div>
            <div className="item-content">Rooms</div>
          </div>
          <div
            className="sidebar-item-content"
            onClick={() => {
              navigate("/transaction");
            }}
          >
            <div className="item-icon">
              <Trans />
            </div>
            <div className="item-content">Transactions</div>
          </div>
        </div>

        <div className="sidebar-item">
          <h3 className="sidebar-item-title">New</h3>
          <div
            className="sidebar-item-content"
            onClick={() => {
              navigate("/new-hotel");
            }}
          >
            <div className="item-icon">
              <Hotel />
            </div>
            <div className="item-content">New Hotel</div>
          </div>
          <div
            className="sidebar-item-content"
            onClick={() => {
              navigate("/new-room");
            }}
          >
            <div className="item-icon">
              <Room />
            </div>
            <div className="item-content">New Room</div>
          </div>
        </div>

        <div
          className="sidebar-item"
          onClick={() => {
            logOutHandler();
          }}
        >
          <h3 className="sidebar-item-title">User</h3>
          <div className="sidebar-item-content">
            <div className="item-icon">
              <LogOut />
            </div>
            <div className="item-content">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
