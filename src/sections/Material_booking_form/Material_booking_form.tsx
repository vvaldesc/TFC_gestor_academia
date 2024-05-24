import React, { useState } from "react";
import Material_static_date_time_picker from "@/components/Material_static_date_time_picker/Material_static_date_time_picker";
import Reservations_table from "@/components/AntDesign/tables/Reservations_table";

import useGetEmployees from "@/services/client/customhooks/useGetEmployees";
import useGetUnavailableEmployees from "@/services/client/customhooks/useGetUnavailableEmployees";
import usePostBooking from "@/services/client/customhooks/usePostBooking";
import usePostServicePrediction from "@/services/client/customhooks/usePostServicePrediction";

import type {
  ServiceConsumption_type,
  Employee,
  Student,
  Teacher,
  Result,
  ServicePredictionPost_type,
  ProfileSession,
  ExtendedEmployee,
} from "@/models/types";

export default function Material_booking_form(props: {client_id: any, sessionInfo: ProfileSession}) {
  const { client_id, sessionInfo } = props;
  const [selectedTime, setSelectedTime] = useState(new Date() as Date);
  const [selectedEmployee, setSelectedEmployee] = useState({} as Employee);
  const [delay, setDelay] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [booking, setBooking] = useState({} as ServiceConsumption_type);
  const [extendedBooking, setExtendedBooking] = useState(
    {} as ServicePredictionPost_type
  );

  const { estimatedTime, loading, error }: any =
  usePostServicePrediction(extendedBooking);

  const {
    employees,
    loadingEmployees,
    errorEmployees,
  }: {
    employees: { result: Result };
    loadingEmployees: boolean;
    errorEmployees: any;
  } = useGetEmployees();

  const {
    unavailableEmployees,
    loadingUnavailableEmployees,
    errorUnavailableEmployees,
  }: {
    employees: { result: Result };
    loadingUnavailableEmployees: boolean;
    errorUnavailableEmployees: any;
  } = useGetUnavailableEmployees(selectedTime);

  const {
    sentData,
    postClientLoading,
    postClientError,
    postData,
  }: {
    postData: { result: Result };
    postClientLoading: boolean;
    postClientError: boolean;
    sentData: ServiceConsumption_type;
  } = usePostBooking(booking);

  const handleTimeChange = (time: Date) => {
    setSelectedTime(time);
  };

  const handleTableSelect = (id: number) => {
    const employee: Employee = employees.result.data.find((employee: Employee) => employee.id === id);
    debugger

    const booking: ServiceConsumption_type = selectedEmployee ? {
      service_id: 1,
      employee_id: selectedEmployee.id,
      client_id: client_id,
      price: 7,
      created_at: new Date(),
      reserved_at: selectedTime,
    } : null;
        
    const extendedBooking: ServicePredictionPost_type = selectedEmployee ? {
      client_id: client_id,
      teacher_id: employee.id,
      service_id: 1,
      created_at: new Date(),
      reserved_at: selectedTime,
      price: 7,
      weather: "Sunny",
      client_name: sessionInfo.profile.name || sessionInfo.OAuth.user.name,
      teacher_name: employee.teacher?.name,
      client_surname: sessionInfo.profile.surname,
      teacher_surname: employee.teacher?.surname,
      client_address: sessionInfo.profile.address,
      teacher_address: employee.teacher?.address,
      client_phone_number: sessionInfo.profile.phone_number,
      teacher_phone_number: employee.teacher?.phone_number,
      client_email: employee.student?.email,
      teacher_email: employee.teacher?.email,
      employee_salary: employee.salary,
    } : null;

    console.log(extendedBooking);
    setSelectedEmployee(employee);
    setExtendedBooking(extendedBooking);
    setBooking(booking);
  };

  return (
    <>
      <Material_static_date_time_picker onValueChange={handleTimeChange} />
      <Reservations_table
        employees={employees}
        unavailableEmployees={unavailableEmployees}
        daytime={selectedTime}
        onValueChange={handleTableSelect}
      />
    </>
  );
}
