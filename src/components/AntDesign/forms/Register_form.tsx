import React, { useState } from "react";
import type {useCheckProfilePhotoType,usePostClientType,sessionInfoState} from "@/models/types"; // prettier-ignore
import useClientPostHandler from "@/services/client/customhooks/handlers/useClientPostHandler"; // prettier-ignore

interface Props {
    sessionInfoState: sessionInfoState;
    handleSubmit: (value: any) => void;
    handleChange: (value: any) => void;
  }

const Register_form: React.FC<Props> = ({ sessionInfoState, handleSubmit, handleChange}) => {
  const [clientPostHandlerResult, setClientPostHandlerResult] = useState<{
    useCheckProfilePhotoType: useCheckProfilePhotoType;
    usePostClientType: usePostClientType;
  } | null>(null);

  return (
    <>
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
      {clientPostHandlerResult?.useCheckProfilePhotoType.photoCheckLoading && (
        <p>Foto cargando</p>
      )}
      {clientPostHandlerResult?.useCheckProfilePhotoType.photoProfileError !=
        null && <p>Error</p>}
      {clientPostHandlerResult?.usePostClientType.postClientLoading && (
        <p>Creando cliente</p>
      )}
      {clientPostHandlerResult?.usePostClientType.postClientError != null && (
        <p>Error con cliente</p>
      )}
    </>
  );
};

export default Register_form;
