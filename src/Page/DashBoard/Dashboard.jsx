import React, { useContext, useEffect } from "react";
import "./Dashboard.css";
import Table from "../../components/table/Table";
import { UserContext } from "../../store/UserContext";

import { ReactComponent as User } from "../../assets/icons/user-svgrepo-com-2.svg";
import { ReactComponent as Cart } from "../../assets/icons/cart-shopping-svgrepo-com.svg";
import { ReactComponent as Money } from "../../assets/icons/money-dollars-svgrepo-com.svg";
import { ReactComponent as Wallet } from "../../assets/icons/wallet-minus-svgrepo-com.svg";

function Dashboard() {
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
    <div className="dashboard-container">
      <div className="dashboard-head">
        <div className="dashboard-head-item">
          <h4 className="dashboard-head-item-title">User</h4>
          <div className="dashboard-head-item-number">100</div>
          <div className="dashboard-head-item-icon">
            <User />
          </div>
        </div>
        <div className="dashboard-head-item">
          <h4 className="dashboard-head-item-title">Order</h4>
          <div className="dashboard-head-item-number">100</div>
          <div className="dashboard-head-item-icon">
            <Cart />
          </div>
        </div>
        <div className="dashboard-head-item">
          <h4 className="dashboard-head-item-title">Earings</h4>
          <div className="dashboard-head-item-number">$100</div>
          <div className="dashboard-head-item-icon">
            <Money />
          </div>
        </div>
        <div className="dashboard-head-item">
          <h4 className="dashboard-head-item-title">Balance</h4>
          <div className="dashboard-head-item-number">$100</div>
          <div className="dashboard-head-item-icon">
            <Wallet />
          </div>
        </div>
      </div>
      <Table title={"List Transactions"} isTransaction={true} />
    </div>
  );
}

export default Dashboard;
