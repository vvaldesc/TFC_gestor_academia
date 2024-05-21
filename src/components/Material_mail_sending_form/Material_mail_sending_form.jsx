// Material_mail_sending_form.jsx
import React, { useState } from 'react';
import useSendEmail from '@/services/client/customhooks/useSendMail'; // Asegúrate de importar correctamente el hook
import { Input } from 'antd';
const { TextArea } = Input;

export default function Material_mail_sending_form() {
  const [message, setMessage] = useState('');
  const { sendEmail, error } = useSendEmail();

  const handleSubmit = async (event) => {
    console.log('handleSubmit');
    event.preventDefault();
    await sendEmail(message);
    if (error) {
      // Opcional: Manejar el error en la UI
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextArea rows={8} cols={90} placeholder="500 carácteres" maxLength={500} />
      </div>
    </form>
  );
}