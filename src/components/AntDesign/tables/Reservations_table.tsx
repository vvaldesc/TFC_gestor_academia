import React from "react";
import { Space, Table, Tag, Button } from "antd";
import type { TableProps } from "antd";
import type { Result, Student, Teacher, Employee } from "@/models/types";
import { Role, Disciplines, Turns } from "@/models/types";
import { checkTimeOfDay } from "@/services/client/utils/utils"

import "@/styles/styles.css";

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
    console.log('employees')
    console.log(employees)
  const employeesArr: Employee[] = employees.result ? employees.result.data : [];
  const unavailableEmployeesArr: Employee[] = unavailableEmployees.result ? unavailableEmployees.result.data : [];
  const daytimeCategory = checkTimeOfDay(daytime);

  console.log({'daytime': daytime});
  console.log({'daytimeCategory': daytimeCategory});
  console.log({'unavailableEmployeesArr': unavailableEmployeesArr});
  console.log({'employeesArr': employeesArr});

  interface DataType {
    key: number;
    name: string;
    categories: (Role | Disciplines | Turns)[];
    rating: number;
    image: string;
  }

  const data: DataType[] = (employeesArr ?? [])
  .filter((employee: Employee) => {
    if(daytime === undefined || daytime === null || daytimeCategory === undefined) return true;
    if(daytimeCategory === Turns.NotLaborable) return false;
    
    const targetTurn: Turns = daytime && checkTimeOfDay(daytime) as Turns;

    if (employee.role === Role.Student && !employee.student?.turns?.includes(targetTurn)) {
      return false;
    }
    if (employee.role === Role.Teacher && !employee.teacher?.turns?.includes(targetTurn)) {
      return false;
    }

    return true;
  })
  .map((employee: Employee) => {
    const categories: (Role | Disciplines | Turns)[] = employee.role === Role.Teacher ? [Role.Teacher] : [Role.Student];

    employee.role === Role.Teacher && employee.teacher?.disciplines?.forEach((discipline) => categories.push(discipline));
    employee.role === Role.Student && employee.student?.disciplines?.forEach((discipline) => categories.push(discipline));

    employee.role === Role.Teacher && employee.teacher?.turns?.forEach((turn) => categories.push(turn));
    employee.role === Role.Student && employee.student?.turns?.forEach((turn) => categories.push(turn));


    return {
      key: Number(employee.id),
      name: employee.student?.name || employee.teacher?.name || "Unknown",
      categories: categories,
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img className="section-div-profilePhoto m-auto my-4 object-cover" src={text} alt="image" />,
    },
    {
      title: "Categoría",
      key: "category",
      dataIndex: "category",
      render: (_, { categories }) => (
        <>
          {/* @ts-ignore*/}
          {categories.map((category) => {
            let color = category.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={category}>
                {category.toUpperCase()}
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
          <a>Reserva {record.name}</a>
        </Button>
      ),
    },
  ];

  console.log({'data': data});

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
