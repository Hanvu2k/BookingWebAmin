import React from "react";

import InputForm from "../../components/inputForm/InputForm";
import { useParams } from "react-router-dom";

function EditRoom() {
  const { roomId } = useParams();
  return (
    <InputForm isEditRoom={true} roomId={roomId} titlePage={"Edit Room"} />
  );
}

export default EditRoom;
