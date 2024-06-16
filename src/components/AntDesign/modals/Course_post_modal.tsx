import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Alert } from 'antd';
import regex from '@/consts/regex';
import {disciplineParser} from '@/services/client/utils/utils';

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
  <Modal title="Nuevo curso" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>  
    <Form form={form} onFinish={onFinish}>
        <Form.Item
      label="Acrónimo"
      name="acronym"
      rules={[
        {
          required: true,
          pattern: regex.courseAcronym,
          message: 'Por favor, introduce un acrónimo válido. Ejemplo: FP_MP2',
        },
      ]}
    >
      <Input placeholder="Acrónimo" />
    </Form.Item>
    <Form.Item
      label="Nombre"
      name="name"
      rules={[
        {
          pattern: regex.regularName,
          required: true,
          message: 'Por favor, introduce un nombre',
        },
      ]}
    >
      <Input placeholder="Nombre" />
    </Form.Item>
    <Form.Item
      label="Turno"
      name="turn"
      rules={[
        {
          required: true,
          message: 'Por favor, selecciona un turno',
        },
      ]}
    >
      <Select placeholder="Turno">
        <Select.Option value="Diurn">Diurno</Select.Option>
        <Select.Option value="Nocturn">Nocturno</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      label="Umbral de asistencia"
      name="attendance_threshold"
      rules={[
        {
          required: true,
          message: 'Por favor, introduce un umbral de asistencia',
        },
      ]}
    >
      <Input type='number' placeholder="Umbral de asistencia" />
    </Form.Item>
    <Form.Item
      label="Nivel educativo"
      name="educational_level"
      rules={[
        {
          required: true,
          message: 'Por favor, introduce un nivel educativo',
        },
      ]}
    >
      <Input placeholder="Nivel educativo" />
    </Form.Item>
    <Form.Item
      label="Duración"
      name="duration"
      rules={[
        {
          required: true,
          message: 'Por favor, introduce una duración',
        },
      ]}
    >
      <Input type='number' placeholder="Duración" />
    </Form.Item>
    <Form.Item
      label="Horas prácticas"
      name="practical_hours"
      rules={[
        {
          required: true,
          message: 'Por favor, introduce las horas prácticas',
        },
      ]}
    >
      <Input type='number' placeholder="Horas prácticas" />
    </Form.Item>
    <Form.Item
      label="Disciplina"
      name="discipline"
      rules={[
        {
          required: true,
          message: 'Por favor, selecciona una disciplina',
        },
      ]}
    >
      <Select placeholder="Selecciona una disciplina">
        {disciplines.map((discipline) => (
          // @ts-ignore
          <Option key={disciplineParser(discipline.name)} value={disciplineParser(discipline.name)}></Option>
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