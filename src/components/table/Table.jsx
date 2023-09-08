import React, { useContext } from "react";

import "./Table.css";
import { UserContext } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";

function Table(props) {
  const { title, isHotel, isTransaction, isRoom } = props;
  const {
    hotels,
    deleteHotelsHandler,
    transactions,
    rooms,
    deleteRoomHandler,
    token,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleDeleteHotel = async (hotelId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the hotel?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const res = await fetch(
        `https://bookingweb-server.onrender.com/api/v1/hotel/deleteHotel?token=${token}&hotelId=${hotelId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const hotel = await res.json();

      if (res.status === 400) {
        alert(hotel.message);
        return;
      }

      deleteHotelsHandler(hotelId);
    } catch (error) {
      console.log(error);
    }
  };

  // deleteRoom
  const handleDeleteRoom = async (roomId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the room?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const res = await fetch(
        `https://bookingweb-server.onrender.com/api/v1/room/deleteRoom?token=${token}&roomId=${roomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const room = await res.json();

      if (res.status === 400) {
        alert(room.message);
        return;
      }

      deleteRoomHandler(roomId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-body">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="main-body-title">{title} </h4>
        {isHotel && (
          <div>
            <button
              className="btn btn-add"
              onClick={() => navigate("/new-hotel")}
            >
              Add New
            </button>
          </div>
        )}
        {isRoom && (
          <div>
            <button
              className="btn btn-add"
              onClick={() => navigate("/new-room")}
            >
              Add New
            </button>
          </div>
        )}
      </div>
      <div className="main-body-content">
        <table className="content-table">
          <thead className="content-table-head">
            {isTransaction && (
              <tr>
                <td>
                  <input type="checkbox" readOnly />
                </td>
                <td>
                  <span>|</span>ID
                </td>
                <td>
                  <span>|</span>User
                </td>
                <td>
                  <span>|</span>Hotel
                </td>
                <td>
                  <span>|</span>Room
                </td>
                <td>
                  <span>|</span>Date
                </td>
                <td>
                  <span>|</span>Price
                </td>
                <td>
                  <span>|</span>PaymentMethod
                </td>
                <td>
                  <span>|</span>Status
                </td>
              </tr>
            )}

            {isHotel && (
              <tr>
                <td>
                  <input type="checkbox" readOnly />
                </td>
                <td>
                  <span>|</span>ID
                </td>
                <td>
                  <span>|</span>Name
                </td>
                <td>
                  <span>|</span>Type
                </td>
                <td>
                  <span>|</span>Title
                </td>
                <td>
                  <span>|</span>City
                </td>
                <td>
                  <span>|</span>Action
                </td>
              </tr>
            )}

            {isRoom && (
              <tr>
                <td>
                  <input type="checkbox" readOnly />
                </td>
                <td>
                  <span>|</span>ID
                </td>
                <td>
                  <span>|</span>Title
                </td>
                <td>
                  <span>|</span>Description
                </td>
                <td>
                  <span>|</span>Price
                </td>
                <td>
                  <span>|</span>Max People
                </td>
                <td>
                  <span>|</span>Action
                </td>
              </tr>
            )}
          </thead>
          {isTransaction && (
            <tbody className="content-table-body">
              {transactions?.map((trans) => {
                return (
                  <tr key={trans._id}>
                    <td>
                      <input type="checkbox" readOnly />
                    </td>
                    <td>{trans._id}</td>
                    <td>{trans.user}</td>
                    <td>{trans.hotel}</td>
                    <td>{trans.room}</td>
                    <td>{`${trans.dateStart}-${trans.dateEnd}`}</td>
                    <td>{trans.price}</td>
                    <td>{trans.payment}</td>
                    <td>
                      <span
                        className={`status ${
                          trans.status === "Booked" && " booked"
                        } ${trans.status === "Checkin" && " checkin"} ${
                          trans.status === "Checkout" && " checkout"
                        }`}
                      >
                        {trans.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}

          {isHotel && (
            <tbody className="content-table-body">
              {hotels?.map((hotel) => {
                return (
                  <tr key={hotel._id}>
                    <td>
                      <input type="checkbox" readOnly />
                    </td>
                    <td>{hotel._id}</td>
                    <td>{hotel.name}</td>
                    <td>{hotel.type}</td>
                    <td>{hotel.name}</td>
                    <td>{hotel.city}</td>
                    <td>
                      <span
                        className="btn btn-delete"
                        onClick={() => handleDeleteHotel(hotel._id)}
                      >
                        Delete
                      </span>
                      <span
                        className="btn btn-edit"
                        onClick={() => {
                          navigate(`/edit-hotel/${hotel._id}`);
                        }}
                      >
                        Edit
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}

          {isRoom && (
            <tbody className="content-table-body">
              {rooms?.map((room) => {
                return (
                  <tr key={room._id}>
                    <td>
                      <input type="checkbox" readOnly />
                    </td>
                    <td>{room._id}</td>
                    <td>{room.title}</td>
                    <td>{room.desc}</td>
                    <td>{room.price}</td>
                    <td>{room.maxPeople}</td>
                    <td>
                      <span
                        className="btn btn-delete"
                        onClick={() => {
                          handleDeleteRoom(room._id);
                        }}
                      >
                        Delete
                      </span>
                      <span
                        className="btn btn-edit"
                        onClick={() => {
                          navigate(`/edit-room/${room._id}`);
                        }}
                      >
                        Edit
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
          <tfoot>
            <tr>
              <td className="page">
                <span>1-8 of 8</span>
                <span style={{ color: "#a5a2a8" }}>{"< >"}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Table;
