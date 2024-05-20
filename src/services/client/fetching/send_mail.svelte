<script>
    async function enviarMensaje(event) {
      // Previene el comportamiento por defecto del formulario
      event.preventDefault();
  
      // Obtiene los datos del formulario
      const formData = new FormData(event.target);
      const mensaje = formData.get('message');
  
      try {
        // Envía la petición POST
        const respuesta = await fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: mensaje }),
        });
  
        if (respuesta.ok) {
          // Maneja la respuesta exitosa
          console.log('Mensaje enviado con éxito');
        } else {
          // Maneja los errores de la respuesta
          console.error('Error al enviar el mensaje');
        }
      } catch (error) {
        // Maneja los errores de la petición
        console.error('Error al enviar el mensaje', error);
      }
    }
  </script>

<form on:submit|preventDefault={enviarMensaje}>
    <textarea name="message" placeholder="Escribe tu mensaje"></textarea>
    <button type="submit">Enviar</button>
  </form>