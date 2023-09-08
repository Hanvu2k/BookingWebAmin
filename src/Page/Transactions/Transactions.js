import React, { useContext, useEffect } from "react";
import Table from "../../components/table/Table";
import { UserContext } from "../../store/UserContext";

function Transactions() {
  const { token, transactionsHandler } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://bookingweb-server.onrender.com/api/v1/transaction/getAllTransaction?token=${token}`
        );
        const data = await res.json();
        transactionsHandler(data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, transactionsHandler]);
  return (
    <div>
      <Table title={"Transactions List"} isTransaction={true} />
    </div>
  );
}

export default Transactions;
