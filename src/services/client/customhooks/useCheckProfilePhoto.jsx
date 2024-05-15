import React, { useEffect, useState } from "react";
import axios from "axios";


export const useCheckProfilePhoto = (src) => {
  const url = "https://faceanalyzer-ai.p.rapidapi.com/faceanalysis"; // Asegúrate de pasar la URL correcta como argumento
  debugger;
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true); // Cambiado para manejar el estado de carga con un booleano
  const [error, setError] = useState(null); // Agregado para manejar posibles errores

  const options = {
    method: 'POST',
    url: url,
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_FACEANALYCER_API_KEY,
      'X-RapidAPI-Host': import.meta.env.VITE_FACEANALYCER_API_HOST
    },
    data: src
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        //Aqui debe haber una verificacion de la respuesta para saber si la imagen es valida o no
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchData(); // Asegúrate de que la URL no esté vacía
  }, [url]);

  return {
    valid: valid || false,
    loading,
    error,
  };
};
export default useCheckProfilePhoto;