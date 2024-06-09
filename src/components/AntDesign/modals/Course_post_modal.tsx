import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Alert } from 'antd';

import postCourse from '@/services/client/fetching/hooks/postCourse'
const { Option } = Select;

const Course_post_modal: React.FC<{ disciplines: any[] }> = ({ disciplines }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {

    try {
      console.log('Received values of form: ', values);
      handleOk();
      const response = await postCourse(values);
      if (response.status !== 201) {
        console.error('Error creando registro curso');
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
<>
  {error && <Alert message={'Hubo un error al crear el curso'} type="error" />}
  <Button type="primary" onClick={showModal}>
    Crear un curso
  </Button>
  <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>  
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
        <Select placeholder="Selecciona una disciplina">
          {disciplines.map((discipline) => (
        // @ts-ignore
            <Option key={discipline.name} value={discipline.name}></Option>
          ))}
        </Select>
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

export default Course_post_modal;