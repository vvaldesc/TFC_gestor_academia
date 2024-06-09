import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
import dayjs from 'dayjs';

import postDetail from '@/services/client/fetching/hooks/postDetail'

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
  const [form] = Form.useForm();

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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    handleOk();
    const body = values;
    body.mode = 'Silent';
    postDetail(values);
  };
  
  const disabledDates = details
  .filter((detail) => detail.state === "Pending" && detail.employee_id === selectedEmployee.id)
  .map((detail) => dayjs(detail.reserved_at).format("YYYY-MM-DD HH:mm"));

  const isDateDisabled = (currentDate: dayjs.Dayjs) => {
    return disabledDates.includes(currentDate.format("YYYY-MM-DD HH:mm"));
  };
  
  const filteredEmployees = employees.filter((employee) => {
    return selectedService 
    // @ts-ignore
    ? (employee.student?.disciplines.includes(selectedService.discipline) 
    // @ts-ignore
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
    onOk={onFinish}
    onCancel={handleCancel}
    footer={null}
  >
  <Form form={form} onFinish={onFinish}>
    <Form.Item label="Servicio" name="service_id">
      <Select placeholder="Selecciona un servicio" onChange={handleServiceChange}>
        {services.map((service) => (
          <Option key={service.id} value={service.id}>
            {service.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item label="Empleado" name="employee_id">
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
    <Form.Item label="Cliente" name="client_id">
      <Select placeholder="Selecciona un cliente">
        {clients.map((client) => (
          <Option key={client.id} value={client.id}>{client.name}</Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item label="Fecha y hora reservada" name="reserved_at">
      <DatePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={isDateDisabled} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Enviar
      </Button>
      <Button type="default" htmlType="button" onClick={handleCancel}>
        Cancelar
      </Button>
    </Form.Item>
  </Form>
  </Modal>
</>
  );
};

export default ServiceConsumptionModal;