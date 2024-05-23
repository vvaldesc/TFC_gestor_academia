import React from "react";
import { Space, Table, Tag, Button } from "antd";
import type { TableProps } from "antd";
import type { Result, Student, Teacher, Employee } from "@/models/types";
import { Role } from "@/models/types";

interface Props {
  employees: any;
  unavailableEmployees: any;
  daytime: Date; // afternoon or morning
  onValueChange: (value: number) => void;
}

const Reservations_table: React.FC<Props> = ({
  employees,
  unavailableEmployees,
  daytime,
  onValueChange,
}) => {

  const employeesArr: Employee[] = employees.result ? employees.result.data : [];
  const unavailableEmployeesArr: Employee[] = unavailableEmployees.result ? unavailableEmployees.result.data : [];
  console.log(unavailableEmployeesArr);

  interface DataType {
    key: number;
    name: string;
    tags: Role[] | any;
    rating: number;
    image: string;
  }

  const data: DataType[] = (employeesArr ?? []).map((employee: Employee) => {
    return {
      key: Number(employee.id),
      name: employee.student?.name || employee.teacher?.name || "Unknown",
      tags: employee.role === Role.Teacher ? [Role.Teacher] : [Role.Student],
      rating: Number(employee.rating),
      image: employee.student?.image || employee.teacher?.image || "https://gw.alipayobjects.com/zos/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    };
  });

  const handleSelect = (value: number) => {
    console.log(value);
    onValueChange(value);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {/* @ts-ignore*/}
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Rating",
      key: "rating",
      dataIndex: "rating",
      // render: (_, { rating }) => (
      //   <Space>
      //     {[...Array(5)].map((_, i) => (
      //       <StarTwoTone
      //         twoToneColor={i < Math.round(rating/2) ? "gold" : "gray"}
      //         key={i}
      //       />
      //     ))}
      //   </Space>
      // ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          size="middle"
          onClick={() => handleSelect(record.key)}
          disabled={unavailableEmployeesArr.some((employee) => employee.id === record.key)}
        >
          <a>Reserve {record.name}</a>
        </Button>
      ),
    },
  ];

  // Your code here
  return <Table
    columns={columns}
    dataSource={data}
    rowKey={(record) => record.key}
    pagination={{
      pageSize: 5,
    }}
  />;
};

export default Reservations_table;
