import React, { useState, useEffect } from "react";
import Material_static_date_time_picker from "@/components/Material_static_date_time_picker/Material_static_date_time_picker";
import Reservations_table from "@/components/AntDesign/tables/Reservations_table";
import Service_cards from "@/sections/Service_cards_section/Service_cards";
import { Tag, Button, Modal } from "antd";

import useGetEmployees from "@/services/client/customhooks/useGetEmployees";
import useGetUnavailableEmployees from "@/services/client/customhooks/useGetUnavailableEmployees";
import usePostBooking from "@/services/client/customhooks/usePostBooking";
import usePostServicePrediction from "@/services/client/customhooks/usePostServicePrediction";
import useGetForecast from "@/services/client/customhooks/useGetForecast";
import useGetServices from "@/services/client/customhooks/useGetServices";

import Error_alert from "@/components/AntDesign/alert/Error_alert";

import { WEB_URL } from '@/consts/consts';

import "./Material_booking_form.css"

import classifyWeatherCode from "@/services/client/utils/weathercodeparser"
import {calculateDaysFromToday} from "@/services/client/utils/utils"

import type {
  ServiceConsumption_type,
  Employee,
  Student,
  Teacher,
  Result,
  ServicePredictionPost_type,
  ProfileSession,
  ExtendedEmployee,
  Weather_res,
  Service
} from "@/models/types";

export default function Material_booking_form(props: {client_id: any, sessionInfo: ProfileSession}) {
  const { client_id, sessionInfo } = props;

  const [selectedTime, setSelectedTime] = useState(new Date() as Date);
  const [selectedEmployee, setSelectedEmployee] = useState({} as Employee);
  const [selectedService, setSelectedService] = useState(null as number | null);
  const [submit, setSubmit] = useState(false);
  const [booking, setBooking] = useState({} as ServiceConsumption_type);
  const [weather, setWeather] = useState("Sunny");
  const [extendedBooking, setExtendedBooking] = useState({} as ServicePredictionPost_type);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const { forecast, loadingForecast, errorForecast }: { forecast: Weather_res | null, loadingForecast: boolean, errorForecast: any } = 
  useGetForecast();

  const { services, loadingServices, errorServices }: { services: any, loadingServices: boolean, errorServices: any } =
  useGetServices();

  const { estimatedTime, loading, errorServicePrediction }: any =
  usePostServicePrediction(extendedBooking);

  const estimatedTime_number = estimatedTime?.estimated_delay as number | undefined | null;

  const service_data = setSelectedService !== null ? services?.result?.data?.find((service: Service) => service.id === selectedService) : null;

  //@ts-ignore
  const {
    employees,
    loadingEmployees,
    errorEmployees,
  }: {
    employees: { result: Result };
    loadingEmployees: boolean;
    errorEmployees: any;
  } = useGetEmployees();
  //@ts-ignore
  const {
    unavailableEmployees,
    loadingUnavailableEmployees,
    errorUnavailableEmployees,
  }: {
    unavailableEmployees: { result: Result };
    loadingUnavailableEmployees: boolean;
    errorUnavailableEmployees: any;
  } = useGetUnavailableEmployees(selectedTime);
  //@ts-ignore
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
  } = usePostBooking(booking, submit);

  if (postData && !postClientError && !postClientLoading && submit) {
    window.location.href = `https://localhost:4322/perfil`;
}

  const handleTimeChange = (time: Date) => {
    console.log({'dias hasta la reserva': calculateDaysFromToday(time)});
    let weather_res = "Sunny";
    // weather_res = forecast && classifyWeatherCode(forecast.data[calculateDaysFromToday(time)].weather?.code) as string;
    forecast && setWeather(weather_res);
    setSelectedTime(time);
    const extendedBooking: ServicePredictionPost_type = {
      client_id: client_id,
      service_id: 1,
      created_at: new Date(),
      reserved_at: time,
      price: 7,
      weather: weather_res || "Sunny",
      client_name: sessionInfo.profile?.name || sessionInfo.OAuth.user?.name as string | undefined,
      client_surname: sessionInfo.profile?.surname,
      client_address: sessionInfo.profile?.address,
      client_phone_number: sessionInfo.profile?.phone_number,
      client_email: sessionInfo.profile?.email,
    };

    setExtendedBooking(extendedBooking);
  };

  const handleTableSelect = (id: number) => {
    const employee: Employee = employees.result.data.find((employee: Employee) => employee.id === id);
    debugger

    const booking: ServiceConsumption_type | null = selectedEmployee ? {
      service_id: service_data.id,
      service_name: service_data.name,
      employee_id: employee.id,
      employee_email: employee.teacher?.email || employee.student?.email,
      employee_name: employee.teacher?.name || employee.student?.name,
      client_id: client_id,
      client_email: sessionInfo.profile?.email,
      client_name: sessionInfo.profile?.name ?? sessionInfo.OAuth?.user?.name ?? "",
      price: service_data.price,
      created_at: new Date(),
      reserved_at: selectedTime,
      weather: "Sunny", //cambiar en api
    } : null;
        
    const extendedBooking: ServicePredictionPost_type | null = selectedEmployee ? {
      client_id: client_id,
      teacher_id: employee.id,
      service_id: service_data.id,
      created_at: new Date(),
      reserved_at: selectedTime,
      price: service_data.price,
      weather: "Sunny", //cambiar en api
      client_name: sessionInfo.profile?.name || sessionInfo.OAuth.user?.name as string,
      teacher_name: employee.teacher?.name as string,
      client_surname: sessionInfo.profile?.surname as string,
      teacher_surname: employee.teacher?.surname as string,
      client_address: sessionInfo.profile?.address as string,
      teacher_address: employee.teacher?.address  as string,
      client_phone_number: sessionInfo.profile?.phone_number as string,
      teacher_phone_number: employee.teacher?.phone_number as string,
      client_email: sessionInfo.profile?.email as string,
      teacher_email: employee.teacher?.email as string,
      employee_salary: employee.salary as number,
    } : null;

    console.log(extendedBooking);
    (selectedTime && selectedService) ? setIsModalOpen(true) : showError && setTimeout(() => setShowError(false), 3000);;
    setSelectedEmployee(employee);
    setExtendedBooking(extendedBooking as ServicePredictionPost_type);
    setBooking(booking as ServiceConsumption_type);
  };

  const handleServiceSelect = (id: number) => {
    setSelectedService(id);
    console.log(id);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setSubmit(true);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <form className="material-booking-form" onSubmit={(e) => e.preventDefault()}>

      <Modal title="Confirm Booking" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Service: {service_data?.name}</p>
      <p>Employee: {selectedEmployee?.teacher?.name || selectedEmployee?.student?.name}</p>
      <p>Date and Time: {selectedTime.toLocaleString()}</p>
      <p>Weather: {weather}</p>
      <p>Estimated Delay: {estimatedTime_number}</p>
    </Modal>



      {showError && <Error_alert message={'Faltan campos por completar'} />}

      <div className="fecha flex" style={{ marginTop: "20px" }}>
        <Material_static_date_time_picker onValueChange={handleTimeChange} />
        {services?.result?.data && (
          <Service_cards
            services={services?.result?.data}
            handleServiceSelect={handleServiceSelect}
            selectedService={selectedService}
          />
        )}
      </div>

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
    </form>
  );
}
