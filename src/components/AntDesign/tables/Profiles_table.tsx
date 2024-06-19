import React, { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

import postClient from '@/services/client/fetching/hooks/postClient';
import deleteClient from '@/services/client/fetching/hooks/deleteClient';
import type { Client, Result } from '@/models/types';

interface ItemKey {
  key: string;
  editable: boolean;
}

interface Item extends Client, ItemKey {}

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

const App: React.FC<{profiles: any, loading: boolean}> = ({ profiles, loading }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([] as any[]);
  const [editingKey, setEditingKey] = useState('');
  const [deletingKey, setDeletingKey] = useState('');

  console.log(profiles);

  useEffect(() => {
    if (profiles?.result?.data.rows && profiles?.result?.data.columns) {
      const dataWithKeys = profiles.result.data.rows.map((row, index) => {
        let rowData = {};
        row.forEach((item, idx) => {
          rowData[profiles.result.data.columns[idx]] = item;
        });
        return { key: index.toString(), ...rowData };
      });
      setData(dataWithKeys);
    }
  }, [profiles]);

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
        const newData: Item[] = [...data]; // Cambia el tipo de newData a Item[]
        newData[Number(record.key)] = record as Client as Item;
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
      title: "Identificador en su categoría",
      dataIndex: "id",
      key: "id",
      // @ts-ignore
      editable: false,
      width: '1%',
      render: (_: any, record: Item) => record.id,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // @ts-ignore
      editable: true,
      width: '5%',
      render: (_: any, record: Item) => record.email,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      // @ts-ignore
      editable: true,
      width: '5%',
      render: (_: any, record: Item) => record.name,
    },
    {
      title: "Apellidos",
      dataIndex: "surname",
      key: "surname",
      // @ts-ignore
      editable: true,
      width: '10%',
      render: (_: any, record: Item) => record.surname,
    },
    {
      title: "Foto de perfil",
      dataIndex: "image",
      key: "image",
      // @ts-ignore
      editable: true,
      width: '1%',
      render: (_: any, record: Item) => {
        return record.image ? <img src={record.image} alt="image" /> : null;
      },
    },
    {
      title: "Alta",
      dataIndex: "created_at",
      key: "created_at",
      // @ts-ignore
      editable: false,
      width: '5%',
      render: (_: any, record: Item) => new Date(record.created_at as string | Date).toLocaleString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    },
    {
      title: "Ult. actualización",
      dataIndex: "updated_at",
      key: "updated_at",
      // @ts-ignore
      editable: false,
      width: '5%',
      render: (_: any, record: Item) => new Date(record.updated_at as string | Date).toLocaleString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    },
    {
      title: "Fecha nacimiento",
      dataIndex: "bornDate",
      key: "bornDate",
      // @ts-ignore
      editable: true,
      width: '5%',
      render: (_: any, record: Item) => new Date(record.bornDate as string | Date).toLocaleString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    },
    {
      title: "Activo",
      dataIndex: "active",
      // @ts-ignore
      editable: true,
      key: "active",
      width: '1%',
      render: (_: any, record: Item) => record.active ? 'Si' : 'No',
    },
    {
      title: "DNI",
      dataIndex: "DNI",
      // @ts-ignore
      editable: true,
      key: "DNI",
      width: '5%',
      render: (_: any, record: Item) => record.DNI,
    },
    {
      title: "Tlf. contacto",
      dataIndex: "phone_number",
      // @ts-ignore
      editable: true,
      key: "phone_number",
      width: '5%',
      render: (_: any, record: Item) => record.phone_number,
    },
    {
      title: "Tiene trabajo?",
      dataIndex: "employed",
      // @ts-ignore
      editable: true,
      key: "employed",
      width: '1%',
      render: (_: any, record: Item) => record.employed ? 'Si' : 'No',
    },
    {
      title: "Educación",
      dataIndex: "educational_level",
      // @ts-ignore
      editable: true,
      key: "educational_level",
      width: '5%',
      render: (_: any, record: Item) => record.educational_level,
    },
    {
      title: "Rol",
      dataIndex: "tableName",
      // @ts-ignore
      editable: false,
      key: "tableName",
      width: '5%',
      render: (_: any, record: Item) => record.tableName,
    },
    {
      title: "Admin",
      dataIndex: "is_admin",
      // @ts-ignore
      editable: true,
      key: "is_admin",
      width: '1%',
      render: (_: any, record: Item) => record.is_admin,
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
          <Typography.Link
            onClick={() => {
              // Esto eliminará todos los elementos del array cuya propiedad 'key' sea igual a record.key
              const newData = data.filter(item => item.key !== record.key);
              setData(newData);
            }}
            style={{ marginRight: 8 }}
>              Borrar
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={deletingKey !== ''} onClick={() => delete_flow(record)}>
            Borrar
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
          pageSize: 7,
        }}
      />
    </Form>
  );
};

export default App;