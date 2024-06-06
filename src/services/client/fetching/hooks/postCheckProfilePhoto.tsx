import React from 'react';
import axios from 'axios';

const url = "https://faceanalyzer-ai.p.rapidapi.com/faceanalysis";

const postCheckProfilePhoto: React.FC<any | undefined> = async (file) => {
    // Crear un objeto FormData y agregar la imagen
    const data = new FormData();
    data.append('image', file);

    const options = {
        method: 'POST',
        url: url,
        headers: {
          'X-RapidAPI-Key': import.meta.env.PUBLIC_FACEANALYCER_API_KEY,
          'X-RapidAPI-Host': import.meta.env.PUBLIC_FACEANALYCER_API_HOST,
          // No necesitas establecer 'Content-Type': 'multipart/form-data'
          // Axios lo hará automáticamente cuando pases un objeto FormData
        },
        data: data
    };

    const response = await axios.request(options);
    console.log(response);
    if (response.data.body && response.data.body.faces.length > 0) {
        return true;
    } else {
        return null;
    }
};

export default postCheckProfilePhoto;