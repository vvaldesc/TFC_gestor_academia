import React, { useState, useEffect } from "react";
import type { sessionInfoState, Client } from "@/models/types"; // prettier-ignore
import Register_form from "@/components/AntDesign/forms/Register_form";
import useCheckProfilePhoto from "@/services/client/customhooks/useCheckProfilePhoto";
import usePostClient from "@/services/client/customhooks/usePostClient";

interface Props {
  sessionInfoState: sessionInfoState;
}

const Register_section_react: React.FC<Props> = ({ sessionInfoState }) => {
  const [client, setClient] = useState<Client>({
    email: sessionInfoState.sessionInfo.OAuth.user?.email,
  } as Client);
  const [submit, setSubmit] = useState(false);
  const [validPhoto, setValidPhoto] = useState(false);

  console.log("Client:", client);

  const { validPhotoFetch, photoCheckLoading, photoProfileError } =
    useCheckProfilePhoto(client.image, submit);
  const { sentData, postClientLoading, postClientError, postData, clientOk } =
    usePostClient(client, validPhoto, submit);

  clientOk && console.log("Cliente creado:", postData);
  clientOk &&
    (() => {
      document.cookie =
        "sessionInfoState=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

  useEffect(() => {
    if (validPhotoFetch && !photoCheckLoading && !photoProfileError) {
      setValidPhoto(true);
    }
  }, [validPhotoFetch, photoCheckLoading, photoProfileError]);

  useEffect(() => {
    console.log(
      submit,
      validPhoto,
      !postClientLoading,
      !photoCheckLoading,
      submit && validPhoto && !postClientLoading && !photoCheckLoading
    );
    if (submit && validPhoto && !postClientLoading && !photoCheckLoading) {
      setSubmit(false);
    }
  }, [submit, validPhoto, postClientLoading, photoCheckLoading]);

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
