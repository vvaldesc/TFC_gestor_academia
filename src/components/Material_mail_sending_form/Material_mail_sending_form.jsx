// Material_mail_sending_form.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useSendEmail from '@/services/client/customhooks/useSendMail'; // Asegúrate de importar correctamente el hook

export default function Material_mail_sending_form() {
  const [message, setMessage] = useState('');
  const { sendEmail, error } = useSendEmail();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendEmail(message);
    if (error) {
      // Opcional: Manejar el error en la UI
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button type="submit" variant="contained">Enviar</Button>
    </form>
  );
}