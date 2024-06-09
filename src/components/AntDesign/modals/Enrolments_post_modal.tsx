import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

import type { Subject, Student } from '@/models/types';


import postCourse from '@/services/client/fetching/hooks/postCourse'
const { Option } = Select;

const Enrolments_post_modal: React.FC<{ students: Student[], subjects: Subject[] }> = ({ students, subjects }) => {
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
    postCourse(values);
  };

  return (
<>
  <Button type="primary" onClick={showModal}>
    Crear un curso
  </Button>
  <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>  
    <Form form={form} onFinish={onFinish}>
      <Form.Item label="ID del estudiante" name="student_id">
      <Select placeholder="Selecciona un estudiante">
        {Array.isArray(students) && students.map((student) => (
          <Option key={student.id} value={student.id}>{student.name}</Option>
        ))}
      </Select>
      </Form.Item>
      <Form.Item label="Acrónimo de la asignatura" name="subject_acronym">
        <Select placeholder="Selecciona una asignatura">
          {subjects.map((subject) => (
            <Option key={subject.acronym} value={subject.acronym}>{subject.name}</Option>
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

export default Enrolments_post_modal;