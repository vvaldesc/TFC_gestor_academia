import React, { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

import putDetail from '@/services/client/fetching/hooks/putDetail';
import deleteClient from '@/services/client/fetching/hooks/deleteClient';
import type { Client, Result, ServiceConsumption_type } from '@/models/types';

interface ItemKey {
  key: string;
}

interface Item extends ServiceConsumption_type, ItemKey {}

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

const App: React.FC<{detailsArray: ServiceConsumption_type[], loadingDetails: boolean}> = ({ detailsArray, loadingDetails }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [deletingKey, setDeletingKey] = useState('');

  useEffect(() => {
    if (detailsArray.length > 0) {
      const dataWithKeys = detailsArray.map((row, index) => {
        let rowData = {};
        Object.entries(row).forEach(([key, value]) => {
          rowData[key] = value;
        });
        return { key: index.toString(), ...rowData };
      });
      setData(dataWithKeys);
    }
  }, [detailsArray]);

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
        console.log('Saving:', row);
        // @ts-ignore
        row.mode = 'Silent';
        // @ts-ignore
        putDetail(row as ServiceConsumption_type);
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
        // @ts-ignore
        record.state = 'Cancelled';
        const body = { ...record };
        body.state = 'Cancelled';
        putDetail(body as ServiceConsumption_type);
        // @ts-ignore
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
      title: "Id factura",
      dataIndex: "id",
      key: "id",
      // @ts-ignore
      editable: false,
      width: '1%',
      render: (_: any, record: Item) => record.id,
    },
    {
      title: "Servicio",
      dataIndex: "service_name",
      key: "service_name",
      // @ts-ignore
      editable: true,
      width: '5%',
      render: (_: any, record: Item) => record.service_name,
    },
    {
      title: "Empleado",
      dataIndex: "employee_name",
      key: "employee_name",
      // @ts-ignore
      editable: true,
      width: '5%',
      render: (_: any, record: Item) => record.teacher_id ? (record.teacher_name + " " + record.teacher_surname) : (record.student_name + " " + record.student_surname),
    },
    {
      title: "Cliente",
      dataIndex: "client_name",
      key: "client_name",
      // @ts-ignore
      editable: true,
      width: '5%',
      render: (_: any, record: Item) => record.client_name + " " + record.client_surname,
    },
    {
      title: "Calificación",
      dataIndex: "rating",
      key: "rating",
      // @ts-ignore
      editable: true,
      width: '1%',
      render: (_: any, record: Item) => record.rating ? record.rating : '-',
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      // @ts-ignore
      editable: true,
      width: '1%',
      render: (_: any, record: Item) => record.price,
    },
    {
      title: "Retraso",
      dataIndex: "delay",
      key: "delay",
      // @ts-ignore
      editable: true,
      width: '1%',
      render: (_: any, record: Item) => record.delay,
    },
    {
      title: "Fecha alta",
      dataIndex: "created_at",
      key: "created_at",
      // @ts-ignore
      editable: false,
      width: '5%',
      render: (_: any, record: Item) => new Date(record.created_at).toLocaleString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    },
    {
      title: "Fecha reserva",
      dataIndex: "reserved_at",
      key: "reserved_at",
      // @ts-ignore
      editable: true,
      width: '5%',
      defaultSortOrder: 'descend',
      render: (_: any, record: Item) => new Date(record.reserved_at).toLocaleString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    },
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      // @ts-ignore
      editable: true,
      width: '5%',
      render: (_: any, record: Item) => record.state,
    },
    {
      title: "Clima estimado",
      dataIndex: "weather",
      key: "weather",
      // @ts-ignore
      editable: true,
      width: '5%',
      render: (_: any, record: Item) => record.weather,
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
            Editar
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