import React from "react";

import InputForm from "../../components/inputForm/InputForm";
import { useParams } from "react-router-dom";

function EditHotel() {
  const { hotelId } = useParams();

  return (
    <>
      <InputForm
        isEditHotel={true}
        titlePage={"Edit Hotel"}
        hotelId={hotelId}
      />
    </>
  );
}

export default EditHotel;
