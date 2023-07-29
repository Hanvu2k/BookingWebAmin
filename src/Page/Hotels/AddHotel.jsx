import React from "react";

import InputForm from "../../components/inputForm/InputForm";

function AddHotel() {
  return (
    <>
      <InputForm isAddHotel={true} titlePage={"Add New Hotel"} />
    </>
  );
}

export default AddHotel;
