import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const unavailableDays = ['2022-12-25', '2023-01-01']; // Example of unavailable days

export default function BasicDateCalendar({ unavailableDays }) {
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar 
        disablePast= {true}
        focusedView= {true}
        views= {['year', 'month', 'day']}
        firstDayOfWeek= {1}
        loading = {false}
        timezone='system'
      />
    </LocalizationProvider>
  );
}