import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Checkbox, Select, Upload } from 'antd';
import type { sessionInfoState } from '@/models/types';

import postFault from '@/services/client/fetching/hooks/postFault'

const { Option } = Select;

interface DocentPostModalProps {
  sessionInfoState: sessionInfoState[];
}

const Profile_edit_modal: React.FC<DocentPostModalProps> = ({ sessionInfoState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
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

  const handleStudentChange = (value: number) => {
    setSelectedStudent(value);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    handleOk();
    postFault(values);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Crear una falta de asistencia
      </Button>
      <Modal footer={null} title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={onFinish}>
        <Form onFinish={handleSubmit}>
            <Form.Item label="Nombre" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Apellido" name="surname">
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input />
            </Form.Item>
            <Form.Item label="Número de teléfono" name="phone_number">
                <Input />
            </Form.Item>
            <Form.Item label="Dirección" name="address">
                <Input />
            </Form.Item>
            <Form.Item label="Ciudad" name="city">
                <Input />
            </Form.Item>
            <Form.Item label="Fecha de nacimiento" name="bornDate">
                <DatePicker />
            </Form.Item>
            <Form.Item label="Nombre de usuario" name="username">
                <Input />
            </Form.Item>
            <Form.Item label="Confirmado" name="confirmed">
                <Checkbox />
            </Form.Item>
            <Form.Item label="Imagen" name="image">
                <Input />
            </Form.Item>
            <Form.Item label="Activo" name="active">
                <Checkbox />
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

export default Profile_edit_modal;