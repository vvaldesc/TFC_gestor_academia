import React, { useState, useEffect } from "react";
import type {sessionInfoState,Client,useCheckProfilePhotoType,usePostClientType} from "@/models/types"; // prettier-ignore
import {client_formFields} from "@/consts/forms_fields"; // prettier-ignore
import useClientPostHandler from "@/services/client/customhooks/handlers/useClientPostHandler"; // prettier-ignore
import {useCheckProfilePhoto} from "@/services/client/customhooks/useCheckProfilePhoto"; // prettier-ignore

type RegisterFormProps = {
  sessionInfoState: sessionInfoState;
};

const Register_form: React.FC<RegisterFormProps> = ({ sessionInfoState }) => {
  const [client, setClient] = useState<Client>({} as Client);
  const [submit, setSubmit] = useState(false);
  const [clientPostHandlerResult, setClientPostHandlerResult] = useState<{
    useCheckProfilePhotoType: useCheckProfilePhotoType;
    usePostClientType: usePostClientType;
  } | null>(null);
  debugger;
  useEffect(() => {
    const result = useClientPostHandler(client);
    setClientPostHandlerResult(result);
  }, [submit]);

  useEffect(() => {
    setClient((prevState) => ({
      ...prevState,
      email: sessionInfoState.sessionInfo.OAuth.user?.email as string,
    }));
  }, [sessionInfoState.sessionInfo.OAuth.user?.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(client);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <section className="w-1/2 border-l border-r border-gray-200 px-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          onChange={handleChange}
        />
        {sessionInfoState.sessionState === 0 && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        )}
        <input
          type="text"
          name="phone_number"
          placeholder="TLF"
          onChange={handleChange}
        />
      </section>

      <section className="w-1/2 border-r border-gray-200 px-4">
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={sessionInfoState.sessionInfo.OAuth.user?.name as string}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <input
          type="date"
          name="bornDate"
          placeholder="fecha_nacimiento"
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          placeholder="foto_perfil"
          onChange={handleChange}
        />
        <input type="submit" value="Register" />
      </section>
    </form>
  );
};

export default Register_form;
