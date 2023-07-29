import React from "react";

export const UserContext = React.createContext({
  token: "",
  transactions: [],
  rooms: [],
  roomData: {},
  hotels: [],
  hotelData: {},
  hotelDataHandler: (data) => {},
  roomDataHandler: (data) => {},
  tokenHandler(token) {},
  logOutHandler: () => {},
  transactionsHandler: (arr) => {},
  hotelsHandler: (arr) => {},
  roomsHandler: (arr) => {},
  deleteHotelsHandler: (id) => {},
  deleteRoomHandler: (id) => {},
});
