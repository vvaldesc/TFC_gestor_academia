import React, { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

import postClient from '@/services/client/fetching/hooks/postClient';
import deleteClient from '@/services/client/fetching/hooks/deleteClient';
import type { Client, Result, StudentSubjectEnrolments, Student, Subject, Teacher, Courses } from '@/models/types';

interface Item {
  key: string;
  StudentSubjectEnrolments: StudentSubjectEnrolments;
  Students: Student;
  Subjects: Subject;
  Teachers: Teacher;
  Courses: Courses;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{margin: 0}}
          rules={[
            {
              required: false,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App: React.FC<{enrolmentResult: any, loadingEnrolments: boolean}> = ({ enrolmentResult, loadingEnrolments }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [deletingKey, setDeletingKey] = useState('');

  const enrolments = enrolmentResult?.result?.data as Item[];
  const result = enrolmentResult?.result as Result;

  useEffect(() => {
    if (result?.count > 0) {
      const dataWithKeys = enrolments.map((row, index) => {
        let rowData = {};
        Object.entries(row).forEach(([key, value]) => {
          rowData[key] = value;
        });
        return { key: index.toString(), ...rowData };
      });
      setData(dataWithKeys);
    }
  }, [enrolments]);

  const isEditing = (record: Item) => record.key === editingKey;

  const editRecord = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const deleteRecord = (record: Partial<Item> & { key: React.Key }) => {
    setDeletingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
    setDeletingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        // @ts-ignore
        row.id = item.id;
        // @ts-ignore
        postClient(row as Client);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const delete_flow = async (record: Item) => {
    try {
      console.log('Deleting:', record);
      // @ts-ignore
      if (record.key && record.id > -1) {
        // @ts-ignore
        deleteClient(record as Client);
        // @ts-ignore
        record.active = false;
        const newData = [...data];
        newData[record.key] = record;
        console.log('record keyed', newData[record.key]);
        setData(newData);
        setDeletingKey('');
      } else {
        setDeletingKey('');
      }
    } catch (errInfo) {
      console.log('Deleting Failed:', errInfo);
    }
};

  const columns: TableProps<Item>['columns'] = [
      {
        title: "Matrícula",
        dataIndex: "acronym",
        key: "acronym",
        // @ts-ignore
        editable: false,
        width: '5%',
        render: (_: any, record: Item) => record.StudentSubjectEnrolments.id,
      },
      {
        title: "Curso",
        dataIndex: "course_name",
        key: "course_name",
        // @ts-ignore
        editable: false,
        width: '5%',
        render: (_: any, record: Item) => record.Courses.name,
      },
      {
        title: "Alumno",
        dataIndex: "student_id",
        key: "student_id",
        // @ts-ignore
        editable: true,
        width: '5%',
        render: (_: any, record: Item) => record.Students.name + " " + record.Students.surname,
      },
      {
        title: "Profesor",
        dataIndex: "teacher_name",
        key: "teacher_name",
        // @ts-ignore
        editable: false,
        width: '5%',
        render: (_: any, record: Item) => record.Teachers.name,
      },
      {
        title: "Alta",
        dataIndex: "created_at",
        key: "created_at",
        editable: false,
        width: '5%',
        // @ts-ignore
        render: (_: any, record: Item) => record.StudentSubjectEnrolments.date,
      },
    {
        title: 'operation',
        dataIndex: 'operation',
        width: '5%',
        render: (_: any, record: Item) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                Guardar cambios
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancelar</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => editRecord(record)}>
              Edit
            </Typography.Link>
          );
        },
      },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '5%',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => delete(record.key)} style={{ marginRight: 8 }}>
              Borrar
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={deletingKey !== ''} onClick={() => delete_flow(record)}>
            Cancelar
          </Typography.Link>
        );
      },
    },
  ];

        // @ts-ignore
  const mergedColumns: TableProps['columns'] = columns.map((col) => {
    // @ts-ignore
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        // @ts-ignore
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default App;