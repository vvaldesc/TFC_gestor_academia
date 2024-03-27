<script>
    export let field;
    const now = new Date();
    const time = now.toLocaleTimeString();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    const day = now.getDate();
    let displayField;
  
    switch(field) {
      case 'Time':
        displayField = time;
        break;
      case 'Year':
        displayField = year;
        break;
      case 'Month':
        displayField = month;
        break;
      case 'Day':
        displayField = day;
        break;
      default:
        displayField = 'Field not recognized';
    }
  </script>
  
{displayField}