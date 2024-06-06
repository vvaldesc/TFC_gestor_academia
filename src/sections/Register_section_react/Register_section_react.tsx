import React from "react";
import type { sessionInfoState } from "@/models/types"; // prettier-ignore
import Register_form from "@/components/AntDesign/forms/Register_form";
interface Props {
  sessionInfoState: sessionInfoState;
}

const Register_section_react: React.FC<Props> = ({ sessionInfoState }) => {
  return (
    <>
      <Register_form sessionInfoState={sessionInfoState} />
    </>
  );
};

export default Register_section_react;
