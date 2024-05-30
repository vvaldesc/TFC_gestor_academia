import React, { useState, useEffect } from "react";
import type { sessionInfoState, Client } from "@/models/types"; // prettier-ignore
import Register_form from "@/components/AntDesign/forms/Register_form";
import useCheckProfilePhoto from "@/services/client/customhooks/useCheckProfilePhoto";
import usePostClient from "@/services/client/customhooks/usePostClient";

import {deleteCookieLoacalStorage} from "@/services/client/utils/utils_typed";

interface Props {
  sessionInfoState: sessionInfoState;
}

const Register_section_react: React.FC<Props> = ({ sessionInfoState }) => {
  const [client, setClient] = useState<Client>({
    email: sessionInfoState.sessionInfo.OAuth.user?.email,
    active: true,
    image: sessionInfoState.sessionInfo.OAuth.user?.image,
  } as Client);
  const [submit, setSubmit] = useState(false);
  const [validPhoto, setValidPhoto] = useState(false);

  const { validPhotoFetch, photoCheckLoading, photoProfileError } =
    useCheckProfilePhoto(client.image, submit);
  const { sentData, postClientLoading, postClientError, postData, clientOk } =
    usePostClient(client, validPhoto, submit);

  clientOk && deleteCookieLoacalStorage("sessionInfoState");

  useEffect(() => {
    if (validPhotoFetch && !photoCheckLoading && !photoProfileError) {
      setValidPhoto(true);
    }
  }, [validPhotoFetch, photoCheckLoading, photoProfileError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value, // Si es un input de archivo, usa files[0]
    }));
  };

  return (
    <>
      <Register_form
        sessionInfoState={sessionInfoState}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {photoCheckLoading && <p>Foto cargando...</p>}
      {photoProfileError && <p>Error en la foto: {photoProfileError}</p>}
      {postClientLoading && <p>Creando cliente...</p>}
      {postClientError && (
        <p>Error en el registro del cliente: {postClientError}</p>
      )}
    </>
  );
};

export default Register_section_react;
