import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Checkbox, Select, Upload } from 'antd';
import type { Student, Subject, StudentSubjectEnrolments } from '@/models/types';

const { Option } = Select;

interface DocentPostModalProps {
  students: Student[];
  subjects: Subject[];
  enrolments: StudentSubjectEnrolments[];
}

const DocentPostModal: React.FC<DocentPostModalProps> = ({ students, subjects, enrolments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  console.log('students');
  console.log(students);
  console.log('subjects');
  console.log(subjects);
  console.log('enrolments');
  console.log(enrolments);

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

  const filteredSubjects = subjects.filter((subject) =>
    enrolments.some((enrolment) => enrolment.student_id === selectedStudent && enrolment.subject_acronym === subject.acronym)
  );

  console.log('filteredSubjects');
  console.log(filteredSubjects);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Crear una falta de asistencia
      </Button>
      <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item label="ID del estudiante">
            <Select placeholder="Selecciona un estudiante" onChange={handleStudentChange}>
              {students.map((student: Student) => (
                <Option value={student.id}>{student.name + ' ' + student.surname}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Acrónimo de la materia">
            <Select placeholder="Selecciona una materia">
              {filteredSubjects.map((subject) => (
                <Option value={subject.acronym}>{subject.subject_name + ' - (' + subject.acronym + ')'}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Fecha">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Justificado">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Justificación">
            <Upload accept=".pdf">
              <Button>Click para subir</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Descripción">
            <Input placeholder="Descripción" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DocentPostModal;