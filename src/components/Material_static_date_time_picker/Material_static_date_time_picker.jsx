import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { MINUTES_IN_A_PERIOD } from '@/consts/consts';

export default function Material_static_date_time_picker() {
    const [value, setValue] = useState(new Date());
    const [key, setKey] = useState(0);

    const handleAccept = (newValue) => {
        setValue(newValue);
        console.log(value);
        setKey(prevKey => prevKey + 1); // Re-render the component
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker 
                key={key}
                orientation="landscape" 
                label="Static picker"
                minutesStep={Number(MINUTES_IN_A_PERIOD)}
                disablePast={true}
                autoFocus={true}
                openTo='day'
                onAccept={() => handleAccept(newValue)}
            />
        </LocalizationProvider>
    );
}
