import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Checkbox, Select, Upload } from 'antd';
import type { Student, Subject, StudentSubjectEnrolments } from '@/models/types';

import postFault from '@/services/client/fetching/hooks/postFault'

const { Option } = Select;

interface DocentPostModalProps {
  students: Student[];
  subjects: Subject[];
  enrolments: StudentSubjectEnrolments[];
}

const DocentPostModal: React.FC<DocentPostModalProps> = ({ students, subjects, enrolments }) => {
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

  console.log(enrolments);

  const filteredSubjects = selectedStudent
  ? subjects.filter((subject) =>
      enrolments.some(
        // @ts-ignore
        ({ StudentSubjectEnrolments, Subjects }) =>
          Number(StudentSubjectEnrolments.student_id) === Number(selectedStudent) &&
          Subjects.acronym === subject.acronym
      )
    )
  : [];

  console.log('filteredSubjects');
  console.log(filteredSubjects);
  console.log('enrolments');
  console.log(enrolments);
  console.log(selectedStudent);

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
      <Modal footer={null} title="Crear una falta de asistencia" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="ID del estudiante" name="student_id">
            <Select placeholder="Selecciona un estudiante" onChange={handleStudentChange}>
              {students.map((student: Student) => (
                <Option key={student.id} value={student.id}>{student.name + ' ' + student.surname}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Acrónimo de la materia" name="subject_acronym">
            <Select placeholder="Selecciona una materia">
              {filteredSubjects.map((subject) => (
                <Option key={subject.acronym} value={subject.acronym}>{subject.name + ' - (' + subject.acronym + ')'}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Fecha" name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Justificado" name="justified" valuePropName="checked">
            <Checkbox onChange={e => form.setFieldsValue({ justified: e.target.checked })} />
          </Form.Item>
          <Form.Item label="Descripción" name="description">
            <Input placeholder="Descripción" />
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

export default DocentPostModal;