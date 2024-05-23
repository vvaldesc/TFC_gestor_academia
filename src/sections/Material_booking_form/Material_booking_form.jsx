import React, { useState } from "react";
import Material_static_date_time_picker from "@/components/Material_static_date_time_picker/Material_static_date_time_picker";
import Reservations_table from "@/components/AntDesign/tables/Reservations_table";

import useGetEmployees from "@/services/client/customhooks/useGetEmployees";


export default function Material_booking_form(clientEmail) {
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [delay, setDelay] = useState(0);
  const [submit, setSubmit] = useState(false);
  // const { estimatedTime, loading, error } = useGetServicePrediction(value);
  const { employees, loading, error } = useGetEmployees();

  const handleTimeChange = (time) => {
    console.log(time);
    setSelectedTime(time);
    console.log(selectedTime);
  };  


  const handleTableSelect = (employee) => {
    setSelectedEmployee(employee);
    console.log(employee);
  };

  return (
    <>
      <Material_static_date_time_picker onValueChange={handleTimeChange} />
      <Reservations_table employees={employees} availableEmployees={availableEmployees} daytime={selectedTime} onValueChange={handleTableSelect} />
    </>
  );
}
