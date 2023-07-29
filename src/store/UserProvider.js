import React, { useCallback, useState } from "react";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [hotelData, setHotelData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [roomData, setRoomData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleTokens = (token) => {
    localStorage.setItem("token", token);
    setToken(localStorage.getItem("token", token));
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const handleGetTransactions = useCallback((transactions) => {
    setTransactions(transactions);
  }, []);

  const handleGetHotels = useCallback((hotels) => {
    setHotels(hotels);
  }, []);

  const handleDeletHotel = useCallback(
    (id) => {
      const newHotels = hotels.filter((hotel) => hotel._id !== id);
      setHotels(newHotels);
    },
    [hotels]
  );

  const handleGetRooms = useCallback((rooms) => {
    setRooms(rooms);
  }, []);

  const handleDeleteRoom = useCallback(
    (id) => {
      const newRooms = rooms.filter((room) => room._id !== id);
      setRooms(newRooms);
    },
    [rooms]
  );

  const handleGetHotelData = useCallback((hotelData) => {
    setHotelData(hotelData);
  }, []);

  const handleGetRoomData = useCallback((roomData) => {
    setRoomData(roomData);
  }, []);

  const infoContext = {
    token: token,
    hotels: hotels,
    hotelData: hotelData,
    rooms: rooms,
    roomData: roomData,
    transactions: transactions,
    tokenHandler: handleTokens,
    logOutHandler: handleLogOut,
    transactionsHandler: handleGetTransactions,
    hotelsHandler: handleGetHotels,
    deleteHotelsHandler: handleDeletHotel,
    roomsHandler: handleGetRooms,
    deleteRoomHandler: handleDeleteRoom,
    hotelDataHandler: handleGetHotelData,
    roomDataHandler: handleGetRoomData,
  };

  return (
    <UserContext.Provider value={infoContext}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
