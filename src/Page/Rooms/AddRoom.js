import React from "react";

import InputForm from "../../components/inputForm/InputForm";

function AddRoom() {
  return <InputForm isRoom={true} titlePage={"Add New Room"} />;
}

export default AddRoom;
