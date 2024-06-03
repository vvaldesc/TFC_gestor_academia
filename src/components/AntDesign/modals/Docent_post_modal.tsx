import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Checkbox, Tabs } from 'antd';

const { TabPane } = Tabs;

const Fault_post_modal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Crear un profesor o estudiante
      </Button>
      <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item label="Nombre">
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item label="Apellido">
            <Input placeholder="Apellido" />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Número de teléfono">
            <Input placeholder="Número de teléfono" />
          </Form.Item>
          <Form.Item label="Dirección">
            <Input placeholder="Dirección" />
          </Form.Item>
          <Form.Item label="Ciudad">
            <Input placeholder="Ciudad" />
          </Form.Item>
          <Form.Item label="Fecha de nacimiento">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Nombre de usuario">
            <Input placeholder="Nombre de usuario" />
          </Form.Item>
          <Form.Item label="Confirmado">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Imagen">
            <Input type='number' placeholder="URL de la imagen" />
          </Form.Item>
          <Form.Item label="Activo">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Salario">
            <Input placeholder="Salario" />
          </Form.Item>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Estudiante" key="1">
              <Form.Item label="Número de matrícula">
                <Input placeholder="Número de matrícula" />
              </Form.Item>
              <Form.Item label="DNI">
                <Input placeholder="DNI" />
              </Form.Item>
              <Form.Item label="Empleo">
                <Checkbox />
              </Form.Item>
              <Form.Item label="Nivel educativo">
                <Input placeholder="Nivel educativo" />
              </Form.Item>
            </TabPane>
            <TabPane tab="Profesor" key="2">
              <Form.Item label="Es administrador">
                <Checkbox />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </>
  );
};

export default Fault_post_modal;