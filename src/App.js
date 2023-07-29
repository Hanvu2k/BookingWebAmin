import { BrowserRouter, Routes, Route } from "react-router-dom";

import ClientLayout from "./components/layout/ClientLayout";
import Dashboard from "./Page/DashBoard/Dashboard";
import Hotels from "./Page/Hotels/Hotels";
import AddHotel from "./Page/Hotels/AddHotel";
import Rooms from "./Page/Rooms/Rooms";
import AddRoom from "./Page/Rooms/AddRoom";
import Transactions from "./Page/Transactions/Transactions";
import EditHotel from "./Page/Hotels/EditHotel";
import EditRoom from "./Page/Rooms/EditRoom";
import Login from "./Page/Login/Login";
import UserProvider from "./store/UserProvider";
import Register from "./Page/Register/Register";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hotel" element={<Hotels />} />
            <Route path="/room" element={<Rooms />} />
            <Route path="/transaction" element={<Transactions />} />
            <Route path="/new-hotel" element={<AddHotel />} />
            <Route path="/new-room" element={<AddRoom />} />
            <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
