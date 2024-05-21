import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { MINUTES_IN_A_PERIOD } from "@/consts/consts";

import type { ServiceConsumption_type } from "@/models/types";

import useGetServicePrediction from "@/services/client/customhooks/useGetServicePrediction";

export default function Material_static_date_time_picker() {
  const [value, setValue] = useState(null);
  const [key, setKey] = useState(0);

  // const test: ServiceConsumption_type = {
  //   _id: 1,
  //   service_id: 1,
  //   employee_id: 1,
  //   client_id: 1,
  //   rating: 4,
  //   price: 25,
  //   delay: 5,
  //   created_at: new Date("2024-05-13T08:51:10.727Z"),
  //   updated_at: new Date("2024-05-13T08:51:10.727Z"),
  // };

  // const { estimatedTime, loading, error } = useGetServicePrediction(value);

  const handleAccept = (newValue: any) => {
    debugger;
    setValue(newValue);
    console.log(value);
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
          onAccept={(newValue) => handleAccept(newValue)}
        />
      </LocalizationProvider>
      {/* <p>{estimatedTime}</p>
      <p>{loading}</p>
      <p>{error}</p> */}
    </>
  );
}
