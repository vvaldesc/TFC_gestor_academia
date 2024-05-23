import React, { useState } from "react";
import Material_static_date_time_picker from "@/components/Material_static_date_time_picker/Material_static_date_time_picker";
import Reservations_table from "@/components/AntDesign/tables/Reservations_table";

import useGetEmployees from "@/services/client/customhooks/useGetEmployees";
import useGetUnavailableEmployees from "@/services/client/customhooks/useGetUnavailableEmployees";
import usePostBooking from "@/services/client/customhooks/usePostBooking";

import type { ServiceConsumption_type, Employee, Student, Teacher, Result } from "@/models/types";

export default function Material_booking_form(client_id_raw: any) {
  const client_id: number = client_id_raw.client_id;
  const [selectedTime, setSelectedTime] = useState(new Date() as Date);
  const [selectedEmployee, setSelectedEmployee] = useState({} as Employee);
  const [delay, setDelay] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [booking, setBooking] = useState({} as ServiceConsumption_type);
  // const { estimatedTime, loading, error } = useGetServicePrediction(value);

  const { employees, loadingEmployees, errorEmployees }: { employees: { result: Result }, loadingEmployees: boolean, errorEmployees: any } = useGetEmployees();

  const { unavailableEmployees, loadingUnavailableEmployees, errorUnavailableEmployees }: { employees: { result: Result }, loadingUnavailableEmployees: boolean, errorUnavailableEmployees: any } = useGetUnavailableEmployees(selectedTime);

  const { sentData, postClientLoading, postClientError, postData }: { postData: { result: Result }, postClientLoading: boolean, postClientError: boolean, sentData: ServiceConsumption_type } = usePostBooking(booking);

  // console.log({ employees, loadingEmployees, errorEmployees });
  // console.log({ unavailableEmployees, loadingUnavailableEmployees, errorUnavailableEmployees });
  // console.log({ selectedTime, selectedEmployee });

  const handleTimeChange = (time: Date) => {
    debugger;
    setSelectedTime(time);
  };  

  const handleTableSelect = (id: number) => {
    setSelectedEmployee(employees.result.data.find((employee: Employee) => employee.id === id) as Employee);
    const booking: ServiceConsumption_type = {
      service_id: 1,
      employee_id: selectedEmployee.id as number,
      client_id: client_id,
      price: 7,
      created_at: new Date(),
      reserved_at: selectedTime,
    };
    setBooking(booking);
  };

  return (
    <>
      <Material_static_date_time_picker 
        onValueChange={handleTimeChange} 
      />
      <Reservations_table 
        employees={employees} 
        unavailableEmployees={unavailableEmployees} 
        daytime={selectedTime} 
        onValueChange={handleTableSelect} 
      />
    </>
  );
}
