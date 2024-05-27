import React, { useEffect, useState } from "react";
import axios from "axios";
//import { API_KEY, API_HOST } from '@/consts/config'; // Ajusta la ruta de importación según sea necesario

export const useCheckProfilePhoto = (src, submit) => {
  const [validPhoto, setValid] = useState(false);
  const [photoCheckLoading, setLoading] = useState(false);
  const [photoProfileError, setError] = useState(null);
  const url = "https://faceanalyzer-ai.p.rapidapi.com/faceanalysis";
  const {API_KEY2, API_HOST2} = {API_KEY, API_HOST}

  useEffect(() => {
    const options = {
      method: 'POST',
      url: url,
      headers: {
        'X-RapidAPI-Key': 'API_KEY2',
        'X-RapidAPI-Host': 'API_HOST2'
      },
      data: src
    };

    const fetchData = async () => {
      if (!submit) return; // Asegúrate de que submit es true antes de hacer la solicitud

      setLoading(true); // Reinicia el estado de carga cada vez que se intenta enviar
      try {
        const response = await axios.request(options);
        console.log(response);
        // Aquí debes verificar la respuesta para saber si la imagen es válida o no
        // Por ejemplo, si response.data indica que la foto es válida:
        // setValid(true); // o false, dependiendo de la respuesta
      } catch (error) {
        console.error("este es el error"+error);
        setLoading(false);
        setError(String(error)); // Almacena el error en el estado para mostrarlo en la interfaz
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Llama a fetchData directamente sin asignar su resultado
  }, [submit, src]); // Asegúrate de incluir submit en las dependencias

  return {
    validPhoto,
    photoCheckLoading,
    photoProfileError,
  };
};

export default useCheckProfilePhoto;