import React from "react";
import type {sessionInfoState} from "@/models/types";
import { Input } from "antd";

interface Props {
    sessionInfoState: sessionInfoState;
    handleSubmit: (e: any) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

const Register_form: React.FC<Props> = ({ sessionInfoState, handleSubmit, handleChange}) => {
  return (
    <>
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <Input 
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <Input 
            type="text"
            name="surname"
            placeholder="Surname"
            onChange={handleChange}
          />
          <Input 
            type="text"
            name="phone_number"
            placeholder="TLF"
            onChange={handleChange}
          />
          <Input 
            type="text"
            name="address"
            placeholder="Dirección"
            onChange={handleChange}
          />
          <Input 
            type="text"
            name="city"
            placeholder="Ciudad"
            onChange={handleChange}
          />
          <Input 
            type="text"
            name="username"
            placeholder="Usuario"
            onChange={handleChange}
          />
          <Input 
            type="date"
            name="bornDate"
            placeholder="fecha_nacimiento"
            onChange={handleChange}
          />
          <Input 
            type="file"
            name="image"
            placeholder="foto_perfil"
            onChange={handleChange}
          />
          <Input  type="submit" value="Register" />
      </form>
    </>
  );
};

export default Register_form;
