import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Alert } from 'antd';

import postSubject from '@/services/client/fetching/hooks/postSubject'
import type { Teacher, Courses } from '@/models/types';

const { Option } = Select;

const Subject_post_modal: React.FC<{ teachers: Teacher[], courses: Courses[] }> = ({ teachers, courses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState(false);

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

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    try {
      handleOk();
      const response = await postSubject(values);
    } catch (error) {
      console.error('Error creando asignatura');
      setError(true);

    }
  };
  console.log(teachers);
  return (
<>
{error && <Alert message={'Hubo un error al crear el curso'} type="error" />}
  <Button type="primary" onClick={showModal}>
    Crear una asignatura
  </Button>
  <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form form={form} onFinish={onFinish}>
      <Form.Item label="Acrónimo" name="acronym">
        <Input placeholder="Acrónimo" />
      </Form.Item>
      <Form.Item label="Profesor" name="teacher_id">
      <Select placeholder="Selecciona un profesor">
        {Array.isArray(teachers) ? teachers.map((teacher) => (
          // @ts-ignore
          <Option key={teacher.Teachers.id} value={teacher.Teachers.id}>{teacher.Teachers.name + ' ' + teacher.Teachers.surname}</Option>
        )) : null}
      </Select>
      </Form.Item>
      <Form.Item label="Curso" name="course_id">
        <Select placeholder="Selecciona un curso">
          {courses.map((course) => (
            <Option key={course.acronym} value={course.acronym}>{course.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Nombre" name="name">
        <Input placeholder="Nombre" />
      </Form.Item>
      <Form.Item label="Precio" name="price">
        <Input type='number' placeholder="Precio" />
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

export default Subject_post_modal;