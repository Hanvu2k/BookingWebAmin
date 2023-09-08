import React, { useContext, useEffect } from "react";
import Table from "../../components/table/Table";
import { UserContext } from "../../store/UserContext";

function Hotels() {
  const { token, hotelsHandler } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://bookingweb-server.onrender.com/api/v1/hotel/getHotel?token=${token}`
        );
        const data = await res.json();
        hotelsHandler(data.hotel);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, hotelsHandler]);
  return (
    <div>
      <Table title={"Hotels List"} isHotel={true} />
    </div>
  );
}

export default Hotels;
