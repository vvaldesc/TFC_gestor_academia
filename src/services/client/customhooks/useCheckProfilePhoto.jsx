import React, { useEffect, useState } from "react";
import axios from "axios";

export const useCheckProfilePhoto = (src, submit) => {
  const [validPhoto, setValid] = useState(false);
  const [photoCheckLoading, setLoading] = useState(true);
  const [photoProfileError, setError] = useState(null);
  const url = "https://faceanalyzer-ai.p.rapidapi.com/faceanalysis";

  let response = null;

  useEffect(() => {
    const options = {
      method: 'POST',
      url: url,
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_FACEANALYCER_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_FACEANALYCER_API_HOST
      },
      data: src
    };

    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        // Aquí debes verificar la respuesta para saber si la imagen es válida o no
        // y luego llamar a setValid con el valor correspondiente
        return response;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (url && src && submit) {response = fetchData();}
  }, [url, src]);

  return {
    validPhoto,
    photoCheckLoading,
    photoProfileError,
  };
};

export default useCheckProfilePhoto;