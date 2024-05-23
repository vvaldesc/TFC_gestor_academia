import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { MINUTES_IN_A_PERIOD } from "@/consts/consts";



import type { ServiceConsumption_type } from "@/models/types";
import useGetServicePrediction from "@/services/client/customhooks/useGetServicePrediction";

export default function Material_static_date_time_picker({onValueChange}: { onValueChange: (value: any) => void }) {
  const [key, setKey] = useState(0);

  // const { estimatedTime, loading, error } = useGetServicePrediction(value);

  const handleAccept = (newValue: any) => {
    onValueChange(newValue);
    setKey((prevKey) => prevKey + 1); // Re-render the component
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateTimePicker
          key={key}
          orientation="landscape"
          minutesStep={Number(MINUTES_IN_A_PERIOD)}
          disablePast={true}
          autoFocus={true}
          openTo="day"
          onError={(error) => {
              console.log("error", error)
              setKey((prevKey) => prevKey + 1); // Re-render the component
            }}
          onAccept={(newValue) => handleAccept(newValue)}
          timezone="system"
        />
      </LocalizationProvider>
    </>
  );
}
