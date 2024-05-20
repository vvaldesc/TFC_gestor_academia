import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';

import { MINUTES_IN_A_PERIOD } from '@/consts/consts';

export default function Material_time_picker() {
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeClock 
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          minutesStep={Number(MINUTES_IN_A_PERIOD)}
        />
    </LocalizationProvider>
  );
}
