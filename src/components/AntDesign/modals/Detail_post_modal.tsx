import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
import dayjs from 'dayjs';

import type {
  Client,
  Service,
  ExtendedEmployee,
  ServiceConsumption_type,
} from "@/models/types";

const { Option } = Select;

interface ServiceConsumptionModalProps {
  clients: Client[];
  employees: ExtendedEmployee[];
  services: Service[];
  details: ServiceConsumption_type[];
}

const ServiceConsumptionModal: React.FC<ServiceConsumptionModalProps> = ({
  clients,
  employees,
  details,
  services,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false as boolean);
  const [selectedService, setSelectedService] = useState({} as Service);
  const [selectedEmployee, setSelectedEmployee] = useState({} as ExtendedEmployee);

  console.log('selectedEmployee');
  console.log(selectedEmployee);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleServiceChange = (value: number) => {
    setSelectedService(services.find((service) => service.id === value) as Service);
  };

  const handleEmployeeChange = (value: number) => {
    setSelectedEmployee(employees.find((employee) => employee.id === value) as ExtendedEmployee);
  };

  console.log('details', details);
  console.log('selectedEmployee.id', selectedEmployee.id);
  
  const disabledDates = details
  .filter((detail) => detail.state === "Pending" && detail.employee_id === selectedEmployee.id)
  .map((detail) => dayjs(detail.reserved_at).format("YYYY-MM-DD HH:mm"));

  const isDateDisabled = (currentDate: dayjs.Dayjs) => {
    return disabledDates.includes(currentDate.format("YYYY-MM-DD HH:mm"));
  };
  
  console.log('disabledDates', disabledDates);

  const filteredEmployees = employees.filter((employee) => {
    return selectedService 
    ? (employee.student?.disciplines.includes(selectedService.discipline) 
    || employee.teacher?.disciplines.includes(selectedService.discipline)) 
    : true;
  });

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Crear consumo de servicio
      </Button>
      <Modal
        title="Consumo de servicio"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Servicio">
            <Select placeholder="Selecciona un servicio" onChange={handleServiceChange}>
              {services.map((service) => (
                <Option key={service.id} value={service.id}>
                  {service.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Empleado">
            <Select placeholder="Selecciona un empleado" onChange={handleEmployeeChange}>
              {filteredEmployees.map((employee) => (
                <Option key={employee.id} value={employee.id}>
                {employee.teacher 
                  ? employee.teacher.name + " " + employee.teacher.surname 
                  : employee.student 
                    ? employee.student.name + " " + employee.student.surname 
                    : ''}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Cliente">
            <Select placeholder="Selecciona un cliente">
              {clients.map((client) => (
                <Option key={client.id} value={client.id}>{client.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Fecha y hora reservada">
            <DatePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={isDateDisabled} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ServiceConsumptionModal;