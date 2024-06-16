import React from "react";
import type { sessionInfoState } from "@/models/types"; // prettier-ignore
import Register_form from "@/components/AntDesign/forms/Register_form";
import { ConfigProvider } from 'antd';

interface Props {
  sessionInfoState: sessionInfoState;
}

const Register_section_react: React.FC<Props> = ({ sessionInfoState }) => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff69d4',
            borderRadius: 5,
            colorBgElevated: '#fff1fa',
            colorLinkHover: '#ff69d4',
            colorLinkActive: '#ff69d4',
          },
        }}
      >
        <Register_form sessionInfoState={sessionInfoState} />
      </ConfigProvider>
    </>
  );
};

export default Register_section_react;
