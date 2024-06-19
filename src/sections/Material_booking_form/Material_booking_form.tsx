import React, { useState, useEffect } from "react";
import Material_static_date_time_picker from "@/components/Material_static_date_time_picker/Material_static_date_time_picker";
import Reservations_table from "@/components/AntDesign/tables/Reservations_table";
import Service_cards from "@/sections/Service_cards_section/Service_cards";
import { Tag, Button, Modal } from "antd";
import { ConfigProvider } from 'antd';

import useGetEmployees from "@/services/client/customhooks/useGetEmployees";
import useGetUnavailableEmployees from "@/services/client/customhooks/useGetUnavailableEmployees";
import usePostBooking from "@/services/client/customhooks/usePostBooking";
import usePostServicePrediction from "@/services/client/customhooks/usePostServicePrediction";
import useGetServices from "@/services/client/customhooks/useGetServices";

import getForecast from "@/services/client/fetching/hooks/getForecast";
import postDetail from "@/services/client/fetching/hooks/postDetail";

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

const forecast = getForecast();

export default function Material_booking_form(props: {client_id: any, sessionInfo: ProfileSession}) {
  const { client_id, sessionInfo } = props;
  const [selectedTime, setSelectedTime] = useState(new Date() as Date);
  const [selectedEmployee, setSelectedEmployee] = useState({} as Employee);
  const [selectedService, setSelectedService] = useState(null as number | null);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null as string);
  const [submit, setSubmit] = useState(false);
  const [booking, setBooking] = useState({} as ServiceConsumption_type);
  const [weather, setWeather] = useState("Sunny");
  const [extendedBooking, setExtendedBooking] = useState({} as ServicePredictionPost_type);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);



  const { services, loadingServices, errorServices }: { services: any, loadingServices: boolean, errorServices: any } =
  useGetServices();

  const { estimatedTime, loading, errorServicePrediction }: any =
  usePostServicePrediction(extendedBooking);

  const estimatedTime_number = estimatedTime?.estimated_delay as number | undefined | null;

  const service_data = setSelectedService !== null ? services?.result?.data?.find((service: Service) => service.id === selectedService) : null;

  //@ts-ignore
  let {
    employees,
    loadingEmployees,
    errorEmployees,
  }: {
    employees: { result: Result };
    loadingEmployees: boolean;
    errorEmployees: any;
  } = useGetEmployees();

    if (selectedDiscipline && employees?.result?.data ) {
      const filteredEmployees = employees.result.data.filter((person: any) => {
        if (person.role === "teacher" && person.teacher?.disciplines?.includes(selectedDiscipline)) {
            console.log('teacher');
            return true;
        } else if (person.role === "student" && person.student?.disciplines?.includes(selectedDiscipline)) {
            console.log('student');
            return true;
        }
        return false;
    });


      
      if (filteredEmployees.length > 0) {
        employees.result.data = filteredEmployees;
      } else {
        // Mostrar un mensaje al usuario indicando que no hay empleados para la disciplina seleccionada
        console.log('no hay empleados');
      }

      console.log('filteredEmployees');
      console.log(filteredEmployees);
  }
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

  const handleTimeChange = (time: Date) => {
    console.log({'dias hasta la reserva': calculateDaysFromToday(time)});
    let weather_res = "Sunny";
    console.log('forecast');
    console.log(forecast);

    forecast.data !== undefined && classifyWeatherCode(forecast.data[calculateDaysFromToday(time)].weather?.code) as string;
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
    //@ts-ignore
    (selectedTime && selectedService) ? setIsModalOpen(true) : setShowError(true) && setTimeout(() => setShowError(false), 3000);
    setSelectedEmployee(employee);
    setExtendedBooking(extendedBooking as ServicePredictionPost_type);
    setBooking(booking as ServiceConsumption_type);
  };

  const handleServiceSelect = (id: number) => {
    setSelectedService(id);
    setSelectedDiscipline(services?.result?.data?.find((service: Service) => service.id === id)?.discipline);
    console.log(id);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setSubmit(true);
    setIsModalOpen(false);
    try {
      console.log('booking');
      console.log(booking);
      await postDetail(booking);
      window.location.href = `https://localhost:4322/perfil`;
    } catch (error) {
      console.log(error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <form className="material-booking-form" onSubmit={(e) => e.preventDefault()}>

<ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff69d4',
            borderRadius: 5,
            colorBgElevated: '#fff1fa',
            colorLinkHover: '#ff69d4',
            colorLinkActive: '#ff69d4',
          },
        }}
      >

      <Modal title="Confirmar" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Servicio: {service_data?.name}</p>
      <p>Empleado: {selectedEmployee?.teacher?.name || selectedEmployee?.student?.name}</p>
      <p>Fechaa de cita: {selectedTime.toLocaleString()}</p>
      <p>Tiempo: {weather}</p>
      {estimatedTime_number && <p>Retraso estimado (minutos):  
      <Tag color={estimatedTime_number < 7 ? "green" : estimatedTime_number <= 10 ? "blue" : "red"}>
            {estimatedTime_number}
        </Tag></p>}
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
        {estimatedTime_number && (
            <Tag color={estimatedTime_number < 7 ? "green" : estimatedTime_number <= 10 ? "blue" : "red"}>
              {estimatedTime_number} minutos estimados
            </Tag>
        )}
      </div>

      <Reservations_table
        employees={employees}
        unavailableEmployees={unavailableEmployees}
        daytime={selectedTime}
        onValueChange={handleTableSelect}
      />
      </ConfigProvider>

    </form>
  );
}
