import React, { useState, useEffect } from "react";
import type { TableProps } from "antd";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";

import postClient from "@/services/client/fetching/hooks/postClient";
import deleteClient from "@/services/client/fetching/hooks/deleteClient";
import type { Result, Student } from "@/models/types";
import { Turns } from "@/models/types";

interface Item extends Student {
  key: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
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

const App: React.FC<{ studentsResult: any; loadingStudents: boolean }> = ({
  studentsResult,
  loadingStudents,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [deletingKey, setDeletingKey] = useState("");

  const students = studentsResult as Item[];

  console.log('studentsResult', students);

  useEffect(() => {
    if (students) {
      const dataWithKeys = students.map((row, index) => {
        let rowData = {};
        Object.entries(row).forEach(([key, value]) => {
          rowData[key] = value;
        });
        return { key: index.toString(), ...rowData };
      });
      setData(dataWithKeys);
    }
  }, [students]);

  const isEditing = (record: Item) => record.key === editingKey;

  const editRecord = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const deleteRecord = (record: Partial<Item> & { key: React.Key }) => {
    setDeletingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
    setDeletingKey("");
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
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const delete_flow = async (record: Item) => {
    try {
      console.log("Deleting:", record);
      if (record.key && record.id > -1) {
        deleteClient(record as Client);
        record.active = false;
        const newData = [...data];
        newData[record.key] = record;
        console.log("record keyed", newData[record.key]);
        setData(newData);
        setDeletingKey("");
      } else {
        setDeletingKey("");
      }
    } catch (errInfo) {
      console.log("Deleting Failed:", errInfo);
    }
  };

  const columns: TableProps<Item>["columns"] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      editable: false,
      width: "5%",
      render: (_: any, record: Item) => record.id,
    },
    {
      title: "Número de matrícula",
      dataIndex: "matriculation_number",
      key: "matriculation_number",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.matriculation_number,
    },
    {
      title: "DNI",
      dataIndex: "DNI",
      key: "DNI",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.DNI,
    },
    {
      title: "Empleo",
      dataIndex: "employed",
      key: "employed",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.employed ? "Sí" : "No",
    },
    {
      title: "Nivel educativo",
      dataIndex: "educational_level",
      key: "educational_level",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.educational_level,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.name,
    },
    {
      title: "Apellido",
      dataIndex: "surname",
      key: "surname",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.surname,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.email,
    },
    {
      title: "Número de teléfono",
      dataIndex: "phone_number",
      key: "phone_number",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.phone_number,
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.address,
    },
    {
      title: "Ciudad",
      dataIndex: "city",
      key: "city",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.city,
    },
    {
      title: "Fecha de nacimiento",
      dataIndex: "bornDate",
      key: "bornDate",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.bornDate,
    },
    {
      title: "Fecha de creación",
      dataIndex: "created_at",
      key: "created_at",
      editable: false,
      width: "5%",
      render: (_: any, record: Item) => record.created_at,
    },
    {
      title: "Fecha de actualización",
      dataIndex: "updated_at",
      key: "updated_at",
      editable: false,
      width: "5%",
      render: (_: any, record: Item) => record.updated_at,
    },
    {
      title: "Nombre de usuario",
      dataIndex: "username",
      key: "username",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.username,
    },
    {
      title: "Confirmado",
      dataIndex: "confirmed",
      key: "confirmed",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.confirmed ? "Sí" : "No",
    },
    {
      title: "Imagen",
      dataIndex: "image",
      key: "image",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.image,
    },
    {
      title: "Activo",
      dataIndex: "active",
      key: "active",
      editable: true,
      width: "5%",
      render: (_: any, record: Item) => record.active ? "Sí" : "No",
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "5%",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Guardar cambios
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => editRecord(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "5%",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => delete record.key}
              style={{ marginRight: 8 }}
            >
              Borrar
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={deletingKey !== ""}
            onClick={() => delete_flow(record)}
          >
            Cancelar
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps["columns"] = columns.map((col) => {
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
