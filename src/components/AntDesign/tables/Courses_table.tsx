import React, { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

import postClient from '@/services/client/fetching/hooks/postClient';
import deleteClient from '@/services/client/fetching/hooks/deleteClient';
import type { Client, Result, Courses } from '@/models/types';

interface ItemKey {
  key: string;
}

interface Item extends Courses, ItemKey {}

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

const App: React.FC<{coursesResult: any, loadingCourses: boolean}> = ({ coursesResult, loadingCourses }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [deletingKey, setDeletingKey] = useState('');

  const courses = coursesResult?.result?.data as Courses[];
  const result = coursesResult?.result as Result;

  useEffect(() => {
    console.log('courses:', courses);
    if (result?.count > 0) {
      const dataWithKeys = courses.map((row, index) => {
        let rowData = {};
        console.log('row:', row);
        Object.entries(row).forEach(([key, value]) => {
          rowData[key] = value;
        });
        return { key: index.toString(), ...rowData };
      });
      console.log('dataWithKeys:', dataWithKeys);
      setData(dataWithKeys);
    }
  }, [courses]);

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
        row.id = item.id;
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
      if (record.key && record.id > -1) {
        deleteClient(record as Client);
        record.active = false;
        const newData = [...data];
        newData[record.key] = record;
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
      title: "Acrónimo",
      dataIndex: "acronym",
      key: "acronym",
      editable: false,
      width: '5%',
      render: (_: any, record: {acronym: string}) => record.acronym,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      editable: true,
      width: '5%',
      render: (_: any, record: {name: string}) => record.name,
    },
    {
      title: "Turno",
      dataIndex: "turn",
      key: "turn",
      editable: true,
      width: '5%',
      render: (_: any, record: {turn: string}) => record.turn,
    },
    {
      title: "Umbral de asistencia",
      dataIndex: "attendance_threshold",
      key: "attendance_threshold",
      editable: true,
      width: '5%',
      render: (_: any, record: {attendance_threshold: number}) => record.attendance_threshold,
    },
    {
      title: "Nivel educativo",
      dataIndex: "educational_level",
      key: "educational_level",
      editable: true,
      width: '5%',
      render: (_: any, record: {educational_level: string}) => record.educational_level,
    },
    {
      title: "Duración",
      dataIndex: "duration",
      key: "duration",
      editable: true,
      width: '5%',
      render: (_: any, record: {duration: number}) => record.duration,
    },
    {
      title: "Horas prácticas",
      dataIndex: "practical_hours",
      key: "practical_hours",
      editable: true,
      width: '5%',
      render: (_: any, record: {practical_hours: number}) => record.practical_hours,
    },
    {
      title: "Disciplina",
      dataIndex: "discipline",
      key: "discipline",
      editable: true,
      width: '5%',
      render: (_: any, record: {discipline: string}) => record.discipline,
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

  const mergedColumns: TableProps['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
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