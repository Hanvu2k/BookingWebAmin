import React, { useContext, useEffect } from "react";
import Table from "../../components/table/Table";
import { UserContext } from "../../store/UserContext";

function Rooms() {
  const { token, roomsHandler } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/room/getRoom?token=${token}`
        );
        const data = await res.json();
        roomsHandler(data.room);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, roomsHandler]);

  return (
    <div>
      <Table title={"Rooms List"} isRoom={true} />
    </div>
  );
}

export default Rooms;
