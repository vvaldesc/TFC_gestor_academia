import { useState, useEffect } from 'react';
import axios from 'axios';
import { FACEANALYCER } from '@/consts/config'; // Ajusta la ruta de importación según sea necesario

export const useCheckProfilePhoto = (src, submit) => {
  const [validPhotoFetch, setValid] = useState(false);
  const [photoCheckLoading, setLoading] = useState(false);
  const [photoProfileError, setError] = useState(null);
  const [sentPhoto, setSentPhoto] = useState(null);
  const url = "https://faceanalyzer-ai.p.rapidapi.com/faceanalysis";

  const fetchData = async () => {
    if (!src || !submit) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('image', src); // src should be a File object or a Blob

    const options = {
      method: 'POST',
      url: url,
      headers: {
        'X-RapidAPI-Key': FACEANALYCER.FACEANALYCER_KEY,
        'X-RapidAPI-Host': FACEANALYCER.FACEANALYCER_HOST,
      },
      data: formData,
    };

    try {
      //const response = await axios.request(options);
      // if (response.data.body && response.data.body.faces.length > 0) {
      //   setValid(true);
      // } else {
      //   setValid(true);
      //   setError("No se encontraron caras válidas en la imagen.");
      // }
      // setSentPhoto("response")
      setValid(true);
    } catch (error) {
      console.error('Hubo un error al hacer la solicitud:', error);
      setError(error.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [submit, src]);

  return {
    validPhotoFetch,
    photoCheckLoading,
    photoProfileError,
    sentPhoto,
  };
};

export default useCheckProfilePhoto;
