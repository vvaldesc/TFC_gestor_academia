import React, { useState } from "react";
import type {
  useCheckProfilePhotoType,
  usePostClientType,
  sessionInfoState,
} from "@/models/types";
import useClientPostHandler from "@/services/client/customhooks/handlers/useClientPostHandler";
import Register_form from "@/components/AntDesign/forms/Register_form";

interface Props {
  sessionInfoState: sessionInfoState;
}

const Register_section_react: React.FC<Props> = ({ sessionInfoState }) => {
  const handleSubmit = (value: any) => {
    console.log(value);
  };

  const handleChange = (value: any) => {
    console.log(value);
  };

  return (
    <>
      <Register_form
        sessionInfoState={sessionInfoState}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </>
  );
};

export default Register_section_react;
