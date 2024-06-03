import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Checkbox, Tabs } from 'antd';

const { TabPane } = Tabs;

const Course_post_modal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    // Aquí puedes hacer la llamada a la API para crear el curso
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Crear un curso
      </Button>
      <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Acrónimo" name="acronym">
            <Input placeholder="Acrónimo" />
          </Form.Item>
          <Form.Item label="Nombre" name="name">
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item label="Turno" name="turn">
            <Input placeholder="Turno" />
          </Form.Item>
          <Form.Item label="Umbral de asistencia" name="attendance_threshold">
            <Input type='number' placeholder="Umbral de asistencia" />
          </Form.Item>
          <Form.Item label="Nivel educativo" name="educational_level">
            <Input placeholder="Nivel educativo" />
          </Form.Item>
          <Form.Item label="Duración" name="duration">
            <Input type='number' placeholder="Duración" />
          </Form.Item>
          <Form.Item label="Horas prácticas" name="practical_hours">
            <Input type='number' placeholder="Horas prácticas" />
          </Form.Item>
          <Form.Item label="Disciplina" name="discipline">
            <Input placeholder="Disciplina" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Course_post_modal;