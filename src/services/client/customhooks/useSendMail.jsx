// useSendEmail.js
import { useState } from 'react';
import axios from 'axios';

const useSendEmail = () => {
  const [error, setError] = useState(null);

  const sendEmail = async (message) => {
    try {
      const response = await axios.post('/api/send-email', { message });
      if (response.status === 200) {
        alert('Mensaje enviado con éxito');
      } else {
        alert('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje', error.response ? error.response.data : error);
      setError(error.response ? error.response.data : error);
    }
  };

  return { sendEmail, error };
};

export default useSendEmail;