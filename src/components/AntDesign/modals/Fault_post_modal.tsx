import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Checkbox, Select } from 'antd';

const { Option } = Select;

interface Student {
  id: number;
  name: string;
}

interface Subject {
  acronym: string;
  name: string;
}

interface Enrolment {
  student_id: number;
  subject_acronym: string;
}

interface DocentPostModalProps {
  students: Student[];
  subjects: Subject[];
  enrolments: Enrolment[];
}

const DocentPostModal: React.FC<DocentPostModalProps> = ({ students, subjects, enrolments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

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

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Crear un registro de falta de estudiante
      </Button>
      <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item label="ID del estudiante">
            <Select placeholder="Selecciona un estudiante" onChange={handleStudentChange}>
              {students.map((student) => (
                <Option value={student.id}>{student.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Acrónimo de la materia">
            <Select placeholder="Selecciona una materia">
              {filteredSubjects.map((subject) => (
                <Option value={subject.acronym}>{subject.name}</Option>
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
            <Input placeholder="Justificación" />
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