import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Checkbox, Tabs } from 'antd';

import postStudent from '@/services/client/fetching/hooks/postStudent'
import postTeacher from '@/services/client/fetching/hooks/postTeacher'

const { TabPane } = Tabs;

const Fault_post_modal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    handleOk();
    // postStudent(values);
    // postTeacher(values);
  };

  return (
<>
  <Button type="primary" onClick={showModal}>
    Crear un profesor o estudiante
  </Button>
  <Modal footer={null} title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form form={form} onFinish={onFinish}>
      <Form.Item label="Nombre" name="name">
        <Input placeholder="Nombre" />
      </Form.Item>
      <Form.Item label="Apellido" name="surname">
        <Input placeholder="Apellido" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item label="Número de teléfono" name="phone_number">
        <Input placeholder="Número de teléfono" />
      </Form.Item>
      <Form.Item label="Dirección" name="address">
        <Input placeholder="Dirección" />
      </Form.Item>
      <Form.Item label="Ciudad" name="city">
        <Input placeholder="Ciudad" />
      </Form.Item>
      <Form.Item label="Fecha de nacimiento" name="bornDate">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Nombre de usuario" name="username">
        <Input placeholder="Nombre de usuario" />
      </Form.Item>
      <Form.Item label="Confirmado" name="confirmed">
        <Checkbox onChange={e => form.setFieldsValue({ confirmed: e.target.checked })} />
      </Form.Item>
      <Form.Item label="Imagen" name="image">
        <Input type='number' placeholder="URL de la imagen" />
      </Form.Item>
      <Form.Item label="Activo" name="active">
        <Checkbox onChange={e => form.setFieldsValue({ active: e.target.checked })} />
      </Form.Item>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Estudiante" key="1">
          <Form.Item label="Número de matrícula" name="matriculation_number">
            <Input placeholder="Número de matrícula" />
          </Form.Item>
          <Form.Item label="DNI" name="DNI">
            <Input placeholder="DNI" />
          </Form.Item>
          <Form.Item label="Empleo" name="employed">
            <Checkbox onChange={e => form.setFieldsValue({ employed: e.target.checked })} />
          </Form.Item>
          <Form.Item label="Nivel educativo" name="educational_level">
            <Input placeholder="Nivel educativo" />
          </Form.Item>
        </TabPane>
        <TabPane tab="Profesor" key="2">
          <Form.Item label="Es administrador" name="is_admin">
            <Checkbox onChange={e => form.setFieldsValue({ is_admin: e.target.checked })} />
          </Form.Item>
        </TabPane>
      </Tabs>
      <Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
          <Button type="default" htmlType="button" onClick={handleCancel}>
            Cancelar
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  </Modal>
</>
  );
};

export default Fault_post_modal;