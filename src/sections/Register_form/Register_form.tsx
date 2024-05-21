import React, { useState, useEffect } from "react";
import type {sessionInfoState,Client,useCheckProfilePhotoType,usePostClientType} from "@/models/types"; // prettier-ignore
import useClientPostHandler from "@/services/client/customhooks/handlers/useClientPostHandler"; // prettier-ignore

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

  const result = useClientPostHandler(client, submit);

  // Main handler
  useEffect(() => {
    if (submit) {
      // Asumiendo que useClientPostHandler es un hook personalizado que depende de `client` y `submit`
      setClientPostHandlerResult(result);
      console.log(clientPostHandlerResult);
    }
  }, [submit, client]); // Dependencias: `submit` y `client`
  console.log(clientPostHandlerResult);

  // Cookie delete
  if (result.usePostClientType.postData) {
    console.log("borrar cookie");
    document.cookie =
      "sessionInfoState=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // Submit toogler reset
  useEffect(() => {
    if (
      (submit && !result.usePostClientType.postClientLoading) ||
      !result.useCheckProfilePhotoType.photoCheckLoading
    ) {
      setSubmit(false);
    }
  }, [submit, result.usePostClientType.postClientLoading]);

  // OAuth mail setting
  useEffect(() => {
    setClient((prevState) => ({
      ...prevState,
      email: sessionInfoState.sessionInfo.OAuth.user?.email as string,
    }));
  }, [sessionInfoState.sessionInfo.OAuth.user?.email]);

  // Change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
  };


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
