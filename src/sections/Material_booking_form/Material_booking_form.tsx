import React, { useState } from "react";
import Material_static_date_time_picker from "@/components/Material_static_date_time_picker/Material_static_date_time_picker";
import Reservations_table from "@/components/AntDesign/tables/Reservations_table";
import { Tag } from "antd";

import useGetEmployees from "@/services/client/customhooks/useGetEmployees";
import useGetUnavailableEmployees from "@/services/client/customhooks/useGetUnavailableEmployees";
import usePostBooking from "@/services/client/customhooks/usePostBooking";
import usePostMailer from "@/services/client/customhooks/usePostMailer";
import usePostServicePrediction from "@/services/client/customhooks/usePostServicePrediction";
import useGetForecast from "@/services/client/customhooks/useGetForecast";

import classifyWeatherCode from "@/services/client/utils/weathercodeparser"
import {calculateDaysFromToday} from "@/services/client/logic/utils"

import type {
  ServiceConsumption_type,
  Employee,
  Student,
  Teacher,
  Result,
  ServicePredictionPost_type,
  ProfileSession,
  ExtendedEmployee,
  Weather_res
} from "@/models/types";

export default function Material_booking_form(props: {client_id: any, sessionInfo: ProfileSession}) {
  const { client_id, sessionInfo } = props;
  const [selectedTime, setSelectedTime] = useState(new Date() as Date);
  const [selectedEmployee, setSelectedEmployee] = useState({} as Employee);
  const [delay, setDelay] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [booking, setBooking] = useState({} as ServiceConsumption_type);
  const [weather, setWeather] = useState("Sunny");
  const [extendedBooking, setExtendedBooking] = useState(
    {} as ServicePredictionPost_type
  );

  const { forecast, loadingForecast, errorForecast }: { forecast: Weather_res, loadingForecast: boolean, errorForecast: any } =
  useGetForecast();

  const { estimatedTime, loading, error }: any =
  usePostServicePrediction(extendedBooking);
  console.log({'estimatedTime': estimatedTime?.estimated_delay});
  const estimatedTime_number = estimatedTime?.estimated_delay as number | undefined | null;

  console.log({'weather': weather});

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

  const { mailResponse, loadingMailing, errorMailing }: any =
  usePostMailer(extendedBooking);

  const handleTimeChange = (time: Date) => {
    console.log({'dias hasta la reserva': calculateDaysFromToday(time)});
    const weather_res = forecast && classifyWeatherCode(forecast.data[calculateDaysFromToday(time)].weather?.code) as string;
    forecast && setWeather(weather_res);
    setSelectedTime(time);
    const extendedBooking: ServicePredictionPost_type = {
      client_id: client_id,
      service_id: 1,
      created_at: new Date(),
      reserved_at: time,
      price: 7,
      weather: weather_res,
      client_name: sessionInfo.profile.name || sessionInfo.OAuth.user.name,
      client_surname: sessionInfo.profile.surname,
      client_address: sessionInfo.profile.address,
      client_phone_number: sessionInfo.profile.phone_number,
      client_email: sessionInfo.profile.email,
    };

    setExtendedBooking(extendedBooking);
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
      client_email: sessionInfo.profile.email,
      teacher_email: employee.teacher?.email,
      employee_salary: employee.salary,
    } : null;

    console.log(extendedBooking);
    setSelectedEmployee(employee);
    setExtendedBooking(extendedBooking);
    setBooking(booking);
  };

  return (
    <section className="material-booking-form">
      <Material_static_date_time_picker onValueChange={handleTimeChange} />
      <div className="fecha" style={{ marginTop: "20px" }}>
        <Tag color="geekblue">{selectedTime.toLocaleString()}</Tag>
        <Tag color="geekblue">{weather}</Tag>
        {estimatedTime_number && <Tag color={estimatedTime_number < 5 ? "green" : estimatedTime_number <= 10 ? "blue" : "red"}>
            {estimatedTime_number}
        </Tag>}
      </div>
      <Reservations_table
        employees={employees}
        unavailableEmployees={unavailableEmployees}
        daytime={selectedTime}
        onValueChange={handleTableSelect}
      />
    </section>
  );
}
