import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Checkbox, Tabs } from 'antd';

const { TabPane } = Tabs;

const Subject_post_modal: React.FC = () => {
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
    // Aquí puedes hacer la llamada a la API para crear la asignatura
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Crear una asignatura
      </Button>
      <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Acrónimo" name="acronym">
            <Input placeholder="Acrónimo" />
          </Form.Item>
          <Form.Item label="ID del profesor" name="teacher_id">
            <Input type='number' placeholder="ID del profesor" />
          </Form.Item>
          <Form.Item label="ID del curso" name="course_id">
            <Input placeholder="ID del curso" />
          </Form.Item>
          <Form.Item label="Nombre" name="name">
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item label="Precio" name="price">
            <Input type='number' placeholder="Precio" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Subject_post_modal;